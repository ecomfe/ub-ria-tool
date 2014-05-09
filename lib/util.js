var fs = require('fs-extra');
var path = require('path');
var u = require('underscore');

/**
 * 获取项目顶层文件夹
 *
 * @return {string} 绝对路径
 */
exports.findProjectDirectory = function () {
    var dir = path.resolve('.');
    while (dir !== '/' && !fs.existsSync(path.join(dir, '.edpproj'))) {
        dir = path.resolve(dir, '..');
    }

    if (dir === '/') {
        throw new Error('未找到项目文件夹，请确保当前目录在项目内');
    }

    return dir;
};
exports.findProjectDirectory = u.memoize(exports.findProjectDirectory);


exports.getProjectInfo = function () {
    var projectDirectory = exports.findProjectDirectory();
    try {
        return fs.readJSONSync(path.join(projectDirectory, '.edpproj', 'project'));
    }
    catch (ex) {
        if (ex instanceof SyntaxError) {
            throw new Error('无法解析.edpproj/project文件，请检查文件是否为合法的JSON格式');
        }
        else if (ex.code === 'ENOENT') {
            throw new Error('未找到.edpproj/project文件，请确保文件存在');
        }
        else {
            throw new Error('无法正确读取.edpproj/project文件：' + ex.message);
        }
    }
};

exports.getDictionary = function () {
    var projectDirectory = exports.findProjectDirectory();
    try {
        return fs.readJSONSync(path.join(projectDirectory, '.edpproj', 'dict'));
    }
    catch (ex) {
        if (ex instanceof SyntaxError) {
            throw new Error('无法解析.edpproj/dict文件，请检查文件是否为合法的JSON格式');
        }
        else if (ex.code === 'ENOENT') {
            throw new Error('未找到.edpproj/dict文件，请确保文件存在');
        }
        else {
            throw new Error('无法正确读取.edpproj/dict文件：' + ex.message);
        }
    }
};

exports.getDefine = function (module, file) {
    var projectDirectory = exports.findProjectDirectory();
    var definePath = '';
    if (file === 'entity') {
        definePath = path.join(projectDirectory, 'src', module, 'entity.js');
    }
    else {
        var newFile = file + '.def.js';
        definePath = path.join(projectDirectory, 'src', module, '.define', newFile);
    }

    try {
        var define = function (func) {
            return func();
        };
        var defineData = eval(fs.readFileSync(definePath, { encoding: 'utf-8' }));

        return defineData;
    }
    catch (ex) {
        if (ex instanceof SyntaxError) {
            throw new Error('无法解析defind文件，请检查文件是否为合法的JS文件格式');
        }
        else if (ex.code === 'ENOENT') {
            throw new Error('未找到defind文件，请确保文件存在');
        }
        else {
            throw new Error('无法正确读取define文件：' + ex.message);
        }
    }
};

exports.isDefineExist = function (module, file) {
    var projectDirectory = exports.findProjectDirectory();
    if (file === 'entity') {
        var definePath = path.join(projectDirectory, 'src', module, 'entity.js');
    }
    else {
        var file = file + '.def.js';
        var definePath = path.join(projectDirectory, 'src', module, '.define', file);
    }

    return fs.existsSync(definePath);
};

exports.getEnum = function (module, datasource) {
    var projectDirectory = exports.findProjectDirectory();
    var datasource = datasource.split('/');
    var enumName = datasource.pop();
    var enumPath = datasource.join('/');



    if (enumPath === './enum') { enumPath = module; }

    var enumPath = path.join(projectDirectory, 'src', enumPath, 'enum.js');

    try {
        var define = function (func) {
            var require = function (arg) {
                return function () {
                    return arguments;
                }
            };
            return func(require);
        };

        var enumData = eval(fs.readFileSync(enumPath, { encoding: 'utf-8' }));

        return enumData[enumName];
    }
    catch (ex) {
        if (ex instanceof SyntaxError) {
            throw new Error('无法解析enum文件，请检查文件是否为合法的JS文件格式');
        }
        else if (ex.code === 'ENOENT') {
            throw new Error('未找到enum文件，请确保文件存在');
        }
        else {
            throw new Error('无法正确读取enum文件：' + ex.message);
        }
    }
};

exports.mergeDefaultFieldDef = function (module, field) {
    var me = exports.mergeDefaultFieldDef;
    if (field) {
        var type = field[0];
        var typeOption = field[2];
        if (typeOption === undefined) { typeOption = {}; };

        if (type === 'string') {
            typeOption = u.defaults(typeOption, { maxLength: '@rule.maxLength' });
        }
        else if (type === 'number') {
            typeOption = u.defaults(typeOption, { pattern: '@rule.positiveInteger.pattern' });
        }
        else if (type === 'bool') {
            // typeOption = u.defaults(typeOption, { required: true });
        }
        else if (type === 'enum') {
            // typeOption = u.defaults(typeOption, { required: true });
            typeOption.enums = exports.getEnum(module, typeOption.datasource);;
        }
        else if (type === 'array') {
            me(field[2].item);
        }
        else if (type === 'object') {
            u.each(
                field[2].content,
                function (value, key) {
                    me(value);
                }
            );
        }
        else if (type === 'reference' || type === 'reference-set') {
            typeOption = u.defaults(typeOption, { required: true });
        }
        field[2] = typeOption;
        // console.log(field[2]);
    }
};

exports.mergeEntity2Form = function (field, entity) {
    if (field.desc === void 0) { field.desc = entity[1]; }
    u.defaults(field, entity[2]);
    //console.log(field);
};
