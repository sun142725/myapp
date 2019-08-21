<style lang="scss" scoped>
.header {
  display: flex;
  height: .88rem;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  color: #fff;
  text-align: center;
  background: #fff;
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
  transition: opacity ease 0.5s;
  padding: 0 0.3rem;
  &.fromNative {
    height: 0 !important;
    display: none;
  }
  .left:before{
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid #666;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }
  .title {
    margin: 0 auto;
    font-size: 0.36rem;
    color: #333;
  }
  .left,
  .right {
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    display: flex;
    align-items: center;
    font-size: 0.2rem;
    color: #fff;
  }
  .right {
    justify-content: flex-end;
  }
}
</style>
<template>
  <header class="header">
    <div v-if="!this.$slots.left && isBack" class="left" v-on:click="goBack"></div>
    <div v-if="!this.$slots.left && !isBack"></div>
    <slot name="left"></slot>
    <div v-if="!this.$slots.title" class="title">{{ title ? title : $route.meta.title}}</div>
    <slot name="title"></slot>
    <div v-if="!this.$slots.right" class="right"></div>
    <slot name="right"></slot>
  </header>
</template>
<script>
export default {
  props: {
    isBack: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    backUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fromNative: false
    }
  },
  methods: {
    goBack () {
      if (!this.backUrl) {
        this.$router.go(-1)
      } else {
        this.$router.replace(this.backUrl)
      }
    }
  }
}
</script>
