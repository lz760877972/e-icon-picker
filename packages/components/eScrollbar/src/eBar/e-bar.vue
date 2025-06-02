<template>
  <e-thumb :move="state.moveX" :ratio="ratioX" :size="width" :always="always"/>
  <e-thumb
      :move="state.moveY"
      :ratio="ratioY"
      :size="height"
      vertical
      :always="always"
  />
</template>
<script lang="ts" setup>
import {reactive, watch} from 'vue'
import {eThumb} from '../eThumb'
import {GAP} from '../util'
import type {EBarProps} from "./types.ts";

defineOptions({
  inheritAttrs: true,
  name: 'e-bar'
})
const props = withDefaults(defineProps<EBarProps>(), {
  always: true,
  ratioY: 1,
  ratioX: 1,
  width: 0,
  height: 0
})

const state = reactive({
  moveX: 0,
  moveY: 0
})
const handleScroll = (wrap: HTMLDivElement) => {
  if (wrap) {
    const offsetHeight = wrap.offsetHeight - GAP
    const offsetWidth = wrap.offsetWidth - GAP

    state.moveY = ((wrap.scrollTop * 100) / offsetHeight) * props.ratioY
    state.moveX = ((wrap.scrollLeft * 100) / offsetWidth) * props.ratioX
  }
}
// 暴露变量
defineExpose({
  handleScroll,
});
</script>
<style lang="scss" scoped>
@use "e-bar.scss";
</style>
