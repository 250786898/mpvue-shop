<template>
 <div class="coupons-list-container">
    <!-- v-if="couponInfo.normalList.length && couponInfo.useList.length &&  ouponInfo.expiredList.length  -->
    <div v-if="true">
      <div class="coupons-list-header">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_remind_png.png" alt="" class="remind_png">
          <span>您有<span class="totol-coupons-num">{{couponInfo.expireSoonNum}}</span>张优惠券即将到期</span>
      </div>

      <div class="coupons-list" >
        <CouponCard v-for="item in couponInfo.normalList" :key="item.id" :item="item" />
        <CouponCard type="used" v-for="item in couponInfo.useList" :key="item.id" :item="item" />
        <CouponCard type="expire" v-for="item in couponInfo.expiredList" :key="item.id" :item="item" />
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
  props: {
    couponInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    useList () {
      // let arr = []
      // console.log('useList',couponInfo.useList)
    }
  }
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
