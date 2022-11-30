# 进阶

## 全局设置

在main.js中全局注册是可以加入以下参数：

* 通过全局配置添加或者删除

```js
Vue.use(eIconPicker,
    {
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

## 局部添加图标或者删除图标
使用时添加一个ref属性：

```vue
<e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
```

通过ref获取`e-icon-picker`组件，再调用组件方法：

```vue
<script lang="ts">
import {defineComponent, reactive, toRefs, ref, onMounted} from 'vue';
import element from 'e-icon-picker/icon/ele/element-plus.js';

export default defineComponent({
  name: 'e-icon-picker-demo3',
  setup() {
    let iconPicker = ref(null);
    let state = reactive({
      icon: '',
      options: {addIconList: [...element], removeIconList: []}
    });
    //因为vite导入静态图片无法实现，所以才用这种方式
    const getImageUrl = (name) => {
      return new URL(`../../public/img/${name}`, import.meta.url).href
    }
    onMounted(() => {
      iconPicker.value.addIcon("fa fa-slack");
      iconPicker.value.removeIcon("fa fa-slack");//组件内动态删除图标

      setTimeout(() => {//通过修改参数进行重新设置组件
        state.options.addIconList.push('fa fa-slack');
        state.options.removeIconList.push('removeIconList');
        state.options.addIconList.push('http://www.icosky.com/images/wj/baidu.gif');
        state.options.addIconList.push(getImageUrl("img.png"));//动态导入图片
        state.options.addIconList.push("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAA2klEQVR4Xo1SiQ0DIQzLTreTd8pO7ETtPJSoalWEIICd2IA9z+q+P+KNjtE7xmn/3Qg2TAIXjqWJMdt9JoIqjC1HlIYoKePmqMIh5AEgHKDkIX1USYI2lA/CieMFclefhJbEA4ur6NOaiVbBFvY2nQJI9hWgrLaUKGTs5U041yoBEPVJ3/a2rqRRAzchm57JAh2cdH+Mz1uiKhAkM8bR8picYyxMn4erF+jcNUZwVbi+Bglmyk1QFolAo/sXSVTMTmEkE5Tu87puwjD9uyE9zA+s7xBBLatOba4XX3AVCHee8yAAAAAASUVORK5CYII=");//base64形式
        console.log("定时任务触发");
      }, 5000);
    })
    return {...toRefs(state), iconPicker};
  },
});
</script>
```

## 使用iconfont图标
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
        addIconList: forIconfont.list,
        removeIconList: [], 
        zIndex: 3100
    }
);//全局注册图标
```




## 单独使用
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
@import '~e-icon-picker/index.css';
</style>
```

> **因为EIconPicker组件中已经局部注册EIcon了，所以使用时不用再特别注册，但如果在EIconPicker组件外使用EIcon，则需要另外注册**


引入`e-icon`组件

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

### 使用`e-icon-picker`

```vue
<e-icon-picker v-model="icon" :options="options"/>
```

### 显示图标
```vue
<e-icon :icon-name="icon"/>
```

## 项目中使用`svg`图标

### `vite`中使用`svg`

1. 安装`vite-plugin-svg-icons`插件

```bash
npm install vite-plugin-svg-icons -D
```

2. 在`vite.config.ts`配置文件中配置。

```ts
import path from 'path';
import {defineConfig} from 'vite';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

export default defineConfig({
    plugins: [
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/svg')],
            // 指定symbolId格式
            symbolId: '[name]',
            svgoOptions: {
                //下面的插件是 如果需要通过css改变svg图标颜色时添加
                //不然会删除svg默认的颜色信息
                plugins: [{
                    name: "removeAttrs",
                    params: {
                        attrs: "(fill|stroke)"
                    }
                }]
            }
        })
    ]
});
```

3.  使用
```vue
<template>
  <e-icon-picker ref="iconPicker" v-model="icon" :options="options"
                 placeholder="请选择"
                 size="medium"/>
  名称：{{icon}}
  <e-icon :icon-name="icon"/>
</template>
<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs} from 'vue';
import svgNames from 'virtual:svg-icons-names';//获取图标名称
import 'virtual:svg-icons-register';//将图标注册到dom中

export default defineComponent({
  name: 'e-icon-picker-demo5',
  setup() {
    let iconPicker = ref(null);
    let state = reactive({
      icon: '',
      options: {}
    });

    const addIcon = () => {
      state.options.addIconList = svgNames.map(it => `#${it}`);//svg图标是以‘#’开头的，所以对名称进行处理，将处理完的图标列表加入到图标选择器
    }
    onMounted(() => {
      addIcon();
    })
    return {...toRefs(state), iconPicker};
  },
});
</script>
```
### 在`@vue/cli`中使用
> 已经不在推荐使用，使用方式和以前的v1.x一样。
* 安装
```bash
npm install svg-sprite-loader@5.0.0 -D 
```

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

* 创建`getSvg.js`工具，将以下内容填入到文件中。

```ts
const req = (require as any).context(process.env.VUE_APP_SVG, false, /\.svg$/);

const requireAllFile = (requireContext: any) => requireContext.keys().map(requireContext);
requireAllFile(req);

const re = /\.\/(.*)\.svg/;

const requireAll = (requireContext: any) => requireContext.keys();

let svgIcons = requireAll(req).map((i: any) => {
    return "#" + i.match(re)[1]
});

export default svgIcons
```

* 使用`svg`图标
  在`main.js`中引入

```js
import eIconPicker from 'e-icon-picker';
//svgIcons 对应的就是图标列表，将图标列表添加到选择器就可以了
//引入刚刚创建的文件
import svgIcons from './getSvg.js';

//全局删除增加图标
Vue.use(eIconPicker, {
    addIconList: svgIcons,
});
```

## 使用其他icon组件替换eIcon
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
>以`#`开头的为`svg`图标，以`component `开头的是图标组件，如果自行替换时，可以根据这个进行判断，添加`svg`图标时也要注意这个问题

感谢[元谷](https://gitee.com/yuangu) PR [可自定义的icon](https://gitee.com/cnovel/e-icon-picker/pulls/3/commits)
