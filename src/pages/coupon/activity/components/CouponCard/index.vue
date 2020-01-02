<template>
  <div class="card">
    <div class="card-left">
      <div class="card-left-main">
        <div class="online-price">
          <OnlinePrice :price="item.couponMoney" :signSize="30" :beforeSize="66" :showAfterSign="false" />
        </div>
        <div class="coupon-desc">满{{item.eliyibility}}元减{{item.couponMoney}}</div>
        </div>
     </div>
    <div class="card-right">
      <div class="coupon-title">{{item.couponName}}</div>
      <div class="coupon-date" v-if="item.applyDateStatus == 0">{{item.startDate}} - {{item.stopDate}}</div>
      <div class="coupon-date" v-else>有效期{{item.applyDays}}天</div>
    </div>

    <div class="cirle cirle-left"></div>
    <div class="cirle cirle-right"></div>
    <div class="coupon-icon">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/coupon-activityt-used.png" class="used-icon" v-if="item.isReceived == 0">
    </div>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
export default {
  components: {
    OnlinePrice
  },
  props: {
    item: { //优惠券对象
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  background: #ffffff;
  height:187rpx;
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  box-sizing: border-box;
  position: relative;
  &-left{
    display: flex;
    margin-right: 30rpx;
    &-main{
      width: 232rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &:after{
      content: ' ';
      display: block;
      width: 2rpx;
      height:104rpx;
      border-right:2rpx dashed rgba(221,221,221,1);
    }
    .coupon-desc{
      color: #999999;
      font-size: 25rpx;
      margin-top: 10rpx;
    }
  }
  &-right{
    .coupon-title{
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 33rpx;
    }
    .coupon-date{
      color: #999999;
      font-size: 25rpx;
    }
  }
  .coupon-icon{
    position: absolute;
    right: 0;
    top: 0;
    img{
      width: 89rpx;
      height: 73rpx;
    }
  }
  .cirle{
    position: absolute;
    width: 30rpx;
    height: 30rpx;
    background: #FE4662;
    border-radius: 50%;
    top: 78rpx;
    &-left{
      left: -15rpx;
    }
    &-right{
      right: -15rpx;
    }
  }
}
</style>
