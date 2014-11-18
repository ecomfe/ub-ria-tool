/**
 * SSP for WEB
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file underscore扩展
 * @author zhanglili(otakustay@gmail.com)
 */
define(
    function (require) {
        var u = require('underscore');
        var moment = require('moment');
        require('moment/lang/zh-cn');

        function enable() {
            moment.lang('zh-cn');

            // 将框架的工具方法集中起来
            u.extend(u, require('ub-ria/util'));

            /**
             * 以正则表达式的规则编码一个字符串
             *
             * @param {string} s 字符串
             * @return {string}
             */
            u.escapeForRegExp = function (s) {
                return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            };

            /**
             * hex色值转换成rgba色值
             * @param {string} hex hex色值
             * @param {float} alpha 透明度
             * @return {string} rgba色值
             */
            u.colorRGB = function (hex, alpha) {
                alpha = alpha || 1;
                hex = hex.toLowerCase();
                var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                if (hex && reg.test(hex)) {
                    // 可能是形如“#FFF”的3位hex值，需要转成6位的
                    if (hex.length === 4) {
                        var fullHex = '#';
                        for (var i = 1; i < 4; i++) {
                            var hexBit = fullHex.slice(i, i + 1);
                            fullHex += hexBit + hexBit;
                        }
                        hex = fullHex;
                    }
                    var rgb = [];
                    for (var i = 1; i < 7; i += 2) {
                        rgb.push(parseInt('0x' + hex.slice(i, i + 2), 16));
                    }
                    return 'rgba(' + rgb.join(',') + ',' + alpha + ')';
                }
                else {
                    return hex;
                }
            };

            /**
             * 解析日期范围数组
             *
             * @param {string[]} array 日期范围组
             * @return {string[][]}
             */
            u.parseDateRanges = function (array) {
                if (!array) {
                    throw new Error('No date ranges given');
                }
                // 数组必须是偶数项
                if (array.length % 2 !== 0) {
                    throw new Error('Invalid date range length');
                }

                var stop = array.length / 2;
                var result = [];
                for (var i = 0; i < stop; i++) {
                    result.push([array[i * 2], array[i * 2 + 1]]);
                }

                return result;
            };

            /**
             * 字符串省略显示
             *
             * @param {string} str 目标字符串
             * @param {number} len 目标长度
             * @return {string} 截断后字符串
             */
            u.ellipsis = function (str, len) {
                // length属性读出来的汉字长度为1
                if (str.length * 2 <= len) {
                    return str;
                }
                var strlen = 0;
                var s = '';
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 128) {
                        strlen = strlen + 2;
                        if (strlen > len) {
                            return s.substring(0, s.length - 1) + '...';
                        }
                    }
                    else {
                        strlen = strlen + 1;
                        if (strlen > len) {
                            return s.substring(0, s.length - 2) + '...';
                        }
                    }
                    s = s + str.charAt(i);
                }
                return s;
            };
        }

        return {
            enable: u.once(enable)
        };
    }
);
