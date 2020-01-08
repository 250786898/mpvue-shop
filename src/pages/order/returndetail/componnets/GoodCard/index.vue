
<template>
  <div>
    <div class="goods" v-for="(item,index) in goodsData" :key="index">
      <img :src="item.goodsImage" alt />
      <div class="goods-info">
        <p class="goods-info__title">{{item.goodsName}}</p>
        <div class="goods-info__price">
          <online-price
            :signSize="22"
            :beforeSize="32"
            :afterSize="32"
            :price="item.onlinePrice"
          />
          <span>数量：x{{item.goodsNum}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePrice from "@/components/OnlinePrice";
export default {
  props: {
    goodsData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    OnlinePrice
  }
};
</script>

<style lang="scss" scoped >
.goods {
  display: flex;
  justify-content: space-between;
  width: 636rpx;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #E4E4E4;
  &:nth-last-of-type(1) {
    border-bottom: none;
  }
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
    &__price {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 28rpx;
        font-weight: 500;
        color: #999;
      }
    }
  }
}
</style>
