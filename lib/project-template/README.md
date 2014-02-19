# ${project.name}

## 调试服务器

调试服务器是代替以前nginx进行前端开发的工具，用于在本地架设一个代理，使得动态请求落到后端的开发机上，静态资源则使用本地文件响应。

### 调试服务器配置

由于调试服务器的配置每个人都会不同，因此不加入到SVN中，调试服务器的配置文件必须放在根目录下，文件名为`edp-webserver-config.js`。

以下为一个典型的配置文件，可直接参考：

    var proxyTarget = 'PROXY_TARGET_SERVER_NAME';
    var proxyTargetPort = 8280;

    exports.port = 8280;
    exports.directoryIndexes = true;
    exports.documentRoot = __dirname;
    exports.getLocations = function () {
        return [
            { 
                location: '/', 
                handler: home('index-debug.html')
            },
            { 
                location: /\.css$/,
                handler: [
                    autoless()
                ]
            },
            { 
                location: /\.less$/, 
                handler: [
                    file(),
                    less()
                ]
            },
            {
                location: /[^=](\.js|\.html|\.htm|\.png|\.gif|\.jpg|\.map|\.csv)(\?.*)?$/,
                handler: [
                    file()
                ]
            },
            { 
                location: /^.*$/, 
                handler: [
                    proxy(proxyTarget, proxyTargetPort)
                ]
            }
        ];
    };

    exports.injectResource = function ( res ) {
        for ( var key in res ) {
            global[ key ] = res[ key ];
        }
    };


可修改`proxyTarget`和`proxyTargetPort`变量来代理不同的后端机器。通过注释`modules`中包含的模块以及对应的`exclude`等配置，可以选择性启用/禁用某些子模块的本地响应。

### 使用调试服务器

在**根目录下**执行以下命令启动服务器：

    edp webserver start .

## 构建系统

在构建系统前，如果存在`output`目录，则要先删除该目录，否则构建会失败。

执行`node tool/build.js`即可构建系统。

构建完成后，会产生一个`output`目录，其中为构建的所有内容。
