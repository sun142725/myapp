<template>
  <div class="view">
    <UnderNav></UnderNav>
    <router-view></router-view>
  </div>
</template>
<script>
import UnderNav from './home/underNav'
export default {
  name: '',
  components: {UnderNav}
}
</script>
