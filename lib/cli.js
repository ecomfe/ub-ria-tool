var u = require('underscore');

exports.run = function () {
    var commandName = process.argv[2] || 'help';

    try {
        var module = require('./' + commandName);

        if (typeof module.cli !== 'function') {
            console.error('无效命令' + (commandName || ''));
            process.exit(1);
        }

        var argv = typeof module.parseCommand === 'function'
            ? module.parseCommand(process.argv)
            : require('optimist').argv;
        var args = argv['_'].slice(1);
        var context = u.omit(argv, '_', '$0');
        module.cli(args, context);
    }
    catch (ex) {
        if (ex.code === 'MODULE_NOT_FOUND') {
            console.error('未知命令' + (commandName || '') + '，使用ria help查看帮助');
        }
        else {
            throw ex;
        }
    }
};

process.on('uncaughtException', function () {});
