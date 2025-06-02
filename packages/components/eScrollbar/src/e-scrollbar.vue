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

<script lang="ts" setup>
import type {EScrollbarEmits, EScrollbarProps} from "./types";
import {eBar, type eBarInstance} from "./eBar";
import {
  computed,
  type CSSProperties,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  type StyleValue,
  watch
} from "vue";
import {addUnit, GAP, scrollbarContextKey} from "./util";
import {isNumber, isObject} from "lodash-es";

defineOptions({
  inheritAttrs: true,
  name: 'e-scrollbar'
})
const props = withDefaults(defineProps<EScrollbarProps>(), {
  minSize: 20,
  maxHeight: '',
  height: '',
  always: true,
  wrapStyle: () => ({})
})
const emits = defineEmits<EScrollbarEmits>()

const eScrollbar = ref<HTMLDivElement>()
const wrap = ref<HTMLDivElement>()
const sizeWidth = ref<number>(0)
const sizeHeight = ref<number>(0)
const ratioY = ref<number>(1)
const ratioX = ref<number>(1)
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

  ratioY.value = (originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height))) || 1
  ratioX.value = (originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width))) || 1

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

    emits("scroll", {
      scrollTop: wrap.value.scrollTop,
      scrollLeft: wrap.value.scrollLeft,
    })
  }
}
// 暴露变量
defineExpose({
  setScrollLeft,
  setScrollTop,
  scrollTo,
  update,
});

</script>

<style lang="scss" scoped>
@use "e-scrollbar.scss";
</style>
