<template>
  <div class="card" @click="tabGoods">
    <div  class="goods-img">
      <img :src="item.goodsImage" mode="aspectFit">
      <div class="sell-gone-tag" v-if="!item.activityStock">已抢光</div>
    </div>

    <div class="card-main">
      <div class="card-main-top">
        <div class="goods-name">
          {{ item.goodsName }}
        </div>
        <div class="goods-desc" v-if="item.goodsSellDesc">{{ item.goodsSellDesc || '' }}</div>
        <div class="limit-tag" v-if="item.activityLimitNum">限量秒杀</div>
      </div>
       <div class="card-main-bottom">
         <div class="card-main-bottom-left">
           <div class="price-area">
              <div class="current-price">
                  <OnlinePrice :price="item.discountedPrice" :signSize="24" :beforeSize="38" :afterSize="38"/>
              </div>
              <div class="line-price">￥{{item.scribingPrice}}</div>
           </div>
           <div class="sell-num" v-if="item.virtualSalesNum">已售{{item.virtualSalesNum + item.salesNum}}份</div>
         </div>
         <div class="card-main-bottom-right">
            <NumHandle :goodsInfo="item" />
         </div>
      </div>
    </div>
    <div class="card-mask"  v-if="!item.activityStock"></div>
  </div>
</template>

<script>
import NumHandle from '@/components/GoodsNumHandle.vue'
import OnlinePrice from '@/components/OnlinePrice'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
  },
  components: {
    NumHandle,
    OnlinePrice
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
  padding: 40rpx 0;
  height: 350rpx;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  position: relative;
  .goods-img{
    width: 268rpx;
    height: 268rpx;
    margin-right: 21rpx;
    position: relative;
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
    img{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .card-main{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 380rpx;
    &-top{
      .goods-name{
        color:#272727;
        font-weight:500;
        font-size:32rpx;
        line-height:45rpx;
        width: 360rpx;
        @include ellipsis(2);
      }
      .goods-desc{
        color:#999999;
        font-size:26rpx;
        line-height: 26rpx;
        width: 361rpx;
        @include ellipsis;
        margin: 10rpx 0 0rpx;
      }
      .limit-tag{
        width:67rpx;
        height:30rpx;
        line-height: 30rpx;
        text-align: center;
        border:1rpx solid rgba(248,172,8,1);
        border-radius:4rpx;
        color: #F8AC08;
        font-size: 22rpx;
        margin-top: 15rpx;
      }
    }
    &-bottom{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .price-area{
        display: flex;
        align-items: flex-end;
        line-height: 1;
        margin-bottom: 10rpx;
      }
      .current-price{
        color: #ff0000;
        font-weight: bold;
        margin-right: 10rpx;
        &__sign{
          font-size: 24rpx;
        }
        &-before-point{
          font-size: 38rpx;
        }
        &__point{
          font-size: 38rpx;
        }
        &-after-point{
          font-size: 28rpx;
        }
      }
      .line-price{
        color: #3D3C3C;
        font-size: 24rpx;
        text-decoration: line-through;
      }
      .sell-num{
        color:#787878;
        font-size: 22rpx;
      }
    }
  }
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
}
</style>
