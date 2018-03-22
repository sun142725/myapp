<template>
  <div class="view-no">
    <div class="view-no" v-show="!wait">
      <img src="" alt="">
    </div>
    <div class="view-no" v-show="wait">
      <h6 class="page-head">排行榜</h6>
      <ul class="music-banner">
        <li>
          <a href="#">
            <img src="" alt="">
          </a>
        </li>
      </ul>
      <ul class="ranking">
        <li v-for="(v, i) in rankList" :key="i">
          <div class="pic-box">
            <img :src="v.picUrl" alt="">
          </div>
          <div>
            <h6>{{v.topTitle}}</h6>
            <span v-for="(value, j) in v.songList" :key="j">{{j+1}}、{{value.songname}}-{{value.singername}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ranking',
  data: function () {
    return {
      wait: false,
      rankList: []
    }
  },
  mounted: function () {
    setTimeout(() => {
      this.wait = true
    }, 1000)
    this.getRanking()
  },
  methods: {
    getRanking: function () {
      console.log(1)
      this.http.musicBanner()
        .then(res => {
          if (res.code === 0) {
            this.rankList = res.data.topList
            console.log(this.rankList)
          } else {
            alert(res.message)
          }
        })
    }
  }
}
</script>
<style lang="sass">
  @import "../common/common"
  @import "./css/music"
</style>
