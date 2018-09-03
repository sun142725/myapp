<template>
  <div class="view-no active">
    <div class="view-no">
      <x-header :left-options="{backText: ''}">排行榜 <router-link to="/music/search" slot="right"><x-icon type="ios-search" size="30" style="color:#fff;"></x-icon></router-link></x-header>
      <ul class="music-banner">
        <li>
          <a href="#">
            <img src="" alt="">
          </a>
        </li>
      </ul>
      <ul class="ranking">
        <li v-for="(v, i) in rankList" :key="i">
          <router-link :to="{name: 'musiclist', query: {id: v.id}}">
            <div class="pic-box">
              <img :src="v.picUrl" alt="">
            </div>
            <div class="rank-R">
              <h6>{{v.topTitle}}</h6>
              <span v-for="(value, j) in v.songList" :key="j">{{j+1}}、{{value.songname}}-{{value.singername}}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  name: 'Ranking',
  components: { XHeader },
  data: function () {
    return {
      wait: false,
      rankList: []
    }
  },
  mounted: function () {
    this.getRanking()
  },
  methods: {
    getRanking: function () {
      console.log(1)
      this.$vux.loading.show({
        text: 'Loading...'
      })
      this.http.musicBanner()
        .then(res => {
          this.$vux.loading.hide()
          if (res.code === 0) {
            this.rankList = res.data.topList
          } else {
            this.$vux.toast({
              type: 'text',
              text: res.message
            })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .active{
    @include random;
  }
</style>
