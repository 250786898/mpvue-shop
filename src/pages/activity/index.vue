<template>
  <div class="container">
    <Top-bg :imgSrc="activityInfo ? activityInfo.activityBanner : '' " />
    <div class="container-main">
      <template v-if="couponList && couponList.length > 0">
        <coupon-list :list="couponList" />
      </template>
      <template v-else>
        <EmptyIcon :title="'您来晚了,优惠券已枪光~'"/>
      </template>
    </div>
    <to-home />
    <to-coupon />
    <button class="fetch-btn" v-if="isShowFetchBtn" @click="fetchCoupon">一键领取</button>
  </div>
</template>

<script>
import TopBg from './components/TopBg'
import CouponList from './components/CouponList/index'
import toCoupon from './components/ToCoupon'
import toHome from './components/toHome'
import EmptyIcon from './components/EmptyCouponTip'
import CouponModel from '@/model/coupon'
import { Api } from '@/http/api'
const couponModel = new CouponModel()
export default {
  components: {
    TopBg,
    CouponList,
    toHome,
    toCoupon,
    EmptyIcon
  },

  data() {
    return {
      activityInfo: {}, //活动信息
      couponList: [], //优惠券列表
      isShowFetchBtn: false //是否显示领取按钮
    }
  },

  mounted() {
    console.log('getActivityCouponList')
    this.getActivityCouponList()
  },

  methods: {
    /**
     * @description 加载活动优惠券列表
     */
    async getActivityCouponList() {
      wx.showLoading({
        title: '加载中'
      })
      const res = await couponModel.getActivityCoupon({
        activityId: this.$mp.page.options.id ? this.$mp.page.options.id : ''
      })
      wx.hideLoading()
      console.log('1', res.data.shopCoupons)
      if (res.code == Api.CODES.SUCCESS) {
        this.isShowFetchBtn = res.data.oneKeyCollection == 0 ? true : false
        this.activityInfo = res.data.shopCouponActivity
        this.couponList = res.data.shopCoupons
        wx.setNavigationBarTitle({
          title: res.data.shopCouponActivity.activityName
        })
      }
    },

    /**
     * @description 领取优惠券
     */
    fetchCoupon() {
      this.$store
        .dispatch('fetchActivityCoupon', this.activityInfo.id)
        .then(code => {
          if (code == 200002) {
            this.isShowFetchBtn = false //隐藏领取按钮
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  box-sizing: border-box;
  background: #fe4662;
  position: relative;
  padding: 426rpx 20rpx 120rpx;
  &-main {
    position: relative;
  }
  .fetch-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
    font-weight: bold;
    width: 100vw;
    height: 106rpx;
    line-height: 106rpx;
    background: linear-gradient(
      268deg,
      rgba(251, 226, 146, 1) 0%,
      rgba(253, 234, 178, 1) 100%
    );
    color: #fe4662;
    font-size: 34rpx;
  }
}
</style>
