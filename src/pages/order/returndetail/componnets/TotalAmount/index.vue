
<template>
  <div class="amount">
    <div class="amount-total amount-card">
      <div class="amount-total__text amount-card__text">申请退款总金额</div>
      <div class="amount-total__info amount-card__info">
        <online-price :signSize="22" :beforeSize="34" :afterSize="34" :price="amount" />
      </div>
    </div>
    <div class="amount-wechat amount-card" v-if="amountDetailShow">
      <div class="amount-card__text">退回微信</div>
      <div class="amount-card__info">
        <online-price
          :signSize="30"
          :beforeSize="30"
          :afterSize="30"
          :price="wechatAmount"
          color="#333"
          :isbold="false"
        />
      </div>
    </div>
    <div class="amount-coupons amount-card" v-if="amountDetailShow">
      <div class="amount-card__text">退回优惠券</div>
      <div class="amount-card__info">
        <online-price
          :signSize="30"
          :beforeSize="30"
          :afterSize="30"
          :price="couponsAmount"
          color="#333"
          :isbold="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePrice from "@/components/OnlinePrice";
export default {
  props:{
    amount:{
      type:Number,
      default:0
    },//默认总金额
    wechatAmount:{
      type:Number,
      default:0
    }, //微信金额
    couponsAmount:{
      type:Number,
      default:0
    }, //优惠券金额
    amountDetailShow:{
      type:Boolean,
      default:false
    } //总金额明细是否显示
  },
  components: {
    OnlinePrice
  }
};
</script>

<style lang="scss" scoped >
.amount {
  width: 100%;
  background: #fff;
  margin-top: 20rpx;
  border-radius: 10rpx;
  &-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__text {
      font-size: 30rpx;
      font-weight: 500;
      color: #333;
      margin-left: 30rpx;
    }
    &__info {
      margin-right: 30rpx;
      line-height: 30rpx;
    }
  }
  &-total {
    line-height: 100rpx;
    display: flex;
    justify-content: space-between;
    border-bottom: 2rpx solid #ebebeb;
    &__text {
      font-weight: 800;
      font-size: 34rpx;
    }
  }
  &-wechat{
    padding-top: 39rpx;
  }
  &-coupons{
    padding-top: 34rpx;
    padding-bottom: 39rpx;
  }
}
</style>
