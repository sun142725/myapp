<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import UnderNav from './page/home/underNav'
import { getUserInfo } from '@/api/user.js'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {UnderNav},
  mounted: function () {
    if (localStorage.getItem('token') && localStorage.getItem('mobile')) {
      this.getUserInfo()
    }
  },
  methods: {
    ...mapActions(['setUser']),
    getUserInfo () {
      getUserInfo({mobile: localStorage.mobile})
        .then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.setUser(res.data.body)
            console.log(this.user)
          }
        })
    }
  }
}
</script>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
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
