<template>
  <div class="card">
    <div class="card-title">优惠券</div>
    <div class="card-content" @click="selectCoupon">
      <span v-if="selectCouponOfsubmitOrder.systemCode">满{{selectCouponOfsubmitOrder.eliyibility}}减{{selectCouponOfsubmitOrder.couponMoney}}元</span>
      <span v-else>{{orderInfo.shopCouponNum}}张优惠券可用</span>
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order-right-icon.png" class="right-icon" alt="">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    orderInfo: { //确认订单的相关信息
      type: Object,
      default: {}
    }
  },

  computed: {
    ...mapState(['selectCouponOfsubmitOrder'])
  },

  methods: {
    /**
     * @description  选择优惠券
     */
    selectCoupon () {
      const couponList = JSON.stringify(this.orderInfo.shopCoupons)
      console.log('couponList',couponList)
      if(orderInfo.shopCouponNum) {
         wx.navigateTo({
          url: `/pages/coupon/select/main?couponList=${couponList}`
        })
      }

    }
  }
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
