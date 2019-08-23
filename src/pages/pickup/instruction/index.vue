<template>
  <div class="container">
    <div class="block">
      <h4>一、如何使用提货码？</h4>
      <p>打开收付款后，用户向商家展示二维码条形码，商家使用扫码枪或者摄像头，快速扫描用户的二维码即可完成交易。</p>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 70rpx 30rpx;
  }
  .block {
    h4 {
      margin-bottom: 10rpx;
      font-size: 32rpx;
    }
    p {
      padding-left: 64rpx;
      line-height: 48rpx;
      font-size: 28rpx;
      color: #666;
    }

    + .block {
      margin-top: 30rpx;
    }
  }
</style>
