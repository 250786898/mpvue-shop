<template>
  <div class="pwd-form">
    <div :hidden="step !== 1">
      <div class="title">短信验证码已发送至</div>
      <div class="desc">{{ maskedPhoneNumber }}</div>
      <div class="input-box">
        <input type="number" v-model="vcode" :focus="focus" placeholder="输入验证码" @input="onVCodeInput" :maxlength="6">
      </div>
      <button class="input-button" hover-class="button-hover" @click="sendVCode" :disabled="countdown">
        重新发送 <template v-if="countdown">({{ countdown }}秒)</template>
      </button>
    </div>

    <div :hidden="step !== 2">
      <div class="title">请设置6位支付密码</div>
      <div class="desc">保护您的账户余额安全</div>
      <div class="input-box">
        <password v-model="newPassword" ref="newPassword"></password>
      </div>
      <button class="input-button" hover-class="button-hover" :disabled="newPassword.length !== 6" @click="confirmNewPassword">确定</button>
    </div>

    <div :hidden="step !== 3">
      <div class="title">再次输入6位数密码</div>
      <div class="desc">&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div class="input-box">
        <password v-model="newPasswordAgain" ref="newPasswordAgain" @complete="onNewPasswordAgainComplete"></password>
      </div>
      <button class="input-button" hover-class="button-hover" @click="backToStep2">返回修改</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import Password from '@/components/Password'

  export default {
    components: {
      Password
    },
    
    data () {
      return {
        countdown: 0,
        step: 1,
        vcode: '',
        newPassword: '',
        newPasswordAgain: '',
        focus: false
      }
    },

    computed: {
      ...mapState(['wxPhoneNumber']),
      maskedPhoneNumber() {
        return this.wxPhoneNumber ?
          `${ this.wxPhoneNumber.slice(0, 3) }****${ this.wxPhoneNumber.slice(7) }` :
          '************'
      }
    },

    methods: {
      onVCodeInput(e) {
        // 校检验证码
        if (this.vcode.length === 6) {
          wx.showLoading({ title: '验证中' })
          Api.user.validCode({ code: this.vcode })
          .then(res => {
            if (res.code === Api.CODES.SUCCESS) {
              this.step = 2
              this.focus = false
              setTimeout(() => this.$refs.newPassword.setFocus(), 200)
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              }) 
            }
          })
          .catch(e => console.log(e))
          .then(() => wx.hideLoading())
        }
      },

      sendVCode() {
        if (!this.wxPhoneNumber) return
        Api.user.sendCode({
          mobile: this.wxPhoneNumber
        }).then(res => {
          // if (res.code === Api.CODES.SUCCESS) {
            this.countdown = 300
            this._countdownTimer = setInterval(() => {
              this.countdown--
              if (this.countdown === 0) {
                clearInterval(this._countdownTimer)
              }
            }, 1000)

            this.focus = true
          // }
        })
      },

      onNewPasswordAgainComplete(password) {
        if (this.newPassword !== this.newPasswordAgain) {
          wx.showToast({
            title: '两次输入的新密码不一致~',
            icon: 'none'
          })
          this.newPasswordAgain = ''
        } else {
          wx.redirectTo({
            url: `/pages/password/question/main?password=${ this.newPassword }`
          })
        }
      },

      confirmNewPassword() {
        this.step = 3
        setTimeout(() => this.$refs.newPasswordAgain.setFocus(), 200)
      },

      backToStep2() {
        this.step = 2
        this.newPassword = this.newPasswordAgain = ''
        setTimeout(() => this.$refs.newPassword.setFocus(), 200)
      }
    },

    onShow() {
      this.countdown = 0
      this.step = 1
      this.vcode = this.newPassword = this.newPasswordAgain = ''
      this.focus = false
      this.sendVCode()
    },

    onUnload() {
      clearInterval(this._countdownTimer)
    }
  }
</script>

<style>
  page { background-color: #F6F6F6; }
</style>

