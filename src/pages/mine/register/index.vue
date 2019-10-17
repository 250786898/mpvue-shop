<template>
  <div>
    <div class="header">
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/signin_bg_logo_big@2x.png">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">乐家生鲜</h4>
          <p class="weui-media-box__desc">家门口的生鲜小超市</p>
        </div>
      </div>
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/membershipcard_bg@2x.png" class="header__bg" mode="widthFix">
    </div>
    <div class="lj-form">
      <form>
        <div class="weui-cells__title">必填信息</div>
        <div class="weui-cells weui-cells_after-title weui-cells_no-border">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              手机号
            </div>
            <div class="weui-cell__bd">
              <input type="number" v-model.trim="mobile" placeholder="请输入手机号" :class="{ 'valid-error': mobileError }" @input="onMobileInput" maxlength="11">
            </div>
          </div>

          <div class="weui-cell" v-if="isNew">
            <div class="weui-cell__hd">
              姓名
            </div>
            <div class="weui-cell__bd">
              <input type="text" v-model.trim="realname" placeholder="请输入真实姓名" :class="{ 'valid-error': realnameError }">
            </div>
          </div>

          <div class="weui-cell" v-if="isNew">
            <div class="weui-cell__hd">
              性别
            </div>
            <div class="weui-cell__bd">
              <picker @change="onSexChange" :value="sex" :range="sexArray">
                <view class="picker picker_triangle">{{ sexArray[sex] }}</view>
              </picker>
            </div>
          </div>

          <div class="weui-cell" v-if="isNew">
            <div class="weui-cell__hd">
              生日
            </div>
            <div class="weui-cell__bd">
              <picker @change="onBirthChange" :value="birth" mode="date">
                <view class="picker">{{ birth }}</view>
              </picker>
            </div>
          </div>


          <div class="weui-cell">
            <div class="weui-cell__hd">
              验证码
            </div>
            <div class="weui-cell__bd">
              <div class="inputbutton-group">
                <input type="number" placeholder="请输入验证码" v-model.trim="vcode" :class="{ 'valid-error': vcodeError }">
                <button :plain="true" :disabled="!isMobileValid || countdown" @click="sendCode">
                  {{ countdown ? countdown + 'S' : '发送验证码' }}
                </button>
              </div>
            </div>
          </div>

          <div class="weui-cell" v-if="isNew">
            <div class="weui-cell__hd">
              地址
            </div>
            <div class="weui-cell__bd">
              <input type="text" placeholder="请输入收货地址" v-model.trim="address" :class="{ 'valid-error': addressError }">
            </div>
          </div>
        </div>

        <div class="agreement">
          <label class="checkbox">
            <switch class="weui-check" type="checkbox" :checked="agreement" @change="onAgreemantChange">
            </switch>
            <icon class="weui-icon-checkbox_success" type="success" size="17" color="#12D6BE" v-if="agreement"></icon>
            <icon class="weui-icon-checkbox_circle" type="circle" size="17" v-else></icon>
            我已阅读并同意
          </label>
          <!-- TODO: 链接到哪个页面？ url="/pages/qrcode/memberrights/main" -->
          <navigator>会员卡信息使用说明</navigator>
        </div>
        <div class="lj-form__ft">
          <button type="primary" :disabled="!agreement" class="bg-gradient fz34" hover-class="button-hover" @click="submit">完 成</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'

  const mobileRegex = /^1\d{10}$/

  export default {
    data () {
      return {
        mobile: '',
        avatar: '',
        realname: '',
        agreement: true,
        sex: 0,
        sexArray: ['男', '女'],
        birth: '2000-01-01',
        mobileError: false,
        realnameError: false,
        vcodeError: false,
        addressError: false,

        detailShowed: false,
        isNew: false,
        isMobileError: false,

        countdown: 0
      }
    },

    computed: {
      ...mapState(['openId', 'wxUserInfo']),
      isMobileValid() {
        return mobileRegex.test(this.mobile) && !this.isMobileError
      }
    },

    methods: {
      onMobileInput({ mp: { detail } }) {
        this.isMobileError = false
        clearTimeout(this._timer)
        this._timer = setTimeout(() => {
          if (detail.value && mobileRegex.test(detail.value)) {
            wx.showLoading({ title: '检测中' })
            Api.auths.checkAccount({
              mobile: detail.value,
              openid: this.openId
            })
            .then(res => {
              wx.hideLoading()
              if (res.code === Api.CODES.SUCCESS) {
                switch(res.data.result) {
                  case 1:
                    this.isNew = true
                    break;
                  case 3:
                    wx.showToast({
                      title: '该手机号已被注册',
                      icon: 'none'
                    })
                    this.isMobileError = true
                    break;
                  case 4:
                    wx.showToast({
                      title: '微信已授权其他账号',
                      icon: 'none'
                    })
                    this.isMobileError = true
                    break;
                }
              } else {
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
              }
            })
            .catch(e => wx.hideLoading())
          }
        }, 200)
      },

      onSexChange(e) {
        this.sex = e.mp.detail.value
      },

      onBirthChange(e) {
        this.birth = e.mp.detail.value
      },

      onAgreemantChange(e) {
        this.agreement = e.mp.detail.value
      },

      // 发送验证码
      sendCode() {
        wx.showLoading({ mask: true })
        Api.common.msg({ mobile: this.mobile })
        .then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            this.countdown = 300
            this._countdownTimer = setInterval(() => {
              this.countdown--
              if (this.countdown === 0) {
                clearInterval(this._countdownTimer)
              }
            }, 1000)
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
      },

      submit() {
        let valid = true

        if (!this.mobile || !mobileRegex.test(this.mobile)) {
          this.mobileError = true
          valid = false
        }

        if (!this.vcode) {
          this.vcodeError = true
          valid = false
        }

        if (this.isNew) {
          if (!this.realname) {
            this.realnameError = true
            valid = false
          }

          if (!this.address) {
            this.addressError = true
            valid = false
          }
        }

        if (valid) {
          let params = {
            mobile: this.mobile,
            openid: this.openId,
            code: this.vcode
          }

          if (this.isNew) {
            params.nickname = this.wxUserInfo.nickName
            params.avatar = this.wxUserInfo.avatarUrl
            params.truename = this.realname
            params.sex = this.sex
            params.birthday = this.birth
            params.address = this.address
          }

          wx.showLoading({
            title: '登录中',
            mask: true
          })

          Api.auths.registerOrLogin(params).then(res => {
            wx.hideLoading()
            if (res.code === Api.CODES.SUCCESS) {
              this.$store.dispatch('login', res.data.sessionId)
              wx.switchTab({ url: '/pages/mine/main' })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.message
              })
            }
          })
          .catch(e => wx.hideLoading())
        }
      }
    },

    onLoad(e) {
      // RESET ALL
      this.mobile = this.avatar = this.realname = ''
      this.sex = this.countdown = 0
      this.mobileError =
      this.realnameError =
      this.vcodeError =
      this.addressError =
      this.detailShowed =
      this.isNew =
      this.isMobileError = false

      wx.showLoading({ mask: true })
      wx.login({
        success: ({ code }) => {
          Api.auths.weixinOpenId(code).then(res => {
            wx.hideLoading()
            if (res.code === Api.CODES.SUCCESS) {
              this.$store.commit('setOpenId', res.data.openid)
            }
          })
          .catch(e => wx.hideLoading())
        },
        fail: () => wx.hideLoading()
      })
    },

    onUnload() {
      clearInterval(this._countdownTimer)
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    background-color: $theme-color-light;
    .weui-media-box {
      padding-top: 60rpx;
      padding-bottom: 60rpx;
      &__hd {
        margin-right: 24rpx;
        width: 118rpx;
        height: 118rpx;
      }
      &__thumb {
        border-radius: 59rpx;
      }
      &__title {
        font-size: 26rpx;
        color: #FFF;
      }
      &__desc {
        line-height: 60rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: #FFF;
      }
    }
    &__bg {
      display: block;
      width: 100%;
    }
  }

  .lj-form {
    margin-top: -100rpx;
    .agreement {
      padding: 10rpx 30rpx;
      line-height: 34rpx;
      font-size: 30rpx;
      color: $text-black;
      icon {
        margin-left: 0;
        margin-right: 6rpx;
        vertical-align: top;
      }
      navigator {
        display: inline;
        color: $theme-color-light;
      }
    }

    &__ft {
      padding: 20rpx 30rpx;
    }
  }
</style>
