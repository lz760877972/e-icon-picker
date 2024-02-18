import { createApp } from 'vue'
import eIconPicker from 'e-icon-picker';
import 'e-icon-picker/index.css';
import 'e-icon-picker/theme/theme.css';
import App from './App.vue'
import eIconList from 'e-icon-picker/icon/default-icon/eIconList.js'
const app = createApp(App)

app.use(eIconPicker, {
    addIconList: eIconList,
    zIndex: 3100
})

app.mount('#app')
