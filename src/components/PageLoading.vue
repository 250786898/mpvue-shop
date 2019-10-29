<template>
  <div class="loading" v-if="show">
    <!-- <lj-loading /> -->
    <div class="loading-main">
      <img src="/static/images/page_loading_icon.gif" mode="aspectFit">
      <div class="loading-text">正在加载中...</div>
    </div>

  </div>
</template>

<script>
import LjLoading from '@/components/LjLoading'
export default {
  components: {
    LjLoading
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .loading {
    width: 100vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    overflow: hidden;
    img{
      width: 600rpx;
      height: 320rpx;
    }
    &-text{
      color: #666;
      text-align: center;
      position: relative;
      top: -100rpx;
      font-size: 26rpx;

    }
  }
</style>
