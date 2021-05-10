<template>
  <div style="margin: 0 auto;width: 500px">
    <e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
    名称：{{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>

const req = require.context("../../../example/src/icons/svg", false, /\.svg$/);

const requireAllFile = requireContext => requireContext.keys().map(requireContext);
requireAllFile(req);

const re = /\.\/(.*)\.svg/;

const requireAll = requireContext => requireContext.keys();

let svgIcons = requireAll(req).map(i => {
  return "#" + i.match(re)[1]
});
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
