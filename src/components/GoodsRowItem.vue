<template>
  <div class="card" @click="tabGoods">
    <div class="goods-img">
       <img :src="item.goodsImage"  mode="aspectFit" >
       <div class="sell-gone-tag" v-if="item.activityStock == 0">已抢光</div>
    </div>

    <div class="goods-name">{{ item.goodsName }}</div>
    <div class="goods-desc" v-if="item.goodsSellDesc">{{item.goodsSellDesc}}</div>
    <div class="limit">
      <div class="limit-label" v-if="item.activityLimitNum">限购{{item.activityLimitNum}}件</div>
    </div>
    <div class="card-footer">
      <div class="card-footer-main">
        <div class="price-wrap">
          <div class="online-price">
            <OnlinePrice :price="item.discountedPrice" :signSize="20" :beforeSize="32" :afterSize="32"/>
          </div>
          <div class="scribing-price" v-if="item.scribingPrice">￥{{item.scribingPrice}}</div>
        </div>
        <div class="sell-null" v-if="item.virtualSalesNum">已售{{item.virtualSalesNum + item.salesNum}}份</div>
      </div>
      <div class="add-cart">
        <GoodsNumHandle :goodsInfo="item" />
      </div>

    </div>
    <div class="card-mask"  v-if="item.activityStock == 0"></div>
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
  },
  methods: {
    /**
     * @description 点击了商品，正常商品跳转商品详情
     */
    tabGoods () {
      wx.navigateTo({
        url: `/pages/goods/detail/main?id=${this.item.id}&activityId=${this.item.activityId}&activityGoodsId=${this.item.id}`
      })
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
    padding-bottom: 2rpx;
    width:292rpx;
    @include ellipsis;
    margin: 13rpx 0 11rpx 0;
  }
  .goods-desc {
    color: #999999;
    font-size: 24rpx;
  }
  .limit{
    width:93rpx;
    height:34rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    &-label{
      width:93rpx;
      height:34rpx;
      line-height: 34rpx;
      text-align: center;
      border:2rpx solid rgba(248,172,8,1);
      border-radius:4rpx;
      color: #F8AC08;
      font-size: 20rpx;
    }
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
