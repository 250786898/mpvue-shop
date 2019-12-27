<template>
  <div class="container">
    <!--  -->
    <CouponCard
      v-for="item in couponList"
      v-bind:key="item.id"
      :item="item"
      :type="item.isReceived == 0 ? 'use' : 'fetch' "
      @useCoupon="useCoupon"
      @fetchCoupon="fetchCoupon"
    />
  </div>
</template>

<script>
import CouponCard from '../components/CouponCard'
import CouponModel from '@/model/coupon'
import { Api } from '@/http/api'
import { mapState } from 'vuex'
import couponMixin from '@/mixin/coupon'
const couponModel = new CouponModel()
export default {
  components: {
    CouponCard
  },
  data () {
    return {
      couponList: [] ,//优惠券列表
    }
  },

  mixins: [couponMixin],

  computed: {
    ...mapState(['storeId'])
  },

  mounted () {
    this.getGoodsDetailsCoupon()
  },

  methods: {
    /**
     * @description 获取优惠券
     */
    async getGoodsDetailsCoupon () {
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      const res = await couponModel.getGoodsDetailsCoupon({
        goodsId: this.$mp.page.options.id,
        storeId: this.storeId
      })
      wx.hideLoading()
      if(res.code == Api.CODES.SUCCESS) {
        console.log('res.data',res.data)
        this.couponList = res.data
      }
    },

    /**
     * @description 使用优惠券
     */
    useCoupon () {
      //返回商品详情页面
      wx.navigateBack({
        delta: 1
      })
    },

    /**
     * @description 激活优惠券
     */
    fetchCoupon (couponId) {
      this.fetchCouponByCouponId(couponId)
    }
  }
}
</script>

<style>
page{
  background: #EEEEEE;
}
</style>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}
</style>
