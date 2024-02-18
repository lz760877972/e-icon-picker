<script setup lang="ts">
import {ref} from "vue";

let icon = ref("");
</script>

<template>
  <h1>组件调试</h1>
  <e-icon-picker v-model="icon" clearable highLightColor="#ff0000" size="large"/>
</template>

<style scoped>

</style>
