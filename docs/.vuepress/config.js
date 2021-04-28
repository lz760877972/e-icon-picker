module.exports = {
    title: 'e-icon-picker', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '一个基于 Vue 和 element-ui 组件库', // meta 中的描述文字，用于SEO
    plugins: ['demo-container'], // 引用的`vuepress-plugin-demo-container`插件
    port: "8081",
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', {rel: 'icon', href: '/img/favicon.ico'}],  //浏览器的标签栏的网页图标
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
    }
}
