<template>
  <div class="applicable">
    <div class="applicable-main">
      <div class="goods-list">
        <template v-for="(item,index) in applicableGoodsList">
          <div class="goods-item" :key="item.goodsId" v-if="index % 2 ==0">
            <GoodsItem :item="item" />
          </div>
        </template>
      </div>
      <div class="goods-list">
        <template v-for="(item,index)  in applicableGoodsList">
          <div class="goods-item" :key="item.goodsId" v-if="index % 2 != 0">
            <GoodsItem :item="item" />
          </div>
        </template>
      </div>
    </div>

    <div class="cart-icon">
      <CartIcon :type="'black'" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CartIcon from '@/components/CartIcon'
import GoodsItem from '@/components/GoodsRowItem'
import CouponModel from '@/model/coupon'
import { Api } from '@/http/api'
const couponModel = new CouponModel()
export default {
  components: {
    CartIcon,
    GoodsItem
  },
  data() {
    return {
      applicableGoodsList: [] //可用商品列表
    }
  },

  computed: {
    ...mapState(['storeId'])
  },

  mounted() {
    this.getCartCouponGoodsList()
  },

  methods: {
    /**
     * @description 获取优惠券商品列表
     */
    getCartCouponGoodsList() {
      wx.showLoading({
        title: '加载中',
        mask: true,
        complete: () => {}
      })
      couponModel
        .getCartCouponGoodsList({
          storeId: this.storeId,
          restricted: 1
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            wx.hideLoading()
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            this.applicableGoodsList = res.data.goods
          }
        })
        .catch(() => wx.hideLoading())
    }
  }
}
</script>

<style>
page {
  background: #f5f5f5;
}
</style>

<style lang="scss" scoped>
.applicable {
  padding: 20rpx;
  padding-bottom: 180rpx;
  box-sizing: border-box;
  &-header {
    display: flex;
    &-desc {
      flex: 1;
      &__title {
        font-size: 30rpx;
        margin-bottom: 19rpx;
      }
      &__date {
        font-size: 30rpx;
        color: #929493;
        margin-bottom: 18rpx;
      }
      .applicable-store {
        color: #259bed;
        font-size: 30rpx;
        display: flex;
        align-items: center;
        &__icon {
          width: 12rpx;
          height: 19rpx;
          margin-left: 10rpx;
        }
      }
    }
  }
  &-main {
    display: flex;
    .goods-list {
      width: 100%;
      flex-wrap: wrap;
    }
  }
  .goods-tabs__tip {
    height: 116rpx;
    padding: 20rpx;
    font-size: 26rpx;
    line-height: 124rpx;
    color: $text-gray;
    text-align: center;
  }
  .cart-icon {
    position: fixed;
    z-index: 9;
    left: 20rpx;
    bottom: 64rpx;
  }
}
</style>
