<template>
  <div>
    <!-- 正常优惠券 -->
    <div class="coupon-card " :class="{'expire-text' : ( type ==  'used' || type ==  'expire') }" >
      <div class="coupon-card__top">
        <div class="card-left">

          <div class="card-left-main">
            <div class="coupon-price-box">￥<span class="price">{{item.couponMoney}}</span></div>
            <div class="coupon-condition">满{{item.eliyibility}}元减</div>
          </div>

        </div>
        <div class="card-right">
          <div class="card-right-desc">
            <div class="coupon-title">{{item.couponName}}</div>
          </div>
          <div class="coupon-date">{{item.startDate}} - {{item.stopDate}}</div>
        </div>
      </div>
      <div class="coupon-card-buttom">
        <div class="coupon-footer">
          <div class="coupon-desc">指定商品满{{item.eliyibility}}元减{{item.couponMoney}}元</div>
          <div class="applicable" v-if="type == 'base' || type ==  'select' ">
            <span v-if="item.applyGoods != 0" @click="navToApplicableGoods">查看可用商品</span>
            <span v-if="item.applyGoods == 0 && item.applyStore != 0" @click="navToApplicableStore">查看适用门店</span>
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/deliverycode_icon_arrow.png" v-if="item.applyGoods != 0 || item.applyStore != 0">
          </div>
        </div>
      </div>

      <div class="expire-label" v-if="type == 'base' && item.expireSoon ">
        <span>即将到期</span>
      </div>
      <div class="expire-icon" v-else>
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/pictuer_used_png.png" alt="" v-if=" type  == 'used'">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/picture_expired_png.png" v-if=" type  == 'expire'">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/coupon-collected_png.png" v-if=" type  == 'use'">
      </div>
      <div class="handle-btn" v-if="type == 'fetch' || type == 'use'">
        <div class="fetch-btn" v-if="type == 'fetch'" @click="fetchCoupon">立即领取</div>
        <div class="use-btn"  v-if="type == 'use'" @click="useCoupon">立即使用</div>
      </div>

      <radio class="item-radio" color="#01BD9F" v-if="type == 'select'"></radio>
      <div class="cirle cirle-left"></div>
      <div class="cirle cirle-right"></div>
      <div class="failure-mask" v-if=" type  == 'used' ||  type  == 'expire'"></div>

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
      type: { //优惠券类型: base(正常) used(已使用) expire（过期） fetch（立即领取）  use（立即使用） select(选择优惠券)
        type: String,
        default: 'base'
      }
    },

    methods: {
      /**
       * @description  跳转可使用商品
       */
      navToApplicableGoods () {
        wx.navigateTo({
          url: `/pages/coupon/applicableGoods/main?couponCode=${this.item.couponCode}`
        })
      },

      /**
       * @description 使用优惠券
       */
      useCoupon () {
        this.$emit('useCoupon',this.item.id)
      },

      /**
       * @description 获取优惠券
       */
      fetchCoupon () {
        this.$emit('fetchCoupon',this.item.id)
      },

      /**
       * @description  跳转可使用门店
       */
      navToApplicableStore () {
        wx.navigateTo({
          url: `/pages/coupon/applicableStores/main?couponCode=${this.item.couponCode}`
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
  .coupon-card {
    vertical-align: middle;
    width:710rpx;
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
    .item-radio{
       position: absolute;
       top: 65rpx;
       right: 20rpx;
       transform: scale(0.8);
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
    color: #999999 !important;
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
    .failure-mask{
      position: absolute;
      top: 0rpx;
      width: 100%;
      height: 100%;
      z-index: 2;
      background:rgba(255,255,255,1);
      opacity:0.5;
    }
</style>
