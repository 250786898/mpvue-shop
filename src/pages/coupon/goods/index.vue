<template>
  <div>
    <goods-searchbar-cart></goods-searchbar-cart>
    <div class="desc">
      <p>以下商品可使用{{ detail.couponName }}</p>
      <p>
        适用场景 : 
        <template v-if="detail.useScope">{{ detail.useScope }}、</template>
        <navigator :url="'/pages/coupon/shop/main?id=' + couponId">乐家指定连锁店</navigator>
      </p>
      <!-- <p>适用场景 : 乐家线上商城、<span>乐家指定连锁店</span></p> -->
      <p>有效期 : {{ detail.startTime }}至{{ detail.endTime }}</p>
    </div>
    <goods-tabs :class-list="detail.classList" :goods-list="detail.goodsList" @tabChange="onTabChange"></goods-tabs>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import GoodsSearchbarCart from '@/components/GoodsSearchbarCart'
  import GoodsTabs from '@/components/GoodsTabs'
  
  export default {
    components: {
      GoodsSearchbarCart,
      GoodsTabs
    },

    data () {
      return {
        couponId: '',
        detail: {}
      }
    },

    computed: {
      ...mapState(['storeId'])
    },

    methods: {
      // @TODO: 加载更多
      getCouponLimitGoods({ pcId } = {}) {
        wx.showLoading({})
        Api.coupon.couponLimitGoods({
          couponId: this.couponId,
          // @DEBUG: 
          storeId: this.storeId, // this.storeId
          keyword: '',
          pcId,
          // pageNumber,
          // pageSize
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.detail = res.data
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },

      onTabChange(index) {
        let pc = this.detail.classList[index]
        if (pc && pc.pcId) {
          this.getCouponLimitGoods({ pcId: pc.pcId })
        }
      }
    },

    onLoad(e) {
      this.couponId = e.id
      this.getCouponLimitGoods() 
    }
  }
</script>

<style lang="scss" scoped>
  .desc {
    padding: 10rpx 30rpx 0rpx;
    font-size: 26rpx;
    color: $text-black;
    line-height: 48rpx;
    navigator {
      display: inline-block;
      color: $theme-color;
    }
  }
</style>
