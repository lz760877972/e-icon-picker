<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>组件内动态设置以及方法展示</h2>
    <e-icon-picker ref="iconPicker" v-model="icon" :options="options" default-icon="el-icon-edit" placeholder="请选择"
                   size="medium" :emptyText="emptyText"/>
    名称：{{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  name: "example3",
  setup() {
    let icon = ref("");
    let emptyText = ref("No icon available");
    let options = ref({FontAwesome: false, ElementUI: false, addIconList: [], removeIconList: []});
    let iconPicker = ref(null);

    onMounted(() => {
      iconPicker.value.addIcon("fa fa-slack");//组件内动态添加图标
      iconPicker.value.removeIcon("fa fa-slack");//组件内动态删除图标

      setTimeout(() => {//通过修改参数进行重新设置组件
        options.value.addIconList.push('el-icon-message-solid');
        options.value.addIconList.push('http://www.icosky.com/images/wj/baidu.gif');
        options.value.removeIconList.push('removeIconList');
        console.log("定时任务触发");
      }, 5000);
    })

    return {
      icon,
      options,
      iconPicker,
      emptyText
    }
  }
})
</script>

<style scoped>

</style>
