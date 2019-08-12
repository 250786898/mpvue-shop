<template>
  <div class="location">
    <img src="/static/images/login_icon_location@2x.png">
    <!-- <i class="icon-location"></i> -->
    <h4>您未开通定位权限，部分功能无法正常使用</h4>
    <p>若您已开通定位权限仍然无法正常使用，请尝试打开【微信】定位</p>
    <button type="primary" open-type="openSetting" @opensetting="onOpenSetting" class="radius">开通权限</button>
  </div>
</template>

<script>
  export default {
    methods: {
      onOpenSetting(e) {
        if (e && e.target && e.target.authSetting['scope.userLocation']) {
          wx.switchTab({ url: '/pages/index/main' })
        } else {
          // wx.showModal({
          //   title: '关闭权限',
          //   content: '关闭权限可能会影响使用小程序的部分功能，请确认',
          //   confirmText: '关闭授权'
          // })
        }
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
