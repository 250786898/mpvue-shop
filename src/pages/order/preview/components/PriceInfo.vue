<template>
  <div class="card">
    <div class="card-item">
      <div class="card-item__title">商品总价</div>
      <div class="card-item__content">
        <online-price :color="'#999999'" :signSize="20" :beforeSize="28" :afterSize="28" :isbold="false" :price="orderInfo.goodsAmount" />
      </div>
    </div>
     <div class="card-item">
      <div class="card-item__title">优惠券</div>
      <div class="card-item__content">
        -￥{{orderInfo.couponPrice || '0.00'}}
      </div>
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
    orderInfo: { //订单信息
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  padding: 30rpx;
  background: #ffffff;
  border-radius:10rpx;
  font-size: 28rpx;
  color: #999999;
  &-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:nth-last-of-type(1){
      padding-top: 20rpx;
    }
    &:nth-of-type(1) {
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #e4e4e4;
    }
  }
}
</style>
