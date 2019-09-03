<template>
  <div class="personal-view">
    <v-header title="个人中心" :isBack=false>
      <div slot="right" style="color: #333;">设置</div>
    </v-header>
    <div>
      <div class="user-head">
        <div class="user-point">
          <img :src="user.headUrl || defaultUrl" alt="">
        </div>
        <div class="user-name">
          <div>昵称：{{user.nickName}}</div>
          <div class="user-account">账号：{{user.mobile}}</div>
        </div>
      </div>
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
      defaultUrl: require('../../assets/img/ss_hair.jpg')
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
