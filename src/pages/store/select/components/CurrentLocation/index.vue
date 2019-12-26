<template>
  <div class="select-store-card card">
    <div class="select-store-card__title card__title">当前位置</div>
    <div class="location">
      <div class="location-left">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_icon_dangqian@2x.png" class="reposition-icon" alt="">
        <span class="address" v-if="location.address">{{ relocationing ? '定位中...' : location.address}}</span>
        <span class="address" v-else>未获取到微信信息</span>
      </div>
      <div class="reposition">
        <span  v-if="location.address" @click="relocation">重新定位</span>
        <button type="primary" open-type="openSetting" @opensetting="onOpenSetting" class="grant-permission" v-else>重新定位</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AMapWX } from '@/utils/amap-wx'
import config from '@/config'
export default {
  computed : {
    ...mapState(['storeId','location'])
  },
  data () {
    return {
      relocationing: false,  //当前处于定位中
      amap: Object //高德地图对象句柄
    }
  },
  onLoad () {
    console.log('currentShowcurrentShowcurrentShowcurrentShow2')
     this.amap = new AMapWX({ key: config.AMAP_KEY }) //初始化高德地图对象
     this.resetLocate()
  },
  methods: {
    /**
     * @description 重新定位
     */
    relocation(e) {

      //已经授权定位
      this.resetLocate() //直接重新定位

    },

    /**
     * @description 授权定位
     */
    onOpenSetting (e) {
      this.authAndResetLocate()
    },

    /**
     * @description 重新定位当前位置
     */
    resetLocate () {
      console.log('resetLocate')
      console.log('amap',this.amap)
      this.relocationing = true //定位中
      this.amap.getPoiAround({
        success: res => {
          this.$store.commit('setLocationInfo', res.markers[0])
          this.relocationing = false
        },
        fail: e => this.relocationing = false
      })
    },

    /**
     * @description 授权并重新定位
     */
    authAndResetLocate () {
      console.log('authAndResetLocate')
      let amap = new AMapWX({ key: config.AMAP_KEY })
      console.log('AMapWX')
      amap.getPoiAround({
        success: res => { //用户成功授权
          const locationInfo = res.markers[0] //当前用户定位定位相关信息
          const cityName =  res.poisData[0].cityname //用户定位当前城市
          console.log('locationInfo',locationInfo)
          this.$store.commit("setcityname",cityName)
          this.$store.commit("setLocateCity",cityName)
          this.$store.commit("setLocationInfo",locationInfo)  //用户定位相关信息存到vuex
        },
        // 引导用户设置定位权限
        fail: e => { //用户授权取消
          if ( e.errMsg === "getLocation:fail auth deny" || "getLocation:fail:auth denied") {
            wx.redirectTo({ url: "/pages/location/main" }) //重定向到定位授权页面
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 0 20rpx;
  border-radius: 10rpx;
  &__title{
    font-size: 28rpx;
    color: #999999;
    font-weight:500;
  }
}
.grant-permission{
  color: #ccc;
  padding: 0;
  background: none;
  height: 24rpx;
  font-size: 24rpx;
  line-height: 24rpx;;
  border-radius: 0;
}
.location{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 28rpx;
  padding: 21rpx 0 28rpx 0;
  &-left{
    display: flex;
    align-items: flex-start;
  }
  .address{
    width: 413rpx;
    font-size: 28rpx;
    line-height: 45rpx;
  }
  .reposition {
    display: flex;
    color: #CCCCCC;
    font-size: 24rpx;
    position: relative;
    top: 8rpx;
    &-icon{
      width: 41rpx;
      height: 41rpx;
      margin-right: 10rpx;
    }
  }
}
</style>
