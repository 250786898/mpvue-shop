<template>
  <div>
    <div class="coupon-card" v-if="type == 'base'">
      <div class="coupon-card__top">
        <div class="card-left">
          <div class="coupon-price-box">￥<span class="price">99</span></div>
          <div class="coupon-condition">满199使用</div>
        </div>
        <div class="card-right">
          <div class="card-right-desc">
            <div class="coupon-title">新人专享满199减99</div>
            <div class="expire-label">即将到期</div>
          </div>
          <div class="coupon-date">2019年8月1日 至 2019年8月30日</div>
        </div>
      </div>
      <div class="coupon-card__buttom">
        <div class="coupon-desc">指定部分商品及门店适用</div>
        <!-- <div class="applicable-stores">查看适用门店</div> -->
        <div class="applicable-stores">查看可用商品</div>
      </div>
    </div>
    <div class="coupon-card expire-text" v-else>
      <div class="coupon-card__top">
        <div class="card-left">
          <div class="coupon-price-box">￥<span class="price">99</span></div>
          <div class="coupon-condition">满199使用</div>
        </div>
        <div class="card-right">
          <div class="card-right-desc">
            <div class="coupon-title">新人专享满199减99</div>
          </div>
          <div class="coupon-date">2019年8月1日 至 2019年8月30日</div>
        </div>
      </div>
      <div class="coupon-card__buttom">
        <div class="coupon-desc">指定部分商品及门店适用</div>
      </div>
      <img src="/static/images/used-coupon-icon.png" class="used-coupon-icon" alt="">
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
      type: { //优惠券类型: base(正常) used(已使用) expire（过期）
        type: String,
        default: 'base'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .coupon-card {
    vertical-align: middle;
    width:702rpx;
    min-height:246rpx;
    margin-bottom: 20rpx;
    border-radius:10rpx;
    position: relative;
    &__top {
      height: 166rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      border-bottom-left-radius:15rpx;
      border-bottom-right-radius:15rpx;
      background:#fff;
      .card-left {
        width:197rpx;
        text-align:center;
        font-size:38rpx;
        border-right:1px dashed #DDDDDD;
        margin-right:20rpx;
        padding-right:10rpx;
        &:after {
          height: 100rpx;
          width: 4rpx;
          background: #fff
        }
        .coupon-price-box{
          color: #F88726;
          font-size: 37rpx;
          line-height: 37rpx;
        }
        .price{
          font-size: 66rpx
        }
        .coupon-condition{
          color: #999999;
          font-size: 25rpx;
        }

      }
      .card-right {
        padding-right: 10rpx;
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
          .expire-label{
            width:128rpx;
            height:50rpx;
            line-height: 50rpx;
            text-align: center;
            background:rgba(248,135,38,1);
            border-radius:12rpx;
            font-size: 24rpx;
            color: $white-color;
          }
        }
        .coupon-date{
          color: #999999;
          font-size: 25rpx;
          margin-top: 20rpx;
        }
      }
    }
    &__buttom {
      height: 78rpx;
      font-size: 24rpx;
      text-align: center;
      border-top:1px dashed #DDDDDD;
      display: flex;
      align-items: center;
      padding: 0 24rpx;
      border-top-left-radius:15rpx;
      border-top-right-radius:15rpx;
      background:#fff;
      .coupon-desc{
        font-size: 25rpx;
        margin-right: 20rpx;
      }
      .applicable-stores{
        width:184rpx;
        height:40rpx;
        border:1px solid rgba(15,213,195,1);
        border-radius:20rpx;
        font-size: 24rpx;
        color: #0FD5C3;
      }
    }
  }
   .expire-text div{
    color: #CCCCCC !important;
   }
   .used-coupon-icon{
      position: absolute;
      right: 10rpx;
      top: 10rpx;
      width: 146rpx;
      height: 146rpx;
    }
</style>
