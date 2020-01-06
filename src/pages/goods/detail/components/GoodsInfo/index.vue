<template>
  <div class="good-buy-bar">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/shopping_bj_png.png" alt="" class="good-buy-bar__bg">

     <div class="bar-left">
       <div class="price-box">
        <div class="current-price"  v-if="currentPrice">
          <online-price :color="'#ffffff'" :signSize="46" :beforeSize="72" :afterSize="50" :price="currentPrice" />
        </div>
        <span class="original-price" v-if="originalPrice">￥{{originalPrice}}</span>
      </div>

      <div class="sell-null">
        已售{{saleNum}}件
      </div>
     </div>


    <div class="end-time-box" v-if="isSale == 1">
        <div class="end-time-box__title">距离结束时间</div>
        <div class="countdowner">
          <countdowner :countdown="countDown"></countdowner>
        </div>

      </div>
      <!-- isSale == 0" -->
      <!-- <div class="end-time-box">
       <div class="end-time-box__title">距离开始时间</div>
       <div class="countdowner">
         <countdowner :countdown="startTime"></countdowner>
       </div>
      </div> -->
     <!-- <div class="end-time-box sale-time-text" v-if="false"> -->
       <!-- {{saleTime}} -->
         <!-- 后天10:00开售 -->
      <!-- </div> -->


  </div>
</template>

<script>
import { formatSaleDate } from "@/utils/index"
import OnlinePrice from '@/components/OnlinePrice'
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
    },
    saleNum: { //销售数量
      type: Number,
      default: 0
    }

  },
  computed: {
    countDown () {
      return Math.floor(this.endTime / 1000) //毫秒转成秒
    },
    // startTime () {
    //    return Math.floor(this.endTime / 1000) //毫秒转成秒
    // },
    saleTime () { //显示的销售时间
      return this.startTime ? formatSaleDate(this.startTime) : ''
    }
  },
  components: {
    Countdowner,
    OnlinePrice
  }
}
</script>

<style lang="scss" scoped>
  .good-buy-bar{
    width:100vw;
    height:124rpx;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    position: relative;
    &__bg{
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    .bar-left{
      z-index: 2;
      margin-left: 20rpx;
      .sell-null{
        color: #fff;
        font-size: 24rpx;
      }
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
      display: flex;
      align-items: flex-end;
      position: relative;
      right: 8rpx;
    }
    .end-time-box{
      z-index: 2;
      color: #fff;
      text-align: center;
      font-size: 24rpx;
      &__title{
        padding-bottom: 15rpx;
      }
    }
    .countdowner{
      margin-right: 29rpx;
    }
    .sale-time-text{
      font-size: 40rpx;
      font-weight: 500;
      margin-right: 23rpx;
    }
  }
</style>
