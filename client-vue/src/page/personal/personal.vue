<template>
  <div class="personal-view">
    <v-header title="个人中心" :isBack=false>
      <div slot="right" style="color: #333;">设置</div>
    </v-header>
    <div>
      <img :src="user.headUrl" alt="">
      <div>昵称：{{user.nickName}}</div>
      <div>年龄：{{user.age}}</div>
      <group>
        <cell :title="'My Account'" :value="'Protected'" @click.native="onClick"></cell>
        <cell :title="'Withdraw'" disabled is-link></cell>
      </group>
      <group>
        <cell title="昵称">
          <span slot="title" style="color:#333;text-align:left;">昵称</span>
          <span slot="value">{{user.nickName}}</span>
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user.js'
import { Cell, Group } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'personal',
  components: { Cell, Group },
  data () {
    return {
    }
  },
  mounted: function () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['setUser']),
    getUserInfo () {
      getUserInfo({mobile: this.user.mobile})
        .then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.setUser(res.data.body)
            console.log(this.user)
          }
        })
    }
  },
  computed: mapState({user: state => state.user.user})
}
</script>
<style lang="scss">
@import './personal.scss';
</style>
