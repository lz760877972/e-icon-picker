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

<script lang="ts">
import eIconList from 'e-icon-picker/icon/default-icon/eIconList.js'

import ele from "e-icon-picker/icon/ele/element-ui.js";
import elementPlus from "e-icon-picker/icon/ele/element-plus.js";
import fontAwesomeV470 from "e-icon-picker/icon/fontawesome/font-awesome.v4.7.0.js";
import fontawesome from "e-icon-picker/icon/fontawesome/fontawesome-6.js";
import antDesign from "e-icon-picker/icon/antd/antd.js";
import tdesign from "e-icon-picker/icon/tdesign/tdesign.js";
import arco from "e-icon-picker/icon/arco/arco.js";
import layui from "e-icon-picker/icon/layui-vue/layui-vue.js"
import brandico from "e-icon-picker/icon/iconify/brandico.js"
import {isClient} from '@vueuse/core';
import {defineComponent, onMounted, reactive, toRefs} from "vue";
// import '@e-icon-picker/lib/icon/default-icon/symbol.js'
import {ElMessage} from 'element-plus'

export default defineComponent({
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
  setup(props, context) {
    const state = reactive({
      dataList: [] as string[]
    })

    onMounted(async () => {

      if (props.type === "eIcon") {
        state.dataList = eIconList
      } else if (props.type === "eIconSymbol") {
        state.dataList = eIconList.map((item) => {
          return item.replace("eiconfont ", "#");
        })
      } else if (props.type === "ele") {
        state.dataList = ele
      } else if (props.type === "elementPlus") {
        state.dataList = elementPlus
      } else if (props.type === "fontAwesomeV470") {
        state.dataList = fontAwesomeV470
      } else if (props.type === "fontawesome") {
        state.dataList = fontawesome
      } else if (props.type === "antDesign") {
        state.dataList = antDesign
      } else if (props.type === "tdesign") {
        state.dataList = tdesign
      } else if (props.type === "arco") {
        state.dataList = arco
      } else if (props.type === "layui") {
        state.dataList = layui
      } else if (props.type === "brandico") {
        state.dataList = brandico
      } else {
        state.dataList = []
      }
    })
    const copy = (className) => {
      if (isClient) {
        let tag = document.createElement('input');
        tag.setAttribute('id', 'cp_hgz_input');
        tag.value = className;
        document.getElementsByTagName('body')[0].appendChild(tag);
        (document.getElementById('cp_hgz_input')! as HTMLInputElement).select();

        document.execCommand('copy');
        document.getElementById('cp_hgz_input')!.remove();
        ElMessage({
          message: '复制成功',
          type: 'success'
        });
      }
    }
    return {
      copy,
      ...toRefs(state)
    }
  }
})
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
