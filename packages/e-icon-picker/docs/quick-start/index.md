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

<!--单独引用element-plus图标组件 -->
<link rel="stylesheet" href="https://unpkg.com/@element-plus/icons-vue">

<!-- 默认彩色图标样式 -->
<script src="https://unpkg.com/e-icon-picker@next/lib/symbol.js"></script>
```

## 快速使用

**因element-plus的更新，所以以前的图标不能正常使用，组件做了以下调整**
> 单独 [安装element-plus图标组件](https://element-plus.gitee.io/zh-CN/component/icon.html#%E4%BD%BF%E7%94%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8)
```js
import {createApp} from 'vue';
import App from './App.vue';
import eIconPicker from 'e-icon-picker';
import "e-icon-picker/lib/symbol.js"; //基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库

<!-- element-plus图标官网现在已经通过组件式使用了，不再是字体形式，所以使用时需要全局注册组件 -->
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; //element-plus 图标库
import eIconList from 'e-icon-picker/lib/icon/default-icon/eIconList'

let app = createApp(App);
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
