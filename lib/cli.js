var u = require('underscore');

var argv = require('optimist').argv;
var args = argv['_'];
var commandName = args.shift();
var context = u.omit(argv, '_', '$0');
require('./' + commandName).cli(args, context);
