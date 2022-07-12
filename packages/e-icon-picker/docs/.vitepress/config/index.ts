import {defineConfig} from 'vitepress'
import sidebar from './sidebar'
import nav from './nav'
import markdown from './markdown'
import head from "./head";
import lang from './lang'

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
    themeConfig: {
        sidebar,
        nav,
        logo: '/img/logo.png',
        // @ts-ignore
        demoblock: lang,
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
        socialLinks: [
            {icon: 'github', link: 'https://gitee.com/cnovel/e-icon-picker'},
            /* { icon: 'https://gitee.com/assets/favicon.ico', link: 'https://gitee.com/cnovel/e-icon-picker' }*/
        ]
    }
})

export default config
