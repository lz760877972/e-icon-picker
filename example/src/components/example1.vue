<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>基础用法</h2>
    <e-icon-picker v-model="icon" :highLightColor="highLightColor" :options="options"/>
    名称： {{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {EIcon, EIconPicker} from 'e-icon-picker';

export default defineComponent({
  name: "example1",
  components: {
    EIconPicker, EIcon
  },
  setup() {
    let icon = ref("")
    let highLightColor = ref("#fc1944")
    let options = ref({FontAwesome: true, ElementUI: true});
    return {
      icon,
      highLightColor,
      options
    }
  }
})
</script>
<style lang="css" scoped>
@import '~e-icon-picker/lib/index.css';
@import '~font-awesome/css/font-awesome.min.css';
@import '~element-plus/lib/theme-chalk/el-icon.css';
</style>

