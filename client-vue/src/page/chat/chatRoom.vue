<template>
  <div class="view">
    <div class="chat_head">
      <router-link to="">红珊聊天室</router-link>
      <span>(红红的珊珊)</span>
    </div>
    <div class="chat-history-com" ref="chatHistoryCom" >
            <chat-history></chat-history>
        </div>
    <div class="control">
        <input class="send-text" type="text" v-model="message" placeholder="请输入文字内容" maxlength="100">
        <img @click="uploadFile" src="../../assets/img/icon_img.png" alt="">
        <img @click="sendMessage('text', message)" src="../../assets/img/icon_send.png" alt="">
        <input ref="uploadFile" @change="getFile" v-show="false" type="file" name="image" accept="image/*">
    </div>
  </div>
</template>
<script>
// import io from 'socket.io-client'
// const socket = io.connect('http://192.168.1.155:666')
import {mapState} from 'vuex'
import ChatHistory from './components/chat-history'
export default {
  name: 'chatroom',
  components: { ChatHistory },
  data: function () {
    return {
      newsList: [
        {'id': 1, 'point': '', 'content': '您好好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊我喜欢你珊珊', 'me': false},
        {'id': 2, 'point': '', 'content': '您好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好', 'me': true},
        {'id': 3, 'point': '', 'content': '您好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好', 'me': true},
        {'id': 4, 'point': '', 'content': '您好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好我喜欢你珊珊好', 'me': true}
      ],
      loadImg: require('../../assets/img/load_chat_icon.png'),
      msg: ''
    }
  },
  mounted: function () {
    console.log('111')
    // let _this = this
    // socket.emit('joinRoom', {mobile: this.user.mobile, to_mobile: '18234018235'})
    // socket.on('joinRes', function (data) {
    //   console.log(data)
    // })
    // socket.on('message', function (data) {
    //   console.log(1)
    //   console.log(data)
    //   _this.handMessage(data)
    // })  socket.emit('joinRoom', {mobile: this.user.mobile, to_mobile: '18234018235'})
    // socket.on('joinRes', function (data) {
    //   console.log(data)
    // })
    // socket.on('message', function (data) {
    //   console.log(1)
    //   console.log(data)
    //   _this.handMessage(data)
    // })
  },
  methods: {
    sendMessage (type = 'text', message) {
      // socket.emit('sendMsg', this.msg)
      this.msg = ''
    },
    handMessage (data) {
      var receiveMsg = {}
      if (data.hasOwnProperty('content')) {
        receiveMsg.content = data.content
      }
      this.newsList.push(receiveMsg)
    }
  },
  computed: mapState({user: state => state.login})
}
</script>
<style lang="scss" scoped="">
@import './chatRoom.scss';
  .view{
    padding: 0;
  }
  .chat_head{
    width:100%;
    height:0.88rem;
    @include center;
  }
  .chat_content{
    width:100%;
    height:calc(100% - 0.88rem - 0.88rem);
    padding: .24rem;
    background-color: #fff;
    li{
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;
      margin-top: .2rem;
      a{
        display: block;
        @include y(.44rem);
        overflow: hidden;
        margin-right: .1rem;
       img{
         display: block;
         @include z(100%);
       }
      }
      p{
        max-width: calc(100% - .54rem);
        line-height: 0.44rem;
        font-size: 0.24rem;
        padding: 0 .1rem;
        @include border-radius(.08rem);
        text-align: left;
        background-color: blue;
      }
      &.chat_me{
        justify-content: flex-end;
        a{
          margin: 0;
          margin-left: .1rem;
        }
        p{
          background-color: #9EEA6A;
        }
      }
    }
  }
  .chat_edit{
    width:100%;
    height:0.88rem;
    background-color: #C1B4CD;
    input{
      @include rect(80%, 100%);
      background: none;
    }
    button{
      width: 1.2rem;
      height: .44rem;
      border: none;
    }
  }
</style>
