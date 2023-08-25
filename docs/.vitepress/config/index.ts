// @ts-ignore
import {defineConfig} from 'vitepress'
import sidebar from './sidebar'
import nav from './nav'
import markdown from './markdown'
import head from "./head";
// import lang from './lang'
// @ts-ignore
import gitee from '../theme/assets/gitee.ts';

const config = defineConfig({
    title: 'e-icon-picker', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '一个基于 Vue 的图标组件库', // meta 中的描述文字，用于SEO
    // @ts-ignore
    head, // 注入到当前页面的 HTML <head> 中的标签
    markdown,
    lang: 'zh-CN', // 语言
    locales: {
        '/': {
            lang: 'zh-CN',
            label: '简体中文'
        },
        '/en-US': {
            lang: 'en-US',
            label: 'English'
        }
    },
    lastUpdated: true,
    themeConfig: {
        sidebar,
        nav,
        logo: '/img/logo.png',
        // // @ts-ignore
        // demoblock: lang,
        outline:{
            label: '本页目录',
        },
        lastUpdatedText: '最近更新时间',
        socialLinks: [
            {icon: {svg: gitee}, link: 'https://gitee.com/cnovel/e-icon-picker'},
            /* { icon: 'https://gitee.com/assets/favicon.ico', link: 'https://gitee.com/cnovel/e-icon-picker' }*/
        ],
        footer: {
            copyright: `MIT Licensed | Copyright © 2020-${new Date().getFullYear()} <a href="https://cnovel.club" target="_blank">cnovel.club</a>`
        },
        docFooter: {
            prev: "上一页",
            next: "下一页"
        },
    }
})

export default config
