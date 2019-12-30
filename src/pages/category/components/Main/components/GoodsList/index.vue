<template>
  <scroll-view scroll-y scroll-with-animation @scrolltolower="getMoreGoodList" class="list">

      <div class="cate-item" v-if="goodsList" >
        <GoodsCard v-for="(item,index) in goodsList" :item="item" :key="index" />
      </div>

    <div class="cate-item" v-if="allGoodsList">
      <div class="cate-item__title">全部</div>
      <GoodsCard v-for="(item,index) in goodsList" :item="item" :key="index" />
    </div>
  </scroll-view>
</template>

<script>
import GoodsCard from "./components/GoodsCard/index";
import EmptyGoodsTip from "@/components/EmptyGoodsTip";
export default {
  props: {
    goodsList: {
      type: Array,
      default: () => {
        return [];
      }
    }, //商品列表
    allGoodsList:{
      type:Array,
      default:()=>{
        return []
      }
    }//所有商品列表
  },
  components: {
    GoodsCard,
    EmptyGoodsTip
  },
  methods: {
    getMoreGoodList(e) {
      this.$emit("getMore");
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding-left: 12rpx;
  height: calc(100vh - 204rpx);
  box-sizing: border-box;
  .cate-item {
    &__title {
      color: #727272;
      font-size: 28rpx;
      padding: 19rpx 0 19rpx;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .empty-goods-tip {
    padding: 94rpx 0 130rpx;
  }
}
</style>
