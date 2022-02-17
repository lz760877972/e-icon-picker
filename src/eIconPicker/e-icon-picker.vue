<template>
  <div class="ui-fas">
    <!-- 弹出框 -->
    <el-popover
        ref="popover"
        :placement="state.myPlacement"
        :disabled="disabled"
        popper-class="el-icon-popper"
        :width="state.popoverWidth"
        v-model:visible="state.visible"
        show-arrow
        trigger="manual"
    >
      <template #reference>
        <slot name="default"
              v-bind:data="{prefixIcon:state.prefixIcon,visible:state.visible,placeholder,disabled,clearable,readonly,size}">
          <el-input
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
              @focus="popoverShowFun(false)"
          >
            <template #prepend slot="prepend">
              <slot name="prepend" v-bind:icon="state.prefixIcon">
                <e-icon :icon-name="state.prefixIcon" class="e-icon" />
              </slot>
            </template>
          </el-input>
        </slot>
      </template>

      <el-scrollbar
          ref="eScrollbar"
          tag="div"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          :class="'is-empty-'+state.id"
          v-if="!state.destroy"
      >
        <ul
            class="fas-icon-list"
            ref="fasIconList"
            v-if="state.dataList && state.dataList.length > 0"
        >
          <li
              v-for="(item, index) in state.dataList"
              :key="index"
              @click="selectedIcon(item)"
              :style="state.name === item && highLightColor !== '' ? {'color': highLightColor} : ''"
          >
            <slot name="icon" v-bind:icon="item">
              <e-icon :icon-name="item" :title="item" class="e-icon" />
            </slot>
          </li>
        </ul>
        <span v-else class="fas-no-data" v-text="emptyText"></span>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script>
import iconList, {eIconList, elementUI, fontAwesome} from "../js/iconList";
import {off, on} from "../utils";
import eIcon from "../eIcon/e-icon.vue";
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch
} from "vue";
// import ElInput from 'element-plus/lib/components/input/index.js';
// import ElPopover from 'element-plus/lib/components/popover/index.js';
// import ElScrollbar from 'element-plus/lib/components/scrollbar/index.js';
import PopupManager from "element-plus/es/utils/popup-manager.mjs";
import {ElInput, ElPopover, ElScrollbar} from 'element-plus'

export default defineComponent({
  name: "eIconPicker",
  components: {
    "eIcon": eIcon,
    "ElInput": ElInput,
    "ElPopover": ElPopover,
    "ElScrollbar": ElScrollbar,
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
      //  bottom
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
    }
  },
  emits: ['change', 'update:modelValue', 'input'],
  setup(props, context) {
    //绑定时检查宽度
    onMounted(() => {
      updateW();
    })

    onBeforeMount(() => {
      //初始化
      createIconList()
      initIcon(true);
    })

    onBeforeUnmount(() => {
      off(document, "mouseup", popoverHideFun);
      destroyIconList()
    })
    watch(() => props.modelValue, (val) => {
      setTimeout(() => {
        state.name = val;
        state.prefixIcon = state.name ? state.name : props.defaultIcon;
      }, 50);
    }, {deep: true})

    watch(() => props.options, (val) => {
      setTimeout(() => {
        initIcon(true);
      }, 50);
    }, {deep: true})
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
      id: new Date().getTime()
    })

    watch(() => state.visible, (newValue) => {
      if (newValue === false) {
        nextTick(() => {
          off(document, "mouseup", popoverHideFun);
        });
      } else {
        nextTick(() => {
          createIconList();
          on(document, "mouseup", popoverHideFun);
        });
      }
    }, {deep: true})
    let input = ref(null);
    let eScrollbar = ref(null);
    let popover = ref(null);
    let fasIconList = ref(null);
    const change = (val) => {
      state.iconList = state.icon.list.filter(function (i) {
        return i.indexOf(val) !== -1;
      });
    }

    const initIcon = (type) => {
      state.prefixIcon = props.modelValue && type && true === type ? props.modelValue : props.defaultIcon;
      state.name = type === true ? props.modelValue : "";
      state.icon = Object.assign({}, iconList); //复制一个全局对象，避免全局对象污染
      if (props.options) {
        state.icon.list = []; //重新给图标集合复制为空
        if (props.options.addIconList !== undefined && props.options.addIconList && props.options.addIconList.length > 0) {
          state.icon.addIcon(props.options.addIconList);
        }
        if (props.options.removeIconList !== undefined && props.options.removeIconList && props.options.removeIconList.length > 0) {
          state.icon.removeIcon(props.options.removeIconList);
        }
        if (props.options.FontAwesome === true) {
          state.icon.addIcon(fontAwesome);
        }
        if (props.options.ElementUI === true) {
          state.icon.addIcon(elementUI);
        }
        if (props.options.eIcon === true) {
          if (props.options.eIconSymbol) {
            let list = eIconList.map((item) => item.replace("eiconfont ", "#"));
            state.icon.addIcon(list);
          } else {
            state.icon.addIcon(eIconList);
          }
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
      if (item !== undefined && item && item.length > 0) {
        state.icon.addIcon(item);
        state.iconList = state.icon.list;
      }
    }
    const removeIcon = (item = []) => {
      //组件内删除图标
      if (item !== undefined && item && item.length > 0) {
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
        // let rect = state.popoverWidth = input.value.$el.getBoundingClientRect();
        if (props.width === -1 && input.value && input.value.$el) {
          // debugger;
          state.popoverWidth = input.value.$el.getBoundingClientRect().width - 36;
        } else {
          state.popoverWidth = props.width;
        }
        if (eScrollbar && eScrollbar.value && eScrollbar.value.setScrollTop) {
          eScrollbar.value.setScrollTop(0);
          eScrollbar.value.update();
        }
      });
    }
    const updatePopper = (zIndex) => {
      if (zIndex) {
        PopupManager.zIndex = zIndex
      }
      popoverShowFun(true);
      setTimeout(() => {
        popover.value.update();
      }, 100);
    }
    // 显示弹出框的时候容错，查看是否和el宽度一致
    const popoverShowFun = (flag) => {
      if (props.readonly !== true && props.disabled !== true) {
        if (!flag && props.zIndex) {
          PopupManager.zIndex = props.zIndex
        }
        state.visible = true;
        updateW();
        // setTimeout(() => {
        //   popover.value.update();
        // }, 100);
      }
    }
    // 点击控件外，判断是否隐藏弹出框
    const popoverHideFun = (e) => {
      let popperId = popover.value.popperId;
      let path = e.path || (e.composedPath && e.composedPath());
      // let isInter = path.some((list) => list.className && list.className.toString().indexOf("is-empty-" + state.id) !== -1 ||
      //     (list.getAttribute('aria-describedby') && list.getAttribute('aria-describedby').indexOf(popperId) !== -1));
      console.log("popperId:",popperId)
      let isInter = path.some((list) => {
        console.log(list.getAttribute('ariadescribedby'))
        return list.className && (list.className.toString().indexOf("is-empty-" + state.id) !== -1 ||
            (list.getAttribute('ariadescribedby') && list.getAttribute('ariadescribedby').indexOf(popperId) !== -1));
      });
      if (!isInter) {
        setTimeout(() => {
          state.visible = false;
        }, 10)
      }
    }
    // 判断类型，抛出当前选中id
    const emitFun = (val) => {
      context.emit("update:modelValue", val);
      context.emit("change", val);
      context.emit('input', val)
      // updatePopoverLocationFun();
    }
    // 更新popover位置
    // const updatePopoverLocationFun = () => {
    //   // dom高度还没有更新，做一个延迟
    //   setTimeout(() => {
    //     popover.value.update();
    //   }, 50);
    // }
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
      state,
      input,
      eScrollbar,
      popover,
      fasIconList,
      updatePopper,
      createIconList,
      destroyIconList,
      show,
      hide
    }
  }
});
</script>

<style scoped>
.fas-icon-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: hidden;
}

.ui-fas .el-input__inner {
  cursor: pointer;
}

.fas-icon-list li {
  width: 30px;
  height: 30px;
  margin: 5px;
}

.fas-icon-list li i, .fas-icon-list li svg {
  font-size: 20px;
  cursor: pointer;
}

.el-icon-popper {
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-icon-popper[x-placement^="bottom"] {
  margin-top: 5px;
}

.fas-no-data {
  display: block;
}

.e-icon {
  font-size: 16px;
}

</style>
