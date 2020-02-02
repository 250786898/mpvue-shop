<template>
 <div class="result">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/pay-success-icon.png" class="result-icon">
    <div class="result-text">支付成功</div>

    <div class="btn-group">
      <button @click="toOrderDetail">订单详情</button>
      <button @click="backToIndex">返回首页</button>
    </div>
 </div>
</template>

<script>
export default {
  methods: {
    /**
     * @description 返回首页
     */
    backToIndex () {
      wx.switchTab({
        url: '/pages/index/main',
      })
    },

    toOrderDetail () {
      wx.redirectTo({
        url: `/pages/order/detail/main?id=${ this.$root.$mp.query.id }`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.result{
  padding-top: 100rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-icon{
    width: 180rpx;
    height: 180rpx;
    margin-bottom: 19rpx;
  }
  &-text{
    font-size: 40rpx;
  }
  button{
    width:470rpx;
    height:80rpx;
    line-height: 80rpx;
    background: #ffffff;
    border:1rpx solid #797979;
    border-radius:10rpx;
    color: #797979;
    font-weight: bold;
    font-size: 34rpx;
    &:nth-of-type(1) {
      margin-bottom: 30rpx;
    }
  }
  .btn-group{
    position: fixed;
    bottom: 127rpx;
  }
}
</style>
