<template>
  <div>
    <div class="banner">
      <img src="http://bucketlejia.oss-cn-shenzhen.aliyuncs.com/theme_bg_02.png" mode="widthFix">
    </div>
    <div class="goods-list">
      <div class="weui-flex">
        <div class="weui-flex__item" v-for="item in [1,2,3,4,5]">
          <goods-row-item></goods-row-item>
        </div>
      </div>
    </div>
    <fixed-cart-icon></fixed-cart-icon>
  </div>
</template>

<script>
  import GoodsRowItem from '@/components/GoodsRowItem'
  import FixedCartIcon from '@/components/FixedCartIcon'

  export default {
    components: {
      GoodsRowItem,
      FixedCartIcon
    },

    onLoad() {

    }
  }
</script>

<style>
  page{ background-color: #FD4348; }
</style>

<style scoped lang="scss">
  .banner {
    img {
      width: 100%;
    }
  }

  .goods-list {
    padding: 10rpx;
    .weui-flex {
      flex-wrap: wrap;
      &__item {
        flex: 0 0 50%;
      }
    }
    /deep/ .goods-row-item {
      margin: 5rpx;
      background-color: #fff;
      border-radius: 8rpx;
      .weui-media-box {
        padding: 10rpx;
        &_appmsg {
          flex-direction:column;
        }
        &__hd_in-appmsg {
          width: 330rpx;
          height: 330rpx;
          margin-right: 0;
        }
        &__bd {
          padding-left: 10rpx;
          padding-right: 10rpx;
          width: 100%;
          box-sizing: border-box;
        }
        &__title {
          margin-top: 10rpx;
          margin-bottom: 4rpx;
          font-size: 28rpx;
          width: 300rpx;
        }
        &__desc {
          margin-bottom: 30rpx;
          line-height: 32rpx;
          height: 32rpx;
          font-size: 24rpx;
          -webkit-line-clamp: 1;
        }
      }
      &__tb {
        padding-bottom: 16rpx;
        .primary {
          font-size: 32rpx;
        }
        .icon-cart {
          right: -4rpx;
          bottom: -4rpx;
        }
      }
    }
  }
</style>
