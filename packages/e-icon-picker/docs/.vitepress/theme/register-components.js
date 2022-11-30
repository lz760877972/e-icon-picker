import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
import eIconPicker from '@e-icon-picker/lib/';
// import eIconPicker from '@e-icon-picker/components/';
import '@e-icon-picker/lib/index.css';
import eIconList from '@e-icon-picker/lib/icon/default-icon/eIconList'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import iconList from "@e-icon-picker/docs/components/iconList.vue";
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
  app.use(eIconPicker, {
    addIconList: eIconList,
    zIndex: 3100
  })

  app.mixin({
    mounted() {
      import('@e-icon-picker/lib/icon/default-icon/symbol.js')
      import('virtual:svg-icons-register')
      import('@public/js/iconfont.js')
    },
  })
}
