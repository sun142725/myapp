<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import UnderNav from './components/home/underNav'
export default {
  name: 'App',
  components: {UnderNav}
}
</script>

<style lang="scss">
html,body{
  width:100%;
  height:100%;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
}
</style>
