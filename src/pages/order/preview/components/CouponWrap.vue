<template>
  <div class="card">
    <div class="card-title">优惠券</div>
    <div class="card-content">
      <span>满100减10元</span>
      <img src="/static/images/order-right-icon.png" class="right-icon" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.card {
  font-size: 28rpx;
  display: flex;
  height: 87rpx;
  align-items: center;
  justify-content:space-between;
  padding: 0 30rpx;
  box-sizing: border-box;
  background: #ffffff;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
  margin-bottom: 20rpx;
  &-title{
    font-weight: bold;
  }
  &-content{
    color: #999999;
    display: flex;
    align-items: center;
  }
  .right-icon{
    width: 11rpx;
    height: 20rpx;
    margin-left: 9rpx;
  }
}
</style>
