var fs = require('fs-extra');
var path = require('path');
var u = require('underscore');
var ejs = require('ejs');
var pluralize = require('pluralize');

function pascalize(s) {
    s = s + '';
    if (/^[A-Z\-_]$/.test(s)) {
        s = s.toLowerCase();
    }
    s = s.replace(
        /[\s-\/_]+(.)/g,
        function (w, c) {
            return c.toUpperCase();
        }
    );
    // 这里把ABCD这种连续的大写，转成AbcD这种形式。
    // 如果`encodeURIComponent`，会变成`encodeUriComponent`，
    // 然后加横线后就是`encode-uri-component`得到正确的结果
    // 但是如果连续的大写串后没有其它字母，则将其第二个字母起全部转成小写
    s = s.replace(
        /[A-Z]{2,}$/g,
        function (match) {
            return match.charAt(0)
                + match.slice(1).toLowerCase();
        }
    );
    s = s.replace(
        /[A-Z]{2,}$/g,
        function (match) {
            return match.charAt(0)
                + match.slice(1, -1).toLowerCase()
                + match.charAt(match.length - 1);
        }
    );
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
}

function camelize(s) {
    s = pascalize(s);
    return s.charAt(0).toLowerCase() + s.slice(1);
}

function dashlize(s) {
    s = pascalize(s);
    // 这里把ABCD这种连续的大写，转成AbcD这种形式。
    // 如果`encodeURIComponent`，会变成`encodeUriComponent`，
    // 然后加横线后就是`encode-uri-component`得到正确的结果
    // 但是如果连续的大写串后没有其它字母，则将其第二个字母起全部转成小写
    s = s.replace(
        /[A-Z]{2,}$/g,
        function (match) {
            return match.charAt(0)
                + match.slice(1).toLowerCase();
        }
    );
    s = s.replace(
        /[A-Z]{2,}$/g,
        function (match) {
            return match.charAt(0)
                + match.slice(1, -1).toLowerCase()
                + match.charAt(match.length - 1);
        }
    );
    // 大写字符之间用横线连起来
    s = s.replace(
        /[A-Z]/g,
        function (match) { return '-' + match.toLowerCase(); }
    );
    if (s.charAt(0) === '-') {
        s = s.substring(1);
    }
    return s;
}

ejs.filters['pascal'] = pascalize;
ejs.filters['camel'] = camelize;
ejs.filters['dash'] = dashlize;
ejs.filters['const'] = function (s) {
    s = pascalize(s);
    return s.toUpperCase();
};
ejs.filters['plural'] = function (s) {
    // return s.replace(/y$/, 'ie') + 's';
    var s1 = dashlize(s).split('-');
    if (s.length > 1) {
        s1[s1.length-1] = pluralize.plural(s1[s1.length-1]);
        return camelize(s1.join('-'));
    }
    else {
        return pluralize.plural(s);
    }
};
ejs.filters['array'] = function (a) {
    var s = ['['];
    for (var i = 0; i < a.length; i++) {
        s.push(a[i]);
        if (i < a.length - 1) {
            s.push(', ');
        }
    }
    s.push(']');
    return s.join('');
}

exports.render = function (args, data) {
    var templateData = u.extend({}, data, this.getTemplateData(args, data));
    var files = {};
    u.each(
        this.getFiles(templateData, args),
        function (templateFileName, filename) {
            templateFileName = path.resolve(__dirname, 'tpl', templateFileName + '.tpl');
            filename = filename
                .replace('$src', path.join(data.projectDirectory, 'src'))
                .replace('$test', path.join(data.projectDirectory, 'test'));
            filename = path.resolve(filename);
            files[filename] = templateFileName;
        }
    );

    var existsFiles = Object.keys(files)
        .filter(fs.existsSync)
        .map(function (dir) { return path.relative(data.projectDirectory, dir); });
    if (existsFiles.length) {
        console.error('已存在文件：' + existsFiles.join(', '));
        console.error('请删除已存在的文件后重新运行代码生成命令');
        return;
    }


    u.each(
        files,
        function (templateFileName, filename) {
            fs.mkdirsSync(path.dirname(filename));

            var template = fs.readFileSync(templateFileName, 'utf8');
            var output = ejs.render(template, templateData, { debug: true, compileDebug: true });
            fs.writeFileSync(filename, output);
        }
    );
};

exports.getTemplateData = function (args, data) {
    return {};
};

exports.getFiles = function (data, args) {
    return {};
};
