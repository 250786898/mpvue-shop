<template>
  <div class="card">
    <div class="card-item">
      <div class="card-item-title">优惠券</div>
      <div class="card-item-content" @click="selectCoupon">
        <span v-if="selectCouponOfsubmitOrder.systemCode">{{orderInfo.couponEliyibilityName}}</span>
        <span
          v-else
          :class="[orderInfo.shopCouponNum ? 'coupon-active' : '']"
        >{{orderInfo.shopCouponNum}}张优惠券可用</span>
        <img
          src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order-right-icon.png"
          class="right-icon"
          alt
          v-if="orderInfo.shopCouponNum"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    orderInfo: {
      //确认订单的相关信息
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
    selectCoupon() {
      const couponList = JSON.stringify(this.orderInfo.shopCoupons)
      console.log('couponList', couponList)
      if (this.orderInfo.shopCouponNum) {
        wx.navigateTo({
          url: `/pages/coupon/select/main?couponList=${couponList}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.card {
  padding: 0 30rpx;
  background: #ffffff;
  &-item {
    border-bottom: 1rpx solid #e4e4e4;
    font-size: 28rpx;
    display: flex;
    height: 87rpx;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 10rpx 10rpx 0rpx 0;
    &-title {
      font-weight: bold;
    }
    &-content {
      color: #999999;
      display: flex;
      align-items: center;
    }
    .right-icon {
      width: 11rpx;
      height: 20rpx;
      margin-left: 9rpx;
    }
    .coupon-active {
      color: $text-red;
    }
  }
}
</style>
