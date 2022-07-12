# e-icon-picker 图标选择器

为页面提供导航的组件。

#### 何时使用

需要通过分组组织菜单的时候使用。

### 基本用法

:::demo

```vue

<template>
  <e-input v-model="icon"/>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'e-icon-picker-demo',
  components: {},
  setup() {
    let icon = ref("aaaa");
    return {icon};
  },
});
</script>
<style scoped lang="scss">
</style>
```

:::

### 基本用法2

:::demo

```vue

<template>
  <e-scrollbar :max-height="50" :height="50">
    <ul class="fas-icon-list" v-if="state.eIconList && state.eIconList.length > 0">
      <li v-for="(item, index) in state.eIconList" :key="index" title="复制">
        <e-icon :icon-name="item"/>
      </li>
    </ul>
  </e-scrollbar>
</template>
<script lang="ts">
import {defineComponent, reactive} from 'vue';
import {eIconList} from 'e-icon-picker';

export default defineComponent({
  name: 'e-icon-picker-demo2',
  components: {},
  setup() {
    let state = reactive({
      eIconList: eIconList
    });
    return {state};
  },
});
</script>
<style scoped lang="scss">
.fas-icon-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.fas-icon-list li {
  width: 25px;
  height: 25px;
  margin: 5px;
  text-align: left;
  display: flex;
  align-items: center;
}

.fas-icon-list li:hover {
  background-color: #9dbed8;
}

.fas-icon-list li i, .fas-icon-list li svg, .fas-icon-list li div {
  font-size: 20px;
  cursor: pointer;
  margin: 5px;
}

.text {
  white-space: nowrap; /*一行显示*/
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /*用...代替超出部分*/
  flex: 1;
}
</style>
```

:::
