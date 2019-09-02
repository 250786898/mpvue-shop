<template>
  <div class="goods-recommend" v-if="commendGoodsList.length">
    <div class="goods-recommend__title">商品推荐</div>
    <div class="commendGoodsList">
      <goods-rows :goods="commendGoodsList"></goods-rows>   
    </div>
  </div>
</template>

<script>
import GoodsRows from '../GoodsRows/index' 
export default {
  props: {
    commendGoodsList: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    GoodsRows
  }
}
</script>

<style lang="scss" scoped>
.goods-recommend {
  margin-top: 20rpx;
  background-color: #fff;
  padding-bottom: 39rpx;
  &__title {
    padding: 39rpx 30rpx;
    font-size: 30rpx;
    font-weight:bold;
    color: $text-black;
  }
  .commendGoodsList{
    padding: 0 25rpx;
  }
  /deep/ .goods-item {
    &:first-child { padding-left: 30rpx; }
    &:last-child { padding-right: 30rpx; }
  }
}
</style>