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
    this.songUrl = `http://dl.stream.qqmusic.qq.com/C400${this.$route.query.songmid}.m4a?guid=1446173418&vkey=92D934EB291BD765984C6ECE74F6DCFBC39B4B7BD5D95EE086F88046B5C06DDF4953B6D09AD05D48677789070C6E5722635B4C43FCC689DC&uin=0&fromtag=42`
  },
  mounted: function () {
    var id = this.$route.query.songid
    this.http.getLyric({musicid: id})
  }
}
</script>
<style lang="scss">
  @import "../common/common";
</style>
