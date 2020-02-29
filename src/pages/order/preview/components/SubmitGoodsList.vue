<template>
  <div class="list">
    <div class="goods-item" v-for="item in list" :key="item.goodsId">
      <GoodsCard :item="item" />
    </div>
  </div>
</template>

<script>
import GoodsCard from "./GoodsCard";
export default {
  components: {
    GoodsCard
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  border-radius: 10rpx;
  background: #ffffff;
  margin-bottom: 20rpx;
  // .goods-item:nth-last-of-type(1){
  //   border-bottom: none
  // }
  padding: 0 30rpx; 
  .goods-item {
    border-bottom: 1rpx solid #e4e4e4;
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
  }
}
</style>
