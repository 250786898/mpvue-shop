<template>
  <scroll-view scroll-y scroll-with-animation @scrolltolower="getMoreGoodList" :class="['list', [NavShow? '': 'full-list']]">
    <div v-if="isAllGoods">
      <div class="cate-item" v-for="(item,index) in goodsList" :item="item" :key="index">
        <div class="cate-item__title">{{item.title}}</div>
        <GoodsCard v-for="(i,index2) in item.goodsList" :item="i" :key="index2" />
        <div class="empty-goods-tip" v-if="!item.goodsList.length">
          <EmptyGoodsTip :title="'该分类无团购'"/>
        </div>
      </div>
    </div>

    <div class="cate-item" v-else>
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
    isAllGoods: {
      type: Boolean,
      default: true
    }, //是否是全部商品页面
    NavShow:{
      type:Boolean,
      default:true
    } //导航栏高度是否显示
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
.full-list{
  height: calc(100vh - 104rpx);
}
</style>
