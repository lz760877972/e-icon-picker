<template>
  <i v-if="isFontClass" class="e-icon" :class="[iconName,className]" @click="click(iconName,$event)"></i>
  <svg v-else-if="isSvg" :class="svgClass" class="e-icon e-icon-svg" aria-hidden="true" @click="click(iconName,$event)">
    <use :xlink:href="iconName"></use>
  </svg>
  <component v-else-if="isComponent" :is="component" class="e-icon icon e-icon-svg"
             @click="click(iconName,$event)"></component>
  <div v-else-if="isExternalLink" :style="styleExternalIcon" :class="className" class="e-icon icon external-icon"
       @click="click(iconName,$event)"/>
  <Icon v-else-if="isIconify" :icon="iconName" class="e-icon icon e-icon-svg" @click="click(iconName,$event)"/>
</template>

<script lang="ts" setup>
import {isExternal} from "../../../utils";
import {Icon} from '@iconify/vue'
import {isFunction, startsWith} from "lodash-es";
import type {EIconEmits, EIconProps} from "./types";
import {computed} from "vue";

defineOptions({
  inheritAttrs: true,
  name: 'e-icon'
})
const {iconName, className} = defineProps<EIconProps>()
const emits = defineEmits<EIconEmits>()

/**
 * 图标点击事件
 * @param iconName
 * @param event
 */
const click = (iconName: string, event: Event) => {
  if (event && isFunction(event.preventDefault)) {
    event.preventDefault();
  }
  emits("click", iconName)
}
/**
 * 判断是否是字体图标
 * @returns {""|false|boolean}
 */
const isFontClass = computed(() => {
  return iconName && iconName.trim().length > 2 && (!isExternal(iconName) && !startsWith(iconName, "#") && !startsWith(iconName, "component ") && !iconName.includes(":"));
})
/**
 * 判断是否是svg图标
 * @returns {""|false|boolean}
 */
const isSvg = computed(() => {
  return iconName && iconName.trim().length > 2 && (!isExternal(iconName) && startsWith(iconName, "#"));
})
/**
 * 判断是否是图标组件
 * @returns {""|false|boolean}
 */
const isComponent = computed(() => {
  return iconName && iconName.trim().length > 2 && (!isExternal(iconName) && startsWith(iconName, "component "));
})
/**
 * 组件名
 * @returns {string}
 */
const component = computed(() => {
  return iconName.replace("component ", "");
})
/**
 * 判断是否是Iconify图标组件
 * @returns {""|false|boolean}
 */
const isIconify = computed(() => {
  return iconName && iconName.trim().length > 2 && (!isExternal(iconName) && iconName.includes(":"));
})
/**
 * 判断是否是外部链接
 * @returns {boolean}
 */
const isExternalLink = computed(() => {
  return isExternal(iconName)
})
/**
 * svgClass
 */
const svgClass = computed(() => {
  if (className) {
    return 'icon ' + className
  } else {
    return 'icon'
  }
})
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => {
  return {
    'background-image': `url(${iconName})`,
    'background-repeat': 'no-repeat',
    'background-size': '100% 100%',
    '-moz-background-size': '100% 100%'
  }
})
</script>

<style lang="scss" scoped>
@use "e-icon.scss";
</style>
