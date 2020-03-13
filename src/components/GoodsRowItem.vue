<template>
  <div class="card" @click="tabGoods">
    <div class="goods-img">
      <img :src="item.goodsImage" mode="aspectFit" />
      <div class="sell-gone-tag" v-if="item.activityStock == 0">已抢光</div>
    </div>

    <div class="goods-name">{{ item.goodsName }}</div>
    <div class="goods-desc" v-if="item.goodsSellDesc">{{item.goodsSellDesc}}</div>
    <div class="label-box">
       <!-- v-if="item.activityLimitNum" -->
       <div class="label-box-item limit-label" v-if="item.activityLimitNum">限量秒杀</div>
       <div class="label-box-item new-label" v-if="item.limitType == 1">新人专享</div>

      <!-- 限购{{item.activityLimitNum}}件 -->
    </div>
    <div class="card-footer">
      <div class="card-footer-main">
        <div class="price-wrap">
          <div class="online-price">
            <OnlinePrice
              :price="item.discountedPrice || item.onlinePrice"
              :signSize="20"
              :beforeSize="32"
              :afterSize="32"
            />
          </div>
          <div
            class="scribing-price"
            v-if="item.scribingPrice || item.onlineScribingPrice"
          >￥{{item.scribingPrice || item.onlineScribingPrice}}</div>
        </div>
        <div
          class="sell-null"
          v-if="item.virtualSalesNum"
        >已售{{item.virtualSalesNum + item.salesNum}}份</div>
      </div>
      <div class="add-cart">
        <GoodsNumHandle :goodsInfo="item" />
      </div>
    </div>
    <div class="card-mask" v-if="item.activityStock == 0"></div>
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
      default: () => (
        {}
        // {"id":"6643425152107290624","goodsNumErp":368803428,"goodsId":"6638724261462679552","activityId":"6643425151914352640","goodsName":"澳洲冲天壹号牛腩约450±50g","discountedPrice":35.80,"scribingPrice":45.80,"activityStock":79,"isShow":1,"sortNumber":150,"storeCount":null,"goodsImage":"https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/94054297232.jpg","isDel":0,"shareDescription":"【仅需35.8元】澳洲冲天壹号牛腩约450±50g","goodsSellDesc":"肥瘦相间，肉质紧实柔嫩","goodsNum":0,"activityLimitNum":null,"video":"","salesNum":45,"virtualSalesNum":1480,"tagList":[]}
      )
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
.card {
  width: 350rpx;
  box-sizing: border-box;
  padding: 18rpx 18rpx 20rpx;
  background: #ffffff;
  margin-bottom: 10rpx;
  border-radius: 14rpx;
  position: relative;
  &-mask {
    background: rgba(253, 253, 253, 1);
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .goods-img {
    width: 314rpx;
    height: 314rpx;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .sell-gone-tag {
      width: 140rpx;
      height: 140rpx;
      line-height: 140rpx;
      text-align: center;
      background: rgba(0, 0, 0, 1);
      opacity: 0.6;
      z-index: 10;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -70rpx 0 0 -70rpx;
      color: #ffffff;
      font-size: 28rpx;
    }
  }
  .goods-name {
    color: #101010;
    font-size: 30rpx;
    padding-bottom: 4rpx;
    width: 292rpx;
    @include ellipsis;
    margin: 13rpx 0 8rpx 0;
  }
  .goods-desc {
    color: #999999;
    font-size: 24rpx;
    width: 292rpx;
    @include ellipsis;
  }
  .label-box {
    display: flex;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    height:34rpx;
    &-item {
      width:112rpx;
      height:34rpx;
      border:2rpx solid rgba(248,172,8,1);
      border-radius:16px;
      line-height: 34rpx;
      text-align: center;
      color: #f8ac08;
      font-size: 20rpx;
    }
    .limit-label{
      margin-right: 10rpx;
    }
    .new-label{
      border-color: #FF0000;
      color: #FF0000;
    }
  }

  .add-cart {
    width: 60rpx;
    height: 60rpx;
  }
  .card-footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    &-main {
      .price-wrap {
        display: flex;
        align-items: flex-end;
        .scribing-price {
          color: #3d3c3c;
          font-size: 22rpx;
          text-decoration: line-through;
          margin-left: 11rpx;
        }
      }
    }
    .sell-null {
      color: #787878;
      font-size: 22rpx;
      margin-top: 10rpx;
    }
  }
}
</style>
