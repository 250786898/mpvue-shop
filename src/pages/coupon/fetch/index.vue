<template>
  <div class="container">
    <!--  -->
    <CouponCard
      v-for="item in couponList"
      v-bind:key="item.id"
      :item="item"
      :type="item.isReceived == 1 ? 'fetch' : 'use' "
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
      console.log('this.$mp.page.options.type ? 1 : 0',this.$mp.page.options.type)
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      console.log({
        goodsId: this.$mp.page.options.id,
        storeId: this.storeId,
        restricted: 1
      });
      const res = await couponModel.getGoodsDetailsCoupon({
        goodsId: this.$mp.page.options.id,
        storeId: this.storeId,
        restricted: 1,
        typeNum: this.$mp.page.options.type && this.$mp.page.options.type != 'undefined' ? 1 : 0
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
      console.log('fetchCoupon',couponId)
       this.$store.dispatch('exchangeOrFetchCoupon', couponId).then(code => {
        console.log('fetchCoupon',code)
        if(code == 200001) {
            wx.showToast({
            title: '恭喜你，抢到了!', //提示的内容,
            icon: 'none', //图标,
            duration: 1500, //延迟时间,
          })
          setTimeout(() => {
            //领取成功跳转我的优惠券
            this.getGoodsDetailsCoupon() //领取成功后的操作
          },1500)
        }else {
           wx.showToast({
            title: '您来晚了，优惠券已被抢光~', //提示的内容,
            icon: 'none', //图标,
            duration: 1500, //延迟时间,
          })
        }
      })


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
