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
            :style="{zIndex: mZIndex,width:`${width}px`,height:`${height}px`,maxHeight:`${maxHeight}px`,maxWidth:`${maxWidth}px`}"
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

<script lang="ts" setup>
import {computed, onMounted, Ref, ref, toRef, toRefs, useSlots, watch, watchEffect} from 'vue'
import {eArrow} from "./eArrow";
import {useContent, usePopper} from "./util/index";
import {useZIndex} from "../../../utils/zIndex";
import {onClickOutside, useDebounceFn} from '@vueuse/core'
import type {EPopoverEmits, EPopoverProps} from "./types";

defineOptions({
  inheritAttrs: true,
  name: 'e-popover'
})
const props = withDefaults(defineProps<EPopoverProps>(), {
  height: 200,
  maxHeight: 400,
  width: 500,
  maxWidth: 800,
  container: 'body',
  display: 'block',
  hover: false,
  appendContainer: false,
  arrowPadding: "0",
  closeDelay: 0,
  disableClickAway: false,
  arrow: false,
  disabled: false,
  interactive: true,
  locked: false,
  offsetDistance: "12",
  offsetSkid: "0",
  openDelay: 0,
  placement: 'bottom',
  zIndex: 1,
  content: null
})

const emits = defineEmits<EPopoverEmits>()


const popperContainerNode: Ref<HTMLDivElement | null> = ref<HTMLDivElement | null>(null);
const popperNode = ref(null);
const triggerNode = ref(null);
const modifiedIsOpen = ref(false);
const {nextZIndex} = useZIndex()
const mZIndex = ref(props.zIndex || nextZIndex())
const slots = useSlots();
const {arrowPadding, locked, offsetDistance, offsetSkid, placement} = toRefs(props);
onMounted(() => {
  const children = slots.default?.() ?? [];

  if (children && children.length > 1) {
    return console.error(
        `[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`,
    );
  }
});


const {isOpen, open, close} = usePopper({
  arrowPadding,
  emit: emits,
  locked,
  offsetDistance,
  offsetSkid,
  placement,
  popperNode,
  triggerNode,
});

const {hasContent} = useContent(slots, popperNode, toRef(props.content));
const manualMode = computed(() => props.show !== null);
const invalid = computed(() => props.disabled || !hasContent.value);
const shouldShowPopper = computed(() => isOpen.value && !invalid.value);
const enableClickAway = computed(() => !props.disableClickAway && !manualMode.value,);
// Add an invisible border to keep the Popper open when hovering from the trigger into it
const interactiveStyle = computed(() =>
    props.interactive ? `border: ${props.offsetDistance}px solid transparent; margin: -${props.offsetDistance}px;` : null,
);

const openPopperDebounce = useDebounceFn(open, props.openDelay);
const closePopperDebounce = useDebounceFn(close, props.closeDelay);
const openPopper = async () => {
  if (invalid.value || manualMode.value) {
    return;
  }
  mZIndex.value = props.zIndex || nextZIndex()
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
watch([hasContent, toRef(props.disabled)], ([hasContent, disabled]) => {
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
    mZIndex.value = props.zIndex || nextZIndex()
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
    props.show ? openPopperDebounce() : closePopperDebounce();
  }
});

/**
 * Use click away if it should be enabled.
 */
watchEffect(() => {
  if (enableClickAway.value) {
    onClickOutside(popperContainerNode.value, closePopper)
  }
});
</script>

<style lang="scss">
@use "e-popover.scss";
</style>
