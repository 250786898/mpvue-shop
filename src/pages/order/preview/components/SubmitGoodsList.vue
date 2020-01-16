<template>
  <div class="list">
    <div class="goods-item" v-for="item in list"  :key="item.goodsId">
      <GoodsCard :item="item" />
    </div>
  </div>
</template>

<script>
import GoodsCard from './GoodsCard'
export default {
  components: {
    GoodsCard
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
  background: #ffffff;
}
</style>
