<template>
  <div class="loading">
    <!-- <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/Spin-1s-60px.gif" v-if="isNeedRefresh && !isLoadedAll"> -->
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
    },

    onReachBottom () {
    }
  }
</script>

<style scoped lang="scss">
  .loading {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    text-align: center;
    img {
      vertical-align: middle;
      width: 60rpx;
      height: 60rpx;
    }
    .text {
      padding:20rpx;
      font-size:26rpx;
      color:#999;
      text-align:center;
    }
  }
  .spinner {
    width: 40rpx;
    height: 40rpx;
    position: relative;
    margin: 20rpx auto ;
    // animation:  bounce 2s infinite linear;
    // transform: rotateZ(180deg);
  }

  .double-bounce1, .double-bounce2 {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    position: absolute;
    top: 0;
  }

  .double-bounce1 {
    left: 0;
    background: $theme-color;
    animation: bounce-left 1s infinite ease-in-out;
  }

  .double-bounce2 {
    right: 0;
    background: #000;
    animation: bounce-right 1s infinite ease-in-out;
  }

  @keyframes bounce {
    0%,100% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(180deg);
    }
  }

  @keyframes bounce-left{
    0%,100% {
      left: 0;

    }
    50% {
      left: 20rpx;
      z-index: 2;
    }
  }

   @keyframes bounce-right{
    0%,100%  {
      right: 0;
      z-index: 2;
    }
    50% {
      right: 20rpx;
      z-index: 1;
    }
  }
</style>
