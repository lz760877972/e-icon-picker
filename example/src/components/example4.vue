<template>
    <div style="margin: 0 auto;width: 500px">
        <h2>组件内使用彩色图标展示</h2>
        <e-icon-picker ref="iconPicker" v-model="icon" :options="options"/>
        名称：{{icon}}  <e-icon :icon-name="icon"/>
    </div>
</template>

<script>
    import "@/js/iconfont.js";
    import {eIconSymbol} from 'e-icon-picker';
    import iconfont from "@/css/iconfont.json";

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

<style scoped>

</style>
