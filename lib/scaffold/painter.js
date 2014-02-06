var fs = require('fs-extra');
var path = require('path');
var u = require('underscore');

function pascalize(s) {
    s = s.replace(/[\s-_]+/g, ' ');
    s = s.replace(
        / (\w)/g,
        function (w, c) {
            return c.toUpperCase();
        }
    );
    s = s[0].toUpperCase() + s.slice(1);
    return s;
}

exports.createTemplateEngine = function () {
    var Engine = require('etpl').Engine;
    var engine = new Engine();
    // 修改掉`commandOpen`和`commandClose`是为了让模板文件的模板可以正常解析
    engine.config({ defaultFilter: 'raw', commandOpen: '<%=', commandClose: '=%>' });
    engine.addFilter('pascal', pascalize);
    engine.addFilter(
        'camel',
        function (s) {
            s = pascalize(s);
            return s[0].toLowerCase() + s.slice(1);
        }
    );
    engine.addFilter(
        'dash',
        function (s) {
            s = pascalize(s);
            // 这里把ABCD这种连续的大写，转成AbcD这种形式。
            // 如果`encodeURIComponent`，会变成`encodeUriComponent`，
            // 然后加横线后就是`encode-uri-component`得到正确的结果
            s = s.replace(
                /[A-Z]{2,}/g,
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
    );
    engine.addFilter(
        'const',
        function (s) {
            s = pascalize(s);
            return s.toUpperCase();
        }
    );

    return engine;
};

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

    var engine = this.createTemplateEngine();

    u.each(
        files,
        function (templateFileName, filename) {
            fs.mkdirsSync(path.dirname(filename));

            var template = fs.readFileSync(templateFileName, 'utf8');
            var output = engine.compile(template)(templateData);
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
