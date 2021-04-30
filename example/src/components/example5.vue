<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>组件内使用iconfont图标展示</h2>
    <e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
    名称：{{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>

import {analyzingIconForIconfont} from 'e-icon-picker';
import iconfont from "../css/iconfont.json";
import {onMounted, ref} from "vue";

export default {
  name: "example5",
  setup() {
    let icon = ref("");
    let options = ref({FontAwesome: false, ElementUI: false, addIconList: [], removeIconList: []});
    let iconPicker = ref(null);
    const addIcon = () => {
      let icon = analyzingIconForIconfont(iconfont);
      options.value.addIconList = icon.list;
    }

    onMounted(() => {
      addIcon();
    })

    return {
      icon,
      options,
      iconPicker
    }
  }
}
</script>
<style scoped>
@import "../css/iconfont.css";
</style>
