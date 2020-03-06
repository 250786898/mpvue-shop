<template>
  <div class="container">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/signin_bg_logo_big@2x.png">
    <div class="auth-desc">乐家生鲜</div>

    <div class="auth-tip-content">
      您暂未授权乐家生鲜Fresh小程序获取你的信息，将无法正常使用小程序的功能。如需要正常使用，请“授权登录”按钮，打开图像，昵称信息的权限。
    </div>

    <div class="button-bar">
      <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" hover-class="button-hover">授权登录</button>
      <button type="primary" plain="true" @click="navBackLastPage">取消</button>
    </div>

  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import UserModer from '@/model/user'
  import { mapState } from "vuex";
  const userModel = new UserModer()

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState(["wxUserInfo"])
    },
// wxUserInfo
    onShow () {
      // this.checkAuthUserInfo()
    },


    methods: {

      /**
       * @descption 核对是否已经授权用户信息，已授权直接返回我的页面
       */
      async checkAuthUserInfo () {
       const isAuthedUserInfo = await userModel.checkUserInfoIsScope()
       if(isAuthedUserInfo) {
         wx.switchTab({
           url: '/pages/mine/main',
         })

       }
       console.log('isAuthedUserInfo',isAuthedUserInfo)
      },

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

           wx.redirectTo({ url: '/pages/mine/bind/main' })
        }
         wx.checkSession
      },

      /**
       * @descrition 返回上一页
       */
      navBackLastPage () {
        wx.navigateBack({
          delta: 1
        })
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

    .auth-tip-content{
      margin-top: 50rpx;
      color: $text-gray;
      font-size: 26rpx;
    }

    .button-bar {
      margin-top: 100rpx;
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
