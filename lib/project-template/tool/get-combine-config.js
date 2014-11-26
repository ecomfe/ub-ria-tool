/**
 * tool/get-combine-config.js
 * @author ${developer.name}(${developer.email})
 **/
var getBizNamespaces = require('./util').getBizNamespaces;

function negative(array) {
    return array.map(
        function(item) {
            return '!' + item;
        }
    );
}

function expand(array) {
    var result = [];
    array.forEach(
        function(item) {
            result.push(item, item + '/**');
        }
    );
    return result;
}

function generateModuleCombineConfig() {
    var dependencies = [
        'eoo', 'uioc', 'er', 'ef', 'ub-ria', 'er-track', 'etpl', 'saber-cookie',
        'esui', 'echarts', 'zrender', 'mini-event', 'underscore', 'moment'
    ];

    // esl的延迟执行`factory`只是解决类似`extension`这种没有显式`require`进行依赖的模块，在业务系统上能保证加载顺序的情况，
    // 但并不代表esl会不主动去加载所需的依赖，如果一个打包脚本中有一些信赖的模块没打包进来，是会重新去加载单个模块文件的
    //
    // 解决这个问题需要多个条件：
    //
    // 1. 合并模块的启动脚本里一定包含依赖模块，但可能多个启动脚本依赖同一个模块，而启动脚本的加载顺序未定，因此需要重复打包
    // 2. 为了解决上一条的问题，使用HTML的`<script>`标签来加载启动脚本，保证顺序，这样可以将通用依赖模块只放在一个启动脚本中
    //
    // 如果esl支持类似`noRequest`的配置，也可以不使用`<script>`标签，但是几乎没有啥收益

    // 先来梳理下依赖关系，`echarts`、`saber-cookie`等相对独立所以不用列进来，处理了间接依赖以便看着清楚些
    //
    // |        | eoo | uioc | etpl | mini-event | underscore | moment | er | esui | ef | ub-ria |
    // | er     |     |      | ✓    | ✓          |            |        |    |      |    |        |
    // | esui   |     |      | ✓    | ✓          | ✓          | ✓      |    |      |    |        |
    // | ef     |     |      | ✓    | ✓          | ✓          | ✓      | ✓  | ✓    |    |        |
    // | ub-ria | ✓   |      | ✓    | ✓          | ✓          | ✓      | ✓  | ✓    | ✓  |        |
    // | common | ✓   | ✓    | ✓    | ✓          | ✓          | ✓      | ✓  | ✓    | ✓  | ✓      |
    //
    // 基本是阶梯式地增长，但如果把它们放在一个启动脚本里就实在太大了，肯定要拆成多个方向。
    //
    // 从上表再结合实际各库的大小来看，以各个包大小差距尽可能小为目标，比较合理的方案可能是这么来：
    //
    // 1. `esui`和`echarts`分别单独一个包，实在太大了
    // 2. 业务上的所有东西，再加上`er`、`ub-ria`和`ef`这一类的东西，合成一个包，大小和一个单独的`esui`差不多大
    //
    // 根据日后代码的变化，可能产生的合并策略的变更：
    //
    // - 当需要打包的业务模块变大时，额外增加`biz`模块来放业务模块，`ria`仅包含基础库
    // - 如果业务模块大小超过`esui`的大小，考虑把业务控件也放进`ui`中
    //
    // 上帝保佑你理得清这里的逻辑- -|||

    // 基础库包
    var basePackages = [
        '~eoo', '~uioc', '~etpl', '~mini-event', '~underscore', 'moment', 'moment/moment', '~er'
    ];

    // 图标库包
    var chartPackages = [
        '~zrender', '~echarts'
    ];

    // esui很大，所以单独一个包
    var uiPackages = [
        '~esui'
    ];

    // RIA体系下的基础库包
    var riaPackages = [
        '~ub-ria', '~er-track', '~er', '~ef'
    ];

    // 业务模块包
    var bizPackages = [
        // 基础类
        '~common', '~ui', '**/ui/**', '~error'
        // TODO: 核心业务模块，周边的模块按需加载
    ];

    // 3个启动脚本
    var config = {
        'startup/echarts': {
            files: [
                'echarts',
                // TODO: 建议这里按需要引入echarts模块，避免文件太大，例如下面几个是常用到的
                'echarts/componet/dataRange',
                'echarts/chart/line', 'echarts/chart/map', 'echarts/chart/pie'
            ]
        },
        'startup/ui': {
            files: [
                uiPackages,

                // 系统UI用到了这个组件，所以要一起加载进来
                'moment/lang/zh-cn',

                // 有些东西要不得，废弃的控件
                '!esui/Sidebar', '!esui/customShim',

                // 排除干扰
                negative(basePackages),
                negative(chartPackages)
            ]
        },
        'startup/ria': {
            files: [
                // 包含RIA方向基础库
                basePackages, riaPackages, '~common/extension',

                // 不包含上面`ui`已经有了的库，主要是`esui`的依赖库
                negative(chartPackages), negative(uiPackages)
            ]
        },
        'startup/biz': {
            files: [
                // 业务模块
                bizPackages,
                // 不要test代码，等edp修了这BUG能删
                '!test/**',
                // 加载彩蛋配置，但不把彩蛋打包在一起
                '!common/egg/**', 'common/egg/config',

                negative(basePackages),
                negative(chartPackages),
                negative(uiPackages) // 排除所有第三方库
            ]
        }
    };

    var bizNamespaces = getBizNamespaces();
    bizNamespaces.forEach(function (bizNamespace) {
        var exclude = [
            '!common/**',
            '!**/ui/**',
            negative(expand(dependencies))
        ];
        // 通用
        config[bizNamespace + '/List'] = {files: exclude};
        config[bizNamespace + '/Form'] = {files: exclude};
        config[bizNamespace + '/Read'] = {files: exclude};
    });

    return config;
}

module.exports = generateModuleCombineConfig;

if (require.main === module) {
    console.log(JSON.stringify(generateModuleCombineConfig(), null, 2));
}
