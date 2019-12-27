export default {
  data () {
    return {

    }
  },

  methods: {
    /**
     * @param {number} couponId 优惠券Id
     * @description 领取优惠券
     */
    fetchCouponByCouponId (couponId) {
      // this.activityInfo.id
      console.log('fetchCouponByCouponId',couponId)
      return this.$store.dispatch('exchangeOrFetchCoupon', couponId)
    }
  }
}
