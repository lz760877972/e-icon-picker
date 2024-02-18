# e-icon 图标控件

## 使用方法

:::demo

```vue
<template>
  <e-icon icon-name="e-icon-xianxingbenzitubiao1" class-name="eiconfont font"/>
  <e-icon icon-name="e-icon-xianxingbenzitubiao2" class-name="eiconfont font"/>
  <e-icon icon-name="e-icon-xianxingdianzantubiao" class-name="eiconfont font"/>
</template>
<style lang="scss" scoped>
.font {
  font-size: 28px;
  margin-right: 10px;
}
</style>
```

:::

## 属性

| 参数        | 说明                        | 默认值  | 可选值  |
|-----------|---------------------------|------|------|
| iconName  | 	图标名称	                    | 空    | 	—   |
| className | 自定义的图标前缀，例如 fa fa-xxx中的fa | 空    | —    |

## 事件

| 事件名称  | 说明      | 回调参数  |
|-------|---------|-------|
| click | 点击图标时发生 |  图标名称 |

## 图标集合

> 以下图标均通过css样式进行爬取，属于最新版，但图标可能存在图标不显示问题，使用时请自行处理
使用方式通过`addIconList`参数添加或者`iconList.addIcon()`方法添加，使用前要引入对应的css文件或者对应的依赖。

例如：
```js
import el from "e-icon-picker/icon/ele/element-ui.js";//element-ui的图标
import eIconPicker, {iconList} from 'e-icon-picker';

let app = createApp(App);
//全局删除增加图标
app.use(eIconPicker, {
    addIconList: [...el],
    removeIconList: [],
    zIndex: 3100
});
或
iconList.addIcon(el);
```

对应的js列表：
```js
import el from "e-icon-picker/icon/ele/element-ui.js";//element-ui的图标
import elementPlus from "e-icon-picker/icon/ele/element-plus.js";//element-plus的图标
import fontAwesome470 from "e-icon-picker/icon/fontawesome/font-awesome.v4.7.0.js";//fontAwesome470的图标
import fontAwesome5 from "e-icon-picker/icon/fontawesome/fontawesome-5.js";//fontAwesome5.x.x的图标
import fontAwesome5shims from "e-icon-picker/icon/fontawesome/v4-shims-5.js"//fontAwesome5.x.x shims的图标
import fontAwesome5pro from "e-icon-picker/icon/fontawesome/fontawesome-pro-5.js"//fontAwesome5.x.x pro的图标
import all5 from "e-icon-picker/icon/fontawesome/all-5.js"//fontAwesome5.x.x all的图标
import all6 from "e-icon-picker/icon/fontawesome/all-6.js"//fontAwesome6.x.x all的图标
import brands6 from "e-icon-picker/icon/fontawesome/brands-6.js"//fontAwesome6.x.x brands的图标
import fontawesome6 from "e-icon-picker/icon/fontawesome/fontawesome-6.js"//fontAwesome6.x.x fontawesome的图标
import fontAwesome6shims from "e-icon-picker/icon/fontawesome/v4-shims-6.js"//fontAwesome6.x.x shims的图标
import antDesign from "e-icon-picker/icon/antd/antd.js";//antDesign 图标
import tdesign from "e-icon-picker/icon/tdesign/tdesign.js";//tdesign 图标
import arco from "e-icon-picker/icon/arco/arco.js";//arco.design 图标
import layui from "e-icon-picker/icon/layui-vue/layui-vue.js";//layui-vue图标
import academicons from "e-icon-picker/icon/iconify/academicons.js";//iconify:academicons图标 同名文件自行查看，或者去iconify官网查看
```
### 使用组件图标
#### 安装element-plus图标
```bash
npm install @element-plus/icons-vue
```

#### 安装ant-design图标
```bash
npm install @ant-design/icons-vue
```

#### 安装tdesign图标
```bash
npm install tdesign-icons-vue-next
```

#### 安装arco-design图标
```bash
npm install @arco-design/web-vue
```

#### 安装@layui/icons-vue图标
```bash
npm install @layui/icons-vue
```

####  安装@fortawesome图标
> 因为@fortawesome不是全部免费，所以需要自行解决安装。下面的也不是全部图标。
```bash
npm install --save @fortawesome/fontawesome-svg-core 
npm install --save @fortawesome/free-solid-svg-icons 
```

#### 注册使用
```vue
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as antDesign from '@ant-design/icons-vue'
import * as tdesign from 'tdesign-icons-vue-next/esm/icons.js'
import ArcoVueIcon from '@arco-design/web-vue/lib/icon';
import * as layui from '@layui/icons-vue';
import '@layui/icons-vue/lib/index.css';//layui-vue需要引入css

/* 注册图标时，可能有同名的图标，所以需要添加一些前缀来区分
   使用时需要对图标数据进行处理
   import {addPrefix} from "e-icon-picker"
   state.dataList = elementPlus.map((item) => {
        return addPrefix("ele-", item);
   })
*/
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`ele-${key}`, component)
}
for (const [key, component] of Object.entries(antDesign)) {
    app.component(`antd-${key}`, component)
}
for (const [key, component] of Object.entries(tdesign)) {
    app.component(`td-${key}`, component)
}
for (const [key, component] of Object.entries(ArcoVueIcon)) {
    app.component(`arco-${key}`, component)
}
for (const [key, component] of Object.entries(layui)) {
    if (key !== 'LayIconList') {
        app.component(`layui-${key}`, component)
    }
}
```

### eIcon 默认图标

<iconList type="eIcon"/>

### eIcon Symbol 图标集

<iconList type="eIconSymbol"/>

### fontAwesome 4.7 整理后的图标集

<iconList type="fontAwesomeV470"/>

### element-ui 整理后的图标集

<iconList type="ele"/>

### element-plus 整理后的图标集

<iconList type="elementPlus"/>

### fontawesome 6.x 图标集

<iconList type="fontawesome"/>

### antDesign 图标集

<iconList type="antDesign"/>

### tdesign 图标集

<iconList type="tdesign"/>

### ArcoVueIcon 图标集

<iconList type="arco"/>

### layui-vue 图标集

<iconList type="layui"/>

### iconify:brandico 图标集

<iconList type="brandico"/>
