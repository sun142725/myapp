<template>
    <div class="view-no">
        <div class="view-no">
            <x-header :left-options="{backText: ''}">{{detail.title}} <span slot="right">共{{detail.number || 0}}首</span></x-header>
            <ul class="ranking nobanner">
                <li v-for="(v, i) in rankList" :key="i">
                    <router-link :to="{name: 'music_play', query: {songmid: v.data.songmid}}">
                        <div style="font-size: 14px;">{{i+1}}</div>
                        <div class="rank-R">
                            <h6>{{v.data.albumname}}</h6>
                            <span>{{v.data.albumdesc || v.data.singer[0].name}}</span>
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
      rankList: [],
      detail: {
        title: '排行榜详情',
        number: 0
      }
    }
  },
  mounted: function () {
    this.$vux.loading.show({
      text: 'Loading...'
    })
    this.http.musicList({topid: this.$route.query.id})
      .then(res => {
        this.$vux.loading.hide()
        if (res.code === 0) {
          this.rankList = res.songlist
          this.detail.title = res.topinfo.ListName
          this.detail.number = res.cur_song_num
        } else {
          this.$vux.toast({
            type: 'text',
            text: res.message
          })
        }
      })
  }
}
</script>
<style lang="sass">
    @import "../common/common"
    @import "./css/music"
</style>
