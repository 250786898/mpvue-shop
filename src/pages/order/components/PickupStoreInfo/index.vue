<template>
  <div class="info">
    <div class="info-header">
      提货门店
    </div>
    <div class="info-content">
      <div class="info-main">
        <div class="store-name">{{ storeInfo.receiverName || shopDetail.storeName }}</div>
        <div class="manager-mobile">{{ storeInfo.franchiseeTel || shopDetail.franchiseeTel }}</div>
      </div>
      <div class="detail-address">
        {{ storeInfo.receiverAddress || shopDetail.storeAddress }}
      </div>
       <img class="info-border" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order_dividingline@2x.png">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:{
    storeInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
   ...mapState(['shopDetail'])
  }
}
</script>

<style lang="scss" scoped>
.info {
  background: #ffffff;
  position: relative;
  border-radius:10rpx;
  margin-bottom: 20rpx;
  &-header{
    padding: 24rpx 32rpx;
    font-size: 36rpx;
    font-weight: 800;
    border-bottom: 1rpx #E4E4E4 solid;
  }
  &-content{
    padding: 20rpx 32rpx 37rpx;
    .info-main{
      display: flex;
      font-size: 34rpx;
      .manager-mobile{
       color: #01BD9F;
       margin-left: 20rpx;
      }
    }
    .detail-address{
      margin-top: 19rpx;
      color: #999999;
      font-size: 28rpx;
      line-height: 35rpx;
    }
  }
  &-border{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8rpx;
  }
}
</style>
