<template>
  <transition name="fade">
    <div
        v-show="always || visible"
        ref="instance"
        class="e-thumb"
        @mousedown="clickTrackHandler"
        :class="vertical?'is-vertical':'is-horizontal'"
    >
      <div
          ref="eThumb"
          class="e-thumb-inner"
          :style="thumbStyle"
          @mousedown="clickThumbHandler"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import {computed, defineComponent, inject, onBeforeUnmount, ref, toRef} from 'vue'
import {useEventListener} from "@vueuse/core";
import {BAR_MAP, scrollbarContextKey} from '../util';
import {isClient} from "../../../../utils";

export default defineComponent({
  name: "e-thumb",
  props: {
    always: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 0
    },
    move: {
      type: Number,
      default: 0
    },
    ratio: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const visible = ref(false)
    let cursorDown = false
    let cursorLeave = false
    const eThumb = ref<HTMLDivElement>()
    const instance = ref<HTMLDivElement>()
    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
    let originalOnSelectStart: | ((this: GlobalEventHandlers, ev: Event) => any) | null = isClient ? document.onselectstart : null


    const scrollbar = inject(scrollbarContextKey)
    if (!scrollbar) {
      new Error('can not inject scrollbar context')
      return;
    }

    const clickTrackHandler = (e: MouseEvent) => {

      if (!eThumb.value || !instance.value || !scrollbar.wrapElement) return

      const offset = Math.abs((e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] - e[bar.value.client])
      const thumbHalf = eThumb.value[bar.value.offset] / 2
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 * offsetRatio.value) / instance.value[bar.value.offset]

      scrollbar.wrapElement[bar.value.scroll] = (thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]) / 100
    }


    const thumbStyle = computed(() => {
          const axis = props.vertical ? 'Y' : 'X'
          let style: any = {
            transform: `translate${axis}(${props.move}%)`,
          }
          if (props.vertical) {
            style.height = `${props.size}px`
          } else {
            style.width = `${props.size}px`
          }
          return style
        }
    )

    const offsetRatio = computed(
        () =>
            // offsetRatioX = original width of thumb / current width of thumb / ratioX
            // offsetRatioY = original height of thumb / current height of thumb / ratioY
            // instance height = wrap height - GAP
            instance.value![bar.value.offset] ** 2 / scrollbar.wrapElement![bar.value.scrollSize] / props.ratio / eThumb.value![bar.value.offset]
    )
    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (!instance.value || !eThumb.value) return
      if (!cursorDown) return

      const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1


      const thumbClickPosition = eThumb.value[bar.value.offset]

      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 * offsetRatio.value) / instance.value[bar.value.offset]
      scrollbar.wrapElement[bar.value.scroll] = (thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]) / 100
    }
    const restoreOnselectstart = () => {
      if (document.onselectstart !== originalOnSelectStart)
        document.onselectstart = originalOnSelectStart
    }

    const mouseUpDocumentHandler = () => {
      cursorDown = false
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
      restoreOnselectstart()
      if (cursorLeave) visible.value = false
    }


    const startDrag = (e: MouseEvent) => {
      e.stopImmediatePropagation()
      cursorDown = true
      document.addEventListener('mousemove', mouseMoveDocumentHandler)
      document.addEventListener('mouseup', mouseUpDocumentHandler)
      originalOnSelectStart = document.onselectstart
      document.onselectstart = () => false
    }
    const clickThumbHandler = (e: MouseEvent) => {
      // prevent click event of middle and right button
      e.stopPropagation()
      if (e.ctrlKey || [1, 2].includes(e.button)) return

      window?.getSelection()?.removeAllRanges()
      startDrag(e)

      const el = e.currentTarget as HTMLDivElement
      if (!el) return
    }
    onBeforeUnmount(() => {
      restoreOnselectstart()
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
    })
    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false
      visible.value = !!props.size
    }

    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true
      visible.value = cursorDown
    }
    useEventListener(
        toRef(scrollbar, 'scrollbarElement'),
        'mousemove',
        mouseMoveScrollbarHandler
    )
    useEventListener(
        toRef(scrollbar, 'scrollbarElement'),
        'mouseleave',
        mouseLeaveScrollbarHandler
    )

    return {
      visible,
      clickTrackHandler,
      clickThumbHandler,
      eThumb,
      thumbStyle,
      instance
    }
  }
})
</script>

<style lang="scss" scoped>
@import "e-thumb.scss";
</style>
