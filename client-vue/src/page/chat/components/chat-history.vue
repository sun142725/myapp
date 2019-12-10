<template>
  <ul class="chat-history" @click.self="showPdf">
    <li v-for="(message, index) in messageHistory" :key="index">
      <h6>{{message.time | formatTime}}</h6>
      <div class="custom"></div>
      <div class="message-core">
        <div class="avar" v-if="!message.isSend">
          <img :src="doctorHeadImg" alt />
        </div>
        <div class="content" :class="message.isSend ? 'right' : 'left'">
          <span v-if="message.type=='text'">{{message.content}}</span>
          <div class="content-image" v-else-if="message.type == 'image'">
            <img @click.stop="showImg(message)" :src="message.content" alt />
          </div>
          <div class="content-file" v-else-if="message.type == 'file'">
            <a
              href="javascript:void(0)"
              @click="showPdf(message.content)"
              target="_blank"
              download="file"
            >
              <i>{{message.content.split('/')[message.content.split('/').length-1]}}</i>
              <img src="../../../assets/img/pdf.png" alt />
            </a>
          </div>
          <div v-else-if="message.type == 'chufang'">{{message.content}}</div>
          <!-- <div v-else>{{}}</div> -->
        </div>
        <div class="avar" v-if="message.isSend">
          <img :src="patientHeadImg" alt />
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { formatTime } from '../js/index'
import { mapState } from 'vuex'
import { pdf, photoSwipe } from '../../../plugin/index'
export default {
  name: 'chat-history',
  filters: { formatTime },
  data: function () {
    return {
      doctorHeadImg: require('../../../assets/img/load_chat_icon.png'),
      patientHeadImg: require('../../../assets/img/load_chat_icon.png')
    }
  },
  mounted: function () {
    console.log(this.$route)
  },
  methods: {
    showPdf (content) {
      pdf('https://main.qcloudimg.com/raw/document/product/pdf/647_32228_cn.pdf')
    },
    showImg (message) {
      var index = this.imagesArr.findIndex(v => v.id === message.id)
      photoSwipe(this.imagesArr[index], this.imagesArr)
    }
  },
  computed: {
    ...mapState({
      // messages: state => state.chatStore.chatHistory[Vue.$router.query.room_id]
    }),
    imagesArr: function () {
      return this.messageHistory.filter(v => {
        return v.type === 'image' && (v.src = v.content)
      })
    },
    messageHistory: function () {
      console.log('store', this.$store.state.chatStore.chatHistory)
      return this.$store.state.chatStore.chatHistory[this.$route.query.room_id]
    }
  },
  destroyed: function () {
    pdf('')
  }
}
</script>
<style lang="scss" scoped>
@import "./chat-history.scss";
</style>
