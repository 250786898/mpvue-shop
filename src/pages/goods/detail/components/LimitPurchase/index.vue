<template>
    <div class="goods-hd-info">
      <div class="limit-tab">限购</div>
      <div class="limit-text">每人限购{{num}}份</div>
    </div>
</template>

<script>
export default {
  props: {
    num:{
      type: Number,
      default: 0
    }
  },
}
</script>

<style lang="scss" scoped>
  .goods-hd-info {
    padding: 30rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    align-items: flex-start;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    &:before {
      left: 0;
      border-color: #EAEAEA;
    }
    &__bp {
      color: $text-black;
      font-size: 46rpx;
      &-icon {
        vertical-align: -4rpx;
        margin-left: 10rpx;
        width: 52rpx;
        height: 50rpx;
      }
    }

    .limit-tab{
      text-align: center;
      color: #9B9B9B;
      margin-right: 23rpx;
      font-size:28rpx;
    }

    .limit-text{
      font-size:30rpx;
    }

    .weui-cell__bd {
      padding-right: 80rpx;
    }
  }
</style>
