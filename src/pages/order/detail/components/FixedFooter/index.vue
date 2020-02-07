<template>
  <div class="bar">
    <div class="bar-btn" @click="applyReturns" v-if="orderInfo.isContinueRefund">申请售后</div>
    <div class="bar-btn" @click="cancelOrder" v-if="orderstate == 10 || orderstate == 20">取消订单</div>
    <div class="bar-btn pickup-btn" @click="showOrderCode" v-if="orderstate == 20">提货码</div>
  </div>
</template>

<script>
export default {
  props: {
    orderId: { //订单Id
      type: String,
      default: ''
    },
    orderstate: { //订单状态
      type: Number,
      default: 0
    },
    orderInfo: { //订单信息
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    /**
     * @description 跳转申请售后页面
     */
    applyReturns() {
      console.log('applyReturns',this.orderId)
      wx.navigateTo({
        url: `/pages/order/returngoods/main?id=${ this.orderId }`
      })
    },

    /**
     * @description 取消订单
     *  */
    cancelOrder () {
       this.$emit('cancelOrder')
    },


    /**
     * @description 跳转提货码页面
     */
    showOrderCode() {
      wx.navigateTo({ url: `/pages/pickup/detail/main?id=${ this.orderId }` })
    },
  }
}
</script>

<style lang="scss" scoped>
.bar{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 105rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px -6rpx 10rpx 0px rgba(237,237,237,0.57);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 23rpx;
  box-sizing: border-box;
  &-btn{
    width:187rpx;
    height:64rpx;
    line-height: 64rpx;
    text-align: center;
    color: #999999;
    font-size: 32rpx;
    border:2rpx solid rgba(170,170,170,1);
    border-radius:10rpx;
    margin-left: 26rpx;
  }
  .pickup-btn {
    color: #01BD9F;
    border-color: #01BD9F;
  }
}
</style>
