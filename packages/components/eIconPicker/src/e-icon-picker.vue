<template>
  <div class="e-icon-picker" :class="`e-icon-picker-${state.id}`" v-element-size="updateW">
    <!-- 弹出框 -->
    <e-popover
        ref="popover"
        :placement="state.myPlacement"
        :disabled="disabled"
        :readonly="readonly"
        :width="state.popoverWidth"
        :content-class="contentClass"
        :max-height="400"
        :z-index="zIndex"
        arrow
        :append-container="appendBody"
        :show="state.visible"
        :display="state.display"
    >
      <template #default>
        <div @click="popoverShowFun(false)" :style="{display:state.display}" ref="triggerWrapper"
             class="trigger-wrapper">
          <slot name="default"
                v-bind:data="{prefixIcon:state.prefixIcon,visible:state.visible,placeholder,disabled,clearable,readonly,size}">
            <e-input
                v-model="state.name"
                :placeholder="placeholder"
                ref="input"
                :style="styles"
                :clearable="clearable"
                :disabled="disabled"
                :readonly="readonly"
                :size="size"
                @input="change"
                @clear="initIcon(false)"
            >
              <template #prepend slot="prepend">
                <slot name="prepend" v-bind:icon="state.prefixIcon">
                  <e-icon :icon-name="state.prefixIcon" class="e-icon"/>
                </slot>
              </template>
            </e-input>
          </slot>
        </div>
      </template>
      <template #content>
        <e-scrollbar
            ref="eScrollbarRef"
            :class="'is-empty-'+state.id"
            v-if="!state.destroy"
        >
          <ul
              class="e-icon-picker-icon-list"
              ref="fasIconList"
              v-if="state.dataList?.length > 0"
          >
            <li
                v-for="(item, index) in state.dataList"
                :key="index"
                :style="state.name === item && highLightColor !== '' ? {'color': highLightColor,'--e-icon-color':highLightColor} : ''"
            >
              <slot name="icon" v-bind:icon="item">
                <e-icon :icon-name="item" :title="item" @click="selectedIcon" class="e-icon"/>
              </slot>
            </li>
          </ul>
          <span v-else class="e-icon-picker-no-data" v-text="emptyText"></span>
        </e-scrollbar>
      </template>
    </e-popover>
  </div>
</template>

<script lang="ts" setup>
import {eIcon} from "../../eIcon";
import {eInput, type InputInstance} from "../../eInput";
import {ePopover, type PopoverInstance} from "../../ePopover";
import {eScrollbar, type ScrollbarInstance} from "../../eScrollbar";
import type {EIconPickerEmits, EIconPickerPlacement, EIconPickerProps} from "./types";
import {
  computed,
  type ComputedRef,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  shallowRef,
  watch
} from "vue";
import {useZIndex} from "../../../utils/zIndex";
import {isClient, useEventListener} from "@vueuse/core";
import {isString} from "lodash-es";
import {iconList} from "../../../utils";
import {vElementSize} from '@vueuse/components'

defineOptions({
  inheritAttrs: true,
  name: 'e-icon-picker'
})
const props = withDefaults(defineProps<EIconPickerProps>(), {
  disabled: false,
  readonly: false,
  clearable: false,
  styles: () => ({}),
  placement: 'bottom',
  modelValue: '',
  options: () => ({
    addIconList: [],
    removeIconList: []
  }),
  width: -1,
  size: 'default',
  placeholder: '请选择图标',
  defaultIcon: 'eiconfont e-icon-bi',
  emptyText: '暂无可选图标',
  highLightColor: '',
  appendBody: false,
  contentClass: '',
  zIndex: 0
})
const emits = defineEmits<EIconPickerEmits>()


const input = shallowRef<InputInstance>();
const eScrollbarRef = shallowRef<ScrollbarInstance>();
const popover = shallowRef<PopoverInstance>();
const fasIconList = shallowRef<HTMLUListElement>();
const triggerWrapper = shallowRef<HTMLDivElement>();
const {nextZIndex} = useZIndex()
const state = reactive<{
  iconList: string[],
  visible: boolean,
  prefixIcon: string,
  name: string,
  icon: any,
  myPlacement: EIconPickerPlacement,
  popoverWidth: number,
  dataList: ComputedRef<string[]>,
  destroy: boolean,
  id: number,
  zIndex: number,
  display: string
}>({
  iconList: [],
  visible: false, // popover v-model
  prefixIcon: "eiconfont e-icon-bi",
  name: "",
  icon: {},
  myPlacement: "bottom",
  popoverWidth: 200,
  dataList: computed(() => {
    //去重
    const arr: string[] = []; // 新建一个数组来存放arr中的值
    for (let i = 0, len = state.iconList.length; i < len; i++) {
      if (arr.indexOf(state.iconList[i]) === -1) {
        arr.push(state.iconList[i]);
      }
    }
    return arr;
  }),
  destroy: false,
  id: new Date().getTime(),
  zIndex: nextZIndex(),
  display: "block"
})

//绑定时检查宽度
onMounted(() => {
  updateW();
  //检测触发组件的类型
  let children: any = triggerWrapper.value!.children[0]
  if (triggerWrapper.value!.offsetWidth > children?.offsetWidth) {
    state.display = "inline-block"
  } else {
    state.display = "block"
  }
})

onBeforeMount(() => {
  //初始化
  createIconList()
  initIcon(true);
})

onBeforeUnmount(() => {
  destroyIconList()
})

watch(() => props.modelValue, (val) => {
  state.name = val;
  state.prefixIcon = state.name ? state.name : props.defaultIcon;
}, {deep: true})

watch(() => props.options, () => {
  initIcon(true);
}, {deep: true})


watch(() => state.visible, (newValue) => {
  if (newValue === false) {
  } else {
    nextTick(() => {
      createIconList();
      if (isClient) {
        useEventListener(document, "mouseup", popoverHideFun);
      }
    });
  }
}, {deep: true})

const change = (val: string) => {
  if (isString(val)) {
    state.iconList = state.icon.list.filter((i: string) => i.indexOf(val) !== -1);
  }
}

const initIcon = (type: boolean | undefined) => {
  state.prefixIcon = props.modelValue && type && type ? props.modelValue : props.defaultIcon;
  state.name = type === true ? props.modelValue : "";
  state.icon = Object.assign({}, iconList); //复制一个全局对象，避免全局对象污染
  if (props.options) {
    if (props.options.addIconList && props.options.addIconList.length > 0) {
      state.icon.list = []; //重新给图标集合复制为空
      state.icon.addIcon(props.options.addIconList);
    }
    if (props.options.removeIconList && props.options.removeIconList.length > 0) {
      state.icon.removeIcon(props.options.removeIconList);
    }
  }
  state.iconList = state.icon.list;
  if (props.placement && (props.placement === "bottom" || props.placement === "top")) {
    state.myPlacement = props.placement;
  }

  if (type === false) {
    emitFun("");
  }
}

const addIcon = (item = []) => {
  //组件内添加图标
  if (item && item.length > 0) {
    state.icon.addIcon(item);
    state.iconList = state.icon.list;
  }
}
const removeIcon = (item = []) => {
  //组件内删除图标
  if (item && item.length > 0) {
    state.icon.removeIcon(item);
    state.iconList = state.icon.list;
  }
}
const selectedIcon = (item: string) => {
  state.visible = false;
  state.name = item;
  state.prefixIcon = state.name;
  emitFun(state.prefixIcon);
}
// 更新宽度
const updateW = () => {
  nextTick(() => {
    if (props.width === -1 && input.value && input.value.$el) {
      state.popoverWidth = input.value.$el.getBoundingClientRect().width - 36;
    } else {
      state.popoverWidth = props.width;
    }

    if (eScrollbarRef && eScrollbarRef.value) {
      setTimeout(() => {
        eScrollbarRef.value?.setScrollTop(0);
        eScrollbarRef.value?.update();
      }, 100);
    }
  });
}


const updatePopper = (zIndex: number) => {
  if (zIndex) {
    state.zIndex = zIndex
  }
  popoverShowFun(true);
}
// 显示弹出框的时候容错，查看是否和el宽度一致
const popoverShowFun = (flag: boolean) => {
  if (!props.readonly && !props.disabled) {
    if (!flag && props.zIndex) {
      state.zIndex = props.zIndex
    } else {
      state.zIndex = nextZIndex()
    }
    state.iconList = state.icon.list
    state.visible = true;
    updateW();
  }
}

// 点击控件外，判断是否隐藏弹出框
const popoverHideFun = (e: any) => {
  let path = e.path || (e.composedPath && e.composedPath());
  let isInter = path.some((list: HTMLElement) => {
    return list.className && (list.className.toString().indexOf("is-empty-" + state.id) !== -1 ||
        (list.className.toString().indexOf("e-icon-picker-" + state.id) !== -1));
  });
  if (!isInter) {
    state.visible = false;
  }
}
// 判断类型，抛出当前选中id
const emitFun = (val: string) => {
  emits('update:modelValue', val);
  emits("change", val);
  emits('input', val)
}
/**
 * 销毁图标列表，不销毁输入框等
 */
const destroyIconList = () => {
  state.destroy = true;
}
/**
 * 重新创建图标列表
 */
const createIconList = () => {
  state.destroy = false;
}

const show = () => {
  popoverShowFun(false)
}
const hide = () => {
  state.visible = false
}

// 暴露变量
defineExpose({
  addIcon,
  removeIcon,
  destroyIconList,
  createIconList,
  updatePopper,
  show,
  hide,
});
</script>

<style lang="scss" scoped>
@use "e-icon-picker.scss";
</style>
