<template>
  <div class="view">
    <v-header title="我的好友" :isBack=false>
      <div slot="right" style="color: red">
        添加
      </div>
    </v-header>
    <div class="chat-list">
      <div class="unbind-doctor-item" v-for="(v, i) in friendList" :key="i" @click="gotoChatRoom(v.room_id)">
        <div class="doctor-headImg">
          <img src="../../assets/img/ss_hair.jpg" alt="">
        </div>
        <div class="friend-name">
          <span>{{v.nickName}}</span>
        </div>
     </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { getMyFriend } from '@/api/chat.js'
import { Cell, Group } from 'vux'
export default {
  name: 'trends',
  components: { Cell, Group },
  data () {
    return {}
  },
  mounted: function () {
    this.getMyFriend()
  },
  methods: {
    ...mapActions([]),
    ...mapMutations(['getFriend']),
    getMyFriend () {
      console.log(this.user)
      getMyFriend({mobile: this.user.mobile})
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data)
            this.getFriend(res.data.body)
          }
        })
    },
    gotoChatRoom (roomId) {
      this.$router.replace({path: '/chatroom', query: {room_id: roomId}})
    }
  },
  computed: mapState({friendList: state => state.friends.friendList, user: state => state.user.user})
}
</script>
<style lang="scss" scoped>
@import './trends.scss'
</style>
