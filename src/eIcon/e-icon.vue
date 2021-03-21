<template>
  <i v-if="fontClass" :class="iconName" @click="click(iconName)"></i>
  <svg v-else-if="svg" :class="svgClass" aria-hidden="true" @click="click(iconName)">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import {reactive} from 'vue'

export default {
  name: "e-icon",
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, {emit}) {
    const state = reactive({})

    const click = (iconName) => {
      emit('click', iconName)
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
}
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
