<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>基础用法</h2>
    <e-icon-picker v-model="icon" :highLightColor="highLightColor" :options="options" :zIndex="zIndex" />
    名称： {{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
import {EIcon, EIconPicker,} from 'e-icon-picker';

export default {
  name: "example1",
  components: {
    EIconPicker, EIcon
  },
  data() {
    return {
      icon: '',
      highLightColor: "#fc1944",
      options: {FontAwesome: true, ElementUI: true},
      zIndex:3500
    }
  },
}
</script>

<style lang="css" scoped>
@import '~e-icon-picker/lib/index.css';
@import '~font-awesome/css/font-awesome.min.css';
@import '~element-ui/lib/theme-chalk/icon.css';
</style>
