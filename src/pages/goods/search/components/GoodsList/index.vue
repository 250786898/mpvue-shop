<template>
  <div class="goods-wrap">
    <div class="list">
      <div class="goods-item">
        <GoodsRowItem />
      </div>
      <div class="goods-item">
        <GoodsRowItem />
      </div>
      <div class="goods-item">
        <GoodsRowItem />
      </div>
      <div class="goods-item">
        <GoodsRowItem />
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
  }
}
</script>

<style lang="scss" scoped>
.goods-wrap{
  background: #F1F1F1;
  padding: 20rpx;
  box-sizing: border-box;
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
