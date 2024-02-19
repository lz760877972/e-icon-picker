import {defineConfig} from 'vitepress'
import sidebar from './sidebar'
import nav from './nav'
import markdown from './markdown'
import head from "./head";
import gitee from '../theme/assets/gitee';
import {demoblockVitePlugin} from "vitepress-theme-demoblock";
import {zhConfig} from "./zhConfig";

const config = defineConfig({
    title: 'e-icon-picker', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    lang: 'zh',
    description: '一个基于 Vue 的图标组件库', // meta 中的描述文字，用于SEO
    head, // 注入到当前页面的 HTML <head> 中的标签
    markdown,
    vite: {
        plugins: [demoblockVitePlugin()]
    },
    locales: {
        root: {
            lang: 'zh',
            label: '简体中文',
            ...zhConfig
        }
    },
    lastUpdated: true,
    themeConfig: {
        sidebar,
        nav,
        logo: '/img/logo.png',
        i18nRouting: false,
        socialLinks: [
            {icon: {svg: gitee}, link: 'https://gitee.com/cnovel/e-icon-picker'},
        ],
        footer: {
            message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
            copyright: `Copyright © 2020-present <a href="https://cnovel.top" target="_blank">cnovel.top</a>`
        }
    }
})

export default config
