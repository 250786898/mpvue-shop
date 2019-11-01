<template>
  <div class="good-buy-bar">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/goods-detail-bar__bg.png" alt="" class="good-buy-bar__bg">
     <div class="price-box">
       <span class="current-price"  v-if="currentPrice">￥{{currentPrice}}</span>
       <span class="original-price" v-if="originalPrice">￥{{originalPrice}}</span>
     </div>

    <div class="end-time-box" v-if="isSale == 1">
        <div class="end-time-box__title">距离结束时间</div>
        <countdowner :countdown="countDown"></countdowner>
      </div>
     <div class="end-time-box sale-time-text" v-if="isSale == 0" >
         {{saleTime}}开售
      </div>


  </div>
</template>

<script>
import { formatSaleDate } from "@/utils/index"
import Countdowner from '@/components/Countdowner'
export default {
  props: {
    currentPrice:{
      type: String,
      default: ''
    },
    originalPrice:{
      type: String,
      default: ''
    },
    endTime: {
      type: Number,
      default: 0
    },
    startTime: {
      type: Number,
      default: 0
    },
    isSale: { //商品状态，0：处于预售中 1：正在售卖中 2：无状态都不显示
      type: Number,
      default: 2
    }

  },
  computed: {
    countDown () {
      return Math.floor(this.endTime / 1000) //毫秒转成秒
   },
    saleTime () { //显示的销售时间
      return this.startTime ? formatSaleDate(this.startTime) : ''
    }
  },
  components: {
    Countdowner
  }
}
</script>

<style lang="scss" scoped>
  .good-buy-bar{
    width:100vw;
    height:120rpx;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25rpx;
    box-sizing: border-box;
    position: relative;
    &__bg{
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
    .current-price{
      font-weight:bold;
      font-size: 72rpx;
    }
    .original-price{
      font-size: 28rpx;
      text-decoration: line-through;
      margin-left: 8rpx;
    }
    .price-box{
      z-index: 2;
    }
    .end-time-box{
      z-index: 2;
      color: #0C524D;
      text-align: center;
      font-size: 24rpx;
      &__title{
        padding-bottom: 15rpx;
      }
    }
    .sale-time-text{
      font-size: 31rpx;
      font-weight: bold;
    }
  }
</style>
