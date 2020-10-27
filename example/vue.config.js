const path = require('path');

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

// 生产环境是否需要使用cdn
const prodNeedCdn = true;
// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        'vue': 'Vue',
        'e-icon-picker': 'eIconPicker',
    },
    // cdn的css链接
    css: [
        'https://unpkg.com/e-icon-picker/dist/index.css',
        'https://unpkg.com/font-awesome/css/font-awesome.min.css',
        'https://unpkg.com/element-ui/lib/theme-chalk/icon.css'
    ],
    // cdn的js链接
    js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        'https://unpkg.com/e-icon-picker/dist/index.js',
    ]
};

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    //vue 中文配置文档地址
    //https://cli.vuejs.org/zh/config/#css-loaderoptions
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    configureWebpack(config) {
        // 生产环境相关配置
        if (isProduction) {
            // 用cdn方式引入，则构建时要忽略相关资源
            if (isProduction && prodNeedCdn) config.externals = cdn.externals;
        }
        // config.resolve = {
        //     alias: {
        //         '@': resolve('src')
        //     }
        // }
    },
    chainWebpack(config) {
        // ============注入cdn start============
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction && prodNeedCdn) args[0].cdn = cdn;
            return args
        });
        // ============注入cdn start============
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
            .end()
    }
};
