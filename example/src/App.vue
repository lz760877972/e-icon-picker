<template>
  <div id="app">
   <example1 />
    <example2 />
    <example3 />
    <example4 />
    <example5 />
    <example6 />
    <example7 />
    <example8 />
    <iconList />
  </div>
</template>

<script>
import example1 from './components/example1'
import example2 from './components/example2'
import example3 from './components/example3'
import example4 from './components/example4'
import example5 from './components/example5'
import example6 from './components/example6'
import example7 from './components/example7'
import example8 from './components/example8'
import iconList from './components/iconList'
import {defineComponent} from "vue";

export default defineComponent({
  name: 'app',
  components: {
    example1,
    example2,
    example3,
    example4,
    example5,
    example6,
    example7,
    example8,
    iconList
  }
})
</script>
