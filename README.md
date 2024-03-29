# e-icon-picker 图标选择组件
简洁大方，专为`element-plus`（已经脱离element-plus独立可用）和`font-awesome`（可选）图标库开发的图标选择组件，希望大家喜欢！

![示例图片](https://f.pz.al/pzal/2023/08/25/b08849bad57de.jpeg "示例图片")

![示例图片](https://f.pz.al/pzal/2023/08/25/1eb5b2cfd9882.png "示例图片")

喜欢的欢迎star [项目地址](https://gitee.com/cnovel/e-icon-picker)

## 安装

>~~因为项目使用了element-plus的组件进行二次开发，所以在使用此组件前请安装element-plus组件库。~~
>~~安装方式请参考element-plus官网的相关文档。[element-plus官网](https://element-plus.gitee.io/#/zh-CN/component/installation)。~~
>
>已经脱离element-plus，不需要再安装element-plus了。

**npm 安装**

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```bash
npm install e-icon-picker@next -S
```

## 快速使用

```
import {createApp} from 'vue';
import App from './App.vue';
import eIconPicker from 'e-icon-picker';
import "e-icon-picker/icon/default-icon/symbol.js"; //基本彩色图标库
import 'e-icon-picker/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库

let app = createApp(App);
app.use(eIconPicker);

app.mount('#app');
```

详细文档
- [使用文档](http://e-icon-picker-ts.cnovel.top)

## 使用

```html
 <e-icon-picker v-model="icon"/>
```

##  捐赠支持

开源项目不易，若此项目能得到你的青睐，可以捐赠支持作者持续开发与维护。喜欢的欢迎star [项目地址](https://gitee.com/cnovel/e-icon-picker)。

![收款码](https://f.pz.al/pzal/2023/08/25/c258541523819.jpeg)

**捐赠名单**

*莹 [柳叶筏](https://gitee.com/liuyefa)

**另：**

本人还有一个开源项目，在项目中的菜单管理使用了该图标组件，喜欢的可以去看看，帮忙点个star,非常感谢！
项目地址： [novel](https://gitee.com/cnovel/Novel-api)

**演示图**

| ![用户登录](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241055743.png "用户登录") | ![系统首页](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241055484.png "系统首页") |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![用户管理](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241055932.png "用户管理") | ![用户编辑](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241055644.png "用户编辑") |
| ![角色管理](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241055985.png "角色管理") | ![角色编辑](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241056529.png "角色编辑") |
| ![菜单管理](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241116698.png "菜单管理") | ![菜单编辑](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241056802.png "菜单编辑") |
| ![岗位管理](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241056046.png "岗位管理") | ![岗位编辑](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241114800.png "岗位编辑") |
| ![部门管理](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241116748.png "部门管理") | ![部门编辑](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241056406.png "部门编辑") |
| ![参数管理](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241056163.png "参数管理") | ![参数编辑](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241056066.png "参数编辑") |
| ![操作日志](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241056139.png "操作日志") | ![日志详情](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241056804.png "日志详情") |
| ![登录日志](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241121203.png "登录日志") | ![服务监控](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241057672.png "服务监控") |
| ![在线用户](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241057712.png "在线用户") | ![数据源监控](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241057120.png "数据源监控") |
| ![个人信息](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241057687.png "个人信息") | ![编辑头像](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241057156.png "编辑头像") |
| ![定时任务](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241059717.png "定时任务") | ![任务日志](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241057034.png "任务日志") |
| ![SQL监控](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241057166.png "SQL监控") | ![SQL监控详情](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241058040.png "SQL监控详情") |
| ![WEB监控](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241058339.png "WEB监控") | ![SQL防火墙](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241101277.png "SQL防火墙") |
| ![Spring监控](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241101320.png "Spring监控") | ![Spring监控详情](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241119563.png "Spring监控详情") |
| ![个人网盘](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241058295.png "个人网盘") | ![图片预览](https://raw.gitmirror.com/lizhen789/pic/main/test/202308241058018.png "图片预览") |
