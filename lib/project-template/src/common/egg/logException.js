/**
 * SSP for WEB
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 监控异常
 * @author zhanglili(otakustay@gmail.com)
 */
define(
    function (require) {
        if (window.DEBUG) {
            return;
        }

        require('er/Deferred').on(
            'exception',
            function (e) {
                var data = {
                    from: '2.0',
                    type: 'exception',
                    reason: e.reason.toString(),
                    url: location.hash.replace(/^#/, '')
                };
                require('er/ajax').log('http://adm.baidu.com/gen_204', data);
            }
        );
    }
);
