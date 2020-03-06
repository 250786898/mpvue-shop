<template>
  <div class="container">
    <div class="card">
      <div class="card-left">
        <span>手机号</span>
      </div>
      <div class="card-right">
        <span>{{mobile}}</span>
      </div>
    </div>

     <div class="card" @click="toService">
      <div class="card-left">
        <span>服务协议</span>
      </div>
      <div class="card-right">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order-right-icon.png" class="card-icon">
      </div>
    </div>

    <!-- <div class="card">
      <div class="card-left">
        <span>退款协议</span>
      </div>
      <div class="card-right">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order-right-icon.png" class="card-icon">
      </div>
    </div> -->
    <div class="card">
      <button class="feedback-btn" open-type="feedback">
      <div class="card-left">
        <span>意见反馈</span>
      </div>
      <div class="card-right">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order-right-icon.png" class="card-icon">
      </div>
      </button>
    </div>

    <div class="card">
      <button class="feedback-btn" open-type="feedback">
      <div class="card-left">
        <span>版本号</span>
      </div>
      <div class="card-right">
       V2.5.4
      </div>
      </button>
    </div>

    <div class="btn-bar">
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

      /**
       * @description 跳转服务协议
       */
      toService () {
        wx.navigateTo({
          url: "/pages/mine/serviceAgreement/main"
        })
      },

      /**
       * @description 退出登录
       */
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
page{
  background: #F1F1F1;
  padding: 20rpx 0;
}
</style>

<style scoped lang="scss">
.container {
  .card{
    height: 106rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;
    font-size: 34rpx;
    background: #ffffff;
    border-bottom: 1px solid #f1f1f1;
    box-sizing: border-box;
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    &-left{
      color: #363636;
    }
    &-right{
      color: #A3A3A3;
      .card-icon{
        width: 12rpx;
        height: 23rpx;
      }
    }
  }
  .btn-bar{
    position: fixed;
    bottom: 70rpx;
    width: 100vw;
    display: flex;
    justify-content: center;
    button{
      width:470rpx;
      height:80rpx;
      line-height: 80rpx;
      font-size: 34rpx;
      font-weight:bold;
    }
  }
  .feedback-btn{
    background: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
