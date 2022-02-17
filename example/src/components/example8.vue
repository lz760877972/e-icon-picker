<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>自定义触发器</h2>
    <e-icon-picker ref="iconPicker" v-model="icon" :width="500" :highLightColor="highLightColor" :options="options"
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
import {defineComponent, ref} from 'vue'
import {EIcon, EIconPicker} from 'e-icon-picker';

export default defineComponent({
  name: "example8",
  components: {
    EIconPicker, EIcon
  },
  setup() {
    let icon = ref("")
    let highLightColor = ref("#fc1944")
    let iconPicker = ref(null);
    let zIndex = ref(3500)
    let options = ref({FontAwesome: true, ElementUI: true});
    const show = () => {
      iconPicker.value.show()
    }
    return {
      icon,
      highLightColor,
      options,
      zIndex,
      iconPicker,
      show
    }
  }
})
</script>
<style lang="css" scoped>
@import '~e-icon-picker/lib/index.css';
@import '~font-awesome/css/font-awesome.min.css';
@import '~element-plus/theme-chalk/el-icon.css';
</style>

