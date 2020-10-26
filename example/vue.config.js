const path = require('path');

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    //vue 中文配置文档地址
    //https://cli.vuejs.org/zh/config/#css-loaderoptions
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
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
