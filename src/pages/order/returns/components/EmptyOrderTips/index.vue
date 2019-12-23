<template>
  <div class="empty-order-tips">
    <img
      src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/empty_order_tips.png"
      class="empty-order-tips__img"
    />
    <div class="empty-order-tips__text">暂时没有订单哦</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped >
.empty-order-tips {
  width: 710rpx;
  height: 951rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 10rpx;
  margin: 0 auto;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  &__img {
    width: 468rpx;
    height: 338rpx;
  }
  &__text {
    text-align: center;
    font-size: 26rpx;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
  }
}
</style>
