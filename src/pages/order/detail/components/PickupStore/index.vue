<template>
  <div class="info">
    <div class="info-content">
      <div class="info-main">
        <div class="store-name">提货门店：{{ storeInfo.receiverName || shopDetail.storeName }}</div>
        <!-- <div class="manager-mobile">{{ storeInfo.franchiseeTel || shopDetail.franchiseeTel }}</div> -->
      </div>
      <div class="detail-address">
        {{ storeInfo.receiverAddress || shopDetail.storeAddress }}
      </div>

    </div>

    <div class="info-tel" @click="makeTel">
      <div class="info-tel-main">
        <img src="/static/images/icon_phone.png">
        <span>联系门店</span>
      </div>
    </div>

     <img class="info-border" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order_dividingline@2x.png">

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
  },

  methods: {
    /**
     * @description  拉起拨打电话
     */
    makeTel () {
      wx.makePhoneCall({
        phoneNumber: this.storeInfo.franchiseeTel || this.shopDetail.franchiseeTel
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  background: #ffffff;
  position: relative;
  border-radius:10rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 197rpx;
  padding-left: 30rpx;
  box-sizing: border-box;
  &-content{
    padding-right: 20rpx;
    .info-main{
      display: flex;
      font-size: 34rpx;
      .store-name{
        width: 534rpx;
        @include ellipsis;
      }
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
  &-tel{
    display: flex;
    align-items: center;
    &::before{
      background: #E4E4E4;
      height:139rpx;
      width: 1px;
      content: ' ';
    }
    &-main{
      display: flex;
      flex-direction: column;
      font-size: 22rpx;
      height: 100%;
      align-items: center;
      justify-content: center;
      width: 123rpx;
      img{
        width: 50rpx;
        height: 50rpx;
        margin-bottom: 20rpx;
      }
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
