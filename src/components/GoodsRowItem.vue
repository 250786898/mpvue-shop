<template>
  <div class="card">
    <div class="goods-img">
       <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1576056769198.jpg"  mode="aspectFit" >
       <div class="sell-gone-tag" v-if="isSellOut">已抢光</div>
    </div>

    <div class="goods-name">美国进口车厘子新鲜...</div>
    <div class="goods-desc">新鲜礼盒水果 家庭装</div>
    <div class="limit-label">限购1件</div>
    <div class="card-footer">
      <div class="card-footer-main">
        <div class="price-wrap">
          <div class="online-price">
            <OnlinePrice :signSize="20" :beforeSize="32" :afterSize="24"/>
          </div>
          <div class="scribing-price">￥299.00</div>
        </div>
        <div class="sell-null">已售4738份</div>
      </div>
      <div class="add-cart">
        <GoodsNumHandle />
      </div>

    </div>
    <div class="card-mask"  v-if="isSellOut"></div>
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
    // 是否抢光
    isSellOut: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  width: 350rpx;
  box-sizing: border-box;
  padding: 10rpx 18rpx 20rpx;
  background: #ffffff;
  margin-bottom: 10rpx;
  border-radius: 14rpx;
  position: relative;
  &-mask{
    background:rgba(253,253,253,1);
    opacity:0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .goods-img{
    width: 314rpx;
    height: 314rpx;
    position: relative;
    img{
      width: 100%;
      height: 100%
    }
    .sell-gone-tag{
      width: 140rpx;
      height: 140rpx;
      line-height: 140rpx;
      text-align: center;
      background:rgba(0,0,0,1);
      opacity:0.6;
      z-index: 10;
      border-radius:50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -70rpx 0 0 -70rpx;
      color:#FFFFFF;
      font-size: 28rpx;
    }

  }
  .goods-name{
    color: #101010;
    font-size: 30rpx;
    width:292px;
    @include ellipsis;
    margin: 13rpx 0 11rpx 0;
  }
  .goods-desc {
    color: #999999;
    font-size: 24rpx;
  }
  .limit-label{
    width:93rpx;
    height:34rpx;
    line-height: 34rpx;
    text-align: center;
    border:2rpx solid rgba(248,172,8,1);
    border-radius:4rpx;
    color: #F8AC08;
    font-size: 20rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }
  .add-cart{
    width: 60rpx;
    height: 60rpx;
  }
  .card-footer{
    display: flex;
    width: 100%;
    justify-content: space-between;
    &-main{
      .price-wrap{
        display: flex;
        align-items: flex-end;
        .scribing-price{
          color: #3D3C3C;
          font-size: 22rpx;
          text-decoration: line-through;
          margin-left: 11rpx;
        }
      }
    }
    .sell-null{
      color: #787878;
      font-size: 22rpx;
      margin-top: 10rpx;
    }
  }
}
</style>
