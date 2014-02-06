var u = require('underscore');

exports.run = function () {
    var argv = require('optimist').argv;
    var args = argv['_'];
    var commandName = args.shift() || 'help';
    var context = u.omit(argv, '_', '$0');

    try {
        require('./' + commandName).cli(args, context);
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
