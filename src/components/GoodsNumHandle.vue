<template>
  <div class="counter">
    <div v-if="count > 1">
       <img src="/static/images/common_icon_duce.png" class="handle-img">
        <span class="count">{{ count }}</span>
       <img src="/static/images/common_icon_add.png" class="handle-img">
    </div>
    <div v-else>
       <img src="/static/images/common_btn_shopcart_sellout.png@2x.png" :style="iconStyle" class="icon-cart" v-if="goodsInfo.activityStock == 0">
       <img src="/static/images/common_btn_shopcart_small.png@2x.png" :style="iconStyle" class="icon-cart" @click.stop="addToCart" v-else>

    </div>

  </div>
</template>

<script>
import { getCurrentRouter } from '../utils'
  export default {
    props: {
      count: { //当前添加商品数量
        type: Number,
        default: 1
      },
      iconSize: { //添加购物车icon尺寸
        type: Number,
        default: 60
      },
      goodsInfo: { //添加的商品信息
        type: Object,
        default: () => ({})
      }
    },

    computed: {
      iconStyle () {
        return `width: ${this.iconSize}rpx;height:${this.iconSize}rpx;`
      }
    },

    methods: {

      /**
       * @description 添加到购物车
       */
      addToCart() {
        console.log('goodsInfo',this.goodsInfo)
        this.$store.dispatch('addToCart', {
          goodsId: this.goodsInfo.id,
          activityId: this.goodsInfo.activityId,
          activityGoodsId: ''
        }).then(res => {
          this.$bus.$emit('updateCartNum')
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .counter {
    .count {
      vertical-align: middle;
      padding-left: 26rpx;
      padding-right: 26rpx;
      font-size: 24rpx;
      color: #000000;
    }
    .handle-img {
      vertical-align: middle;
      width: 44rpx;
      height: 44rpx;
    }
    .icon-cart{
      width: 60rpx;
      height: 60rpx;
    }
  }
</style>
