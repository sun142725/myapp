<template>
  <div class="view">
    <x-header :left-options="{showBack: false}">do not show Back</x-header>
    个人中心
  </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  name: 'personal',
  components: { XHeader }
}
</script>
