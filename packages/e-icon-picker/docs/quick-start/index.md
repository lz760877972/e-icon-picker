# 安装
### npm安装

推荐使用 npm 的方式安装，它能更好地和 webpack/vite 打包工具配合使用。
```bash
npm install e-icon-picker@next -S
```

### cdn 引入

**因element-plus的更新，所以以前的图标不能正常使用，组件做了以下调整**

```html
<!-- 引入组件库 -->
<script src="https://unpkg.com/e-icon-picker@next"></script>

<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/e-icon-picker@next/lib/index.css">

<!-- font-awesome图标样式 -->
<link rel="stylesheet" href="https://unpkg.zhimg.com/font-awesome/css/font-awesome.min.css">

<!-- element-plus图标样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-plus@1.0.2-beta.42/lib/theme-chalk/el-icon.css">

<!-- 默认彩色图标样式 -->
<script src="https://unpkg.com/e-icon-picker@next/lib/symbol.js"></script>
```

## 快速使用

**因element-plus的更新，所以以前的图标不能正常使用，组件做了以下调整**
```js
import {createApp} from 'vue';
import App from './App.vue';
import eIconPicker from 'e-icon-picker';
import "e-icon-picker/lib/symbol.js"; //基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'e-icon-picker/lib/ele/icon.css'; //element-plus 图标库

let app = createApp(App);
app.use(eIconPicker, {
    FontAwesome: true,
    ElementUI: true,
    eIcon: true,//自带的图标，来自阿里妈妈
    eIconSymbol: true,//是否开启彩色图标
    addIconList: [],
    removeIconList: [],
    zIndex: 3100//选择器弹层的最低层,全局配置
});

app.mount('#app');
```

## 使用

```html
 <e-icon-picker v-model="icon"/>
```
