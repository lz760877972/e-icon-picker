import Vue from 'vue'
import App from './App.vue'
import eIconPicker, {analyzingIconForIconfont, iconList} from 'e-icon-picker';
import 'e-icon-picker/dist/index.css';
import 'e-icon-picker/dist/main.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iconfont from "./css/iconfont.json";
import "./css/iconfont.css";


Vue.config.productionTip = false;
let forIconfont = analyzingIconForIconfont(iconfont);
//全局删除增加图标
Vue.use(eIconPicker, {FontAwesome: true, ElementUI: true, addIconList: forIconfont.list, removeIconList: []});

// iconList.addIcon(["el-icon-s-ticket", "el-icon-s-help", "el-icon-s-help"]);
iconList.removeIcon(["el-icon-s-ticket"]);


Vue.use(ElementUI);
new Vue({
    components: {},
    render: h => h(App),
}).$mount('#app');
