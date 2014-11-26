var fs = require('fs');
var path = require('path');

var moduleConfigFile = path.resolve(__dirname, '..', 'module.conf');

exports.getBizNamespaces = function () {
    var src = path.resolve(__dirname, '..', 'src');
    var namespaces = fs.readdirSync(src)
        .filter(function (file) { return fs.statSync(path.join(src, file)).isDirectory(); });
    return namespaces;
};

exports.getSVNRevision = function (callback) {
    var svnInfoOutput = '';
    var svnInfo = require('child_process').exec(
        'svn info',
        function (err) {
            if (err) {
                callback(null);
                return;
            }
            var matches = /Revision: (\d+)/.exec(svnInfoOutput);
            var svnRevision = matches && matches[1];
            callback(svnRevision);
            return;
        }
    );
    svnInfo.stdout.on('data', function (data) { svnInfoOutput += data; });
};
