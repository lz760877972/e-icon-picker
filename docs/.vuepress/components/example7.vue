<template>
  <div style="margin: 0 auto;width: 500px">
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    名称：{{ icon }}
    <e-icon :icon-name="icon"/>
    <el-dialog
        title="在dialog中使用"
        :visible.sync="dialogVisible"
        width="30%">
      <e-icon-picker v-model="icon"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//svgIcons 对应的就是图标列表，将图标列表添加到选择器就可以了
export default {
  name: "example7",
  data() {
    return {
      icon: '',
      dialogVisible: false
    }
  }
}
</script>
