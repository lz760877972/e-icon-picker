<template>
  <div class="e-input"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave"
  >
    <!--  前缀图标区域 v-if="$slots.prepend" -->
    <div class="prefix-icon">
      <slot name="prepend" v-bind:icon="state.prefixIcon">
        <e-icon :icon-name="state.prefixIcon" class="e-icon"/>
      </slot>
    </div>
    <input type="text"
           ref="input"
           :disabled="disabled"
           :readonly="readonly"
           :placeholder="placeholder"
           :style="style"
           :class="disabled ? 'is-disabled' : ''"
           @input="handleInput"
           @focus="handleFocus"
           @blur="handleBlur"
           @change="handleChange"
           class="e-input-inner"
    />
    <!--  清空按钮  -->
    <div class="suffix-icon" v-if="showClear" @click.stop="clear">
      <svg t="1657525825723" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        p-id="1823" width="200" height="200">
        <path
            d="M466.986667 512L376.021333 421.973333a33.450667 33.450667 0 0 1-8.96-22.997333 30.72 30.72 0 0 1 9.514667-22.485333 30.72 30.72 0 0 1 22.485333-9.514667c8.661333 0 16.341333 2.986667 22.997334 8.96l90.026666 91.050667 90.026667-91.008c9.301333-8.661333 19.797333-11.349333 31.445333-8.021334a30.890667 30.890667 0 0 1 22.528 22.485334c3.328 11.690667 0.682667 22.186667-8.021333 31.530666L557.013333 512l91.008 89.984c8.661333 9.344 11.349333 19.84 8.021334 31.488a30.890667 30.890667 0 0 1-22.485334 22.485333c-11.690667 3.370667-22.186667 0.682667-31.530666-7.978666L512 556.970667l-89.984 91.008a33.450667 33.450667 0 0 1-23.04 8.96 30.72 30.72 0 0 1-22.485333-9.472 30.72 30.72 0 0 1-9.472-22.485334c0-8.704 2.986667-16.341333 8.96-23.04L466.986667 512zM512 896c108.672-2.688 199.168-40.192 271.488-112.512C855.808 711.168 893.312 620.672 896 512c-2.688-108.672-40.192-199.168-112.512-271.488C711.168 168.192 620.672 130.688 512 128c-108.672 2.688-199.168 40.192-271.488 112.512C168.192 312.874667 130.688 403.370667 128 512c2.688 108.672 40.192 199.168 112.512 271.488C312.874667 855.808 403.370667 893.312 512 896z m0 64c-126.677333-3.328-232.192-47.146667-316.501333-131.498667C111.146667 744.192 67.328 638.72 64 512c3.328-126.677333 47.146667-232.192 131.498667-316.501333C279.808 111.146667 385.28 67.328 512 64c126.677333 3.328 232.192 47.146667 316.501333 131.498667C912.853333 279.808 956.672 385.28 960 512c-3.328 126.677333-47.146667 232.192-131.498667 316.501333C744.192 912.853333 638.72 956.672 512 960z"
            p-id="1824" :fill="state.focused ? '#606266' : '#C0C4CC'"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import {eIcon} from "../../eIcon";
import {computed, defineComponent, onMounted, reactive, shallowRef, watch} from "vue";
import {
  BLUR_EVENT,
  CHANGE_EVENT,
  CLEAR_EVENT,
  FOCUS_EVENT,
  INPUT_EVENT,
  MOUSE_ENTER_EVENT,
  MOUSE_LEAVE_EVENT,
  UPDATE_MODEL_EVENT
} from "../../../constants";

type TargetElement = HTMLInputElement;
export default defineComponent({
  name: "e-input",
  components: {
    eIcon
  },
  props: {
    prefixIcon: {
      type: String,
      default: 'eiconfont e-icon-bi'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    style: {
      type: Object,
      default: {}
    },
    clearable: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: String,
      default: ""
    },
  },
  setup(props, {emit}) {
    const state = reactive({
      prefixIcon: props.prefixIcon,
      focused: false,
      hovering: false,
    })
    const input = shallowRef<HTMLInputElement>()
    const _ref = computed(() => input.value)
    const nativeInputValue = computed(() =>
        !props.modelValue ? '' : String(props.modelValue)
    )

    const handleInput = (event: Event) => {
      let {value} = event.target as TargetElement

      emit(UPDATE_MODEL_EVENT, value)
      emit(INPUT_EVENT, value)
      setNativeInputValue()
    }

    const handleFocus = (event: FocusEvent) => {
      state.focused = true
      emit(FOCUS_EVENT, event)
    }


    const handleBlur = (event: FocusEvent) => {
      state.focused = false
      emit(BLUR_EVENT, event)
    }

    const handleChange = (event: Event) => {
      emit(CHANGE_EVENT, (event.target as TargetElement).value)
    }

    const showClear = computed(
        () =>
            props.clearable &&
            !props.disabled &&
            !props.readonly &&
            !!nativeInputValue.value &&
            (state.focused || state.hovering)
    )


    const handleMouseLeave = (evt: MouseEvent) => {
      state.hovering = false
      emit(MOUSE_LEAVE_EVENT, evt)
    }

    const handleMouseEnter = (evt: MouseEvent) => {
      state.hovering = true
      emit(MOUSE_ENTER_EVENT, evt)
    }

    const setNativeInputValue = () => {
      const input = _ref.value
      if (!input || input.value === nativeInputValue.value) return
      input.value = nativeInputValue.value
    }

    watch(nativeInputValue, () => setNativeInputValue())

    onMounted(async () => {
      setNativeInputValue()
    })
    const clear = () => {
      emit(UPDATE_MODEL_EVENT, '')
      emit(CHANGE_EVENT, '')
      emit(CLEAR_EVENT)
      emit(INPUT_EVENT, '')
    }

    return {
      state,
      handleInput,
      handleFocus,
      handleBlur,
      handleChange,
      showClear,
      handleMouseLeave,
      handleMouseEnter,
      input,
      clear
    }
  }
})
</script>

<style lang="scss" scoped>
@import "e-input.scss";
</style>
