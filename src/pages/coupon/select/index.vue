<template>
  <div class="container">
    <div class="header">
      <div class="header-title">不使用优惠券</div>
      <radio class="header-radio" color="#01BD9F"></radio>
    </div>

    <div class="coupon-list">
      <CouponCard type="select" />
      <CouponCard type="select" />
    </div>

  </div>
</template>

<script>
import CouponCard from '../components/CouponCard'
export default {
  components: {
    CouponCard
  }
}
</script>

<style>
page{
  background: #EEEEEE;
  padding: 20rpx;
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.header{
  background: #ffffff;
  border-radius:10rpx;
  height: 90rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  color: #666666;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  &-radio{
    transform: scale(0.8)
  }
}
</style>
