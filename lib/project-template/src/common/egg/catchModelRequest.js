/**
 * SSP for WEB
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @author otakustay
 */
define(
    function (require) {
        function getFunctionName(fn) {
            try {
                return fn.name || /function\s+([^\(]*)/.exec(fn.toString())[1];
            }
            catch (ex) {
                return 'anonymous';
            }
        }

        var BaseModel = require('ub-ria/mvc/BaseModel');
        var request = BaseModel.prototype.request;
        BaseModel.prototype.request = function hijack() {
            var data = {
                from: '2.0',
                type: 'unexpectedModelRequest',
                model: getFunctionName(this.constructor),
                method: getFunctionName(hijack.caller)
            };
            require('er/ajax').log('http://adm.baidu.com/gen_204', data);
            return request.apply(this, arguments);
        };
    }
);
