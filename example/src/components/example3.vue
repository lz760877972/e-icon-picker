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
export default {
  name: "example3",
  data() {
    return {
      icon: '',
      options: {FontAwesome: false, ElementUI: false, addIconList: [], removeIconList: []},
      emptyText: 'No icon available'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['iconPicker'].addIcon("fa fa-slack");//组件内动态添加图标
      this.$refs['iconPicker'].removeIcon("fa fa-slack");//组件内动态删除图标
    })
    let self = this;
    setTimeout(() => {//通过修改参数进行重新设置组件
      self.options.addIconList.push('el-icon-message-solid');
      self.options.addIconList.push('http://www.icosky.com/images/wj/baidu.gif');
      self.options.removeIconList.push('removeIconList');
      console.log("定时任务触发");
    }, 5000);
  }
}
</script>

<style scoped>

</style>
