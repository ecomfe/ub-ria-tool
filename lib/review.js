var fs = require('fs');
var path = require('path');

var UPLOAD_PYTHON_URL = 'http://cooder.baidu.com/dynamic/upload.py';
var CODE_REVIEW_SHELL_PATH = path.join(__dirname, '..', 'bin', 'upload.py');

function downloadReviewShell(callback) {
    var file = require('fs').createWriteStream(CODE_REVIEW_SHELL_PATH);
    require('http').get(
        UPLOAD_PYTHON_URL,
        function (response) {
            response.pipe(file);

            response.on(
                'end',
                function () {
                    console.log('upload.py下载完毕');
                    callback && callback();
                }
            );
        }
    );
}

function createCodeReview(context) {
    var args = [
        CODE_REVIEW_SHELL_PATH,
        '-r ' + require('./util').getProjectInfo().developers.join(','),
        context.i ? '-i ' + context.i : ''
    ];
    console.log('执行命令: ' + 'python ' + args.join(' '));
    console.log('如提示upload.py版本过旧，请运行ria review --update更新');
    var review = require('child_process').spawn(
        'python',
        args,
        {
            stdio: 'inherit'
        }
    );
    review.on('close', function () { console.log('已完成Code Review创建，请查看python的输出以确认结果'); });
}


exports.cli = function (args, context) {
    if (context.update) {
        downloadReviewShell();
        return;
    }

    if (!fs.existsSync(CODE_REVIEW_SHELL_PATH)) {
        console.log('未找到upload.py，正在下载');
        downloadReviewShell(createCodeReview.bind(null, context));
    }
    else {
        createCodeReview(context);
    }
};
