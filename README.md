# e-icon-picker 图标选择组件
简洁大方，专为`element-ui`和`font-awesome`图标库开发的图标选择组件，希望大家喜欢！

![示例图片](https://oscimg.oschina.net/oscnet/up-bf411d272ce969c1d5be9dc1ea12a8969ea.JPEG "示例图片")

喜欢的欢迎star [项目地址](https://gitee.com/cnovel/icon-picker)

## Demo

[在线测试](http://demo.icon.cnovel.club)

[在线API](http://doc.icon.cnovel.club)

## 安装

>因为项目使用了element-ui的组件进行二次开发，所以在使用此组件前请安装element-ui组件库。
>安装方式请参考element-ui官网的相关文档。[element-ui官网](https://element.eleme.cn/#/zh-CN/component/installation)

**npm 安装**

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```bash
npm install e-icon-picker
```

## 快速使用

```
import iconPicker from 'e-icon-picker';
import 'e-icon-picker/dist/index.css';//基础样式
import 'e-icon-picker/dist/main.css'; //fontAwesome 图标库样式

Vue.use(iconPicker);
```

详细文档
- [使用文档](./doc/use/README.md)

## 使用

```html
 <e-icon-picker v-model="icon"/>
```


##  捐赠支持

开源项目不易，若此项目能得到你的青睐，可以捐赠支持作者持续开发与维护。
 ![收款码](https://oscimg.oschina.net/oscnet/up-e2344cd770f7f7386637d0dbbfb5d48472c.JPEG)
