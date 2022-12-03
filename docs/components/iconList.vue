<template>
  <div>
    <ul class="fas-icon-list" v-if="dataList&&dataList.length > 0">
      <li v-for="(item, index) in dataList" :key="index" title="复制">
        <e-icon :icon-name="item" @click="copy"/>
        <!--                <span class="text" :title="item">{{item}}</span>-->
      </li>
    </ul>
  </div>
</template>

<script>
import eIconList from 'e-icon-picker/icon/default-icon/eIconList.js'

import ele from "e-icon-picker/icon/ele/element-ui-2.15.12.js";
import elementPlus from "e-icon-picker/icon/ele/element-plus.js";
import fontAwesomeV470 from "e-icon-picker/icon/fontawesome/font-awesome.v4.7.0.js";
import fontawesome from "e-icon-picker/icon/fontawesome/fontawesome-6.2.1.js";
import antDesign from "e-icon-picker/icon/antd/antd.js";
import tdesign from "e-icon-picker/icon/tdesign/tdesign.js";
import arco from "e-icon-picker/icon/arco/arco.js";
// import '@e-icon-picker/lib/icon/default-icon/symbol.js'

export default {
  name: "iconList",
  props: {
    // 是否禁用文本框
    type: {
      type: String,
      // false
      default() {
        return "eIcon";
      },
    },
  },
  data() {
    return {
      dataList: []
    }
  },
  mounted() {
    if (this.type === "eIcon") {
      this.dataList = eIconList
    } else if (this.type === "eIconSymbol") {
      this.dataList = eIconList.map((item) => {
        return item.replace("eiconfont ", "#");
      })
    } else if (this.type === "ele") {
      this.dataList = ele
    } else if (this.type === "elementPlus") {
      this.dataList = elementPlus
    } else if (this.type === "fontAwesomeV470") {
      this.dataList = fontAwesomeV470
    } else if (this.type === "fontawesome") {
      this.dataList = fontawesome
    } else if (this.type === "antDesign") {
      this.dataList = antDesign
    } else if (this.type === "tdesign") {
      this.dataList = tdesign
    } else if (this.type === "arco") {
      this.dataList = arco
    } else {
      this.dataList = []
    }
  },
  methods: {
    copy(className) {
      let tag = document.createElement('input');
      tag.setAttribute('id', 'cp_hgz_input');
      tag.value = className;
      document.getElementsByTagName('body')[0].appendChild(tag);
      document.getElementById('cp_hgz_input').select();
      document.execCommand('copy');
      document.getElementById('cp_hgz_input').remove();
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
  },
}
</script>

<style scoped>
.fas-icon-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.fas-icon-list li {
  width: 50px;
  height: 50px;
  margin: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fas-icon-list li:hover {
  background-color: #9dbed8;
}

.fas-icon-list li i, .fas-icon-list li svg {
  font-size: 20px;
  cursor: pointer;
  margin: 5px;
}

.text {
  white-space: nowrap; /*一行显示*/
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /*用...代替超出部分*/
  flex: 1;
}

</style>
