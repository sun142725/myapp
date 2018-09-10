<template>
  <div class="alert">
    <div class="alert_title"></div>
    <div class="alert_content">

    </div>
  </div>
</template>
<script>
  export default {
    name: 'alert',
    props: {
      title: {
        type: String,
        default: '系统提示'
      },
      content: {
        type: String,
      },
      buttonText: {
        type: String,
        default: '确定'
      },
      hideOnBlur: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
