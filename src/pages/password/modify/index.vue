<template>
  <div class="pwd-form">
    <div :hidden="step !== 1">
      <div class="title">请输入原有密码</div>
      <div class="desc">保护您的账户余额安全</div>
      <div class="input-box">
        <password v-model="oldPassword" @complete="onOldPasswordComplete" ref="oldPassword"></password>
      </div>
    </div>

    <div :hidden="step !== 2">
      <div class="title">请输入新密码</div>
      <div class="desc">保护您的账户余额安全</div>
      <div class="input-box">
        <password v-model="newPassword" ref="newPassword"></password>
      </div>
      <button class="input-button" hover-class="button-hover" :disabled="newPassword.length !== 6" @click="confirmNewPassword">确定</button>
    </div>

    <div :hidden="step !== 3">
      <div class="title">再次输入支付密码</div>
      <div class="desc">&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div class="input-box">
        <password v-model="newPasswordAgain" @complete="onNewPasswordAgainComplete" ref="newPasswordAgain"></password>
      </div>
      <button class="input-button" hover-class="button-hover" @click="backToStep2">返回修改</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import Password from '@/components/Password'

  export default {
    components: {
      Password
    },
    
    data () {
      return {
        step: 1,
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: '',
      }
    },

    methods: {
      onOldPasswordComplete(password) {
        wx.showLoading({ title: '验证中' })
        Api.user.validOldPassword({
          oldPassword: password
        })
        .then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            this.step = 2
            setTimeout(() => this.$refs.newPassword.setFocus(), 200)
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
            this.oldPassword = ''
          }
        })
        .catch(e => {
          wx.hideLoading()
          console.log(e)
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
          wx.showLoading({
            title: '设置中',
            mask: true
          })
          Api.user.modifyPayPwd({
            newPassword: this.newPassword,
            checkNewPassword: this.newPassword
          })
          .then(res => {
            wx.hideLoading()
            if (res.code === Api.CODES.SUCCESS) {
              wx.showToast({
                title: '设置成功'
              })
              setTimeout(() => wx.navigateBack(), 1500)
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
          })
          .catch(e => wx.hideLoading())
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

    onLoad(e) {
      if (e.action === 'find') {
        this.step = 2
        setTimeout(() => this.$refs.newPassword.setFocus(), 200)
      } else {
        setTimeout(() => {
          this.$refs.oldPassword.setFocus()
        }, 200)
      }

    }
  }
</script>

<style>
  page { background-color: #F6F6F6; }
</style>