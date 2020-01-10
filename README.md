# e-icon-picker
简洁大方，专为`element-ui`和`font-awesome`图标库开发的图标选择组件，希望大家喜欢！

![选择图标](https://oscimg.oschina.net/oscnet/up-e3323fa5c775df72741c2f58ca634b950d3.JPEG "选择图标")

[项目地址](https://gitee.com/cnovel/icon-picker)

#### 安装

```
npm install e-icon-picker
```

#### 全局注册

`main.js`中注册

```
import iconPicker from 'e-icon-picker';
import 'e-icon-picker/dist/main.css';	//样式文件

Vue.use(iconPicker);
```

#### 使用

```
 <e-icon-picker v-model="icon"></e-icon-picker>
```


#### 问题解决

若是选中的图标界面不展示，则有可能是你的项目中，引用的`fontawesome`图标有问题。

请在全局css中添加一下css尝试：

```css

[class^="el-icon-fa"], [class*=" el-icon-fa"] {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome !important;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

```


