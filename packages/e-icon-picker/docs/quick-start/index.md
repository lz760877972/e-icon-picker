# 安装

### npm安装

推荐使用 `npm` 的方式安装，它能更好地和 `webpack/vite` 打包工具配合使用。

```bash
npm install e-icon-picker@next -S
```

### cdn 引入

**因`element-plus`的更新，所以以前的图标不能正常使用，组件做了以下调整**

```html
<!-- 引入组件库 -->
<script src="https://unpkg.com/e-icon-picker@next"></script>

<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/e-icon-picker@next/index.css">

<!-- font-awesome图标样式 -->
<link rel="stylesheet" href="https://unpkg.com/font-awesome/css/font-awesome.min.css">

<!--单独引用element-plus图标组件 -->
<link rel="stylesheet" href="https://unpkg.com/@element-plus/icons-vue">

<!-- 默认彩色图标样式 -->
<script src="https://unpkg.com/e-icon-picker@next/icon/default-icon/symbol.js"></script>
```

## 快速使用

**因`element-plus`的更新，所以以前的图标不能正常使用，组件做了以下调整**
>
单独 [安装element-plus图标组件](https://element-plus.gitee.io/zh-CN/component/icon.html#%E4%BD%BF%E7%94%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8)

```js
import {createApp} from 'vue';
import App from './App.vue';
import eIconPicker from 'e-icon-picker';
import "e-icon-picker/icon/default-icon/symbol.js"; //基本彩色图标库
import 'e-icon-picker/index.css'; // 基本样式，包含基本图标
//font-awesome 图标库 单独安装 npm install font-awesome@4.7.0 -S
import 'font-awesome/css/font-awesome.min.css';

//element-plus图标官网现在已经通过组件式使用了
//不再是字体形式，所以使用时需要全局注册组件
//如果已经全局使用了element-plus组件，则element-plus会默认全部注册图标，不需要再去安装图标库注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; //element-plus 图标库
import eIconList from 'e-icon-picker/icon/default-icon/eIconList.js'

let app = createApp(App);

// 全局注册所以element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(eIconPicker, {
  addIconList: eIconList,//全局添加图标
  removeIconList: [],//全局删除图标
  zIndex: 3100//选择器弹层的最低层,全局配置
});

app.mount('#app');
```

## 使用

```html

<e-icon-picker v-model="icon"/>
```
