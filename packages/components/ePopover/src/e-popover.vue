<template>
  <div
      class="e-popover"
      :style="interactiveStyle"
      @mouseleave="hover && closePopper()"
      ref="popperContainerNode"
  >
    <div
        ref="triggerNode"
        :style="{display:display}"
        @mouseover="hover && openPopper()"
        @click="togglePopper"
        @focus="openPopper"
        @keyup.esc="closePopper"
    >
      <!-- The default slot to trigger the popper  -->
      <slot/>
    </div>
    <teleport :to="container" :disabled="!appendContainer">
      <Transition name="fade">
        <div
            @click="!interactive && closePopper()"
            v-show="shouldShowPopper"
            class="popper"
            ref="popperNode"
            :class="contentClass"
            :style="{zIndex: zIndex,width:`${width}px`,height:`${height}px`,maxHeight:`${maxHeight}px`,maxWidth:`${maxWidth}px`}"
        >
          <slot name="content" :close="close" :isOpen="modifiedIsOpen">
            {{ content }}
          </slot>
          <e-arrow v-if="arrow"/>
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, toRefs, watch, watchEffect} from 'vue'
import {eArrow} from "./eArrow";
import { useContent, usePopper} from "./util/index";
import {useZIndex} from "../../../utils/zIndex";
import { useDebounceFn } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
export default defineComponent({
  name: "e-popover",
  components: {
    eArrow
  },
  props: {

    /**
     * 显示的位置（“auto”放置位置将选择空间最大的一侧）
     */
    placement: {
      type: String,
      default: "bottom",
      validator: (value: string) => {
        return [
          "auto",
          "auto-start",
          "auto-end",
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "right",
          "right-start",
          "right-end",
          "left",
          "left-start",
          "left-end",
        ].includes(value);
      },
    },
    /**
     * Disables automatically closing the popover when the user clicks away from it
     */
    disableClickAway: {
      type: Boolean,
      default: false,
    },
    /**
     * Offset in pixels along the trigger element
     */
    offsetSkid: {
      type: String,
      default: "0",
    },
    /**
     * Offset in pixels away from the trigger element
     */
    offsetDistance: {
      type: String,
      default: "12",
    },
    /**
     * Trigger the popper on hover
     */
    hover: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually open/close the Popper, other events are ignored if this prop is set
     */
    show: {
      type: Boolean,
      default: null,
    },
    /**
     * Disables the Popper. If it was already open, it will be closed.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Open the Popper after a delay (ms).
     */
    openDelay: {
      type: [Number],
      default: 0,
    },
    /**
     * Close the Popper after a delay (ms).
     */
    closeDelay: {
      type: [Number],
      default: 0,
    },
    /**
     * The z-index of the Popper.
     */
    zIndex: {
      type: [Number],
      default: 0
    },
    /**
     * Display an arrow on the popper
     */
    arrow: {
      type: Boolean,
      default: false,
    },
    /**
     * Stop arrow from reaching the edge of the popper
     */
    arrowPadding: {
      type: String,
      default: "0",
    },
    /**
     * If the Popper should be interactive, it will close when clicked/hovered if false
     */
    interactive: {
      type: Boolean,
      default: true,
    },
    /**
     * Lock the Popper into place, it will not flip dynamically when it runs out of space if true
     */
    locked: {
      type: Boolean,
      default: false,
    },
    /**
     * If the content is just a simple string, it can be passed in as a prop
     */
    content: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: 200,
    },
    maxHeight: {
      type: Number,
      default: 400,
    },
    width: {
      type: Number,
      default: 500,
    },
    maxWidth: {
      type: Number,
      default: 800,
    },
    container: {
      type: String,
      default: 'body',
    },
    appendContainer: {
      type: Boolean,
      default: false,
    },
    contentClass: {
      type: String,
      default: '',
    },
    display: {
      type: String,
      default: 'block',
    },
  },
  setup(props, {slots, emit}) {
    const popperContainerNode = ref<HTMLDivElement|null>(null);
    const popperNode = ref(null);
    const triggerNode = ref(null);
    const modifiedIsOpen = ref(false);
    const {nextZIndex} = useZIndex()
    let zIndex = props.zIndex || nextZIndex()
    onMounted(() => {
      const children = slots.default?.() ?? [];

      if (children && children.length > 1) {
        return console.error(
            `[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`,
        );
      }
    });

    const {
      arrowPadding,
      closeDelay,
      content,
      disableClickAway,
      disabled,
      interactive,
      locked,
      offsetDistance,
      offsetSkid,
      openDelay,
      placement,
      show,
    } = toRefs(props);


    const {isOpen, open, close} = usePopper({
      arrowPadding,
      emit,
      locked,
      offsetDistance,
      offsetSkid,
      placement,
      popperNode,
      triggerNode,
    });

    const {hasContent} = useContent(slots, popperNode, content);
    const manualMode = computed(() => show.value !== null);
    const invalid = computed(() => disabled.value || !hasContent.value);
    const shouldShowPopper = computed(() => isOpen.value && !invalid.value);
    const enableClickAway = computed(() => !disableClickAway.value && !manualMode.value,);
    // Add an invisible border to keep the Popper open when hovering from the trigger into it
    const interactiveStyle = computed(() =>
        interactive.value ? `border: ${offsetDistance.value}px solid transparent; margin: -${offsetDistance.value}px;` : null,
    );

    const openPopperDebounce = useDebounceFn(open, openDelay.value);
    const closePopperDebounce = useDebounceFn(close, closeDelay.value);
    const openPopper = async () => {
      if (invalid.value || manualMode.value) {
        return;
      }
      zIndex = props.zIndex || nextZIndex()
      openPopperDebounce();
    };

    const closePopper = async () => {
      if (manualMode.value) {
        return;
      }
      closePopperDebounce();
    };

    const togglePopper = () => {
      isOpen.value ? closePopper() : openPopper();
    };

    /**
     * If Popper is open, we automatically close it if it becomes
     * disabled or without content.
     */
    watch([hasContent, disabled], ([hasContent, disabled]) => {
      if (isOpen.value && (!hasContent || disabled)) {
        close();
      }
    });

    /**
     * In order to eliminate flickering or visibly empty Poppers due to
     * the transition when using the isOpen slot property, we need to return a
     * separate debounced value based on isOpen.
     */
    watch(isOpen, isOpen => {
      if (isOpen) {
        zIndex = props.zIndex
        modifiedIsOpen.value = true;
      } else {
        useDebounceFn(() => {
          modifiedIsOpen.value = false;
        }, 200);
      }
    });


    /**
     * Watch for manual mode.
     */
    watchEffect(() => {
      if (manualMode.value) {
        show.value ? openPopperDebounce() : closePopperDebounce();
      }
    });

    /**
     * Use click away if it should be enabled.
     */
    watchEffect(() => {
      if (enableClickAway.value) {
        onClickOutside(popperContainerNode, closePopper)
      }
    });

    return {
      interactiveStyle,
      closePopper,
      openPopper,
      togglePopper,
      popperContainerNode,
      triggerNode,
      shouldShowPopper,
      popperNode,
      modifiedIsOpen,
      close,
      zIndex
    }
  }
})
</script>

<style lang="scss">
@import "e-popover.scss";
</style>
