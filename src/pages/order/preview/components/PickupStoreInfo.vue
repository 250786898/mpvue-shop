<template>
<div>
  <div class="address-area">
    <div class="weui-cell weui-cell_access">
      <div class="weui-cell__bd">
        <template v-if="tempOrder.store">
          <div class="collect">提货门店：{{ tempOrder.store.storeName }}</div>
          <div v-if="tempOrder.store.storeAddress" class="desc">
            {{ tempOrder.store.storeAddress }}
          </div>
        </template>
      </div>
    </div>
    <img class="address-area__border" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/order_dividingline@2x.png">
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['tempOrder'])
  }
}
</script>

<style lang="scss" scoped>
 .address-area {
  background-color: #fff;
  width: 702rpx;
  margin-top:24rpx;
  border-radius: 14rpx;
  &__border {
    display: block;
    width: 100%;
    height: 8rpx;
  }
  &__empty-btn {
    margin: 50rpx auto;
    width: 386rpx;
    line-height: 80rpx;
    border: 4rpx dashed $text-gray;
    text-align: center;
    font-size: 30rpx;
    &_hover {
      border-color: $theme-color-light;
      color: $theme-color-light;
    }
  }
  .weui-cell {
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    &__bd {
      font-size: 34rpx;
      .collect{
        font-weight:bold;
      }
      > .desc {
        font-size: 30rpx;
        color: $text-gray;
        line-height: 40rpx;
      }
    }
    &__ft {
      font-size: 28rpx;
      color: $theme-color-light;
      &:after {
        border-color: $theme-color-light;
      }
    }
  }
}
</style>
