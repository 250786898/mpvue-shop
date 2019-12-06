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
    padding: 0 30rpx;
    box-sizing: border-box;
    height: 76rpx;
    line-height: 76rpx;
    background-color: #fff;
    align-items: flex-start;
    margin-top: 20rpx;
    display: flex;
    align-items: center;
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
      width:68rpx;
      height:30rpx;
      line-height: 30rpx;
      text-align: center;
      color: #13D4BF;
      font-size:20rpx;
      border:1rpx solid rgba(19,212,191,1);
      border-radius:4rpx;
    }

    .limit-text{
      font-size:26rpx;
      margin-left: 17rpx;
    }

    .weui-cell__bd {
      padding-right: 80rpx;
    }
  }
</style>
