<template>
  <div style="margin: 0 auto;width: 500px">
    <e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
    名称：{{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
//svgIcons 对应的就是图标列表，将图标列表添加到选择器就可以了
import svgIcons from 'e-icon-picker/lib/getSvg';
export default {
  name: "example6",
  data() {
    return {
      icon: '',
      options: {
        FontAwesome: false,
        ElementUI: false,
        eIcon: false,//自带的图标，来自阿里妈妈
        eIconSymbol: false,//是否开启彩色图标
        addIconList: [],
        removeIconList: []
      },
    }
  },
  mounted() {
    this.addIcon();
  },
  methods: {
    addIcon() {
      this.options.addIconList = svgIcons;
    }
  }
}
</script>
