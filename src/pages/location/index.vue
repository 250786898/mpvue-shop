<template>
  <div class="location">
    <img src="/static/images/login_icon_location@2x.png">
    <!-- <i class="icon-location"></i> -->
    <h4>您未开通定位权限，部分功能无法正常使用</h4>
    <button type="primary" open-type="openSetting" @opensetting="onOpenSetting" class="radius">开通权限</button>
  </div>
</template>

<script>
  import config from "@/config"
  import { AMapWX } from "@/utils/amap-wx"
  export default {
    methods: {
      onOpenSetting(e) {
        if (e && e.target && e.target.authSetting['scope.userLocation']) {
          //同意授权
         this.getPoiAround()
        } else {
          // wx.showModal({
          //   title: '关闭权限',
          //   content: '关闭权限可能会影响使用小程序的部分功能，请确认',
          //   confirmText: '关闭授权'
          // })
        }
      },

      getPoiAround () {
          let amap = new AMapWX({ key: config.AMAP_KEY })
          console.log('AMapWX')
          amap.getPoiAround({
            success: res => { //用户成功授权
              const locationInfo = res.markers[0] //当前用户定位定位相关信息
              const cityName = res.poisData[0].cityname //用户定位当前城市
              console.log('locationInfo',locationInfo)
              this.$store.commit("setcityname",cityName)
              this.$store.commit("setLocateCity",cityName)
              this.$store.commit("setLocationInfo",locationInfo)  //用户定位相关信息存到vuex
               wx.reLaunch({
                  url: '/pages/store/select/main'
               })
            },
            // 引导用户设置定位权限
            fail: e => { //用户授权取消
              if ( e.errMsg === "getLocation:fail auth deny" || "getLocation:fail:auth denied") {
                wx.redirectTo({ url: "/pages/location/main" }) //重定向到定位授权页面
              }
            }
          })
      }
    

    }
  }
</script>

<style scoped lang="scss">
  .location {
    padding-top: 174rpx;
    text-align: center;
    img {
      width: 187rpx;
      height: 187rpx;
      vertical-align: middle;
    }
    h4 {
      margin: 40rpx 92rpx 0 92rpx;
      font-size: 30rpx;
      color: #333;
    }
    p {
      margin: 16rpx 100rpx 0 100rpx;
      font-size: 24rpx;
      color: #999;
      line-height: 40rpx;
    }
    button {
      margin: 60rpx 136rpx 0 136rpx;
    }
  }
</style>
