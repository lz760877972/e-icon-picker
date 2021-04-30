<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>组件内使用svg图标展示</h2>
    <e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
    名称：{{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>

import {onMounted, ref} from "vue";
//svgIcons 对应的就是图标列表，将图标列表添加到选择器就可以了
import svgIcons from 'e-icon-picker/lib/getSvg';

export default {
  name: "example6",
  setup() {
    let icon = ref("");
    let options = ref({FontAwesome: false, ElementUI: false, addIconList: [], removeIconList: []});
    let iconPicker = ref(null);

    onMounted(() => {

    })
    options.value.addIconList = svgIcons;
    return {
      icon,
      options,
      iconPicker
    }
  }
}
</script>
<style scoped>

</style>
