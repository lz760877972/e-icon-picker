import Vue from 'vue'
import App from './App.vue'
import  iconPicker from  'e-icon-picker';
import 'e-icon-picker/dist/index.css';
import 'e-icon-picker/dist/main.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;


Vue.use(iconPicker,{FontAwesome: true, ElementUI: true, IconList: []});
Vue.use(ElementUI);
new Vue({
    render: h => h(App),
}).$mount('#app');
