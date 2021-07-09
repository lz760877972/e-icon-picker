<template>
  <i v-if="fontClass" :class="iconName" @click="click(iconName,$event)"></i>
  <svg v-else-if="svg" :class="svgClass" aria-hidden="true" @click="click(iconName,$event)">
    <use :xlink:href="iconName"></use>
  </svg>
  <div v-else-if="isExternal" :style="styleExternalIcon" :class="className" class="icon external-icon"
       @click="click(iconName,$event)"/>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import {isExternal} from "../utils";

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
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && !this.iconName.startsWith("#"));
    },
    svg() {
      return this.iconName && this.iconName.trim().length > 2 && (!isExternal(this.iconName) && this.iconName.startsWith("#"));
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

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.external-icon {
  display: inline-block;
}
</style>
