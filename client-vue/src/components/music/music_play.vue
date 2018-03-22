<template>
  <div class="view-no">
  </div>
</template>
<script>
var walk = require('ss-get-files')
export default{
  name: 'music-play',
  mounted: function () {
    console.log(walk)
  }
}
</script>
<style lang="scss">
  @import "../common/common";
</style>
