<template>
  <div class="dialog" v-if="show">
    <div class="mask"></div>
    <div class="dialog-main">
      <h3 class="dialog-main__title">下单提醒</h3>
      <p class="dialog-main__desc" v-if="effectiveGoods.length">以下商品已失效，如继续下单订单将无以下商品；</p>
      <p class="dialog-main__desc" v-else>订单商品全部已失效，请返回购物车；</p>
      <scroll-view scroll-y scroll-with-animation :style="goodsListHeight" class="goods-list">
        <template v-for="item in goodsList">
          <goods-card :item="item" v-bind:key="item.goodsId" />
        </template>
      </scroll-view>
      <div class="dialog-main-footer">
        <button
          class="btn back-cart-btn"
          :class="[ effectiveGoods.length ? 'back-cart-btn' : 'only-back-cart-btn' ]"
          @click="backToCartPage"
        >返回购物车</button>
        <button class="btn keepon-orders-btn" @click="hideDialog" v-if="effectiveGoods.length">继续下单</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoodsCard from "./components/GoodsCard";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    goodsList: {
      type: Array,
      default: () => []
    },
    effectiveGoods: {
      type: Array,
      default: () => []
    } //继续下单按钮是否显示
  },

  computed: {
    goodsListHeight() {
      if (this.goodsList.length > 1) {
        return "height: 233rpx;";
      }
      return "";
    }
  },

  components: {
    GoodsCard
  },

  methods: {
    /**
     * @description 隐藏弹窗
     */
    hideDialog() {
      this.show = false;
    },

    /**
     * @description 返回购物车页面
     */
    backToCartPage() {
      wx.switchTab({
        url: "/pages/cart/main"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-main {
  width: 646rpx;
  background: #ffffff;
  z-index: 99999;
  position: fixed;
  top: 240rpx;
  left: 0%;
  margin-left: 50rpx;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  box-sizing: border-box;
  border-radius: 12rpx;
  &__title {
    color: #000000;
    font-size: 40rpx;
    padding-bottom: 30rpx;
  }
  &__desc {
    color: #595959;
    font-size: 28rpx;
  }
  .goods-list {
    margin-top: 15rpx;
    border-top: 1rpx solid #f3f3f3;
  }
  &-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx;
    box-sizing: border-box;
    border-radius: 12rpx;
    &__title{
      color: #000000;
      font-size:40rpx;
      padding-bottom: 30rpx
    }
    &__desc{
      color: #595959;
      font-size: 28rpx;
      line-height:35rpx;
    }
    .btn{
      width:197rpx;
      height:74rpx;
      line-height: 74rpx;
      text-align: center;
      border-radius:10rpx;
      font-size:32rpx;
      padding: 0;
    }
    .back-cart-btn{
      background:rgba(170,170,170,1);
      color: #ffffff;
      margin-right: 46rpx;
    }
    .only-back-cart-btn {
      width: 440rpx;
      height: 74rpx;
      background: rgba(1, 189, 159, 1);
      border-radius: 10rpx;
      margin-right: 0;
    }

    .keepon-orders-btn{
      background:rgba(19,212,191,1);
      color: #ffffff;
    }
  }
}
</style>
