# e-icon-picker 图标选择器

## 基本用法

:::demo

```vue

<template>
  <e-icon-picker v-model="icon"/>
  名称： {{ icon }}
  <e-icon :icon-name="icon"/>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'e-icon-picker-demo',
  setup() {
    let icon = ref("");
    return {icon};
  },
});
</script>
```

:::

## 高级用法

:::demo

```vue

<template>
  <e-icon-picker ref="iconPicker" v-model="icon" :options="options" :disabled="disabled" :readonly="readonly"
                 :placement="placement" :styles="style" :width="width"/>
  名称： {{ icon }}
  <e-icon :icon-name="icon"/>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, ref} from 'vue';
import eIconList from 'e-icon-picker/icon/default-icon/eIconList.js'

export default defineComponent({
  name: 'e-icon-picker-demo2',
  setup() {
    let iconPicker = ref(null);
    let state = reactive({
      icon: '',
      options: {addIconList: [...eIconList], removeIconList: []},
      disabled: false,
      readonly: false,
      placement: 'bottom',
      style: {},
      width: 800
    });
    return {...toRefs(state), iconPicker};
  },
});
</script>
```

:::

## 组件内动态设置以及方法展示

:::demo

```vue

<template>
  <e-icon-picker ref="iconPicker" v-model="icon" :options="options" default-icon="component EditPen"
                 placeholder="请选择"
                 size="medium"/>
  名称：{{icon}}
  <e-icon :icon-name="icon"/>
</template>
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

:::

## 组件内使用iconfont彩色图标展示

:::demo

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
import {eIconSymbol} from 'e-icon-picker';
import '../../public/js/iconfont.js'
import iconfont from '../../public/css/iconfont.json' //引入图标名称json

export default defineComponent({
  name: 'e-icon-picker-demo4',
  setup() {
    let iconPicker = ref(null);
    let state = reactive({
      icon: '',
      options: {}
    });

    const addIcon = () => {
      let icon = eIconSymbol(iconfont);//处理彩色图标
      state.options.addIconList = icon.list;//将彩色图标列表加入到图标选择器
    }
    onMounted(() => {
      addIcon();
    })
    return {...toRefs(state), iconPicker};
  },
});
</script>
```

:::

## 组件内使用iconfont图标展示

:::demo

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
import {analyzingIconForIconfont} from 'e-icon-picker';
import iconfont from '../../public/css/iconfont.json' //引入图标名称json

export default defineComponent({
  name: 'e-icon-picker-demo5',
  setup() {
    let iconPicker = ref(null);
    let state = reactive({
      icon: '',
      options: {}
    });

    const addIcon = () => {
      let icon = analyzingIconForIconfont(iconfont);//处理图标
      state.options.addIconList = icon.list;//将图标列表加入到图标选择器
    }
    onMounted(() => {
      addIcon();
    })
    return {...toRefs(state), iconPicker};
  },
});
</script>
<style lang="scss" scoped>
@import '../../public/css/iconfont.css';
</style>
```

:::

## 组件内使用svg图标展示

:::demo
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
  name: 'e-icon-picker-demo6',
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

:::

## 在dialog中使用

:::demo

```vue

<template>
  <el-button type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>
  <el-dialog
      title="在dialog中使用"
      v-model="dialogVisible"
      width="30%">
    <e-icon-picker ref="iconPicker" v-model="icon" placeholder="请选择" size="medium"/>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </template>
  </el-dialog>
  名称：{{icon}}
  <e-icon :icon-name="icon"/>
</template>
<script lang="ts">
import {defineComponent, reactive, ref, toRefs, watch} from 'vue';

export default defineComponent({
  name: 'e-icon-picker-demo7',
  setup() {
    let iconPicker = ref(null);
    const dialogVisible = ref(false)
    let state = reactive({
      icon: ''
    });

    watch(dialogVisible, (val, old) => {
      if (!val && iconPicker.value) {
        iconPicker.value.destroyIconList()//销毁图标列表，防止页面节点太多
      }
    })
    return {...toRefs(state), dialogVisible, iconPicker};
  },
});
</script>
<style lang="scss" scoped>
.dialog-footer button {
  margin-right: 10px;
}
</style>
```

:::

## 自定义触发器

:::demo

```vue

<template>
  <e-icon-picker ref="iconPicker" v-model="icon" :highLightColor="highLightColor" :options="options" :zIndex="zIndex"
                 :width="width">
    <template v-slot="{data}">
      <el-button @click="show">{{ data.placeholder }}</el-button>
    </template>
  </e-icon-picker>
  名称：{{icon}}
  <e-icon :icon-name="icon"/>
</template>
<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue';
import eIconList from 'e-icon-picker/icon/default-icon/eIconList.js'

export default defineComponent({
  name: 'e-icon-picker-demo8',
  setup() {
    let iconPicker = ref(null);
    const dialogVisible = ref(false)
    let state = reactive({
      icon: '',
      highLightColor: "#fc1944",
      zIndex: 3500,
      width: 800,
      options: {addIconList: [...eIconList], removeIconList: []},
    });

    const show = () => {
      iconPicker.value.show()
    }
    return {...toRefs(state), dialogVisible, iconPicker, show};
  },
});
</script>
<style lang="scss" scoped>
.dialog-footer button {
  margin-right: 10px;
}
</style>
```

:::

## 主题切换

:::demo

```vue

<template>
  <div class="popper-container" :class="theme">
    <div>
      <input type="radio" v-model="theme" id="light" value="light"/>
      <label for="light">Light theme</label>
      <input type="radio" v-model="theme" id="dark" value="dark"/>
      <label for="dark">Dark theme</label>
    </div>
    <div>
      <e-icon-picker v-model="icon" :content-class="theme"/>
      名称： {{ icon }}
      <e-icon :icon-name="icon"/>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'e-icon-picker-demo9',
  components: {},
  setup() {
    let theme = ref("light");
    let icon = ref("");
    return {
      theme,
      icon
    };
  },
});
</script>
<style scoped lang="scss">
@import 'e-icon-picker/theme/theme.css';

.popper-container {
  padding: 20px;
  border: 2px dashed #dadada;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: space-around;

  :last-child {
    width: 100%;
  }
}

.dark {
  background-color: #312a2a;
  color: #fff;
}

.light {
  background-color: #fff;
  color: #000;
}

</style>
```

:::

## 属性

| 参数                  | 说明                          | 默认值                 | 可选值                  |
| --------------------- | ----------------------------- |---------------------| ----------------------- |
| model-value / v-model | 绑定值                        | 空                   | —                       |
| disabled              | 是否禁用                      | false               | true/false              |
| size                  | 组件大小                      | medium              | large/medium/small/mini |
| width                 | 组件宽度                      | -1                  | number                  |
| readonly              | 原生属性，是否只读            | false               | true/false              |
| defaultIcon           | 默认图标                      | eiconfont e-icon-bi | 图标名                  |
| clearable             | 是否可清空                    | true                | true/false              |
| placement             | 弹窗位置                      | bottom              | top/bottom              |
| placeholder           | 输入框提示信息                | 请选择图标               | 任意                    |
| styles                | 组件自定义样式                | 空                   | 无                      |
| emptyText             | 图标列表为空时默认显示的文本  | 暂无可选图标              | 任意                    |
| highLightColor        | 图标选中高亮（对svg图标无效） | 空                   | 任意（hex）             |
| zIndex                | 显示的弹窗层数（会全局影响）  | 空                   | 数字                    |
| options               | 图标参数                      | object              | 无                      |

### options

| 参数                     | 说明         | 默认值  | 可选值 |
|------------------------|------------|------|-----|
| options.addIconList    | 自定义新增图标列表  | []   | 无   |
| options.removeIconList | 自定义删除图标列表  | []   | 无   |

## 事件

| 事件名称     | 说明          | 回调参数   |
|----------|-------------|--------|
| change   | 数值发生改变时回调   | 新状态的值  |

## 方法

| 方法名             | 说明            | 参数             |
|-----------------|---------------|----------------|
| addIcon         | 添加一个或多个图标     | String / Array |
| removeIcon      | 删除一个或多个图标     | String / Array |
| destroyIconList | 销毁图标列表，不销毁输入框 | -              |
| createIconList  | 重新创建图标列表      | -              |
| show            | 触发选择器         | -              |
| hide            | 隐藏选择器         | -              |

## 插槽

| 名称       | 说明            | 参数             |
|----------|---------------|----------------|
| -        | 触发器插槽         | data 为触发器相关参数  |
| prepend  | input 输入框前缀组件 | icon 参数为图标名称   |
| icon     | 图标列表显示组件      | icon 参数为图标名称   |
