<template>
  <div class="card">
     <div class="card-img">
       <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1576138884874.jpg" mode="aspectFit" />
     </div>
     <div class="card-main">
       <div class="goods-name">鸡大胸 1kg 出口日本级 烧 烤食材清真食品</div>
       <div class="goods-content">
         <div class="price-wrap">
           <OnlinePrice :signSize="24" :beforeSize="34" :afterSize="24" />
           <div class="scribing-price">￥38.00</div>
         </div>
         <GoodsNumHandle :iconSize="54" />
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
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 20rpx 10rpx 15rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border: 1px solid #D6D6D6;
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
    .goods-name{
      color: #353535;
      font-size: 26rpx;
      line-height: 30rpx;
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
