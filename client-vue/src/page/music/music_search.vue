<template>
    <div class="view-no">
        <x-header :left-options="{backText: ''}">搜索</x-header>
        <search
                v-model="value"
                position="absolute"
                auto-scroll-to-top
                top="46px"
                @on-submit="onSubmit"
                ref="search"></search>
        <ul class="ranking nobanner" style="height:calc(100% - 90px)">
            <li v-for="(v, i) in results" :key="i">
                <router-link :to="{name: 'music_play', query: {songmid: v.songmid,songid: v.songid, name: v.albumname}}">
                    <div style="font-size: 14px;">{{i+1}}</div>
                    <div class="rank-R">
                        <h6>{{v.albumname}}</h6>
                        <span>{{v.singer[0].name}}</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { XHeader, XInput, Search } from 'vux'
export default{
  name: 'music_search',
  components: { XHeader, XInput, Search },
  data: function () {
    return {
      value: '',
      results: []
    }
  },
  methods: {
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.loading.show({
        text: 'Loading...'
      })
      this.http.musicSearch({w: '空空'})
        .then(res => {
          this.$vux.loading.hide()
          if (res.code === 0) {
            this.results = res.data.song.list
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
<style lang="sass">
    @import "../common/common"
    @import "css/music"
</style>
