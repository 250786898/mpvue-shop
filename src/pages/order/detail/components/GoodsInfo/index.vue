<template>
  <div class="card">
    <div class="goods-list">
      <div class="goods-item" v-for="item in orderInfo.orderGoodsList" v-bind:key="item.goodsId">
        <GoodsCard :item="item" />
      </div>

    </div>

    <div class="detail-info">
      <div class="detail-info-item goods-price-wrap">
        <div class="detail-info-item__title">
          商品总价
        </div>
        <div class="detail-info-item__content">
          <OnlinePrice :signSize="20" :beforeSize="28" :afterSize="22" :price="orderInfo.orderAmount" :color="'#333333'" />
        </div>
      </div>
        <div class="detail-info-item coupon-price-wrap">
          <div class="detail-info-item__title">
            优惠券
          </div>
          <div class="detail-info-item__content coupon-price">
            -<OnlinePrice :signSize="20" :beforeSize="28" :afterSize="22" :price="0" :color="'#898989'" />
          </div>
      </div>
    </div>

    <div class="actual-pay">
      <span class="actual-pay-title">实付:</span>
      <OnlinePrice :signSize="22" :beforeSize="36" :afterSize="26" :price="orderInfo.orderAmount" />
    </div>

  </div>
</template>

<script>
import GoodsCard from '../GoodsCard'
import OnlinePrice from '@/components/OnlinePrice'
export default {
  components: {
    GoodsCard,
    OnlinePrice
  },
  props: {
    orderInfo: { //订单信息
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  background: #ffffff;
  padding: 0 30rpx 30rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  .detail-info {
    padding: 30rpx 0;
    border-bottom: 1rpx solid #E8E8E8;
    &-item{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
    }
    .goods-price-wrap{
      margin-bottom: 20rpx;
      color: #333;
      font-weight:bold;
    }
    .coupon-price-wrap{
      color: #898989;
    }
    .coupon-price{
      display: flex;
      align-items: center;
    }
  }
  .actual-pay{
    width: 100%;
    font-size: 36rpx;
    font-weight: bold;
    padding-top: 30rpx;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    &-title{
      margin-right: 10rpx;
    }
  }
}
</style>
