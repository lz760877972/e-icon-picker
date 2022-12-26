<template>
  <e-thumb :move="moveX" :ratio="ratioX" :size="width" :always="always"/>
  <e-thumb
      :move="moveY"
      :ratio="ratioY"
      :size="height"
      vertical
      :always="always"
  />
</template>
<script lang="ts">

import {defineComponent, reactive, toRefs} from 'vue'
import {eThumb} from '../eThumb'
import {GAP} from '../util'


export default defineComponent({
  name: "e-bar",
  props: {
    always: {
      type: Boolean,
      default: true
    },
    ratioY: {
      type: Number,
      default: 1
    },
    ratioX: {
      type: Number,
      default: 1
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
  },
  components: {
    eThumb
  },
  setup(props) {
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

    return {
      ...toRefs(state),
      handleScroll
    }
  }
})
</script>
<style lang="scss" scoped>
@import "e-bar.scss";
</style>
