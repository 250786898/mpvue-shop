<template>
  <div>
    <shop-list :list="this.list"></shop-list>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ShopList from '@/components/ShopList'
  import { Api } from '@/http/api'

  export default {
    components: {
      ShopList
    },
    data () {
      return {
        couponId : 0,
        list: []
      }
    },
    computed: {
      ...mapState(['location', 'storeId'])
    },
    methods: {
      getCouponLimitShop (location) {
        wx.showLoading({})
        Api.coupon.couponLimitStore({
          couponId: this.couponId,
          // @DEBUG: 
          longitude: location.longitude,
          latitude:  location.latitude,
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.list = res.data.storeList
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      }
    },
    onLoad (e) {
      this.couponId = e.id
      this.getCouponLimitShop(this.location)
    }
  }
</script>

<style lang="scss" scoped>
</style>
