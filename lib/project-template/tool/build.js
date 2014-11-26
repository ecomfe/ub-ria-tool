var path = require('path');
var argv = require('optimist').argv;

process.chdir(path.join(__dirname, '..'));
console.log('Switched to ' + process.cwd());

console.log('Started building');
var startTime = new Date();
var args = ['build', '.', '--revision=' + svnRevision];
// Windows下必须用`cmd /c edp build . --revision=xxx`这么来，直接执行报错，
// 使用`process.env.comspec`可以判断是否为Windows平台了
if (process.env.comspec) {
    args.unshift('edp');
    args.unshift('/c');
}
var build = require('child_process').spawn(
    process.env.comspec || 'edp',
    args.concat(process.argv.slice(2)),
    { stdio: 'inherit' }
);
build.on(
    'error',
    function (err) {
        console.log('Encountered error:', err);
        process.exit(1);
    }
);
build.on(
    'close', 
    function (err) {
        console.log('done within ' + (new Date() - startTime) + 'ms');
    }
);
svnInfo.stdout.on('data', function (data) { svnInfoOutput += data; });
