<template>
  <div class="card">
    <div class="card-item">
      <div class="card-item__title">商品总价</div>
      <div class="card-item__content">
        <online-price :color="'#999999'" :signSize="20" :beforeSize="28" :afterSize="24" :isbold="false" />
      </div>
    </div>
     <div class="card-item">
      <div class="card-item__title">优惠券</div>
      <div class="card-item__content">
        -￥0.00
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
export default {
  components: {
    OnlinePrice
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
    &:nth-of-type(1) {
      margin-bottom: 30rpx;
    }
  }
}
</style>
