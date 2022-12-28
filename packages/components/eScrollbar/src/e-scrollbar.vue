<template>
  <div class="e-scrollbar" ref="eScrollbar">
    <div ref="wrap"
         :style="style"
         @scroll="handleScroll"
         class="e-scrollbar-wrap">
      <slot name="default"></slot>
    </div>
    <e-bar ref="barRef" :height="sizeHeight" :width="sizeWidth" :ratio-x="ratioX" :ratio-y="ratioY" :always="always"/>
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  StyleValue,
  watch
} from 'vue'
import {eBar, eBarInstance} from './eBar'
import {addUnit, GAP, scrollbarContextKey} from './util'
import {isNumber, isObject} from "../../../utils";
import {SCROLL_EVENT} from "../../../constants";

export default defineComponent({
  name: "e-scrollbar",
  props: {
    height: {
      type: [String, Number],
      default: '',
    },
    maxHeight: {
      type: [String, Number],
      default: '',
    },
    wrapStyle: {
      type: Object,
      default: () => ({})
    },
    always: Boolean,
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    minSize: {
      type: Number,
      default: 20,
    },
  },
  components: {
    eBar
  },
  setup(props, {emit}) {
    const eScrollbar = ref<HTMLDivElement>()
    const wrap = ref<HTMLDivElement>()
    let sizeWidth = ref<Number>(0)
    let sizeHeight = ref<Number>(0)
    let ratioY = ref<Number>(1)
    let ratioX = ref<Number>(1)
    const barRef = ref<eBarInstance>()

    const style = computed<StyleValue>(() => {
      const style: CSSProperties = {}
      if (props.height) style.height = addUnit(props.height)
      if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
      return [props.wrapStyle, style]
    })

    const update = () => {
      if (!wrap.value) return
      const offsetHeight = wrap.value.offsetHeight - GAP
      const offsetWidth = wrap.value.offsetWidth - GAP
      const originalHeight = offsetHeight ** 2 / wrap.value.scrollHeight
      const originalWidth = offsetWidth ** 2 / wrap.value.scrollWidth

      const height = Math.max(originalHeight, props.minSize)
      const width = Math.max(originalWidth, props.minSize)

      ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height))
      ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width))

      sizeHeight.value = height + GAP < offsetHeight ? height : 0
      sizeWidth.value = width + GAP < offsetWidth ? width : 0
    }


    watch(
        () => [props.maxHeight, props.height],
        () => {
          nextTick(() => {
            update()
            if (wrap.value) {
              barRef.value?.handleScroll(wrap.value)
            }
          })
        }
    )
    const scrollTo = (arg1: any, arg2?: any) => {
      if (isObject(arg1)) {
        wrap.value!.scrollTo(arg1)
      } else if (isNumber(arg1) && isNumber(arg2)) {
        wrap.value!.scrollTo(arg1, arg2)
      }
    }
    const setScrollTop = (value: number) => {
      if (!isNumber(value)) {
        console.warn('value must be a number')
        return
      }
      nextTick(() => {
        wrap.value!.scrollTop = value
      })
    }

    const setScrollLeft = (value: number) => {
      if (!isNumber(value)) {
        console.warn('value must be a number')
        return
      }

      nextTick(() => {
        wrap.value!.scrollLeft = value
      })
    }
    onMounted(() => {
      nextTick(() => update())
    })
    onUpdated(() => update())
    provide(
        scrollbarContextKey,
        reactive({
          scrollbarElement: eScrollbar,
          wrapElement: wrap,
        })
    )
    const handleScroll = () => {
      if (wrap.value) {
        barRef.value?.handleScroll(wrap.value)

        emit(SCROLL_EVENT, {
          scrollTop: wrap.value.scrollTop,
          scrollLeft: wrap.value.scrollLeft,
        })
      }
    }
    return {
      eScrollbar,
      wrap,
      style,
      sizeWidth,
      sizeHeight,
      ratioX,
      ratioY,
      update,
      barRef,
      handleScroll,
      setScrollTop,
      setScrollLeft,
      scrollTo
    }
  }
})
</script>

<style lang="scss" scoped>
@import "e-scrollbar.scss";
</style>
