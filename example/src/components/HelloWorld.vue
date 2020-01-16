<template>
    <div class="hello">
         <e-icon-picker v-model="text" :options="options"/>
        {{text}}
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                text: '',
                options : {FontAwesome: true, ElementUI: false, IconList: []}
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
