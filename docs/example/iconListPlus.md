# 图标列表
>以下图标均通过css样式进行爬取，属于最新版，但图标可能存在图标不显示问题，使用时请自行处理

使用方式通过`addIconList`参数添加或者`iconList.addIcon()`方法添加

例如：
```js
import el from "e-icon-picker/lib/ele/element-ui.data";//element-ui的图标
import eIconPicker, {iconList} from 'e-icon-picker';


//全局删除增加图标
Vue.use(eIconPicker, {
    FontAwesome: true,
    ElementUI: true,
    eIcon: true,//自带的图标，来自阿里妈妈
    eIconSymbol: true,//是否开启彩色图标
    addIconList: [],
    removeIconList: [],
    zIndex: 3100
});
或
iconList.addIcon(el);
```

对应的js列表：
```js
import el from "e-icon-picker/lib/ele/element-ui-2.15.7.data";//element-ui的图标
import fontAwesome470 from "e-icon-picker/lib/fontawesome/font-awesome.v4.7.0.data";//fontAwesome470的图标
import fontAwesome5 from "e-icon-picker/lib/fontawesome/fontawesome-5.15.4.data";//fontAwesome5.x.x的图标
import fontAwesome5shims from "e-icon-picker/lib/fontawesome/v4-shims-5.15.4.data"//fontAwesome5.x.x shims的图标
import fontAwesome5pro from "e-icon-picker/lib/fontawesome/pro-5.15.4.data"//fontAwesome5.x.x pro的图标
import all5 from "e-icon-picker/lib/fontawesome/all-5.15.4.data"//fontAwesome5.x.x all的图标
import all6 from "e-icon-picker/lib/fontawesome/all-6.0.0.data"//fontAwesome6.x.x all的图标
import brands6 from "e-icon-picker/lib/fontawesome/brands-6.0.0.data"//fontAwesome6.x.x brands的图标
import fontawesome6 from "e-icon-picker/lib/fontawesome/fontawesome-6.0.0.data"//fontAwesome6.x.x fontawesome的图标
import fontAwesome6shims from "e-icon-picker/lib/fontawesome/v4-shims-6.0.0.data"//fontAwesome6.x.x shims的图标
```
## element-ui 全图标
<iconList :type="'ele'"/>

## font-awesome 4.7 未整理的图标集
<iconList :type="'fontAwesomeV470'"/>

## font-awesome 5.x shims 未整理的图标集
<iconList :type="'shims'"/>

## font-awesome 5.x pro 未整理的图标集
<iconList :type="'pro'"/>



