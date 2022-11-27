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
import el from "e-icon-picker/lib/icon/ele/element-ui-2.15.12.js";//element-ui的图标
import eIconPicker, {iconList} from 'e-icon-picker';


//全局删除增加图标
Vue.use(eIconPicker, {
    addIconList: [...el],
    removeIconList: [],
    zIndex: 3100
});
或
iconList.addIcon(el);
```

对应的js列表：
```js
import el from "e-icon-picker/lib/icon/ele/element-ui-2.15.12.js";//element-ui的图标
import fontAwesome470 from "e-icon-picker/lib/icon/fontawesome/font-awesome.v4.7.0.js";//fontAwesome470的图标
// import fontAwesome5 from "e-icon-picker/lib/icon/fontawesome/fontawesome-5.15.4.data";//fontAwesome5.x.x的图标
// import fontAwesome5shims from "e-icon-picker/lib/icon/fontawesome/v4-shims-5.15.4.data"//fontAwesome5.x.x shims的图标
// import fontAwesome5pro from "e-icon-picker/lib/icon/fontawesome/pro-5.15.4.data"//fontAwesome5.x.x pro的图标
// import all5 from "e-icon-picker/lib/icon/fontawesome/all-5.15.4.data"//fontAwesome5.x.x all的图标
import all6 from "e-icon-picker/lib/icon/fontawesome/all-6.2.1.js"//fontAwesome6.x.x all的图标
import brands6 from "e-icon-picker/lib/icon/fontawesome/brands-6.2.1.js"//fontAwesome6.x.x brands的图标
import fontawesome6 from "e-icon-picker/lib/icon/fontawesome/fontawesome-6.2.1.js"//fontAwesome6.x.x fontawesome的图标
import fontAwesome6shims from "e-icon-picker/lib/icon/fontawesome/v4-shims-6.2.1.js"//fontAwesome6.x.x shims的图标
```

### eIcon 默认图标

<iconList type="eIcon"/>

### fontAwesome 4.7 整理后的图标集

<iconList type="fontAwesomeV470"/>

### element-ui 整理后的图标集

<iconList type="ele"/>

### element-plus 整理后的图标集

<iconList type="elementPlus"/>

### eIconSymbol 图标集

<iconList type="eIconSymbol"/>

### fontawesome 6.x 图标集

<iconList type="fontawesome"/>
