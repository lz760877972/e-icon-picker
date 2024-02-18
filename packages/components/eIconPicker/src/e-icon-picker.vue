<template>
  <div class="e-icon-picker" :class="`e-icon-picker-${state.id}`">
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
        <div @click="popoverShowFun(false)" :style="{display:state.display}" ref="triggerWrapper" class="trigger-wrapper">
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
            ref="eScrollbar"
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

<script lang="ts">
import {eIcon} from "../../eIcon";
import {eInput, InputInstance} from "../../eInput";
import {ePopover, PopoverInstance} from "../../ePopover";
import {eScrollbar, ScrollbarInstance} from "../../eScrollbar";
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  shallowRef,
  StyleValue,
  toRefs,
  watch
} from "vue";
import {iconList, isClient, isString, off, on} from "../../../utils";
import {CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT} from "../../../constants";
import {useZIndex} from "../../../utils/zIndex";

export class Options {
  addIconList?: Array<string>;
  removeIconList?: Array<string>;
}

export type Placement = "top" | "bottom";
export default defineComponent({
  name: "e-icon-picker",
  components: {
    eIcon,
    eInput,
    ePopover,
    eScrollbar
  },
  props: {
    /**
     * 是否禁用文本框
     */
    disabled: {
      type: Boolean,
      // false
      default: false
    },
    /**
     * 只读
     */
    readonly: {
      type: Boolean,
      // false
      default: false
    },
    /**
     * 可清空
     */
    clearable: {
      type: Boolean,
      // true
      default: false
    },
    /**
     *  e-icon-picker 样式
     */
    styles: {
      type: Object as PropType<StyleValue>,
      default() {
        return {};
      },
    },
    /**
     * 弹出框位置
     */
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
      validator: (value: string) => {
        return [
          "top",
          "bottom",
        ].includes(value);
      },
    },
    /**
     * 值
     */
    modelValue: {
      type: String,
      default: ""
    },
    /**
     * 参数
     */
    options: {
      type: Object as PropType<Options>,
      default: {
        addIconList: [],
        removeIconList: []
      }
    },
    /**
     * 宽度
     */
    width: {
      type: Number,
      default: -1
    },
    /**
     * 大小
     */
    size: {
      type: String,
      default: "default",
      validator: (value: string) => {
        return [
          "default",
          "small",
          "large"
        ].includes(value);
      },
    },
    /**
     * 原生提示
     */
    placeholder: {
      type: String,
      default: "请选择图标"
    },
    /**
     * 默认图标
     */
    defaultIcon: {
      type: String,
      default: "eiconfont e-icon-bi"
    },
    /**
     * 空列表显示文字
     */
    emptyText: {
      type: String,
      default() {
        return "暂无可选图标";
      },
    },
    /**
     * 高亮颜色
     */
    highLightColor: {
      type: String,
      default() {
        return "";
      },
    },
    /**
     * zindex
     */
    zIndex: {
      type: Number,
      default() {
        return null;
      },
    },
    /**
     * 是否追加到body
     */
    appendBody: {
      type: Boolean,
      default: false
    },
    /**
     * 内容自定义样式
     */
    contentClass: {
      type: String,
      default() {
        return "";
      },
    }
  },
  emits: [CHANGE_EVENT, UPDATE_MODEL_EVENT, INPUT_EVENT],
  setup(props, context) {
    let input = shallowRef<InputInstance>();
    let eScrollbar = shallowRef<ScrollbarInstance>();
    let popover = shallowRef<PopoverInstance>();
    let fasIconList = shallowRef<HTMLUListElement>();
    let triggerWrapper = shallowRef<HTMLDivElement>();
    // let display = ref("block");
    const {nextZIndex} = useZIndex()
    const state: any = reactive({
      iconList: [],
      visible: false, // popover v-model
      prefixIcon: "eiconfont e-icon-bi",
      name: "",
      icon: {},
      myPlacement: "bottom",
      popoverWidth: 200,
      dataList: computed(() => {
        //去重
        let arr = []; // 新建一个数组来存放arr中的值
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
      if (isClient) {
        off(document, "mouseup", popoverHideFun);
      }
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
        nextTick(() => {
          if (isClient) {
            off(document, "mouseup", popoverHideFun);
          }
        });
      } else {
        nextTick(() => {
          createIconList();
          if (isClient) {
            on(document, "mouseup", popoverHideFun);
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
        if (props.options.addIconList?.length > 0) {
          state.icon.list = []; //重新给图标集合复制为空
          state.icon.addIcon(props.options.addIconList);
        }
        if (props.options.removeIconList?.length > 0) {
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

        if (eScrollbar && eScrollbar.value) {
          setTimeout(() => {
            eScrollbar.value?.setScrollTop(0);
            eScrollbar.value?.update();
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
      context.emit(UPDATE_MODEL_EVENT, val);
      context.emit(CHANGE_EVENT, val);
      context.emit(INPUT_EVENT, val)
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
    return {
      popoverShowFun,
      change,
      initIcon,
      selectedIcon,
      addIcon,
      removeIcon,
      ...toRefs(state),
      state,
      input,
      eScrollbar,
      popover,
      fasIconList,
      updatePopper,
      createIconList,
      destroyIconList,
      show,
      hide,
      triggerWrapper
    }
  }
});
</script>

<style lang="scss" scoped>
@import "e-icon-picker.scss";
</style>
