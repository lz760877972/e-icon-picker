<template>
    <div style="margin: 0 auto;width: 500px">
        <h2>组件内动态设置以及方法展示</h2>
        <e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
        {{icon}}
    </div>
</template>

<script>
    export default {
        name: "example3",
        data() {
            return {
                icon: '',
                options: {FontAwesome: false, ElementUI: false, addIconList: [], removeIconList: []},
            }
        },
        mounted() {
            this.$refs['iconPicker'].addIcon("fa fa-slack");//组件内动态添加图标
            this.$refs['iconPicker'].removeIcon("fa fa-slack");//组件内动态删除图标
            setTimeout(() => {//通过修改参数进行重新设置组件
               this.options.addIconList.push('el-icon-message-solid');
               this.options.removeIconList.push('removeIconList');
               console.log("定时任务触发")
            }, 5000);
        }
    }
</script>

<style scoped>

</style>
