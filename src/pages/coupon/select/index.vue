<template>
  <div class="container">
    <div class="header">
      <div class="header-title">不使用优惠券</div>
      <radio class="header-radio" color="#01BD9F" @click="selectNonuseCoupon" :checked="isNonuseCoupon"></radio>
    </div>

    <div class="coupon-list">
      <div class="coupon-itew" v-for="item in couponList" v-bind:key="item.id">
        <CouponCard type="select" :item="item" @selectCoupon="selectCoupon" :selectItem="selectCouponOfsubmitOrder" />
      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import CouponCard from '../components/CouponCard'
export default {
  components: {
    CouponCard
  },
  data () {
    return {
      couponList: [], //优惠券列表
      isNonuseCoupon: false //是否不使用用优惠券
    }
  },

  computed: {
    ...mapState(['selectCouponOfsubmitOrder'])
  },

  mounted () {
    this.setCouponList()
  },

  methods: {
    /**
     * @description 加载优惠券列表
     */
    setCouponList () {
      this.couponList = JSON.parse(this.$root.$mp.query.couponList)
    },

    /**
     * @description 选择不适用优惠券
     */
    selectNonuseCoupon () {
      this.isNonuseCoupon = !this.isNonuseCoupon
      this.$store.commit('setSubmitOrderCoupon',{})
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
      console.log('selectCoupon')
    },

    /**
     * @description 选中使用的优惠券
     */
    selectCoupon (item) {
      this.isNonuseCoupon = false //修改不使用优惠券状态
      this.$store.commit('setSubmitOrderCoupon',item)
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
    }
  }
}
</script>

<style>
page{
  background: #EEEEEE;
  padding: 20rpx;
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.header{
  background: #ffffff;
  border-radius:10rpx;
  height: 90rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  color: #666666;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  &-radio{
    transform: scale(0.8)
  }
}
</style>
