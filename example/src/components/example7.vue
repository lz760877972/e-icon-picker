<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>在dialog中使用</h2>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    名称：{{ icon }}
    <e-icon :icon-name="icon" />

    <el-dialog
        title="在dialog中使用"
        v-model="dialogVisible"
        width="30%">
      <e-icon-picker ref="iconPicker" v-model="icon" :options="options" />
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import {defineComponent, onMounted, ref, watch} from "vue";
//svgIcons 对应的就是图标列表，将图标列表添加到选择器就可以了
import svgIcons from 'e-icon-picker/lib/getSvg';

export default defineComponent({
  name: "example7",
  setup() {
    let icon = ref("");
    let dialogVisible = ref(false);
    let options = ref({FontAwesome: false, ElementUI: false, addIconList: [], removeIconList: []});
    let iconPicker = ref(null);

    options.value.addIconList = svgIcons;

    watch(() => dialogVisible, (val) => {
      console.log(val, iconPicker)
      if (!val.value && iconPicker && iconPicker.value) {
        iconPicker.value.destroyIconList()
      }
    }, {deep: true})

    return {
      icon,
      options,
      iconPicker,
      dialogVisible
    }
  }
})
</script>
<style scoped>

</style>
