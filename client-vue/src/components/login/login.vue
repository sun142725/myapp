<template>
  <div>
    <input type="text" placeholder="请输入账号" v-model="username">
    <input type="text" placeholder="请输入密码" v-model="password">
    <button @click="login">登陆</button>
  </div>
</template>
<script>
export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  mounted: function () {
    this.http.paihangbang({})
      .then(res => console.log(res.data))
  },
  methods: {
    login: function () {
      this.http.login({
        username: this.username,
        password: this.password
      })
        .then(res => res.data)
        .then(data => {
          console.log(data, this.username)
          if (data.code === 1) {
            this.$store.commit('login', true)
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({
              path: redirect
            })
          }
        })
    },
    checkLogin: function () {
      if (this.token) {
        this.$store.commit('login', this.token)
        let redirect = decodeURIComponent(this.$route.query.redirect || '/')
        this.$router.push({
          path: redirect
        })
      }
    }
  }
}
</script>
<style lang="scss">
input{
  display: block;
  margin: 10px auto;
}
  div{
    width:300px;
    height:20px;
    a{
    }
  }
</style>
