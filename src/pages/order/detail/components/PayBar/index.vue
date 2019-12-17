<template>
  <div class="bar">
    <div class="pay-time-remaining">
      <span >支付剩余时间</span>
      <span class="timer"> 300S</span>
    </div>
    <div class="bar-tip">请在订单提交后，尽快付款，超时订单将自动取消</div>
    <div class="btn-group">
      <button type="default" class="cencel-order-btn" @click="cancelOrder">取消订单</button>
      <button type="primary" @click="payOrder">立即支付</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * @description 取消订单
     */
    cancelOrder () {
      this.$emit('cancelOrder')
    },

    /**
     * @description 支付订单
     */
    payOrder () {
      this.$emit('payOrder')
    }
  }
}
</script>

<style lang="scss" scoped>
.bar{
  background: #ffffff;
  border-radius:10rpx;
  padding: 50rpx 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20rpx;
  .pay-time-remaining{
    color: #090909;
    font-weight:800;
    font-size: 34rpx;
    .timer{
      color:#01BD9F;
    }
  }
  .bar-tip{
    color: #999999;
    font-size: 26rpx;
    margin: 21rpx 0 28rpx;
  }
  .btn-group{
    display: flex;
    button{
      width:187rpx;
      height:64rpx;
      line-height: 64rpx;
    }
    .cencel-order-btn{
      margin-right: 26rpx;
    }
  }
}
</style>
