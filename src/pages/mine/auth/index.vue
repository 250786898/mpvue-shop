<template>
  <div class="container">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/signin_bg_logo_big@2x.png">
    <div>您暂未授权乐家生鲜Fresh小程序获取你的信息，将无法正常使用小程序的功能，如需要正常使用，请点击授权按钮，获取昵称，头像等信息的授权。</div>
    <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" hover-class="button-hover">授权登录</button>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    data () {
      return {}
    },

    methods: {
      getUserInfo({ mp: { detail } }) {
        console.log('getUserInfo', detail)
        if (detail.errMsg === 'getUserInfo:ok') {
          this.$store.commit('setWxUserInfo', detail.userInfo)
          
          // wx.login({
          //   success: ({ code }) => {
          //     Api.auths.weixinUserInfo({
          //       code,
          //       encryptedData: detail.encryptedData,
          //       iv: detail.iv
          //     })
          //     .then(res => {
          //       if (res.code === Api.CODES.SUCCESS) {
          //
          //       }
          //     })
          //   }
          // })
           wx.navigateTo({ url: '/pages/mine/bind/main' })
        }
         wx.checkSession
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 84rpx 48rpx 0;
    line-height: 48rpx;
    font-size: 28rpx;
    color: $text-black;
    
    img {
      display: block;
      width: 200rpx;
      height: 200rpx;
      margin: 0 auto 128rpx;
    }
    button[type=primary] {
      margin-top: 168rpx;
      background-color: #45C844;
      &.button-hover {
        @include buttonHover;
      }
    }
  }
</style>
