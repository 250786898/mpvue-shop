<template>
  <div class="bar">
    <div class="orders">
      <div class="orders-item" @click="makeEmit('obligation')">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/payment_icon.png" class="orders-item__icon">
        <span class="orders-item__status">待付款</span>
      </div>
      <div class="orders-item" @click="makeEmit('toPickUp')">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/mention_icon.png" class="orders-item__icon">
        <span class="orders-item__status">待提货</span>
      </div>
      <div class="orders-item" @click="makeEmit('pickUp')" >
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/evaluate_icon.png" class="orders-item__icon">
        <span class="orders-item__status">已提货</span>
      </div>
      <div class="orders-item" @click="makeEmit('salesReturn')">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/after-sell_icon.png" class="orders-item__icon">
        <span class="orders-item__status">售后/退款</span>
      </div>
    </div>
    <div class="all-order">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/all-order-border.png" class="all-order__border">
      <div class="all-order-main" @click="makeEmit('allOrder')">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/after-sell_icon.png" class="all-order-main__icon">
        <span class="all-order-main__status">全部订单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    makeEmit (emitName) {
      this.$emit(emitName)
    }

  }
}
</script>

<style lang="scss" scoped>
.bar{
  width:100%;
  height:175rpx;
  background:rgba(255,255,255,1);
  border:1px solid rgba(255,255,255,1);
  border-radius:20rpx;
  display: flex;
  align-items: center;
  padding: 0 40rpx;
  margin-bottom: 20rpx;
  box-sizing: border-box;
  .orders{
    display: flex;
    justify-content: space-between;
    width: 484rpx;
    &-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 24rpx;
      &__icon{
        width:64rpx;
        height: 64rpx;
        margin-bottom: 10rpx;
      }
    }
  }
  .all-order{
    display: flex;
    align-items: center;
    &__border{
      width:37rpx;
      height: 123rpx;
    }
    &-main{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 24rpx;
      margin-left: 10rpx;
      &__icon{
        width:64rpx;
        height: 64rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>
