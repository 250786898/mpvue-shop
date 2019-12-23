<template>
  <div class="theme weui-flex">
    <div v-if="adType === 'ADOne'" class="ad-one">
      <div class="weui-flex">
        <div class="weui-flex__item ad-one-left">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/goods-left.png" alt="">
        </div>
        <div class="weui-flex__item ad-one-right">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/ad2.png" alt="">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/ad3.png" alt="">
        </div>
      </div>
    </div>
    <div v-else class="weui-flex">
      <div class="weui-flex__item ad-one-right">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/ad3.png" alt="">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/ad2.png" alt="">
      </div>
      <div class="weui-flex__item ad-one-right">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/ad2.png" alt="">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/ad3.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    adType:{ //广告类型： ADOne(左边单独一张AD，两边两张) ADTwo(左右各两张AD)
      type: String,
      default: 'ADOne'
    }
  }
}
</script>

<style lang="scss" scoped>
.theme{
  .weui-flex__item{
    width: 50%;
    display: flex;
    flex-direction: column;
    &:nth-of-type(1){
      margin-right: 10rpx;
    }
  }
  .ad-one{
    &-left{
      img{
        width:350rpx;
        height:458rpx;
        border-radius:10prx;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      img{
        width:350rpx;
        height:224rpx;
        border-radius:10prx;
      }
    }
  }
}
</style>
