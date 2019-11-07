<template>
  <div class="weui-cells">
    <div  class="weui-cell weui-cell_access">
      <div class="weui-cell__bd">手机号</div>
      <div class="weui-cell__ft">{{mobile}}</div>
    </div>
    <navigator url="/pages/mine/serviceAgreement/main" class="weui-cell weui-cell_access">
      <div class="weui-cell__bd">服务协议</div>
      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
    </navigator>

    <div class="footer-bar">
      <button type="primary" hover-class="button-hover" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import { encryptMobile } from "@/utils/index"

  export default {
    data () {
      return {
        autoRenew: true
      }
    },

    computed: {
      mobile () {
        const mobile = wx.getStorageSync('PHONE_NUMBER')
        console.log('mobile',mobile)
        return encryptMobile(mobile)
      }
    },

    methods: {
      onAutoRenewChange(e) {
        this.autoRenew = e.mp.detail.value
      },

      showPasswordActionSheet() {
        wx.showActionSheet({
          itemList: [
            '修改支付密码',
            '忘记支付密码'
          ],
          success(res) {
            switch(res.tapIndex) {
              case 0:
                wx.navigateTo({ url: '/pages/password/modify/main' })
                break;
              case 1:
                wx.navigateTo({ url: '/pages/password/find/main' })
                break;
            }
          }
        })
      },

      setPassword() {
        wx.showLoading()
        Api.user.checkSetPayPwd().then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            if (res.data.isSetPayPwd) {
              this.showPasswordActionSheet()
            } else {
              wx.navigateTo({
                url: '/pages/password/set/main'
              })
            }
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },

      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
page{
  background: #f5f5f5;
  padding: 20rpx 0;
}
</style>

<style scoped lang="scss">

  .weui-cells {
    margin-top: 0;
    &:before {
      display: none;
    }
    &:after {
      border-bottom: 1px dashed #DEDEDE;
    }
    &:nth-last-of-type(1) {
      &:after{
        border-bottom: none;
      }
    }
  }
  .weui-cell {
    padding-top: 28rpx;
    padding-bottom: 28rpx;
    &:before {
      left: 0;
      border-top: 1px dashed #DEDEDE;
    }
    &__hd {
      img {
        vertical-align: middle;
        margin-right: 20rpx;
        width: 50rpx;
        height: 50rpx;
      }
    }
    &__bd {
      font-size: 32rpx;
      color: $text-black;
    }
  }
  .footer-bar button {
    background-color: #F5F5F5;
    color: #0CE0B5;
  }
</style>
