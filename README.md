# e-icon-picker 图标选择组件
简洁大方，专为`element-ui`和`font-awesome`图标库开发的图标选择组件，希望大家喜欢！

![选择图标](https://oscimg.oschina.net/oscnet/up-e3323fa5c775df72741c2f58ca634b950d3.JPEG "选择图标")

喜欢的欢迎star [项目地址](https://gitee.com/cnovel/icon-picker)

#### Demo

在线测试
在线API

#### 安装

>因为项目使用了element-ui的组件进行二次开发，所以在使用此组件前请安装element-ui组件库。
>安装方式请参考element-ui官网的相关文档。[element-ui官网](https://element.eleme.cn/#/zh-CN/component/installation)

**npm 安装**

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```bash
npm install e-icon-picker
```

#### 快速使用

```
import iconPicker from 'e-icon-picker';
import 'e-icon-picker/dist/index.css';//样式文件
import 'e-icon-picker/dist/main.css'; //fontAwesome 图标库样式

Vue.use(iconPicker,{FontAwesome: true, ElementUI: true, IconList: []});
```


#### 全局注册
在引入组件时，可以传入一个全局配置对象，该配置对象目前支持`FontAwesome`、`ElementUI`和`IconList`，`FontAwesome`和`ElementUI`可选值有`true`和`false`，表示是否使用该组件图标。
`IconList`则是自定义图标名称的数组。

```
import iconPicker from 'e-icon-picker';
import 'e-icon-picker/dist/index.css';//样式文件
import 'e-icon-picker/dist/main.css'; //fontAwesome 图标库样式

Vue.use(iconPicker,{FontAwesome: true, ElementUI: true, IconList: []});
```
#### 参数配置



#### 更新日志



#### 使用

```
 <e-icon-picker v-model="icon"></e-icon-picker>
```


####  捐赠支持

开源项目不易，若此项目能得到你的青睐，可以捐赠支持作者持续开发与维护。
 ![收款码](https://oscimg.oschina.net/oscnet/up-e2344cd770f7f7386637d0dbbfb5d48472c.JPEG)
