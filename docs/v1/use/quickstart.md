# 快速上手

### 全局注册
在引入组件时，可以传入一个全局配置对象，该配置对象目前支持`FontAwesome`、`ElementUI`、`eIcon`、`eIconSymbol`、`addIconList`和`removeIconList`，`FontAwesome`、`ElementUI`和`eIcon`可选值有`true`和`false`，表示是否使用该组件图标。
`eIconSymbol`可选值有`true`和`false`，表示`eIcon`图标是否为彩色图标。
`addIconList`是自定义新增图标名称的数组，`removeIconList`则是自定义删除图标名称的数组。

在main.js中加入：

```js
import eIconPicker from 'e-icon-picker';
import "e-icon-picker/lib/symbol.js"; //基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库

//全局删除增加图标
Vue.use(eIconPicker, {
    FontAwesome: true,
    ElementUI: true,
    eIcon: true,//自带的图标，来自阿里妈妈
    eIconSymbol: true,//是否开启彩色图标
    addIconList: [],
    removeIconList: [],
    zIndex: 3100//选择器弹层的最低层,全局配置
});
```

### 局部注册

引入`e-icon-picker`组件

```js
import {EIconPicker} from 'e-icon-picker';
```

在组件`components`中声明

```vue
export default {
    name: 'app',
    components: {EIconPicker},
    data() {
        return {
            icon: '',
            options: {
                FontAwesome: false,
                ElementUI: false,
                eIcon: true,//自带的图标，来自阿里妈妈
                eIconSymbol: true,//是否开启彩色图标
                addIconList: [],
                removeIconList: []
            }
        }
    }
}
```

在局部样式中引入css
```html
<style lang="css" scoped>
@import '~e-icon-picker/lib/index.css';
@import '~font-awesome/css/font-awesome.min.css';
@import '~element-ui/lib/theme-chalk/icon.css';
</style>
```

> **因为EIconPicker中已经局部注册EIcon了，所以使用时不用再特别注册，但如果在EIconPicker组件外使用EIcon，则需要另外注册**


引入`e-icon-picker`组件

```js
import {EIcon} from 'e-icon-picker';
```

在组件`components`中声明

```vue
export default {
    name: 'app',
    components: {EIcon}
}
```

### 使用

```vue
<e-icon-picker v-model="icon" :options="options"/>
```

### 显示图标
```vue
<e-icon :icon-name="icon"/>
```

完整示例请参考 [example](https://gitee.com/cnovel/e-icon-picker/tree/master/example) 项目
简单使用请参考 [example1.vue](https://gitee.com/cnovel/e-icon-picker/tree/master/example/src/components/example1.vue) 文件

### 高级

#### 全局设置

在main.js中全局注册是可以加入以下参数：

```js
Vue.use(eIconPicker,
    {
        FontAwesome: true,
        ElementUI: true,
        eIcon: true, 
        eIconSymbol: true,
        zIndex: 3100
    }
);
```

#### 全局添加图标或者删除图标
* 通过全局配置添加或者删除

```js
Vue.use(eIconPicker, 
    {
        FontAwesome: true,
        ElementUI: true,
        eIcon: true,
        eIconSymbol: true,
        addIconList: [],
        removeIconList: [],
        zIndex: 3100
    }
);
```

* 通过提供的函数进行配置

```js
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
//let forIconfont = eIconSymbol(iconfont);//解析彩色图标
//全局删除增加图标
Vue.use(eIconPicker, 
    {
        FontAwesome: true, 
        ElementUI: true, 
        addIconList: forIconfont.list,
        removeIconList: [], 
        zIndex: 3100
    }
);//全局注册图标

```

#### 使用svg图标
* 创建图标文件夹`src/icons/svg/`。
* 在`vue.config.js`配置中加入以下代码。

```js
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    productionSourceMap: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons')) //对应刚刚创建文件夹的位置，排除默认的svg图片处理规则
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons')) //对应刚刚创建文件夹的位置
            .end()
            .use('svg-sprite-loader')  //处理svg使用的loader，默认自带，如果提示出错，请手动安装
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
            .end()
    }
};
```

* 在项目的环境配置文件中加入以下配置

系统会自动加载该目录下的所有svg文件，不支持扫描子文件夹，@对应src文件夹

`.env.development` 文件

```js
VUE_APP_SVG = '@/icons/svg' 
```

`.env.production` 文件

```js
VUE_APP_SVG = '@/icons/svg' 
```

> VUE_APP_SVG 只在webpack中使用，如果你使用的是vite，那么可以对`getSvg.js`代码进行修改，写死或者其他方式来获取svg的id

* 使用`svg`图标
在`main.js`中引入

```js
import eIconPicker from 'e-icon-picker';
//svgIcons 对应的就是图标列表，将图标列表添加到选择器就可以了
import svgIcons from 'e-icon-picker/lib/getSvg';

//全局删除增加图标
Vue.use(eIconPicker, {
    addIconList: svgIcons,
});

```
如有疑问请参考：[example](https://gitee.com/cnovel/e-icon-picker/tree/master/example)

#### 使用其他icon组件替换eIcon
使用方法（svg-icon为admin-element-vue的icon组件）

```vue
<e-icon-picker v-model="icon">
    <template #prepend="{icon}">
      <svg-icon
          :iconClass="icon"
          class="disabled"
      />
    </template>
    <template #icon="{icon}">
      <svg-icon
          :iconClass="icon"
          class="disabled"
      />
    </template>
</e-icon-picker>
```

自己实现
```vue
<e-icon-picker v-model="icon">
  <template #prepend="{icon}">
    <i :class="icon"></i>
  </template>
  <template #icon="{icon}">
    <i :class="icon"></i>
  </template>
</e-icon-picker>
```
>以`#`开头的为`svg`图标，如果自行替换时，可以根据这个进行判断，添加`svg`图标时也要注意这个问题

感谢[元谷](https://gitee.com/yuangu) PR [可自定义的icon](https://gitee.com/cnovel/e-icon-picker/pulls/3/commits)
