<template>
  <div class="card">
     <div class="card-img">
       <img :src="item.goodsImage" mode="aspectFit" />
     </div>
     <div class="card-main">
       <div class="goods-name">{{ item.goodsName }}</div>
       <div class="goods-content">
         <div class="price-wrap">
           <OnlinePrice :price="item.discountedPrice" :signSize="22" :beforeSize="30" :afterSize="30" />
           <div class="scribing-price">￥{{item.scribingPrice}}</div>
         </div>
         <GoodsNumHandle :iconSize="54" :goodsInfo="item" />
       </div>
     </div>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
import GoodsNumHandle from '@/components/GoodsNumHandle'
export default {
  components: {
    OnlinePrice,
    GoodsNumHandle
  },
  props:{
    item: { //商品信息对象
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 20rpx 10rpx 15rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border: 1px solid #F1F1F1;
  border-radius:10rpx;
  width:311rpx;
  height:150rpx;
  margin-right: 10rpx;
  &-img{
    width: 110rpx;
    height: 110rpx;
    img{
      width: 100%;
      height: 100%;
    }
  }
  &-main{
    width: 100%;
    margin-left: 9rpx;
    font-size: 0;
    .goods-name{
      color: #353535;
      font-size: 26rpx;
      line-height: 32rpx;
      width: 159rpx;
      @include ellipsis;
    }
    .goods-content{
      margin-top: 29rpx;
      display: flex;
      align-items: flex-end;
      width: 100%;
      justify-content: space-between;
    }
    .price-wrap{
      .scribing-price{
        color: #999999;
        text-decoration:line-through;
        font-size: 24rpx;
        margin-right: 20rpx;
      }
    }
  }
}
</style>
