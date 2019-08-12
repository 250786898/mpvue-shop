<template>
  <navigator :url="'/pages/goods/detail/main?id=' + item.goodsId + '&activityId=' + (item.activityId || '')" class="goods-item">
    <img :src="item.goodsImage" mode="aspectFit">
    <div class="goods-item__title">{{ item.goodsName }}</div>
    <div class="goods-item__bd">
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="activity-price activity-price_member" v-if="item.activityType == 50">
            <div>
              <strong>￥{{ item.activityPrice }}</strong>
              <span class="tag tag_member">会员价</span>
            </div>
            <span>￥{{ item.onlinePrice }}</span>
          </div>
          <template v-else>
            <div>
              <strong>￥{{ item.onlinePrice || item.goodsPrice}}</strong>
            </div>
            <span v-if="item.onlineScribingPrice">￥{{ item.onlineScribingPrice }}</span>
          </template>
        </div>
        <img src="/static/images/common_btn_shopcart_small.png@2x.png" class="icon-cart" @click.stop="addToCart">
      </div>
    </div>
  </navigator>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
    },

    methods: {
      addToCart() {
        this.$store.dispatch('addToCart', {
          goodsId: this.item.goodsId,
          activityId: this.item.activityId,
          activityGoodsId: this.item.id || this.item.activityGoodsId
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .goods-item {
    width: 220rpx;
    padding: 10rpx;
    display: inline-block;
    vertical-align: top;
    > img {
      vertical-align: top;
      width: 220rpx;
      height: 220rpx;
    }
    &__title {
      margin-top: 10rpx;
      font-size: 24rpx;
      color: #413D3C;
      @include ellipsis;
    }
    &__bd {
      .weui-flex__item {
        height: 88rpx;
        strong {
          display: inline-block;
          vertical-align: middle;
          margin-top: 4rpx;
          font-size: 28rpx;
          color: #DA3535;
          font-weight: 700;
          line-height: 36rpx;
          @include ellipsis;
        }
        span {
          padding-left: 4rpx;
          font-size: 20rpx;
          color: $text-gray;
          text-decoration: line-through;
          vertical-align: top;
          @include ellipsis;
        }
        .activity-price {
          strong { color: #FFA442; }
          span {
            text-decoration: none;
            color: #DA3535;
            font-weight: 700;
          }
          .tag {
            margin-top: 4rpx;
            display: inline-block;
            line-height: 24rpx;
            padding: 4rpx 8rpx;
            font-size: 14rpx;
            border-radius: 16rpx;
            margin-left: 6rpx;
            text-decoration: none;
            color: #FFA442;
            background-color: #333;
            vertical-align: middle;
          }
        }
      }
    }
    .icon-cart {
      margin-top: 8rpx;
      vertical-align: top;
      width: 62rpx;
      height: 62rpx;
    }
  }
</style>