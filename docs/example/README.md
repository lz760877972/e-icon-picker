## 图标选择器

### 基础用法

::: demo
```vue
<template>
  <div style="margin: 0 auto;width: 500px">
    <e-icon-picker v-model="icon"/>
    名称： {{icon}}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
export default {
  name: "example1",
  data() {
    return {
      icon: '',
    }
  },
}
</script>
```
:::

### 高级用法

::: demo
```vue

<template>
  <div style="margin: 0 auto;width: 500px">
    <e-icon-picker v-model="icon" :options="options" :disabled="disabled" :readonly="readonly"
                   :placement="placement" :styles="style" :width="width"/>
    名称： {{icon}}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
export default {
  name: "example2",
  data() {
    return {
      icon: '',
      options: {FontAwesome: false, ElementUI: true, addIconList: [], removeIconList: []},
      disabled: false,
      readonly: false,
      placement: 'bottom',
      style: {},
      width: 800
    }
  },
}
</script>
```
:::

### 组件内动态设置以及方法展示

::: demo
```vue
<template>
  <div style="margin: 0 auto;width: 500px">
    <e-icon-picker ref="iconPicker" v-model="icon" :options="options" default-icon="el-icon-edit" placeholder="请选择"
                   size="medium"/>
    名称：{{icon}}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
export default {
  name: "example3",
  data() {
    return {
      icon: '',
      options: {FontAwesome: false, ElementUI: false, addIconList: [], removeIconList: []},
    }
  },
  mounted() {
    this.$refs['iconPicker'].addIcon("fa fa-slack");//组件内动态添加图标
    this.$refs['iconPicker'].removeIcon("fa fa-slack");//组件内动态删除图标

    let self = this;
    setTimeout(() => {//通过修改参数进行重新设置组件
      self.options.addIconList.push('el-icon-message-solid');
      self.options.removeIconList.push('removeIconList');
      console.log("定时任务触发");
    }, 5000);
  }
}
</script>
```
:::

### 组件内使用iconfont彩色图标展示
<RecoDemo>
<template slot="code-vue">
    <<< @/docs/.vuepress/components/example4.vue
</template>
<example4 slot="demo"></example4>
</RecoDemo>


### 组件内使用iconfont图标展示
<RecoDemo>
<template slot="code-vue">
    <<< @/docs/.vuepress/components/example5.vue
</template>
<example5 slot="demo"></example5>
</RecoDemo>

### 组件内使用svg图标展示
<RecoDemo>
<template slot="code-vue">
    <<< @/example/src/components/example6.vue
</template>
<example6 slot="demo"></example6>
</RecoDemo>


### 属性

参数 | 说明 | 默认值 | 可选值
---|---|---|---
value / v-model|	绑定值	| 空 |	—
disabled | 是否禁用|false|true/false
readonly | 原生属性，是否只读|false|true/false
clearable | 是否可清空|true|true/false
placement | 弹窗位置|bottom|top/bottom
placeholder | 输入框提示信息 |请选择图标|任意
styles | 组件自定义样式 |空|无
options | 图标参数|{FontAwesome: true, ElementUI: true, addIconList: [], removeIconList: []}|无
options.FontAwesome |是否使用FontAwesome图标|true|true/false
options.ElementUI |是否使用ElementUI图标|true|true/false
options.eIcon |自带彩色图标|true|true/false
options.eIconSymbol |是否使用彩色图标（false：则eIcon图标为单色）|true|true/false
options.addIconList |自定义新增图标列表|[]|无
options.removeIconList |自定义删除图标列表|[]|无

### 事件

事件名称 | 说明 | 回调参数 
---|---|---
change | 数值发生改变时回调 | 新状态的值

### 方法

方法名 | 说明 | 参数 
---|---|---
addIcon | 添加一个或多个图标 | String / Array
removeIcon | 删除一个或多个图标 | String / Array

### 插槽

名称 | 说明 | 参数 
---|---|---
prepend | input 输入框前缀组件 | icon 参数为图标名称
icon | 图标列表显示组件 | icon 参数为图标名称
