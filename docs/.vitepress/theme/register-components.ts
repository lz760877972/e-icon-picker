import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
import eIconPicker from 'e-icon-picker';
import 'e-icon-picker/index.css';
import eIconList from 'e-icon-picker/icon/default-icon/eIconList'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as antDesign from '@ant-design/icons-vue'
import * as tdesign from 'tdesign-icons-vue-next/lib/icons.js'
import ArcoVueIcon from '@arco-design/web-vue/lib/icon';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import iconList from "@docs/components/iconList.vue";
import "../theme/styles/index.scss"

export function registerComponents(ctx) {
    const {app} = ctx
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
    app.component('iconList', iconList)
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    for (const [key, component] of Object.entries(antDesign)) {
        app.component(key, component)
    }
    for (const [key, component] of Object.entries(tdesign)) {
        app.component(key, component)
    }
    for (const [key, component] of Object.entries(ArcoVueIcon)) {
        app.component(key, component)
    }
    app.use(eIconPicker, {
        addIconList: eIconList,
        zIndex: 3100
    })

    app.mixin({
        mounted() {
            import('e-icon-picker/icon/default-icon/symbol.js')
            // @ts-ignore
            import('virtual:svg-icons-register')
            // @ts-ignore
            import('@public/js/iconfont.js')
        },
    })
}
