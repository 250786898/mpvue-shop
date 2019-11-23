<template>
  <div class="dialog" v-if="show">
    <div class="mask"></div>
    <div class="dialog-main">
      <h3 class="dialog-main__title">下单提示</h3>
      <p class="dialog-main__desc">如下商品出现失效，请您返回购物车修改商品数量，继续下单订单将没有如下商品；</p>
       <scroll-view
        scroll-y
        scroll-with-animation
        :style="goodsListHeight"
        class="goods-list"
        >
        <template v-for="item in goodsList" >
          <goods-card :item="item" v-bind:key="item.goodsId" />
        </template>


      </scroll-view>
      <div class="dialog-main-footer">
        <button class="back-cart-btn" @click="backToCartPage">返回购物车</button>
        <button class="keepon-orders-btn" @click="hideDialog">继续下单</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import GoodsCard from './components/GoodsCard'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      goodsList: {
        type: Array,
        default: () => ([])
      }
    },

    computed: {
      goodsListHeight () {
        if(this.goodsList.length > 1) {
          return 'height: 300rpx;'
        }
        return ''
      }
    },

    components: {
      GoodsCard
    },

    methods: {
      /**
       * @description 隐藏弹窗
       */
      hideDialog () {
        this.show = false
      },

      /**
       * @description 返回购物车页面
       */
      backToCartPage () {
        wx.switchTab({
          url: '/pages/cart/main'
        })

      }
    }

  }
</script>

<style lang="scss" scoped>
  .dialog-main{
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
    &__title{
      color: #000000;
      font-size:40rpx;
      padding-bottom: 30rpx
    }
    &__desc{
      color: #595959;
      font-size: 28rpx;
    }
    .goods-list{
      margin-top: 15rpx;
      border-top: 1rpx solid #F3F3F3;
    }
    &-footer{
      display: flex;
      margin-top: 30rpx;
      .back-cart-btn{
        width:187rpx;
        height:64rpx;
        line-height: 64rpx;
        text-align: center;
        background:rgba(170,170,170,1);
        border-radius:10rpx;
        font-size:32rpx;
        color: #ffffff;
        padding: 0;
        margin-right: 46rpx;
      }
      .keepon-orders-btn{
        width:187rpx;
        height:64rpx;
        line-height: 64rpx;
        text-align: center;
        background:rgba(19,212,191,1);
        border-radius:10rpx;
        font-size:32rpx;
        color: #ffffff;
        padding: 0;
      }
    }
  }
</style>
