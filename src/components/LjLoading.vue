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
  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #0FD7C0;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>
