<template>
  <div class="view">
    <ul class="chatList">
      <li v-for='(v,i) in chatList' :key="i">
        <router-link :to="{name: 'chatroom', query: {id: v.id}}">
          <img src="" alt="">
          <div>
            <span>{{v.name}}</span>
            <span>{{v.newest}}</span>
          </div>
          <em>{{v.time}}</em>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'chat',
  data: function () {
    return {
      chatList: [{'id': 1, 'name': '李珊', 'point': '123.png', 'newest': '您好', 'time': '下午2:00'}]
    }
  }
}
</script>
<style lang="scss" scoped="">
  @import "../common/common";
  .view{
    padding: 0;
  }
  .chatList{
    width:100%;
    height:100%;
    overflow-y: auto;
    li{
      width:100%;
      height: 1rem;
      @include random;
    }
  }
</style>
