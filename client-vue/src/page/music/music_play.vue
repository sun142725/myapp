<template>
  <div class="view-no">
    <x-header :left-options="{backText: ''}">{{this.$route.query.name}}</x-header>
    <audio :src="songUrl" controls></audio>
  </div>
</template>
<script>
import { XHeader } from 'vux'
export default{
  name: 'music-play',
  components: { XHeader },
  created: function () {
    // http://dl.stream.qqmusic.qq.com/C4000027VNOV2JQRYA.m4a?guid=1446173418&vkey=92D934EB291BD765984C6ECE74F6DCFBC39B4B7BD5D95EE086F88046B5C06DDF4953B6D09AD05D48677789070C6E5722635B4C43FCC689DC&uin=0&fromtag=42
    // https://i.y.qq.com/v8/playsong.html?songmid=000Md1wq0vnwzE&ADTAG=myqq&from=myqq&channel=10007100
    this.songUrl = `http://dl.stream.qqmusic.qq.com/C400${this.$route.query.songmid}.m4a?guid=8533048437&vkey=116F20E488A661363240014C69E1182D1CABD75F7FE19C528FD39853499B815CAB0A95CD86B8DD97C02086E1C46CFE425FDD49403A6A6EBA&uin=0&fromtag=42`
    // this.songUrl = `http://ws.stream.qqmusic.qq.com/${this.$route.query.songid}.m4a?fromtag=46`
  },
  mounted: function () {
    // var id = this.$route.query.songid
    // this.http.getLyric({musicid: id})
  }
}
</script>
<style lang="scss">
  /*@import "../sass/sass";*/
</style>
