<template>
  <div style="margin: 0 auto;width: 500px">
    <e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
    名称：{{ icon }}
    <e-icon :icon-name="icon"/>
  </div>
</template>

<script>
import "../public/js/iconfont.js";
import {eIconSymbol} from '../../../lib/index.js';
import iconfont from "../public/css/iconfont.json";

export default {
  name: "example4",
  data() {
    return {
      icon: '',
      options: {
        FontAwesome: false,
        ElementUI: false,
        eIcon: true,//自带的图标，来自阿里妈妈
        eIconSymbol: true,//是否开启彩色图标
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
      let icon = eIconSymbol(iconfont);
      this.options.addIconList = icon.list;
    }
  }
}
</script>
