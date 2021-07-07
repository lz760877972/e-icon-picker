<template>
  <div>
    <h2>全部列表</h2>
    <ul class="fas-icon-list" v-if="dataList&&dataList.length > 0">
      <li v-for="(item, index) in dataList" :key="index" title="复制">
        <e-icon :icon-name="item" @click="copy"/>
        <span class="text" :title="item">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {iconList} from 'e-icon-picker';

export default {
  name: "iconList",
  data() {
    return {
      dataList: iconList.list
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
      this.$message('复制成功');
    },
  }
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
  width: 250px;
  height: 50px;
  margin: 5px;
  text-align: left;
  display: flex;
  align-items: center;
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
}

</style>
