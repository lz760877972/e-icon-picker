<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>基础用法</h2>
    <e-icon-picker v-model="icon"/>
    名称： {{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: "example1",
  setup() {
    let icon = ref("")

    return {
      icon
    }
  }
}
</script>

<style scoped>

</style>
