import Vue from 'vue'
import App from './App.vue'

import "e-icon-picker/lib/symbol.js"; //基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库
import iconfont from "./css/iconfont.json"; //自己的图标信息
import "./css/iconfont.css"; //自己的图标样式
import eIconPicker, {analyzingIconForIconfont, iconList} from 'e-icon-picker';
import svgIcons from 'e-icon-picker/lib/getSvg';

let forIconfont = analyzingIconForIconfont(iconfont);
//全局删除增加图标
Vue.use(eIconPicker, {
    FontAwesome: true,
    ElementUI: true,
    eIcon: true,//自带的图标，来自阿里妈妈
    eIconSymbol: true,//是否开启彩色图标
    addIconList: forIconfont.list,
    removeIconList: []
});

iconList.addIcon(svgIcons);
iconList.removeIcon(["el-icon-s-ticket"]);

Vue.config.productionTip = false;
new Vue({
    components: {},
    render: h => h(App),
}).$mount('#app');
