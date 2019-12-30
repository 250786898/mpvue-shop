<template>
  <div class="bar">
    <div class="bar-main">
      <div class="bar-title">
        促销
      </div>
      <scroll-view
        :scroll-x="true"
        :scroll-into-view="toCurrentNavItem"
        :scroll-with-animation="true"
        style=" white-space: nowrap; "
        class="coupon-list"
      >
        <CouponLabel v-for="item in list" v-bind:key="item.id" :item="item" />

      </scroll-view>
    </div>

    <div class="grayarrow-icon" @click="fetchCoupon">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/downward-bg-icon.png" class="grayarrow-icon__bg" alt="">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_icon_grayarrow.png.png" class="grayarrow-icon__main" mode="aspectFit">
    </div>
  </div>
</template>

<script>
import CouponLabel from '@/components/CouponLabel'
export default {
  components: {
    CouponLabel
  },
  props: {
    list: { //优惠券列表
      type: Array,
      default: () => []
    }
  },

  methods: {
    /**
     * @description 跳转领取优惠券
     */
    fetchCoupon () {
      this.$emit('fetchCoupon')
    }
  }
}
</script>

<style lang="scss" scoped>
.bar{
  height:86rpx;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0rpx 0 20rpx;
  box-sizing: border-box;
  background: #ffffff;
  &-main{
    display: flex;
    align-items: center;
  }
  &-title{
    color: #9B9B9B;
    font-size: 28rpx;
  }
  .coupon-list {
    display: flex;
    margin-left: 29rpx;
    width: 614rpx;
    padding: 0;
    align-items: center;
    font-size: 0;
    // padding-right: 70rpx;
    box-sizing: border-box;
  }
  .grayarrow-icon{
    width:77rpx;
    height:86rpx;
    position: absolute;
    right: 0;
    top: 0;
    &__bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }
    &__main{
      width: 32rpx;
      height: 28rpx;
      position: absolute;
      top: 30rpx;
      left: 30rpx;
    }
  }
}
</style>
