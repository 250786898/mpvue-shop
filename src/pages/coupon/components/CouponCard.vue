<template>
  <div>
    <!-- 正常优惠券 -->
    <div class="coupon-card " :class="{'expire-text' : ( type ==  'used' || type ==  'expire') }" >
      <div class="coupon-card__top">
        <div class="card-left">

          <div class="card-left-main">
            <div class="coupon-price-box">￥<span class="price">99</span></div>
            <div class="coupon-condition">满199使用</div>
          </div>

        </div>
        <div class="card-right">
          <div class="card-right-desc">
            <div class="coupon-title">新人专享满199减99</div>
          </div>
          <div class="coupon-date">2019.10.19 - 2019.0.19</div>
        </div>
      </div>
      <div class="coupon-card-buttom">
        <div class="coupon-footer">
          <div class="coupon-desc">指定商品满199.00元减129.00元</div>
          <div class="applicable" v-if="type == 'base' ">
            <span>查看可用商品</span>
            <!-- <span>查看适用门店</span> -->
            <img src="/static/images/deliverycode_icon_arrow.png" alt="">
          </div>
        </div>
      </div>

      <div class="expire-label" v-if="type == 'base' ">即将到期</div>
      <div class="expire-icon" v-else>
        <img src="/static/images/pictuer_used_png.png" alt="" v-if=" type  == 'used'">
        <img src="/static/images/picture_expired_png.png" v-if=" type  == 'expire'">
        <img src="/static/images/coupon-collected_png.png" v-if=" type  == 'use'">
      </div>
      <div class="handle-btn">
        <div class="fetch-btn" v-if="type == 'fetch'">立即领取</div>
        <div class="use-btn"  v-if="type == 'use'">立即使用</div>
      </div>

      <div class="cirle cirle-left"></div>
      <div class="cirle cirle-right"></div>

    </div>

  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      type: { //优惠券类型: base(正常) used(已使用) expire（过期） fetch（立即领取）  use（立即使用）
        type: String,
        default: 'use'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .coupon-card {
    vertical-align: middle;
    width:710rpx;
    min-height:246rpx;
    border-radius:10rpx;
    position: relative;
    margin-bottom: 20rpx;
    &__top {
      height: 166rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      background:#fff;
      .card-left {
        box-sizing: border-box;
        text-align:center;
        width: 202rpx;
        justify-content: center;
        font-size:38rpx;
        margin-right:20rpx;
        display: flex;
        &::after{
          width:2rpx;
          height:104rpx;
          border-right:2rpx dashed #DDDDDD;
          content: ' ';
          display: block;
          margin-left: 28rpx;
        }
        .coupon-price-box{
          color: #FF7200;
          font-size: 30rpx;
          font-weight:bold;
          margin-bottom: 13rpx;
        }
        .price{
          font-size: 66rpx;
        }
        .coupon-condition{
          color: #999999;
          font-size: 25rpx;
        }

      }
      .card-right {
        padding-right: 23rpx;
        font-size: 24rpx;
        flex: 1;
        &-desc{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .coupon-title{
            color: #333333;
            font-weight:bold;
            font-size: 32rpx;
          }
        }
        .coupon-date{
          color: #999999;
          font-size: 25rpx;
          margin-top: 33rpx;
        }
      }
    }
    &-buttom {
      height: 78rpx;
      font-size: 24rpx;
      text-align: center;
      padding: 0 24rpx;
      box-sizing: border-box;
      background:#fff;
      .coupon-footer{
        border-top: 2rpx dashed #DDDDDD;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 14rpx;
        box-sizing: border-box;
      }
      .coupon-desc{
        font-size: 24rpx;
        margin-right: 20rpx;
      }
      .applicable{
        color: #259BED;
        font-size: 24rpx;
        display: flex;
        align-items: center;
        img{
          width: 46rpx;
          height: 46rpx;
        }
      }
    }
    .expire-label{
      position: absolute;
      top: 23rpx;
      right: 23rpx;
      width:128rpx;
      height:47rpx;
      background:rgba(254,245,234,1);
      border-radius:10rpx;
      line-height: 47rpx;
      text-align: center;
      font-size: 24rpx;
      color: #FF7200;
    }
    .cirle{
      background: #F1F1F1;
      width: 22rpx;
      height:22rpx;
      border-radius: 50%;
      position: absolute;
      bottom: 67rpx;
      &-left{
        left: -15rpx;
      }
      &-right{
        right: -15rpx;
      }
    }
  }
   .handle-btn{
     position: absolute;
     right: 23rpx;
     top: 60rpx;
     font-size: 24rpx;
     .fetch-btn{
        width:128rpx;
        height:47rpx;
        line-height: 47rpx;
        text-align: center;
        border:1px solid rgba(255,114,0,1);
        border-radius:24rpx;
        color: #FF7200;
     }
     .use-btn{
        width:128rpx;
        height:47rpx;
        line-height: 47rpx;
        text-align: center;
        background:rgba(255,114,0,1);
        border-radius:24rpx;
        color: #fff;
     }
   }
   .expire-text div{
    color: #CCCCCC !important;
   }
   .expire-icon{
     width: 89rpx;
     height: 73rpx;
     position: absolute;
     right: 0;
     top: 0;
     img{
       width: 100%;
       height: 100%;
     }
   }
   .used-coupon-icon{
      position: absolute;
      right: 10rpx;
      top: 10rpx;
      width: 146rpx;
      height: 146rpx;
    }
</style>
