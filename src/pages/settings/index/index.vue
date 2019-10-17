<template>
  <div class="weui-cells">
    <!-- <div class="weui-cell weui-cell_access" @click="setPassword">
      <div class="weui-cell__hd">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/setting_icon_membershipcard@2x.png">
      </div>
      <div class="weui-cell__bd">会员卡支付密码</div>
      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
    </div> -->
    <!-- <navigator url="/pages/address/list/main" class="weui-cell weui-cell_access">
      <div class="weui-cell__hd">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/setting_icon_location@2x.png">
      </div>
      <div class="weui-cell__bd">收货地址</div>
      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
    </navigator> -->
    <navigator url="/pages/mine/info/main" class="weui-cell weui-cell_access">
      <div class="weui-cell__hd">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/setting_icon_member@2x.png">
      </div>
      <div class="weui-cell__bd">用户信息</div>
      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
    </navigator>

    <div class="footer-bar">
      <button type="primary" hover-class="button-hover" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    data () {
      return {
        autoRenew: true
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
