<template>
    <div>
        <h2>全部列表</h2>
        <ul class="fas-icon-list" v-if="dataList&&dataList.length > 0">
            <li v-for="(item, index) in dataList" :key="index">
                <i :class="item" :title="item"/>
                <span>{{item}}</span>
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
        mounted() {

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

    .fas-icon-list li i {
        font-size: 20px;
        cursor: pointer;
        margin: 5px;
    }

</style>
