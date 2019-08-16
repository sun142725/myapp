<template>
  <div class="view">
    <router-view></router-view>
    <UnderNav></UnderNav>
  </div>
</template>
<script>
import UnderNav from './home/underNav'
export default {
  name: '',
  components: {UnderNav}
}
</script>
