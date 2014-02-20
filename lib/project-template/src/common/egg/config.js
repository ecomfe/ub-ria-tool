/**
 * ${project.alias}
 * Copyright 2014 Baidu Inc. All rights reserved.
 * 
 * @ignore
 * @file 彩蛋命中概率配置
 * @author ${developer.name}(${developer.email})
 */
define(
    function (require) {
        // 返回一个数组，其中每一项都是一个彩蛋的配置，在配置中：
        //
        // - `{string} name`表示彩蛋对应的模块名，所有彩蛋都应该在`src/common/egg`下
        // - `{number} ratio`表示命中的概率，1表示100%命中
        return [
            {
                name: 'downloadLogo',
                ratio: 0
            }
        ];
    }
);
