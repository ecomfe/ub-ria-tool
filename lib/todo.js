var fs = require('fs');
var path = require('path');
var HIGHLIGHT_WORD = require('chalk').green('TODO:');
var DEFAULT_CONCURRENCY_LEVEL = 10;

exports.description = '查找项目源码中的TODO标注';

exports.help = function () {
    console.log('参数：');
    console.log('    --concurrency=value 同时打开的最大文件个数，此值过大可能导致查询失败');
}

function processSingleFile(file, callback) {
    var lineNumber = 0;
    var matches = [];
    try {
        var stream = require('byline')(fs.createReadStream(file));
        stream.on('error', callback);
        stream.on(
            'data',
            function (line) {
                lineNumber++;
                if (line.indexOf('TODO:') >= 0) {
                    matches.push({ line: lineNumber, content: line });
                }
            }
        );
        stream.on('end', callback.bind(null, null, matches));
    }
    catch (ex) {
        console.log('ex');
        callback(ex);
    }
}

function findInPath(target, results, options, callback) {
    // 无视.svn文件夹
    if (path.basename(target) === '.svn') {
        callback();
        return;
    }

    var stat = fs.statSync(target);
    if (stat.isDirectory()) {
        try {
            var files = fs.readdirSync(target)
                .map(function (file) { return path.resolve(target, file); });
            require('async').eachLimit(
                files,
                options.concurrency || DEFAULT_CONCURRENCY_LEVEL,
                function (file, callback) {
                    findInPath(file, results, options, callback);
                },
                callback
            );
        }
        catch (ex) {
            callback(ex);
        }
    }
    else if (stat.isFile()) {
        var context = { file: target };
        results.push(context);
        processSingleFile(
            target,
            function (err, matches) {
                if (err) {
                    console.log('ex');
                    callback(err);
                    return;
                }

                context.matches = matches;
                callback();
            }
        );
    }
}

function print(result) {
    for (var i = 0; i < result.matches.length; i++) {
        var match = result.matches[i];
        console.log(
            path.relative(process.cwd(), result.file) + ':' + match.line + ':',
            match.content.replace(/TODO:/g, HIGHLIGHT_WORD)
        );
    }
}

exports.cli = function (args, context) {
    var results = [];
    findInPath(
        path.resolve(require('./util').findProjectDirectory(), 'src'),
        results,
        context,
        function (err) {
            if (err) {
                if (err.code === 'EMFILE') {
                    console.error('查询过程中超过了最大打开文件数，可使用--concurrency调整并行度（默认为10）或等待文件系统空闲时重试');
                }
                else {
                    console.error('查询TODO失败：' + err.message);
                }
                return;
            }

            results
                .filter(function (item) { return !!item.matches.length; })
                .forEach(print);
        }
    );
};
