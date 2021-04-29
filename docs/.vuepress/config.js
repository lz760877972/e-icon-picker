const path = require('path')
module.exports = {
    title: 'e-icon-picker', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '一个基于 Vue 和 element-ui 组件库', // meta 中的描述文字，用于SEO
    plugins: ['demo-container','@vuepress-reco/extract-code'], // 引用的`vuepress-plugin-demo-container`插件
    port: "8081",
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', {rel: 'icon', href: '/img/favicon.ico'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://unpkg.zhimg.com/e-icon-picker@1.0.19/dist/index.css'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/icon.css'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://unpkg.zhimg.com/font-awesome/css/font-awesome.min.css'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.min.css'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/v4-shims.min.css'}],  //浏览器的标签栏的网页图标
        ['link', {rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.15.3/css/all.css'}],  //浏览器的标签栏的网页图标
        ['script', {type: 'text/javascript', src: 'https://unpkg.zhimg.com/e-icon-picker@1.0.19/dist/symbol.js'}],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/img/favicon.ico',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: require("./nav.js"),
        sidebar: require("./sidebar.js"),
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
