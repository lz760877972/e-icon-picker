const path = require('path')
module.exports = {
    base: '/',
    title: 'e-icon-picker', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '一个基于 Vue 和 element-ui 组件库', // meta 中的描述文字，用于SEO
    plugins: ['demo-container', '@vuepress-reco/extract-code'], // 引用的`vuepress-plugin-demo-container`插件
    port: "8081",
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', {rel: 'icon', href: '/img/favicon.ico'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://unpkg.zhimg.com/e-icon-picker@1.1.0-alpha.0/lib/index.css'}],
        ['link', {rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/icon.css'}],
        ['link', {rel: 'stylesheet', href: 'https://unpkg.zhimg.com/font-awesome/css/font-awesome.min.css'}],
        ['link', {rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.min.css'}],
        ['link', {
            rel: 'stylesheet',
            href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css'
        }],
        ['link', {
            rel: 'stylesheet',
            href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/v4-shims.min.css'
        }],
        ['link', {rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.15.3/css/all.css'}],
        ['link', {rel: 'stylesheet', href: '/css/iconfont.css'}],
        ['script', {type: 'text/javascript', src: 'https://unpkg.zhimg.com/e-icon-picker@1.1.0-alpha.0/lib/symbol.js'}],
    ],
    markdown: {
        lineNumbers: true
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        },
        '/v2/': {
            lang: 'en-US'
        }
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/img/favicon.ico',
        lastUpdated: '上次更新', // string | boolean
        nav: require("./nav.js"),
        locales: {
            '/': {
                label: 'v1',
                selectText: '版本',
                lastUpdated: '上次更新',
                sidebar: {
                    '/': require("./sidebarV1.js"),
                }
            },
            '/v2/': {
                label: 'v2',
                selectText: '版本',
                lastUpdated: '上次更新',
                sidebar: {
                    '/v2/': require("./sidebarV2.js"),
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@src': path.resolve(__dirname, '../../src'),
                '@lib': path.resolve(__dirname, '../../lib'),
                '@public': path.resolve(__dirname, './public')
            }
        }
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('../../example/src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('../../example/src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]',
                // extract: true,
                // publicPath:'/static/',
                // spriteFilename: 'sprite-[hash:6].svg',
                // outputPath: "/static/img/"
            })
            .end().use('svgo-loader').loader('svgo-loader')
            .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end();
    }
}

function resolve(dir) {
    return path.join(__dirname, dir)
}
