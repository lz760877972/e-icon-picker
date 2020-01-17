<template>
    <div style="margin: 0 auto;width: 500px">
        <h2>高级使用</h2>
        <e-icon-picker v-model="icon" :options="options" :disabled="disabled" :readonly="readonly"
                       :placement="placement" :styles="style"/>
        {{icon}}
    </div>
</template>

<script>
    export default {
        name: "example2",
        data() {
            return {
                icon: '',
                options: {FontAwesome: false, ElementUI: true, addIconList: ['fa fa-slack'], removeIconList: []},
                disabled: false,
                readonly: false,
                placement: 'bottom',
                style: {}
            }
        },
    }
</script>

<style scoped>

</style>
