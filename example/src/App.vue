<template>
    <div id="app">
        <example1/>
        <example2/>
        <example3/>
        <example4/>
        <iconList/>
    </div>
</template>

<script>
    import example1 from './components/example1'
    import example2 from './components/example2'
    import example3 from './components/example3'
    import example4 from './components/example4'
    import iconList from './components/iconList'

    export default {
        name: 'app',
        components: {
            example1,
            example2,
            example3,
            example4,
            iconList
        }
    }
</script>

<style>
</style>
