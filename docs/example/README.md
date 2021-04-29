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

## 组件内使用彩色图标展示
<RecoDemo>
<template slot="code-vue">
    <<< @/docs/.vuepress/components/example4.vue
</template>
<example4 slot="demo"></example4>
</RecoDemo>

