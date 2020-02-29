<template>
  <div class="goods-wrap" v-if="show">
    <div class="list">
      <div class="goods-item" v-for="item in list" v-bind:key="item.id">
        <GoodsRowItem :item="item" />
      </div>

    </div>
    <p class="search-empty-tip">亲，您已经看到最后啦！</p>
  </div>

</template>

<script>
import GoodsRowItem from '@/components/GoodsRowItem'
export default {
  components: {
    GoodsRowItem
  },
  props: {
    show: { //是否显示
      type: Boolean,
      default: false
    },
    list: { //搜索出的商品列表
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-wrap{
  background: #F1F1F1;
  padding: 20rpx;
  box-sizing: border-box;
  min-height: calc(100vh - 114rpx);
  .list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .search-empty-tip{
    text-align: center;
    color: #B2B2B2;
    padding: 30rpx 0;
    font-size: 28rpx;
  }
}
</style>
