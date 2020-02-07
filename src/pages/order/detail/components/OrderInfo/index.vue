<template>
  <div class="card">
    <div class="card-item">
      <div class="card-item-desc">下单时间：</div>
      <div class="card-item-content">{{orderInfo.orderTime}}</div>
    </div>
    <div class="card-item">
      <div class="card-item-desc">订单编号：</div>
      <div class="card-item-content order-no">
        <span>{{orderInfo.orderSn}}</span>
        <div class="copy" @click="copyOrderNO">复制</div>
      </div>
    </div>
    <div class="card-item">
      <div class="card-item-desc">支付方式：</div>
      <div class="card-item-content">微信支付</div>
    </div>
  </div>
</template>

<script>
export default {
 props: {
    orderInfo: { //订单信息
      type: Object,
      default: () => ({})
    }
  },
  methods: {

    /**
     * @description 复制订单号
     */
    copyOrderNO() {
      wx.setClipboardData({
        data: this.orderInfo.orderSn,
        success: () => wx.showToast({ title: '复制成功' }),
        fail: () => wx.showToast({ title: '复制失败', icon: 'none' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  padding: 30rpx;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: #999999;
  &-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
    &:nth-last-of-type(1){
      margin-bottom: 0;
    }
    .copy{
      width:100rpx;
      height:43rpx;
      line-height: 43rpx;
      text-align: center;
      border:2rpx solid rgba(204,204,204,1);
      border-radius:6rpx;
      margin-left: 20rpx;
    }
    .order-no{
      display: flex;
      align-items: center;
    }
  }
}
</style>
