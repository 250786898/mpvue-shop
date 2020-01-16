<template>
  <div class="container">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/signin_bg_logo_big@2x.png" class="logo">
    <div class="auth-desc">乐家生鲜</div>

    <div class="button-bar">
      <form report-submit @submit="uploadFormId">
        <button type="primary" form-type="submit" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" hover-class="button-hover">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/signin_icon_wechat@2x.png" class="icon-wx">
          微信用户手机号授权快捷登录
        </button>
      </form>

      <div class="protocol-box">
        点击“登录”即表示您同意<span class="protocol-item" @click="serviceProtocol">《乐家生鲜服务协议》</span>
      </div>

      <!-- <button type="primary" @click="toRegister" :plain="true" hover-class="button-hover"> -->
        <!-- TODO: 图标缺失 -->
        <!-- <img src="/static/images" class="icon-phone"> -->
        <!-- 手机号登录/注册 -->
      <!-- </button> -->
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import StoreModel from '@/model/store'
  import UserModer from '@/model/user'

  const storeModel = new StoreModel()
  const userModel = new UserModer()

  export default {
    data () {
      return {
        code: '',
        formId: 0,
      }
    },

    computed: {
      ...mapState(['wxUserInfo'])
    },

    methods: {
      uploadFormId: function (e) {
      this.formId = e.target.formId
      console.log( this.formId )
      },

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

      /**
       * @description 跳转服务协议页面
       */
      serviceProtocol () {
        wx.navigateTo({
          url: '/pages/mine/serviceAgreement/main',
        })
      },

       /**
         * @description 确定经常访问门店
         */
        setUsuallyStoreId() {
          storeModel.getLastestUsuallyStoreId().then(res => {
            if (res.code === Api.CODES.SUCCESS) {
              console.log('vuex登录Action设置',res)
              const storeId = res.data.storeId
              if(storeId) {
                this.$store.commit('setStoreId',res.data.storeId)
              }
            }
          })
        },

      getPhoneNumber({ mp: { detail } }) {
        console.log('getPhoneNumber', detail)
        if (detail.errMsg === 'getPhoneNumber:ok') {
          wx.checkSession({
            success: r => {
              let { encryptedData, iv } = detail
              Api.auths.weixinUserInfo({
                code: this.code,
                encryptedData: detail.encryptedData,
                iv: detail.iv
              })
              .then(res => {
                if (res.code === Api.CODES.SUCCESS) {
                  this.$store.commit('setOpenId', res.data.openid)
                  this.$store.commit('setWxPhoneNumber', res.data.mobile)
                  // 登录注册
                  this.login({
                    openid: res.data.openid,
                    mobile: res.data.mobile,
                  })
                }
              })
            },
            fail: e => {
              wx.login({
                success: ({ code }) => {
                  this.code = code
                  this.getPhoneNumber(detail)
                }
              })
            }
          })


        } else if (detail.errMsg !== 'getPhoneNumber:获取手机号失败') {
            wx.showModal({
              title: '获取手机号码失败',
              content: detail.errMsg
            })
              wx.navigateTo({ url: '/pages/mine/auth/main' })
              wx.navigateBack({
                delta: 1
              })
          }
        },

        toRegister() {
          wx.navigateTo({ url: '/pages/mine/register/main' })
        },

      login({ openid, mobile }) {
        console.log('loging')
        wx.showLoading({ title: '登录中' })
        console.log('formId',this.formId)
        Api.auths.loginByWechat({
          openid,
          mobile,
          nickname: this.wxUserInfo.nickName,
          avatar: this.wxUserInfo.avatarUrl,
          formId: this.formId,
        })
        .then(res => {
          this.$store.dispatch('login', res.data.sessionId)
          Api.user.personCenter().then(res => {
            console.log(res)
            console.log('per')
            if (res.code === Api.CODES.SUCCESS) {
              this.$store.commit('setPersonCenter', res.data)
              this.setUsuallyStoreId()
              wx.navigateBack({
                delta: 2 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
              })
            }
          })



          // wx.switchTab({ url: '/pages/mine/main' })

        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      }
    },

    onLoad() {

      wx.login({
        success: ({ code }) => {
          this.code = code
        }
      })
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

    .protocol-box{
      margin-top: 20rpx;
      color: $text-gray;
      font-size: 24rpx;
      .protocol-item{
        color: #45C844;
      }
    }

    .button-bar {
      margin-top: 200rpx;
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

    .logo {
      display: block;
      width: 150rpx;
      height: 150rpx;
      margin: 0 auto 36rpx;
      border-radius: 50%;
      box-shadow: 0px 0px 8rpx #B5A8A8;
    }
  }
  .icon-wx,
  .icon-phone {
    margin-right: 10rpx;
    vertical-align: -8rpx;
  }

  .icon-wx { width: 53rpx; height: 43rpx; }
  .icon-phone { width: 30rpx; height: 48rpx; }
</style>
