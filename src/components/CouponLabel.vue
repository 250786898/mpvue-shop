<template>
  <div class="coupon-item">
    <div>{{item.couponEliyibilityName}}</div>
    <div class="coupon-item-circle"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: { //优惠券对象
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
 .coupon-item{
  position: relative;
  padding: 0 14rpx 0 8rpx;
  height:32rpx;
  line-height: 32rpx;
  text-align: center;
  display: inline-block;
  background:rgba(255,56,89,1);
  border-radius:3rpx;
  color: #fff;
  font-size: 20rpx;
  margin-right: 10rpx;
  &-circle{
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    background: #fff;
    z-index: 2;
    position: absolute;
    right: -5rpx;
    top: 11rpx;
  }
}
</style>
