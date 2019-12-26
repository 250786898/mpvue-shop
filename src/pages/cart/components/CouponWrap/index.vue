<template>
  <div class="wrap">
    <div class="wrap-coupon">
      <h3 class="wrap-coupon__title">优惠券</h3>
       <scroll-view
        scroll-x
        scroll-with-animation
        class="coupon-list"
        >
        <CouponLabel v-for="item in couponList" v-bind:key="item.id" :item="item" />


      </scroll-view>
        <div class="grayarrow-icon">
          <div class="grayarrow-icon-box">
            <span class="grayarrow-icon__text">去凑单</span>
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/cart-coupon-scrollbg.png" class="grayarrow-icon__bg" alt="">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/cart-coupon_icon_arrow.png.png" class="grayarrow-icon__main" mode="aspectFit">
          </div>
        </div>
    </div>
    <scroll-view
      class="goods-list"
      scroll-x
      scroll-with-animation
    >
      <div class="goods-card"  v-for="item in goodsList" v-bind:key="item.id">
        <GoodsCard :item="item" v-if="item.activityStock"/>
      </div>

    </scroll-view>
  </div>
</template>

<script>
import CouponLabel from '@/components/CouponLabel'
import GoodsCard from './components/GoodsCard'
import { mapState } from 'vuex'
import { Api } from '@/http/api'

export default {
  components: {
    CouponLabel,
    GoodsCard
  },
  props: {
    goodsList: { //优惠券推荐商品列表
      type: Array,
      default: []
    },
    couponList: { //优惠券列表
      type: Array,
      default: []
    }
  },


  computed: {
    ...mapState(['storeId'])
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  width:710rpx;
  height:264rpx;
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  margin-bottom: 20rpx;
  box-sizing: border-box;
  &-coupon{
    padding-left: 20rpx;
    height: 72rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #F1F1F1;
    &__title{
      color: #9B9B9B;
      font-size: 28rpx;
      margin-right: 27rpx;
    }
    .coupon-list{
      width: 578rpx;
      height: 32rpx;
      font-size: 0;
      white-space: nowrap;
      padding-right: 170rpx;
      box-sizing: border-box;
    }
    .grayarrow-icon{
      width:170rpx;
      height:100%;
      box-sizing: border-box;
      position: absolute;
      right: 0;
      top: 0;
      &-box{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &__text{
        color: #01BD9F;
        font-size: 28rpx;
        z-index: 2;
        line-height: 28rpx;
        padding-left: 30rpx;
      }
      &__bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
      }
      &__main{
        width: 46rpx;
        height: 46rpx;
        z-index: 2;
      }
    }
  }
  .goods-list {
    white-space: nowrap;
    margin-top: 21rpx;
    padding: 0 20rpx;
    width: 720rpx;
    box-sizing: border-box;
    .goods-card{
      display: inline-block;
    }
  }
}
</style>
