<template>
  <div class="status" style>
    <img src="/static/images/order-status-bg.png" alt />
    <p class="status__text">申请成功，待商家处理</p>
    <p class="status__time">2019年10月21日 16:48:10</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped >
.status {
  width: 100%;
  height: 180rpx;
  border-radius: 10rpx;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 710rpx;
    height: 180rpx;
    z-index: -99;
  }
  &__text {
    margin-top: 52rpx;
    margin-left: 36rpx;
    font-size: 36rpx;
    color: rgba(255, 255, 255, 1);
    font-weight:800;
    font-family:PingFang SC;
  }
  &__time {
    margin-top: 14rpx;
    margin-left: 36rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    font-size: 26rpx;
  }
}
</style>
