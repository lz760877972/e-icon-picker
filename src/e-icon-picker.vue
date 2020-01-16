<template>
    <div class="ui-fas">
        <el-input v-model="name" placeholder="请选择图标" ref="input" @focus="_popoverShowFun" v-popover:popover
                  clearable
                  @input="_change"
                  @clear="_initIcon(false)"
        >
            <template slot="prepend"><i :class="prefixIcon" style="max-width: 14px"/></template>
        </el-input>
        <!-- 弹出框 -->
        <el-popover :disabled="disabled" ref="popover" :placement="placement" popper-class="el-icon-popper"
                    :width="width" v-model="visible" trigger="click">
            <el-scrollbar tag="div" wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list"
                          class="is-empty">
                <ul class="fas-icon-list" v-if="iconList&&iconList.length > 0">
                    <li v-for="(item, index) in iconList" :key="index" @click="_selectedIcon(item)">
                        <i :class="item" :title="item"/>
                        <!-- <span>{{item}}</span>-->
                    </li>
                </ul>
                <span v-else class="fas-tips">暂无可选图标</span>
            </el-scrollbar>
        </el-popover>
    </div>
</template>

<script>
    import iconList, {elementUI, fontAwesome} from './iconList';
    import {off, on} from "./utils/dom";

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
            options: {}
        },
        data() {
            return {
                iconList: [],
                visible: false, // popover v-model
                width: 200,
                prefixIcon: 'el-icon-edit',
                name: '',
                icon: {}
            }
        },
        methods: {
            _change(val) {
                this.iconList =  this.icon.list.filter(function (i) {
                    return i.indexOf(val) !== -1;
                });
            },
            _initIcon(type) {
                this.prefixIcon = this.value && type && true === type ? this.value : 'el-icon-edit';
                this.name = type === true ? this.value : '';
                this.icon = Object.assign({}, iconList);//复制一个全局对象，避免全局对象污染
                if (this.options) {
                    this.icon.list = [];//重新给图标集合复制为空
                    if (this.options.iconList !== undefined && this.options.iconList && this.options.iconList.length > 0) {
                        this.icon.addIcon(this.options.IconList);
                    }
                    if (this.options.FontAwesome === true) {
                        this.icon.addIcon(fontAwesome);
                    }
                    if (this.options.ElementUI === true) {
                        this.icon.addIcon(elementUI);
                    }
                }
                this.iconList = this.icon.list;
                if (type === false) {
                    this._emitFun('');
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
                    this.width = this.$refs.input.$el.getBoundingClientRect().width - 26;
                });
            },
            // 显示弹出框的时候容错，查看是否和el宽度一致
            _popoverShowFun() {
                this._updateW();
            },
            // 点击控件外，判断是否隐藏弹出框
            _popoverHideFun(e) {
                let isInter = e.path.some(list => {
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
        mounted() {
            this._updateW();
            this.$nextTick(() => {
                on(document, 'mouseup', this._popoverHideFun);
            });
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
            }
        }
    }
</script>

<style lang="css">


    [class^="fa"] {
        vertical-align: middle;
        text-align: center;
    }

    .el-submenu [class^="fa"] {
        margin-right: 5px;
        width: 24px;
    }

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

    .fas-tips {
        display: block;
    }
</style>
