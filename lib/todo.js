var fs = require('fs');
var path = require('path');
var HIGHLIGHT_WORD = require('chalk').green('TODO:');

exports.description = '查找项目源码中的TODO标注';

exports.help = function () {
    console.log('参数：');
    console.log('  -c, --concurrency 同时打开的最大文件个数，此值过大可能导致查询失败，默认为10');
};

exports.parseCommand = function (argv) {
    return require('optimist')(argv)
        .alias('c', 'concurrency')
        .default('c', 10)
        .argv;
};

function print(result) {
    for (var i = 0; i < result.matches.length; i++) {
        var match = result.matches[i];
        console.log(
            path.relative(process.cwd(), result.file) + ':' + match.line + ':',
            match.content.replace(/TODO:/g, HIGHLIGHT_WORD)
        );
    }
}

function processAllFiles(options, files) {
    var results = [];
    var tasks = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileContext = { file: file };
        results.push(fileContext);
        tasks.push(createFileProcessor(fileContext));
    }

    require('async').parallelLimit(
        tasks,
        options.concurrency,
        function (err) {
            if (err) {
                logError(err);
                process.exit(1);
            }

            results
                .filter(function (item) { return !!item.matches.length; })
                .forEach(print);
        }
    );
}

function processSingleFile(file, callback) {
    var lineNumber = 0;
    var matches = [];
    try {
        var fileStream = fs.createReadStream(file);
        var stream = require('byline')(fileStream);
        stream.on(
            'data',
            function (line) {
                lineNumber++;
                if (line.indexOf('TODO:') >= 0) {
                    matches.push({ line: lineNumber, content: line });
                }
            }
        );
        fileStream.on('error', callback);
        stream.on('error', callback);
        stream.on('end', callback.bind(null, null, matches));
    }
    catch (ex) {
        callback(ex);
    }
}

function createFileProcessor(context) {
    return function (callback) {
        processSingleFile(
            context.file,
            function (err, matches) {
                if (err) {
                    callback(err);
                    return;
                }

                context.matches = matches;
                callback();
            }
        );
    };
}

function logError(err) {
    if (err.code === 'EMFILE') {
        console.error('查询过程中超过了最大打开文件数，可使用--concurrency调整并行度（默认为10）或等待文件系统空闲时重试');
    }
    else {
        console.error('查询TODO失败：' + err.message);
    }
}

exports.cli = function (args, context) {
    require('glob')(
        'src/**',
        {
            cwd: require('./util').findProjectDirectory(),
            dot: false
        },
        function (err, files) {
            if (err) {
                logError(err);
                process.exit(1);
            }

            require('async').filter(
                files,
                function (file, callback) {
                    fs.stat(
                        file,
                        function (err, stat) {
                            if (err) {
                                logError(err);
                                process.exit(1);
                            }
                            callback(stat.isFile());
                        }
                    );
                },
                processAllFiles.bind(null, context)
            );
        }
    );
};
