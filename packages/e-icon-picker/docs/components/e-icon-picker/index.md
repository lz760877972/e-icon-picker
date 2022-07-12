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
  <e-icon-picker clearable>
  </e-icon-picker>
</template>
<script lang="ts">
import {defineComponent, reactive} from 'vue';

export default defineComponent({
  name: 'e-icon-picker-demo2',
  components: {},
  setup() {
    let state = reactive({
    
    });
    return {state};
  },
});
</script>
<style scoped lang="scss">

</style>
```

:::

:::demo

```vue

<template>
  <div class="popper-container">
    <div>
      <input type="radio" v-model="theme" id="light" value="light" />
      <label for="light">Light theme</label>
      <input type="radio" v-model="theme" id="dark" value="dark" />
      <label for="dark">Dark theme</label>
    </div>
    <e-popover :class="theme" arrow>
      <e-input/>
      <template #content>
        <div>This is the Popper content 🍿</div>
      </template>
    </e-popover>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'e-icon-picker-demo3',
  components: {},
  setup() {
    const theme = ref("light");

    return {
      theme,
    };
  },
});
</script>
<style scoped lang="scss">
.popper-container {
  padding: 20px;
  border: 2px dashed #dadada;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: space-around;
}
</style>
```

:::
