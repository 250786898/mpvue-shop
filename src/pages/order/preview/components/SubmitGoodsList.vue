<template>
  <div class="weui-panel goods-list-panel">
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_appmsg" v-for="item in list"
        :key="item.goodsId">
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
          <image class="weui-media-box__thumb" :src="item.goodsImage"  mode="aspectFit"  />
        </div>
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__title">{{ item.goodsName }}</div>
          <div class="weui-media-box__desc">
            <span class="goods-price">￥{{ item.goodsPayPrice }}</span>
            <div class="goods-count">数量: ×{{ item.goodsNum || 1 }}</div>
          </div>
          <div class="weui-media-box__desc" v-if="item.normalNum">
            <span class="goods-price">￥{{ item.onlinePrice }}</span>
            <div class="goods-count">数量: ×{{ item.normalNum}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list-panel {
  .weui-panel {
    width: 702rpx;
    border-radius: 14rpx;
    &__hd {
      position: relative;
      padding: 28rpx 30rpx 20rpx 60rpx;
      padding-top: 20rpx;
      font-size: 28rpx;
      color: $text-black;
      height: 28rpx;
      width: 100%;
      > img {
        margin-right: 8rpx;
        vertical-align: middle;
        width: 36rpx;
        height: 36rpx;
        position: absolute;
        top:35%;
        left:22rpx;
      }
      &:after { left: 0; }
      .weui-cell__ft_in-access {
        float: right;
        font-size: 28rpx;
        color: $theme-color-light;
        &:after {
          border-color: $theme-color-light;
        }
      }
    }
  }
  .weui-media-box__title {
    margin-bottom: 0;
    height: 100rpx;
  }
}
</style>
