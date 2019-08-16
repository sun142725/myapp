<template>
  <div class="view">
    <v-header title="珊珊的聊天室"></v-header>
    <div class="chat-history-com" ref="chatHistoryCom" >
            <chat-history backUrl='/chat'></chat-history>
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
import {mapState} from 'vuex'
import ChatHistory from './components/chat-history'
import { getRoomMember } from '@/api/chat.js'
export default {
  name: 'chatroom',
  components: { ChatHistory },
  data: function () {
    return {
      loadImg: require('../../assets/img/load_chat_icon.png'),
      message: ''
    }
  },
  mounted: function () {
    console.log('111')
    this.getRoomMember()
  },
  methods: {
    sendMessage (type = 'text', message) {
      // socket.emit('sendMsg', this.msg)
      this.message = ''
    },
    //  上传图片
    uploadFile () {
      this.$refs.uploadFile.click()
    },
    //  获取上传图片并发送消息
    getFile () {
      console.log('111', this.$refs.uploadFile.files)
      let _this = this
      var formData = new FormData()
      formData.append('code', _this.visitRecord.userCode)
      formData.append('modularType', 'DPC')
      formData.append('file', this.$refs.uploadFile.files[0])
      //  掉接口
      this.uploadFile(formData)
        .then(res => {
          console.log('res', res.data.filePath)
          this.$refs.uploadFile.value = ''
          _this.sendMessage('image', res.data.filePath)
        })
    },
    getRoomMember () {
      getRoomMember({room_id: this.$route.query.room_id})
        .then(res => {
          if (res.data.code === 0) {
            console.log('roomMenber', res.data.body)
          }
        })
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
