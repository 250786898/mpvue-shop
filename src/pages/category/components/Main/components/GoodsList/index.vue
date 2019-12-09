<template>
  <scroll-view
    scroll-y
    scroll-with-animation
    class="list">
    <div class="cate-item">
      <div class="cate-item__title">全部</div>
      <GoodsCard :count="1" />
      <GoodsCard :count="2"  />
      <GoodsCard :isSellOut="true" />
     </div>
     <div class="cate-item">
      <div class="cate-item__title">生鲜水果</div>
      <GoodsCard />
     </div>
      <div class="cate-item">
      <div class="cate-item__title">生鲜水果2</div>
        <div class="empty-goods-tip">
          <EmptyGoodsTip :title="'该分类无团购'" />
        </div>
     </div>
     <div class="cate-item">
      <div class="cate-item__title">哈哈水果</div>
      <GoodsCard />
      <GoodsCard />
      <GoodsCard />
      <GoodsCard />
     </div>
  </scroll-view>
</template>

<script>
import GoodsCard from "./components/GoodsCard/index"
import EmptyGoodsTip from "@/components/EmptyGoodsTip"
export default {
  components: {
    GoodsCard,
    EmptyGoodsTip
  }
}
</script>

<style lang="scss" scoped>
.list{
  padding-left: 12rpx;
  height:calc(100vh - 204rpx);
  box-sizing: border-box;
  .cate-item{
    &__title{
      color: #727272;
      font-size: 28rpx;
      padding: 19rpx 0 19rpx;
      border-bottom: 1px solid #E6E6E6;
    }
  }
  .empty-goods-tip{
    padding: 94rpx 0 130rpx;
  }
}
</style>
