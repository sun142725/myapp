<template>
  <div class="view-no">
    <XHeader :left-options="{backText: ''}">登录</XHeader>
    <group style="margin: 0.2rem 0">
      <x-input title="手机号" is-type="china-mobile" placeholder="请输入手机号" v-model="form.username" :min="11" :max="11"></x-input>
      <x-input title="登录密码" type="password" placeholder="请输入密码" v-model="form.password" :min="6" :max="16"></x-input>
    </group>
    <div style="width:80%;margin: 1rem auto;" class="vux-1px-l">
      <x-button @click.native="login" type="primary"> Login</x-button>
    </div>
  </div>
</template>
<script>
import { XInput, Group, XButton, XHeader } from 'vux'
import { LOGIN_IN } from 'store/login'
import {mapActions} from 'vuex'
export default {
  name: 'login',
  components: { XInput, Group, XButton, XHeader },
  data: function () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  mounted: function () {
  },
  methods: {
    ...mapActions([LOGIN_IN]),
    login: function () {
      this.http.register({...this.form})
        .then(res => res.data)
        .then(data => {
          console.log(data)
          if (data.code === '000000') {
            alert(1)
            this.LOGIN_IN(data.body)
            localStorage.setItem('token', data.token)
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            console.log(redirect)
            this.$router.push({
              path: redirect
            })
          } else {
            this.$vux.toast.show({
              text: data.msg,
              type: 'text'
            })
          }
        })
        .catch(err => console.log(err, '1111'))
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
<style lang="less">

</style>
