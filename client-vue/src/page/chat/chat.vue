<template>
  <div class="view">
  <div class="chat-list">
    <div class="unbind-doctor-item" v-for="(v, i) in chatList" :key="i" @click="pushRoom">
      <div class="doctor-headImg">
        <img src="../../assets/img/ss_hair.jpg" alt="">
      </div>
      <ul>
        <li>
            <span>{{v.type == 0 ? v.friend_name : v.type == 1? v.room_name : '大象医生'}}</span>
            <span>{{v.last_news.time}}</span>
          </li>
          <li>
              <span>{{v.last_news.content || '大象医生指定医院'}}</span>
          </li>
        </ul>
    </div>
    <div @click="pushNews">anniu</div>
    <div @click="pushNewxinxi">news</div>
  </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'chat',
  data: function () {
    return {
    }
  },
  mounted: function () {
    console.log(this)
  },
  methods: {
    ...mapActions(['addChatHistory']),
    pushRoom () {
      this.$router.push('/chatroom')
    },
    pushNews () {
      var roomId = Math.random() > 0.5 ? '123123' : '123'
      this.addChatHistory({
        room_id: roomId,
        chatNews: {'content': Math.random(), 'type': 'text', 'id': '0d3b3d54eda846f9bcb86cbc5d85d8a9', 'time': 1565933522, 'isSend': true}
      })
    },
    pushNewxinxi () {
      this.addChatHistory({
        room_id: '222',
        chatNews: {'content': Math.random(), 'type': 'text', 'id': '0d3b3d54eda846f9bcb86cbc5d85d8a9', 'time': 1565933522, 'isSend': true}
      })
    }
  },
  computed: mapState({chatList: state => state.chatStore.chatList})
}
</script>
<style lang="scss" scoped="">
@import './chat.scss';
.view{
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
