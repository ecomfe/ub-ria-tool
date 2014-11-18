exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
exports.getLocations = function () {
    return [
        {
            location: /\/$/,
            handler: home( 'index-debug.html' )
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss()
            ]
        },
        {
            location: /\.less($|\?)/,
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
            name: 'user',
            location: '/user',
            handler: [
                file('mockup/login/user.json')
            ]
        },
        {
            name: 'system',
            location: '/system',
            handler: [
                file('mockup/login/system.json')
            ]
        },
        {
            name: 'pageSize',
            location: '/api/js/users/current/pageSize',
            handler: [
                empty()
            ]
        },

        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
