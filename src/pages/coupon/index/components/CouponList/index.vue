<template>
 <div class="coupons-list-container">
    <!-- v-if="list.length > 0" -->
    <div v-if="true" >
      <div class="coupons-list-header">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_remind_png.png" alt="" class="remind_png">
          <span>您有<span class="totol-coupons-num">2</span>张优惠券即将到期</span>
      </div>

      <div class="coupons-list" >
        <CouponCard />
        <CouponCard type="used" />
        <CouponCard type="expire" />
        <!-- <coupon-card v-for="item in list" :key="item.couponId" :item="item" type="used"></coupon-card> -->
      </div>
    </div>

    <div v-else>
      <EmptyCouponTip />
    </div>

</div>

</template>

<script>
 import CouponCard from '../../../components/CouponCard'
 import EmptyCouponTip from '../../../components/EmptyCouponTip'
export default {
  components: {
    CouponCard,
    EmptyCouponTip
  },
}
</script>

<style lang="scss" scoped>
.coupons-list-container{
  padding: 0 20rpx;
  .coupons-list-header{
    padding: 20rpx 0;
    color: #929493;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    .remind_png{
      width: 24rpx;
      height: 24rpx;
      margin-right: 10rpx;
    }
  }
  .totol-coupons-num{
    color: #FF7200;
  }
}
</style>
