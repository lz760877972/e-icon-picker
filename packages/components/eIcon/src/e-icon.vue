<template>
  <i v-if="isFontClass" class="e-icon" :class="[iconName,className]" @click="click(iconName,$event)"></i>
  <svg v-else-if="isSvg" :class="svgClass" class="e-icon e-icon-svg" aria-hidden="true" @click="click(iconName,$event)">
    <use :xlink:href="iconName"></use>
  </svg>
  <component v-else-if="isComponent" :is="component" class="e-icon icon e-icon-svg"
             @click="click(iconName,$event)"></component>
  <div v-else-if="isExternal" :style="styleExternalIcon" :class="className" class="e-icon icon external-icon"
       @click="click(iconName,$event)"/>
  <Icon v-else-if="isIconify" :icon="iconName" class="e-icon icon e-icon-svg" @click="click(iconName,$event)"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {isExternal} from "../../../utils";
import {CLICK_EVENT} from "../../../constants";
import {Icon} from '@iconify/vue'
import {isFunction, startsWith} from "lodash-es";

export default defineComponent({
  name: "e-icon",
  components: {
    Icon
  },
  props: {
    /**
     * 图标名称
     */
    iconName: {
      type: String,
      required: true
    },
    /**
     * 自定义的图标前缀，例如 fa fa-xxx中的fa
     */
    className: {
      type: String,
      default: ''
    }
  },
  emits: [CLICK_EVENT],
  setup(props, context) {
    /**
     * 图标点击事件
     * @param iconName
     * @param event
     */
    const click = (iconName: string, event: Event) => {
      if (event && isFunction(event.preventDefault)) {
        event.preventDefault();
      }
      context.emit(CLICK_EVENT, iconName)
    }
    return {
      click
    }
  },
  computed: {
    /**
     * 判断是否是字体图标
     * @returns {""|false|boolean}
     */
    isFontClass() {
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && !startsWith(this.iconName, "#") && !startsWith(this.iconName, "component ") && !this.iconName.includes(":"));
    },
    /**
     * 判断是否是svg图标
     * @returns {""|false|boolean}
     */
    isSvg() {
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && startsWith(this.iconName, "#"));
    },
    /**
     * 判断是否是图标组件
     * @returns {""|false|boolean}
     */
    isComponent() {
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && startsWith(this.iconName, "component "));
    },
    /**
     * 组件名
     * @returns {string}
     */
    component() {
      return this.iconName.replace("component ", "");
    },
    isIconify() {
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && this.iconName.includes(":"));
    },
    /**
     * 判断是否是外部链接
     * @returns {boolean}
     */
    isExternal() {
      return isExternal(this.iconName)
    },
    svgClass() {
      if (this.className) {
        return 'icon ' + this.className
      } else {
        return 'icon'
      }
    },
    styleExternalIcon() {
      return {
        'background-image': `url(${this.iconName})`,
        'background-repeat': 'no-repeat',
        'background-size': '100% 100%',
        '-moz-background-size': '100% 100%'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "e-icon.scss";
</style>
