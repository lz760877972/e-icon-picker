const path = require('path')
module.exports = {
    base:'/',
    title: 'e-icon-picker', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '一个基于 Vue 和 element-ui 组件库', // meta 中的描述文字，用于SEO
    plugins: ['demo-container','@vuepress-reco/extract-code'], // 引用的`vuepress-plugin-demo-container`插件
    port: "8081",
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', {rel: 'icon', href: '/img/favicon.ico'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://unpkg.zhimg.com/e-icon-picker@1.0.19/dist/index.css'}],
        ['link', {rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/icon.css'}],
        ['link', {rel: 'stylesheet', href: 'https://unpkg.zhimg.com/font-awesome/css/font-awesome.min.css'}],
        ['link', {rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.min.css'}],
        ['link', {rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css'}],
        ['link', {rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/v4-shims.min.css'}],
        ['link', {rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.15.3/css/all.css'}],
        ['link', {rel: 'stylesheet', href: '/css/iconfont.css'}],
        ['script', {type: 'text/javascript', src: 'https://unpkg.zhimg.com/e-icon-picker@1.0.19/dist/symbol.js'}],
    ],
    markdown: {
        lineNumbers: true
    },
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Demo Container',
            description: '用于编写 vue 组件示例的 vuepress 插件'
        },
        '/v2/': {
            lang: 'zh-CN',
            title: 'Demo Container',
            description: '用于编写 vue 组件示例的 vuepress 插件'
        }
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/img/favicon.ico',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: require("./nav.js"),
        locales: {
            '/': {
                label: 'v1',
                selectText: '版本',
                sidebar: {
                    '/': require("./sidebarV1.js"),
                }
            },
            '/v2/': {
                label: 'v2',
                selectText: '版本',
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
    }
}
