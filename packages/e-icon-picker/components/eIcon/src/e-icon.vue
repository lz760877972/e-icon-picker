<template>
  <i v-if="fontClass" class="e-icon" :class="[iconName,className]" @click="click(iconName,$event)"></i>
  <svg v-else-if="svg" :class="svgClass" class="e-icon e-icon-svg" aria-hidden="true" @click="click(iconName,$event)">
    <use :xlink:href="iconName"></use>
  </svg>
  <component v-else-if="isComponent" :is="component" class="e-icon icon e-icon-svg" @click="click(iconName,$event)"></component>
  <div v-else-if="isExternal" :style="styleExternalIcon" :class="className" class="e-icon icon external-icon"
       @click="click(iconName,$event)"/>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import {isExternal} from "../../utils";

export default defineComponent({
  name: "e-icon",
  props: {
    iconName: {//图标名称
      type: String,
      required: true
    },
    className: {//自定义的图标前缀，例如 fa fa-xxx中的fa
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props, context) {
    const state = reactive({})

    const click = (iconName, event) => {
      if (event) event.preventDefault();
      context.emit('click', iconName)
    }
    return {
      click,
      state
    }
  },
  computed: {
    fontClass() {
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && !this.iconName.startsWith("#") && !this.iconName.startsWith("component "));
    },
    svg() {
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && this.iconName.startsWith("#"));
    },
    isComponent() {
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && this.iconName.startsWith("component "));
    },
    component() {
      return this.iconName.replace("component ", "")
    },
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
