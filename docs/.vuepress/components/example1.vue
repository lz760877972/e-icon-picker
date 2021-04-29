<template>
  <div style="margin: 0 auto;width: 500px">
    <h2>基础用法</h2>
    <e-icon-picker v-model="icon"/>
    名称： {{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
export default {
  name: "example1",
  data() {
    return {
      icon: '',
    }
  },
}
</script>
