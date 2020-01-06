<template>
  <div class="applicable">

     <div v-if="applicableGoodsList && applicableGoodsList.length">
        <div class="applicable-header">

        <div class="applicable-header-desc">
          <div class="applicable-header-desc__title">以下商品可使用满{{applyGoodsInfo.eliyibility}}元减{{applyGoodsInfo.couponMoney}}元的优惠券</div>
          <div class="applicable-header-desc__date">有效期：{{applyGoodsInfo.startDate}} 至 {{applyGoodsInfo.stopDate}}</div>
          <div class="applicable-store" @click="navToApplicableStore">
            <span>查看适用门店</span>
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/coupon_goods_right.png" class="applicable-store__icon" alt="">
          </div>
        </div>


      </div>

      <div class="applicable-main">
        <div class="goods-list">
          <template v-for="(item,index) in applicableGoodsList">
            <div class="goods-item" :key="item.goodsId" v-if="index % 2 == 0">
              <goods-item :item="item"/>
            </div>
          </template>
        </div>
        <div class="goods-list">
          <template v-for="(item,index) in applicableGoodsList">
            <div class="goods-item" :key="item.goodsId" v-if="index % 2 != 0">
              <goods-item :item="item"/>
            </div>
          </template>
        </div>
      </div>
     </div>

      <div v-else>
       <EmptyGoodsTip />
     </div>


    <div class="cart-icon">
      <cart-icon :type="'black'"/>
    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api'
import CartIcon from "@/components/CartIcon"
import GoodsItem from "@/components/GoodsRowItem"
import EmptyGoodsTip from '../components/EmptyGoodsTip'
import CouponModel from '../../../model/coupon'

const couponModel = new CouponModel()

export default {
   components:{
     CartIcon,
     GoodsItem,
     EmptyGoodsTip
   },
   data () {
     return {
       applicableGoodsList: [], //使用商品列表
       applyGoodsInfo: {} //适用商品相关信息
     }
   },

   computed: {
     ...mapState(['storeId'])
   },

   mounted () {
     this.getApplyGoods()
   },

   methods: {
     /**
      * @description 获取可使用商品
      */
     async getApplyGoods() {

        wx.showLoading({
          title: '加载中'
        })
        const res = await couponModel.getApplyGoods({
          systemCode: this.$root.$mp.query.couponCode,
          storeId: this.storeId
        })
         wx.hideLoading()
        if(res.code == Api.CODES.SUCCESS) {
          console.log('this.$root.$mp.query.couponCode',res)
          this.applyGoodsInfo = res.data.shopCoupon
          this.applicableGoodsList = res.data.goods
       }
      },

       /**
       * @description  跳转可使用门店
       */
      navToApplicableStore () {
        wx.navigateTo({
          url: `/pages/coupon/applicableStores/main?couponCode=${this.applyGoodsInfo.systemCode}`
        })
      }
   }

}
</script>

<style>
page{
  background: #f5f5f5;
}
</style>

<style lang="scss" scoped>
.applicable{
  padding: 20rpx;
  padding-bottom: 180rpx;
  box-sizing: border-box;
  &-header{
    display: flex;
    &-desc{
      flex: 1;
      &__title{
        font-size: 30rpx;
        margin-bottom: 19rpx;
      }
      &__date{
        font-size: 30rpx;
        color: #929493;
        margin-bottom: 18rpx;
      }
      .applicable-store{
        color: #259BED;
        font-size: 30rpx;
        display: flex;
        align-items: center;
        &__icon{
          width: 12rpx;
          height: 19rpx;
          margin-left: 10rpx;
        }
      }
    }
  }
  &-main{
    display: flex;
    margin-top: 20rpx;
    .goods-list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .goods-item{
        // flex:1;
      }
    }
  }
  .goods-tabs__tip {
    height: 116rpx;
    padding: 20rpx;
    font-size: 26rpx;
    line-height: 124rpx;
    color: $text-gray;
    text-align: center;
  }
  .cart-icon{
    position: fixed;
    z-index: 9;
    left: 20rpx;
    bottom: 64rpx;
  }
}
</style>
