<template>
  <div class="container">
    <img src="/static/images/signin_bg_logo_big@2x.png">
    <div class="auth-desc">乐家生鲜</div>

    <div class="button-bar">
      <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" hover-class="button-hover">授权登录</button>
    </div>
    
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
    padding: 140rpx 48rpx 0;
    line-height: 48rpx;
    font-size: 28rpx;
    color: $text-black;

    .auth-desc {
      text-align: center;
      font-size:36rpx;
      font-weight:bold;
      color:#666666;
    }

    .button-bar {
      margin-top: 300rpx;
      button[type=primary] {
        margin-top: 30rpx;
        background-color: #45C844;
        &.button-hover {
          @include buttonHover;
        }
        &[plain] {
          background-color: transparent;
          border-color: #45C844;
          color: #45C844;;
        }
      }
    }
    
    img {
      display: block;
      width: 150rpx;
      height: 150rpx;
      margin: 0 auto 36rpx;
      border-radius: 50%;
      box-shadow: 0px 0px 8rpx #B5A8A8;
    }

  }
</style>
