<template>
  <div class="view">
    <div class="chat-head">
      <router-link to="">111</router-link>
      <span>???</span>
    </div>
    <ul class="chat-content">
      <li v-for="(v, i) in newsList" :key="i" :class="v.me ? 'chat-me' : ''">
        <router-link to="/friend">
          <img src="" alt="">
        </router-link>
        <p></p>
      </li>
    </ul>
    <div class="chat-edit">
      <input type="text" autocomplete="off">
      <button>发送</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chatroom',
  data: function () {
    return {
      newsList: [{'id': 1, 'point': '', 'content': '您好', 'me': false}, {'id': 2, 'point': '', 'content': '您好', 'me': true}]
    }
  },
  mounted: function () {
    console.log(this.$router)
  }
}
</script>
<style lang="scss" scoped="">
  @import "../common/common";
  .view{
    padding: 0;
  }
  .chat-head{
    width:100%;
    height:0.88rem;
    @include center;
  }
  .chat-content{
    width:100%;
    height:calc(100% - 0.88rem - 0.88rem);
    @include random;
    li{
      width: 100%;
      height: auto;
      p{
        line-height: 0.36rem;
        font-size: 0.24rem;
      }
      *{
        a, p{
          float: left;
        }
        p{
          @include random;
        }
      }
      &.chat-me{
        a, p{
          float: right;
        }
        p{
          @include random;
        }
      }
    }
  }
  .chat-edit{
    width:100%;
    height:0.88rem;
    @include random;
    input{
      @include rect(80%, 100%);
    }
  }
</style>
