<template>
    <div class="ui-fas" @click="_popoverShowFun">
        <!-- 弹出框 -->
        <el-popover :disabled="disabled" ref="popover" :placement="myPlacement" popper-class="el-icon-popper"
                    :width="popoverWidth" v-model="visible" trigger="manual">
            <el-input v-model="name"
                      placeholder="请选择图标"
                      ref="input"
                      v-popover:popover
                      :style="styles"
                      :clearable="clearable"
                      :disabled="disabled"
                      :readonly="readonly"
                      @input="_change"
                      @clear="_initIcon(false)"
                      slot="reference"
            >
                <template slot="prepend"><i :class="prefixIcon" style="max-width: 14px"/></template>
            </el-input>

            <el-scrollbar ref="e-scrollbar"
                          tag="div"
                          wrap-class="el-select-dropdown__wrap"
                          view-class="el-select-dropdown__list"
                          class="is-empty">
                <ul class="fas-icon-list" ref="fasIconList" v-if="dataList&&dataList.length > 0">
                    <li v-for="(item, index) in dataList" :key="index" @click="_selectedIcon(item)">
                        <i :class="item" :title="item"/>
                        <!-- <span>{{item}}</span>-->
                    </li>
                </ul>
                <span v-else class="fas-no-data">暂无可选图标</span>
            </el-scrollbar>
        </el-popover>
    </div>
</template>

<script>
    import iconList, {elementUI, fontAwesome} from './iconList';
    import {off, on} from "./utils";

    export default {
        name: "e-icon-picker",
        props: {
            // 是否禁用文本框
            disabled: {
                type: Boolean,
                // false
                default() {
                    return false;
                }
            },
            readonly: {
                type: Boolean,
                // false
                default() {
                    return false;
                }
            },
            clearable: {
                type: Boolean,
                // true
                default() {
                    return true;
                }
            },
            // e-icon-picker 样式
            styles: {
                type: Object,
                default() {
                    return {};
                }
            },
            // 弹出框位置
            placement: {
                type: String,
                //  bottom
                default() {
                    return 'bottom';
                }
            },
            value: {
                type: String,
                default() {
                    return ''
                }
            },
            options: {},
            width: {
                type: Number,
                default() {
                    return -1
                }
            }
        },
        data() {
            return {
                iconList: [],
                visible: false, // popover v-model
                prefixIcon: 'el-icon-edit',
                name: '',
                icon: {},
                myPlacement: 'bottom',
                popoverWidth: 200
            }
        },
        methods: {
            _change(val) {
                this.iconList = this.icon.list.filter(function (i) {
                    return i.indexOf(val) !== -1;
                });
            },
            _initIcon(type) {
                this.prefixIcon = this.value && type && true === type ? this.value : 'el-icon-edit';
                this.name = type === true ? this.value : '';
                this.icon = Object.assign({}, iconList);//复制一个全局对象，避免全局对象污染
                if (this.options) {
                    this.icon.list = [];//重新给图标集合复制为空
                    if (this.options.addIconList !== undefined && this.options.addIconList && this.options.addIconList.length > 0) {
                        this.icon.addIcon(this.options.addIconList);
                    }
                    if (this.options.removeIconList !== undefined && this.options.removeIconList && this.options.removeIconList.length > 0) {
                        this.icon.removeIcon(this.options.removeIconList);
                    }
                    if (this.options.FontAwesome === true) {
                        this.icon.addIcon(fontAwesome);
                    }
                    if (this.options.ElementUI === true) {
                        this.icon.addIcon(elementUI);
                    }
                }
                this.iconList = this.icon.list;

                if (this.placement && (this.placement === 'bottom' || this.placement === 'top')) {
                    this.myPlacement = this.placement;
                }

                if (type === false) {
                    this._emitFun('');
                }
            },

            addIcon(item = []) {//组件内增加图标
                //组件内添加图标
                if (item !== undefined && item && item.length > 0) {
                    this.icon.addIcon(item);
                    this.iconList = this.icon.list;
                }
            },
            removeIcon(item = []) {//组件内删除图标
                //组件内删除图标
                if (item !== undefined && item && item.length > 0) {
                    this.icon.removeIcon(item);
                    this.iconList = this.icon.list;
                }
            },
            _selectedIcon(item) {
                this.visible = false;
                this.name = item;
                this.prefixIcon = this.name;
                this._emitFun(this.prefixIcon);
            },
            // 更新宽度
            _updateW() {
                this.$nextTick(() => {
                    if (this.width === -1) {
                        this.popoverWidth = this.$refs.input.$el.getBoundingClientRect().width - 26;
                    } else {
                        this.popoverWidth = this.width;
                    }
                    this.$refs['e-scrollbar'].wrap.scrollTop = this.$refs.input.$el.getBoundingClientRect().height - 35;
                });
            },
            // 显示弹出框的时候容错，查看是否和el宽度一致
            _popoverShowFun() {
                if (this.readonly !== true && this.disabled !== true) {
                    this.visible = true;
                    this._updateW();
                }
            },
            // 点击控件外，判断是否隐藏弹出框
            _popoverHideFun(e) {
                let path = e.path || (e.composedPath && e.composedPath());
                let isInter = path.some(list => {
                    return list.className && list.className.indexOf('fas-icon-list') !== -1;
                });

                if (!isInter) {
                    this.visible = false;
                }
            },
            // 判断类型，抛出当前选中id
            _emitFun(val) {
                this.$emit('input', val);
                this._updatePopoverLocationFun();
            },
            // 更新popover位置
            _updatePopoverLocationFun() {
                // dom高度还没有更新，做一个延迟
                setTimeout(() => {
                    this.$refs.popover.updatePopper();
                }, 50);
            },
        },
        computed: {
            dataList: function () {   //去重
                let arr1 = [];       // 新建一个数组来存放arr中的值
                for (let i = 0, len = this.iconList.length; i < len; i++) {
                    if (arr1.indexOf(this.iconList[i]) === -1) {
                        arr1.push(this.iconList[i]);
                    }
                }
                return arr1;
            }
        },
        mounted() {
            this._updateW();
        },
        beforeDestroy() {
            off(document, 'mouseup', this._popoverHideFun);
        },
        created() {
            this._initIcon(true);
        },
        watch: {
            value: function (val) {
                setTimeout(() => {
                    this.name = val;
                    this.prefixIcon = this.name ? this.name : 'el-icon-edit';
                }, 50);
            },
            visible: function (val) {
                if (val === false) {
                    this.$nextTick(() => {
                        off(document, 'mouseup', this._popoverHideFun);
                    });
                } else {
                    this.$nextTick(() => {
                        on(document, 'mouseup', this._popoverHideFun);
                    });
                }
            },
            options: {
                handler(newV, oldV) {
                    let self = this;
                    setTimeout(() => {
                        self._initIcon(true);
                    }, 50);
                },
                deep: true
            }
        }
    }
</script>

<style lang="css" scoped>

    .fas-icon-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .ui-fas .el-input__inner {
        cursor: pointer;
    }

    .fas-icon-list li {
        width: 30px;
        height: 30px;
        margin: 5px;
    }

    .fas-icon-list li i {
        font-size: 20px;
        cursor: pointer;
    }

    .el-icon-popper {
        max-height: 400px;
        overflow: auto;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .el-icon-popper[x-placement^='bottom'] {
        margin-top: 5px;
    }

    .fas-no-data {
        display: block;
    }
</style>
