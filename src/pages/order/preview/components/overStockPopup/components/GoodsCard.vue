<template>
   <div class="goods-item">

    <div class="goods-item__img" >
      <div class="img-mask"></div>
      <img :src="item.goodsImage" mode="aspectFit" />
    </div>

    <div class="goods-item-main">
      <h4 class="goods-item__name">{{item.goodsName}}</h4>
      <div class="goods-item__price">
          <div class="current-price">
          <span class="price-sign">￥</span>
          <span>{{onlinePriceBeforeDecimals}}</span>
          <span>.</span>
          <span class="current-price__decimals">{{onlinePriceAfterDecimals || '00' }}</span>
          </div>
          <div class="line-price">￥{{item.onlineScribingPrice}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    onlinePriceBeforeDecimals () {
      if(this.item.onlinePrice) {
        const price = this.item.onlinePrice.toString()
        return price.split('.')[0]
      }
      return  ''
    },
    onlinePriceAfterDecimals () {
      if(this.item.onlinePrice) {
        const price = this.item.onlinePrice.toString()
        return price.split('.')[1]
      }
      return  ''
    }
  }
}
</script>

<style lang="scss" scoped>
 .goods-item{
  padding: 10rpx 0;
  display: flex;
  height: 116rpx;
  box-sizing: border-box;
  border-bottom: 1rpx solid #F3F3F3;
  &__img{
    position: relative;
    margin-right: 10rpx;
    .img-mask{
      width: 100%;
      height: 100%;
      background: #ffffff;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.5;
    }
    img{
      width: 110rpx;
      height: 110rpx;
    }
  }
  &-main{
    color: #999999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__name{
    font-size: 23rpx;
  }
  &__price{
    font-size: 23rpx;
    display: flex;
    align-items: flex-end;
    .price-sign{
      font-size: 20rpx;
    }
    .current-price{
      color: #D88181;
      font-size: 32rpx;
      margin-right: 10rpx;
      &__decimals{
        font-size: 24rpx;
      }
    }
    .line-price{
      font-size: 20rpx;
    }
  }
}
</style>
