<template>
  <div class="container">
    <exchange-box />
    <CouponList :couponInfo="couponInfo" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api'
import CouponModel from '@/model/coupon'
import ExchangeBox from './components/ExchangeBox/index'
import CouponList from './components/CouponList'

const couponModel = new CouponModel()

export default {
  components: {
    ExchangeBox,
    CouponList
  },

  data() {
    return {
      couponInfo: {
        //优惠券相关信息
        expireSoonNum: 0,
        normalList: [],
        useList: [],
        expiredList: []
      }
    }
  },

  mounted() {
    this.loadCouponList()
  },

  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    wx.showNavigationBarLoading()
    this.loadCouponList()
  },

  methods: {
    /**
     * @description 加载优惠券列表
     */
    async loadCouponList() {
      wx.showLoading({
        title: '加载中'
      })
      const res = await couponModel.getMineCouponList()
      if (res.code == Api.CODES.SUCCESS) {
        this.couponInfo = res.data
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    }
  }
}
</script>

<style lang="scss">
page {
  background: rgba(243, 243, 243, 1);
  padding-top: 104rpx;
}
</style>

<style lang="scss" scoped>
</style>
