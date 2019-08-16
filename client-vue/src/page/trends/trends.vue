<template>
  <div class="trend-view">
    <v-header title="我的好友">
      <div>
        添加
      </div>
    </v-header>
    <group>
      <cell v-for="(v,i) in friendList" :key=i :title="v.nickName" :value="v.friend_mobile" @click.native="gotoChatRoom(v.room_id)"></cell>
    </group>
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
      getMyFriend({mobile: '18334771358'})
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
  computed: mapState({friendList: state => state.friends.friendList})
}
</script>
