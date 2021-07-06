<template>
  <div id="app">
    <example1/>
    <example2/>
    <example3/>
    <example4/>
    <example5/>
    <example6/>
    <example7/>
    <iconList/>
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
import iconList from './components/iconList'

export default {
  name: 'app',
  components: {
    example1,
    example2,
    example3,
    example4,
    example5,
    example6,
    example7,
    iconList
  }
}
</script>
