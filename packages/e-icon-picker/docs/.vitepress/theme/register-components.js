import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import eIconPicker from '../../../components/';

// import '../../../components/style.css';

export function registerComponents(app) {
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
  app.use(eIconPicker, {
    eIcon: true,//自带的图标，来自阿里妈妈
    zIndex: 3100
  })
}
