<template>
  <div class="current-store-card" @click="navToIndex">
    <div class="card-main">
        <div class="card-main__title">当前门店</div>
        <img :src="shopDetail.storeLogoImg" alt="" class="store-logo" mode="aspectFit" >
        <div class="manager-name">团长：{{shopDetail.franchiseeName || shopDetail.shopIsName}}</div>
        <div class="manager-mobile">电话：{{shopDetail.franchiseeTel}}</div>
        <div class="store-name">{{shopDetail.storeName}}</div>
        <div class="detail-address">{{shopDetail.storeAddress}}</div>
    </div>
    <div class="distance" v-if="storeDistance">距离您{{storeDistance}}</div>
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_icon_grayarrow.png.png" class="icon-grayarrow" alt="" mode="aspectFit">
    <!-- <div class="select-store-card__title">当前门店</div> -->
    <!-- <store-card :item="item" :showLine="false" :is-click="true" /> -->
  </div>
</template>

<script>
import { mapState } from "vuex"
import StoreCard from '../../../components/StoreCard/index'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState(['shopDetail']),
    storeDistance () {
      if(this.shopDetail.storeDistance && this.shopDetail.storeDistance != 'undefined') {
        return this.shopDetail.storeDistance < 1 ? this.shopDetail.storeDistance * 1000 + 'm' : `${this.shopDetail.storeDistance}km`
      }else{
        return ''
      }
    }
  },
  mounted () {
    console.log('storeInfo',this.storeInfo)
  },
  methods: {
    /**
     * @description 回到首页
     */
    navToIndex () {
      wx.switchTab({
        url: '/pages/index/main'
      })
    }
  },
  components: {
    StoreCard
  }
}
</script>

<style lang="scss" scoped>
.current-store-card{
  width:710rpx;
  height:321rpx;
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  z-index:9;
  margin-top: 140rpx;
  position: relative;
}
.icon-grayarrow{
  position: absolute;
  top: 165rpx;
  right: 20rpx;
  width: 30rpx;
  height: 30rpx;
}
.distance{
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  color: #FF6600;
  font-size: 26rpx;
}
.card-main{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -100rpx;
  &__title{
    color: #ffffff;
    font-size: 30rpx;
    font-weight:bold;
  }
  .store-logo{
    width: 130rpx;
    height: 130rpx;
    border-radius: 50%;
    margin: 9rpx 0;
    border:5rpx solid #ffffff;
    box-shadow:-2rpx 2rpx 10rpx 0px rgba(142,142,142,0.25);
  }
  .manager-name,.manager-mobile{
    font-size: 28rpx;
    color: #999999;
  }
  .manager-name{
    margin-bottom: 6rpx;
  }
  .store-name{
    font-size: 34rpx;
    font-weight:bold;
    margin: 26rpx 0;
  }
  .detail-address{
    color: #4C4C4C;
    font-size:26rpx;
    line-height:35rpx;
    width: 401rpx;
    text-align: center;
  }
}
</style>
