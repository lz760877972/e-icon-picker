<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>自定义触发器</h2>
    <e-icon-picker ref="e-icon-picker" v-model="icon" :width="500" :highLightColor="highLightColor" :options="options"
                   :zIndex="zIndex">
      <template v-slot:default="{data}">
        <el-button @click="show">{{ data.placeholder }}</el-button>
      </template>
    </e-icon-picker>
    名称： {{ icon }}
    <e-icon :icon-name="icon" />
  </div>
</template>

<script>
import {EIcon, EIconPicker,} from 'e-icon-picker';

export default {
  name: "example8",
  components: {
    EIconPicker, EIcon
  },
  data() {
    return {
      icon: '',
      highLightColor: "#fc1944",
      options: {FontAwesome: true, ElementUI: true},
      zIndex: 3500
    }
  },
  methods: {
    show() {
      this.$refs['e-icon-picker'].show()
    }
  }
}
</script>

<style lang="css" scoped>
@import '~e-icon-picker/lib/index.css';
@import '~font-awesome/css/font-awesome.min.css';
@import '~element-ui/lib/theme-chalk/icon.css';
</style>
