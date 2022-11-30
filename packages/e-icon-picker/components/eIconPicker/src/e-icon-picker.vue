<template>
  <div class="e-icon-picker" :class="`e-icon-picker-${id}`">
    <!-- 弹出框 -->
    <e-popover
        ref="popover"
        :placement="myPlacement"
        :disabled="disabled"
        :readonly="readonly"
        :width="popoverWidth"
        :content-class="contentClass"
        :max-height="400"
        :z-index="zIndex"
        arrow
        :append-container="appendBody"
        :show="visible"
        :display="display"
    >
      <template #default>
        <div @click="popoverShowFun(false)" :style="{display:display}" ref="triggerWrapper" class="trigger-wrapper">
          <slot name="default"
                v-bind:data="{prefixIcon,visible,placeholder,disabled,clearable,readonly,size}">
            <e-input
                v-model="name"
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
                <slot name="prepend" v-bind:icon="prefixIcon">
                  <e-icon :icon-name="prefixIcon" class="e-icon"/>
                </slot>
              </template>
            </e-input>
          </slot>
        </div>
      </template>
      <template #content>
        <e-scrollbar
            ref="eScrollbar"
            :class="'is-empty-'+id"
            v-if="!destroy"
        >
          <ul
              class="e-icon-picker-icon-list"
              ref="fasIconList"
              v-if="dataList && dataList.length > 0"
          >
            <li
                v-for="(item, index) in dataList"
                :key="index"
                :style="name === item && highLightColor !== '' ? {'color': highLightColor} : ''"
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

<script>
import {eIcon} from "../../eIcon";
import {eInput} from "../../eInput";
import {ePopover} from "../../ePopover";
import {eScrollbar} from "../../eScrollbar";
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch
} from "vue";
import {iconList, isServer, off, on} from "../../utils";
import {CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT} from "../../constants";
import {useZIndex} from "../../utils/zIndex";

export default defineComponent({
  name: "eIconPicker",
  components: {
    eIcon,
    eInput,
    ePopover,
    eScrollbar
  },
  props: {
    // 是否禁用文本框
    disabled: {
      type: Boolean,
      // false
      default: false
    },
    readonly: {
      type: Boolean,
      // false
      default: false
    },
    clearable: {
      type: Boolean,
      // true
      default: false
    },
    // e-icon-picker 样式
    styles: {
      type: Object,
      default() {
        return {};
      },
    },
    // 弹出框位置
    placement: {
      type: String,
      default: 'bottom'
    },
    modelValue: {
      type: String,
      default: ""
    },
    options: {
      type: Object
    },
    width: {
      type: Number,
      default: -1
    },
    size: {
      type: String,
      default: "medium"
    },
    placeholder: {
      type: String,
      default: "请选择图标"
    },
    defaultIcon: {
      type: String,
      default: "eiconfont e-icon-bi"
    },
    emptyText: {
      type: String,
      default() {
        return "暂无可选图标";
      },
    },
    highLightColor: {
      type: String,
      default() {
        return "";
      },
    },
    zIndex: {
      type: Number,
      default() {
        return null;
      },
    },
    appendBody: {
      type: Boolean,
      default: true
    },
    contentClass: {
      type: String,
      default() {
        return "";
      },
    }
  },
  emits: [CHANGE_EVENT, UPDATE_MODEL_EVENT, INPUT_EVENT],
  setup(props, context) {
    let input = ref(null);
    let eScrollbar = ref(null);
    let popover = ref(null);
    let fasIconList = ref(null);
    let triggerWrapper = ref(null);
    // let display = ref("block");
    const {nextZIndex} = useZIndex()
    const state = reactive({
      iconList: [],
      visible: false, // popover v-model
      prefixIcon: "eiconfont e-icon-bi",
      name: "",
      icon: {},
      myPlacement: "bottom",
      popoverWidth: 200,
      dataList: computed(() => {
        //去重
        let arr1 = []; // 新建一个数组来存放arr中的值
        for (let i = 0, len = state.iconList.length; i < len; i++) {
          if (arr1.indexOf(state.iconList[i]) === -1) {
            arr1.push(state.iconList[i]);
          }
        }
        return arr1;
      }),
      destroy: false,
      id: new Date().getTime(),
      zIndex: nextZIndex(),
      display:"block"
    })

    //绑定时检查宽度
    onMounted(() => {
      updateW();
      //检测触发组件的类型

      let children = triggerWrapper.value.children[0]
      if (triggerWrapper.value.offsetWidth > children?.offsetWidth) {
        state.display = "inline-block"
      }else {
        state.display = "block"
      }
    })

    onBeforeMount(() => {
      //初始化
      createIconList()
      initIcon(true);
    })

    onBeforeUnmount(() => {
      if (!isServer) {
        off(document, "mouseup", popoverHideFun);
      }
      destroyIconList()
    })

    watch(() => props.modelValue, (val) => {
      state.name = val;
      state.prefixIcon = state.name ? state.name : props.defaultIcon;
    }, {deep: true})

    watch(() => props.options, (val) => {
      initIcon(true);
    }, {deep: true})


    watch(() => state.visible, (newValue) => {
      if (newValue === false) {
        nextTick(() => {
          if (!isServer) {
            off(document, "mouseup", popoverHideFun);
          }
        });
      } else {
        nextTick(() => {
          createIconList();
          if (!isServer) {
            on(document, "mouseup", popoverHideFun);
          }
        });
      }
    }, {deep: true})

    const change = (val) => {
      state.iconList = state.icon.list.filter((i) => i.indexOf(val) !== -1);
    }

    const initIcon = (type) => {
      state.prefixIcon = props.modelValue && type && true === type ? props.modelValue : props.defaultIcon;
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
    const selectedIcon = (item) => {
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
        if (eScrollbar && eScrollbar.value && eScrollbar.value.setScrollTop) {
          setTimeout(() => {
            eScrollbar.value.setScrollTop(0);
            eScrollbar.value.update();
          }, 100);
        }
      });
    }


    const updatePopper = (zIndex) => {
      if (zIndex) {
        state.zIndex = zIndex
      }
      popoverShowFun(true);
    }
    // 显示弹出框的时候容错，查看是否和el宽度一致
    const popoverShowFun = (flag) => {
      if (props.readonly !== true && props.disabled !== true) {
        if (!flag && props.zIndex) {
          state.zIndex = props.zIndex
        } else {
          state.zIndex  = nextZIndex()
        }
        state.visible = true;
        updateW();
      }
    }

    // 点击控件外，判断是否隐藏弹出框
    const popoverHideFun = (e) => {
      let path = e.path || (e.composedPath && e.composedPath());
      let isInter = path.some((list) => {
        return list.className && (list.className.toString().indexOf("is-empty-" + state.id) !== -1 ||
            (list.className.toString().indexOf("e-icon-picker-" + state.id) !== -1));
      });
      if (!isInter) {
        state.visible = false;
      }
    }
    // 判断类型，抛出当前选中id
    const emitFun = (val) => {
      context.emit("update:modelValue", val);
      context.emit("change", val);
      context.emit('input', val)
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
