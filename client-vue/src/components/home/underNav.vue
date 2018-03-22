<template>
  <ul class="underNav nav">
    <li>
      <router-link to="/chat">聊天</router-link>
    </li>
    <li>
      <router-link to="/music">听音乐</router-link>
    </li>
    <li>
      <router-link to="/home">首页</router-link>
    </li>
    <li>
      <router-link to="/trends">动态</router-link>
    </li>
    <li>
      <router-link to="/personal">我的</router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'underNav',
  data: function () {
    return {}
  }
}
</script>
<style lang="scss">
  @import "../common/common";
  @import "./css/nav";
  .underNav{
    width:100%;
    height:0.88rem;
    position: absolute;
    left:0;
    bottom:0;
    box-shadow: 0 -0.01rem 0.1rem rgba(0,0,0,0.2);
    background: #fff;
    a{
      display: block;
      &.router-link-active{
        @include random;
      }
    }
  }
</style>
