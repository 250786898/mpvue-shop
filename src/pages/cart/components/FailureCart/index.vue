<template>
  <div class="goods-list">
      <!-- 失效商品 -->
      <div class="group failure-goods"  v-if="failureGoodsList && failureGoodsList.length">
        <div class="group-header">
          <div class="group-header__title">因售罄、下架原因导致失效商品</div>
          <div class="group-header-right" @click="clearFailureCart">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/commom_collection depot_png.png" class="delete-icon">
            <span class="group-header-right__text">清空</span>
          </div>
        </div>

        <div v-for="(item, index) in failureGoodsList" :key="item.goodsId" class="group-item">
            <goods-card
              :item="item"
              :key="index"
              :isFailure="true"
            />
        </div>

        <div class="failure-mask"></div>
      </div>

      <!-- 清空失效商品 -->
      <!-- <div class="group clear-invalid-goods-btn" v-if="failureGoodsList && failureGoodsList.length" @click="clearFailureCart">
        清空失效商品
      </div> -->


  </div>
</template>

<script>
import { Api } from '@/http/api'
import GoodsCard from '../goodsCard/index'
export default {
  props: {
    failureGoodsList: {
      type: Array,
      default: () => []
    },
  },
  components: {
    GoodsCard
  },
  methods: {
    /**
     * @description 清除失效商品购物车
     */
    clearFailureCart () {
      console.log('clearFailureCart')
      const cartIds =  this.getFailureCartIds()
      this.del(cartIds,true)
    },

    /**
     * @description 获取购物车id集合，多个逗号隔开
     * @returns {string} 购物车id集合:1,2,3...
     */
    getFailureCartIds() {
      console.log('failureGoodsList',this.failureGoodsList)
      if (!this.failureGoodsList) return ''

      return this.failureGoodsList
        .map(item => item.cartId)
        .join(',')
    },

    /**
     * @param {Object} item 购物车商品对象
     * @param {boolean} isFailureGoods 是否是失效商品
     * @description 删除购物车的商品
     */
    del(cartIds, isFailureGoods) {
      wx.showLoading({
        title: '移除商品中',
        mask: true
      })
      Api.cart.remove({
        cartIds
      })
      .then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          if (isFailureGoods) {
            this.failureGoodsList = []
          }
          this.$store.dispatch('updateCartNum')
          this.$emit('updateCartList') //更新购物车列表
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
      .catch(e => console.log(e))
      .then(() => wx.hideLoading())
    },
  }
}
</script>

<style lang="scss" scoped>
 .goods-list{
   padding-top: 24rpx;
   position: relative;
 }
 .failure-goods{
   position: relative;
 }
 .failure-mask{
   position: absolute;
   top: 0;
   left: 0;
   z-index: 2;
   background:rgba(255,255,255,0.4);
   height: 100%;
   width: 100%;
 }
 .group {
    width: 708rpx;
    margin: auto;
    overflow: hidden;
    border-radius:10rpx;
    background: $white-color;
    &-item{
      border-radius:14rpx;
      background: $white-color;
    }
    &-header {
      background-color: $white-color;
      padding: 0 26rpx 0 30rpx;
      box-sizing: border-box;
      text-align: center;
      font-size: 30rpx;
      color:#333333;
      height: 110rpx;
      line-height: 110rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #E4E4E4;
      &-right{
        display: flex;
        align-items: center;
        color: #858585;
        font-size: 30rpx;
        z-index: 99;
        .delete-icon{
          width: 46rpx;
          height: 46rpx;
        }
        &__text{
          line-height: 1;
        }
      }
    }
    + .group {
      margin-top: 20rpx;
    }
 }
 .goods-list-panel {
    width: 100%;
    .weui-media-box {
      padding-top: 20rpx;
      padding-bottom: 20rpx;
      &__title {
        height: 100rpx;
        margin-bottom: 0;
      }
      .ddd {
        min-width:88px;
        text-align: center;
        padding: 0 10px;
        height:14px;
        line-height:14px;
        color: #E50F0F;
        font-size: 12px;
        border:1px solid rgba(229,15,15,1);
        border-radius:9px;
      }
      + .weui-media-box:before {
        display: block;
        left: 0;
        border-color: #F4F4F4;
      }
      &.disabled {
        .weui-media-box__title,
        .goods-price {
          color: $text-gray;
        }
      }
    }


    .goods-row-item__tb {
      height: 60rpx;
      display: flex;
      align-items: center;



      .primary { font-size: 28rpx; }
      .secondary { font-size: 22rpx; }
      .goods-count,.goods-price {
        top: auto!important;
        bottom: 0!important;
      }
    }
  }
 .clear-invalid-goods-btn{
    height: 110rpx;
    line-height:110rpx;
    text-align: center;
    font-size:34rpx;
  }
</style>
