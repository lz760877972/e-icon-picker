<template>
  <i v-if="fontClass" :class="iconName" @click="click(iconName,$event)"></i>
  <svg v-else-if="svg" :class="svgClass" aria-hidden="true" @click="click(iconName,$event)">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import {defineComponent, reactive} from 'vue'

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
      return this.iconName && this.iconName.trim().length > 2 && !this.iconName.startsWith("#");
    },
    svg() {
      return this.iconName && this.iconName.trim().length > 2 && this.iconName.startsWith("#");
    },
    svgClass() {
      if (this.className) {
        return 'icon ' + this.className
      } else {
        return 'icon'
      }
    },
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
</style>
