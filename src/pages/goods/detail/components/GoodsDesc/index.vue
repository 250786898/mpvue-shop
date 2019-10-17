<template>
    <div class="weui-cell goods-hd-info">
      <div class="weui-cell__bd">
        <div class="goods-hd-info__title">{{ goodsName }}</div>
        <div class="goods-hd-info__desc">{{ goodsDesc }}</div>
      </div>
      <div class="weui-cell__ft">
        <button open-type="share">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/share.png">
          <div>分享</div>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    goodsName:{
      type: String,
      default: ''
    },
    goodsDesc:{
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss" scoped>
  .goods-hd-info {
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    background-color: #fff;
    align-items: flex-start;
    &:before {
      left: 0;
      border-color: #EAEAEA;
    }
    &__title {
      font-weight:bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display:  -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 32rpx;
      color: $text-black;
      line-height: 40rpx;
      margin-bottom: 10rpx;
    }
    &__desc {
      color: #999999;
      font-size: 28rpx;
    }
    &__price {
      font-weight:bold;
      color: $text-red;
      font-size: 46rpx;
      &-old {
        padding-left: 10rpx;
        font-size: 24rpx;
        color: $text-gray;
        text-decoration: line-through;
      }
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

    .weui-cell__bd {
      padding-right: 80rpx;
    }
    .weui-cell__ft {
      button {
        &:after {
          border: 0 none;
        }
        padding-left: 6rpx;
        padding-right: 6rpx;
        background-color: transparent;
        border: 0 none;
        font-size: 24rpx;
        color: $text-gray;
        line-height: 40rpx;
        img {
          margin-top: 10rpx;
          width: 46rpx;
          height: 46rpx;
        }
      }
    }
  }
</style>
