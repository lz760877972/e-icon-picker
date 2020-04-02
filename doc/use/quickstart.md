# 快速上手

### 全局注册
在引入组件时，可以传入一个全局配置对象，该配置对象目前支持`FontAwesome`、`ElementUI`和`addIconList`，`FontAwesome`和`ElementUI`可选值有`true`和`false`，表示是否使用该组件图标。
`addIconList`是自定义新增图标名称的数组，`removeIconList`则是自定义删除图标名称的数组。

在main.js中加入：

```vue
import iconPicker from 'e-icon-picker';
import 'e-icon-picker/dist/index.css';//基础样式
import 'e-icon-picker/dist/main.css'; //fontAwesome 图标库样式

//使用时必须引用ElementUI相关的组件以及css
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(iconPicker);//使用e-icon-picker
Vue.use(ElementUI); //使用ElementUI

```

### 局部注册

引入`e-icon-picker`组件

```vue
import {EIconPicker} from 'e-icon-picker';
import 'e-icon-picker/dist/index.css'; //基础样式
import 'e-icon-picker/dist/main.css';  //fontAwesome 图标库样式
```
在组件`components`中声明
```vue
export default {
    name: 'app',
    components: { EIconPicker},
    data() {
        return {
            icon: '',
            options: {FontAwesome: false, ElementUI: true, addIconList: ['fa fa-slack'], removeIconList: []},
        }
    }
}
```

**注：options参数会是全局样式失效，请合理应用。**


### 使用

```html
<e-icon-picker v-model="icon" :options="options"/>
```

完整示例请参考[example](https://gitee.com/cnovel/e-icon-picker/tree/master/example)项目
简单使用请参考[example1.vie](https://gitee.com/cnovel/e-icon-picker/tree/master/example/src/components/example1.vue)文件

### 高级

#### 全局设置

在main.js中全局注册是可以加入以下参数：
```vue
Vue.use(eIconPicker, {FontAwesome: true, ElementUI: true});
```
具体参数信息，请参考 [参数配置](configuration.md)

#### 全局添加图标或者删除图标
* 通过全局配置添加或者删除

```vue
Vue.use(eIconPicker, {FontAwesome: true, ElementUI: true, addIconList: [], removeIconList: []});
```

* 通过提供的函数进行配置

```vue
import eIconPicker, {iconList} from 'e-icon-picker';
Vue.use(eIconPicker);

iconList.addIcon(["el-icon-s-ticket", "el-icon-s-help", "el-icon-s-help"]);//添加图标
iconList.removeIcon(["el-icon-s-ticket"]);//删除图标
```
使用示例请参考[main.js](https://gitee.com/cnovel/e-icon-picker/tree/master/example/src/main.js)文件

#### 局部添加图标或者删除图标
使用时添加一个ref属性：

```vue
<e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
```

通过ref获取`e-icon-picker`组件，再调用组件方法：
```vue
mounted() {
        this.$refs['iconPicker'].addIcon("fa fa-slack");//组件内动态添加图标
        this.$refs['iconPicker'].removeIcon("fa fa-slack");//组件内动态删除图标
        setTimeout(() => {//通过修改参数进行重新设置组件
           this.options.addIconList.push('el-icon-message-solid');
           this.options.removeIconList.push('removeIconList');
           console.log("定时任务触发")
        }, 5000);
    }
```

使用示例请参考[example3.vue](https://gitee.com/cnovel/e-icon-picker/tree/master/example/src/components/example3.vue)文件

#### 使用iconfont图标
* 将图标导入到项目中（iconfont.json文件也要导入）
* 删除iconfont.css中多余的css样式
```css
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```
* 获取css的名称
```js
import {analyzingIconForIconfont} from 'e-icon-picker';//引入解析json的函数
import iconfont from "./css/iconfont.json";//引入json文件
import "./css/iconfont.css";//引入css

let forIconfont = analyzingIconForIconfont(iconfont);//解析class
//全局删除增加图标
Vue.use(eIconPicker, {FontAwesome: true, ElementUI: true, addIconList: forIconfont.list, removeIconList: []});//全局注册图标
```

#### 属性配置
具体配置项请参考 [参数配置](configuration.md)，对应的示例请参考[example2.vue](https://gitee.com/cnovel/e-icon-picker/tree/master/example/src/components/example2.vue)文件
