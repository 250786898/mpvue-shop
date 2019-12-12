<template>
  <div class="goods-detail">
    <div class="goods-detail__title">商品详情</div>
    <rich-text :nodes="detailInfo"></rich-text>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type:String,
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-detail {
  background-color: #fff;
  margin-top: 20rpx;
  padding: 0 20rpx;
  &__title {
    padding-top: 32rpx;
    padding-bottom: 32rpx;
    text-align: left;
    font-size: 38rpx;
    font-weight: bold;
    color: $text-black;
  }
  .weui-form-preview {
    &:before,
    &:after {
      display: none;
    }
    &__bd {
      padding-top: 0;
      padding-bottom: 30rpx;
    }
    &__item {
      padding-top: 14rpx;
      padding-bottom: 14rpx;
      border-bottom: 1rpx dashed rgba(153, 153, 153, .6);
      &:last-child {
        border-bottom: 0;
      }
    }
    &__label {
      font-size: 24rpx;
      text-align: left;
      text-align-last: left;
      color: $text-gray;
      margin-right: 2em;
    }
    &__value {
      text-align: left;
      font-size: 24rpx;
      color: $text-black;
    }
  }
  > img {
    width: 100%;
    vertical-align: middle;
  }
}
</style>
