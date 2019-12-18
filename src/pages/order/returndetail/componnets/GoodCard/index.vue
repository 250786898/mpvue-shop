<template>
  <div class="goods">
    <img src="/static/images/order-status-bg.png" alt />
    <div class="goods-info">
      <p class="goods-info__title">鸡大胸 1kg 出口日本级 烧烤 食材清真食品 只显示两行两行两行</p>
      <div class="goods-info__price">
        <online-price :signSize="22" :beforeSize="32" :afterSize="24" :price="38" />
        <span>数量：x2</span>
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
export default {
  components:{
    OnlinePrice
  }
};
</script>

<style lang="scss" scoped >
.goods {
  display: flex;
  justify-content: space-between;
  width: 636rpx;
  img {
    width: 192rpx;
    height: 192rpx;
  }
  &-info {
    height: 192rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__title {
      width: 424rpx;
      font-size: 32rpx;
      font-weight: 500;
      @include ellipsis(2);
      line-height: 40rpx;
    }
    &__price{
      display: flex;
      justify-content: space-between;
      span{
        font-size:28rpx;
        font-weight:500;
        color: #999;
      }
    }
  }
}
</style>
