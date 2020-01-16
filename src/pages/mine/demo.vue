<template>
  <div>
    <img class="mine-card__bg" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/mine_bg.png"  alt="" >
    <div class="mine-card">

      <div class="mine-card__user">
        <div class="weui-cell">

          <!-- 头像 -->
          <div class="weui-cell__hd">
            <div class="mine-card__avatar">
              <!-- if hasAvatar -->
              <img v-if="personCenter.avatar" :src="personCenter.avatar">
              <!-- else -->
              <img v-else src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/me_img_headportrait_n@2x.png" class="placeholder">
            </div>
          </div>
          <div class="weui-cell__bd">
            <!-- if 已经登录 -->
            <template v-if="sessionId">
              <h4>{{ personCenter.nickname }}</h4>
              <div class="mine-card__tag">
              </div>
            </template>
            <!-- else -->
            <div hover-class="none" @click="resgiterOrLogin"  v-else class="mine-card__login" >
              注册/登录
              <!-- <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/me_icon_blackarrow@2x.png"> -->
            </div>
            <p class="mine-card__desc">满世界给你找好吃的</p>
          </div>

        </div>
      </div>

    </div>




    <div class="weui-panel entry-panel my-order-panel">
      <div class="weui-panel__hd">
        我的订单
        <div hover-class="none" @click="allOrder" url="/pages/order/index/main" class="weui-cell__ft weui-cell__ft_in-access"
          style="font-size: 24rpx; line-height: 40rpx;">查看全部订单</div>
      </div>
      <div class="weui-panel__bd my-order-panel-content">
        <div class="weui-flex ">
          <div hover-class="none" @click="obligation " :url="'/pages/order/index/main?status=' + ORDER_STATE.UNPAID" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/payment_icon.png">
            <div>待付款</div>
            <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;" v-if="personCenter.notPayCount">{{ personCenter.notPayCount }}</span>
          </div>
          <div hover-class="none" @click="toPickUp" :url="'/pages/order/index/main?status=' + ORDER_STATE.POHYD" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/mention_icon.png">
            <div>待提货</div>
            <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;" v-if="personCenter.notVeriCount">{{ personCenter.notVeriCount }}</span>
          </div>
          <!-- <navigator hover-class="none" :url="'/pages/order/index/main?status=' + ORDER_STATE.UNRECEIVED" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/me_icon_deliveried@2x.png">
            <div>待收货</div>
            <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;" v-if="personCenter.notReceivingCount">{{ personCenter.notReceivingCount }}</span>
          </navigator> -->
          <div hover-class="none" @click="pickUp" :url="'/pages/order/index/main?status=' + ORDER_STATE.FINISHED" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/evaluate_icon.png">
            <div>已提货</div>
            <!-- <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;" v-if="personCenter.notEvaluationCount">{{ personCenter.notEvaluationCount }}</span> -->
          </div>
          <div hover-class="none" @click="salesReturn" :url="'/pages/order/returns/main'" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/after_icon.png">
            <div>退货/售后</div>
          </div>
        </div>
      </div>
    </div>

     <div class="weui-panel entry-panel" style="margin-top:312rpx;" >
      <div class="weui-panel__hd">
        我的服务
      </div>
      <div class="weui-panel__bd my-service-box">

      <navigator @click="discount" hover-class="none" class="my-service-box-item">
        <div class="my-service-box-item-main">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/coupon_icon.png" class="my-service-box-item__icon" >
          <div class="my-service-box-item__desc">我的优惠券</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>

      <div class="my-service-box-item">
        <button open-type="contact" class="contact-btn">
          <div class="my-service-box-item-main">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/service_icon.png" class="my-service-box-item__icon" >
            <div class="my-service-box-item__desc">客服和帮助</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </button>
      </div>

      <navigator @click="toSettings" hover-class="none" class="my-service-box-item">
        <div class="my-service-box-item-main">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/set_icon.png" class="my-service-box-item__icon" >
          <div class="my-service-box-item__desc">设置</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      </div>
    </div>

    </div>
</template>
<script>
  import { mapState } from 'vuex'
  import UserModer from '@/model/user'
  import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
  import {resgiterOrLogin} from '../../utils/index'

  const userModel = new UserModer()

  export default {
    data () {
      return {
        ORDER_STATE,
        ORDER_STATE_TEXT,
        completedTipShown: false
      }
    },
    computed: {
      ...mapState(['sessionId', 'personCenter'])
    },

    methods: {

      allOrder () {
        if(!this.sessionId) {
          resgiterOrLogin()
        }else{
          wx.navigateTo({
            url: `/pages/order/index/main`
          })
        }
      },

      obligation () {
        if(!this.sessionId) {
          resgiterOrLogin()
        }else{
          console.log('ORDER_STATE.UNPAID',ORDER_STATE.UNPAID)
          wx.navigateTo({
            url: `/pages/order/index/main?status=${ORDER_STATE.UNPAID}`
          })
        }

      },

      toPickUp () {
        if(!this.sessionId) {
          resgiterOrLogin()
        }else{
          wx.navigateTo({
            url: `/pages/order/index/main?status=${ORDER_STATE.POHYD}`
          })
        }
      },

      pickUp () {
         if(!this.sessionId) {
          resgiterOrLogin()
        }else{
          wx.navigateTo({
            url: `/pages/order/index/main?status=${ORDER_STATE.FINISHED}`
          })
        }
      },

      salesReturn () {
        if(!this.sessionId) {
          resgiterOrLogin()
        }else{
          wx.navigateTo({
            url: `/pages/order/returns/main`
          })
        }

      },

       // 优惠券
      discount() {
        if (this.sessionId) {
          wx.navigateTo({
            url: '/pages/coupon/index/main'
          })
        } else {
          resgiterOrLogin()
        }
      },

      toSettings() {
        if (this.sessionId) {
          wx.navigateTo({
            url: '/pages/settings/index/main'
          })
        } else {
         resgiterOrLogin()
        }
      },

      /**
       * @description 跳转注册登录组件
       */
      async resgiterOrLogin () {
        console.log('resgiterOrLogin')

        const userInfoIsScope = await userModel.checkUserInfoIsScope() //获取用户是否已经授权用户信息
        console.log('userInfoIsScope',userInfoIsScope)
        if(userInfoIsScope) {
          //如果用户已经授权直接跳转快捷登录组件页面
          wx.navigateTo({
            url: '/pages/mine/bind/main'
          })
        }else{
          //未授权跳转授权用户信息组件页面
          wx.navigateTo({
            url: '/pages/mine/auth/main'
          })

        }


      },

      toSmessage() {
        if (this.sessionId) {
          wx.navigateTo({
            url: '/pages/mine/info/main'
          })
        } else {
            success: res => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/mine/auth/main'
                })
              }
            }
        }
      }
    },

    onShow() {
      if (this.sessionId) {
        if (!this.personCenter.nickname) {
          wx.showLoading({ title: '加载中' })
        }
        Api.user.personCenter().then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            console.log('res.data',res.data)
            this.$store.commit('setPersonCenter', res.data)
          }
          wx.hideLoading()
        })
        .catch(e => wx.hideLoading())

        Api.user.profile().then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.completedTipShown = !res.data.birthday
          }
        })
      }

      this.$store.dispatch('syncCartTabbarBadge')
    }
  }
</script>

<style>
page{
  background: #f5f5f5;
}
</style>

<style lang="scss" scoped>
.mine-card__desc{
  font-size: 24rpx;
}
.weui-cell__ft_in-access:after {
  // content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 2px;
}
  .box{
    position: fixed;
    top:0rpx;
    left:0rpx;
  }


  .weui-panel__hd{
    font-weight:bold;
  }
  .arrows{
    position: fixed;
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    top:90rpx;
    right:0rpx;
  }


  .dise{
    width: 100%;
    height: 62%;
    background-color: rgb(238, 238, 238);
    position: fixed;
    bottom:0rpx;
    left:0rpx;
  }
  .mine-card__bg{
    height: 310rpx;
    width: 100%;
    display: block;
    position: fixed;
    top:0rpx;
    left:0rpx;

  }
  .headline{
    position: fixed;
    position: relative;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    height: 12%;
    z-index: 1;
    text-align: center;
    line-height: 188rpx;
    color:#fff;

  }

  .weui-panel{
     position:fixed;
     top:217rpx;
     left:24rpx;
     width: 702rpx;
     height: 254rpx;
     border-radius: 14rpx;
     .xian{
        width: 702rpx;
        height: 1rpx;
        opacity: 0.6;
        background:rgb(226, 226, 226);
        position: absolute;
        top:92rpx;
        left:0;
     }
  }

  .mine-card {

    &__user {
      .weui-cell {
        position: fixed;
        top:12rpx;
        left:1rpx;
        padding-top: 50rpx;
        padding-right: 80rpx;
        width: 600rpx;
        &__hd {
          margin-right: 24rpx;
        }
        &__bd {
          color: #fff;
          font-size: 36rpx;
          h4 {
            font-weight: 700;
          }
        }
        &__ft {
          font-size: 24rpx;
          color: #212020;
          img {
            margin-top: 18rpx;
            margin-bottom: 4rpx;
            vertical-align: middle;
            width: 65rpx;
            height: 53rpx;
          }
        }
      }
    }
    &__tag {
      line-height: 40rpx;
      &__l,
      &__r {
        display: inline-block;
        vertical-align: middle;
        line-height: 36rpx;
        height: 36rpx;
        font-size: 24rpx;
        padding-left: 16rpx;
        padding-right: 16rpx;
      }
      &__l {
        border-top-left-radius: 18rpx;
        border-bottom-left-radius: 18rpx;
        background-color: #4B3015;
        color: #FFFADF;
        &:last-child {
          border-top-right-radius: 18rpx;
          border-bottom-right-radius: 18rpx;
        }
      }
      &__r {
        background-color: #F3E297;
        color: #634300;
        border-radius: 18rpx;
        border-top-right-radius: 0;
      }
      &__l + &__r {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    &__avatar {
      width: 132rpx;
      height: 132rpx;
      background-color: #DEDEDE;
      border-radius: 50%;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        vertical-align: middle;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &.placeholder {
          width: 82rpx;
          height: 48rpx;
          border-radius: 0;
        }
      }
    }
    .weui-flex {
      position: relative;
      padding: 66rpx 16rpx 0;
      &__item {
        text-align: center;
        font-size: 24rpx;
        .primary {
          font-size: 34rpx;
        }
        .weui-badge{
          position:absolute;
          top:0;
          right:1em;
        }
      }
    }
    &__ft {
      margin: 20rpx 50rpx 0;
      position: relative;
      background-color: #000;
      border-bottom-left-radius: 14rpx;
      border-bottom-right-radius: 14rpx;
      .weui-cell {
        &__hd img {
          float: left;
          margin-right: 12rpx;
          width: 32rpx;
          height: 27rpx;
        }
        &__bd,
        &__ft {
          font-size: 24rpx;
          color: #DBAD4F;
        }
        &__ft:after {
          border-color: #DBAD4F;
        }
      }
    }
    &__login {
      font-size: 36rpx;
      img {
        margin-left: 4rpx;
        width: 14rpx;
        height: 25rpx;
      }
    }
  }

  .entry-panel {
    height: auto;
    &:before,
    &:after {
      display: none;
    }

    .weui-panel {
      &__hd {
        padding-left: 0 !important;
        padding-right: 0 !important;
        border-bottom: 1rpx solid #eeeeee;
        &:after {
          display: none;
          border-bottom: 1rpx solid #eeeeee;
        }
        font-size: 30rpx;
        color: $text-black;
        .weui-cell__ft {
          float: right;
          padding-right:39rpx;
        }
      }
    }

    .weui-flex {
      &__item {
        text-align: center;
        font-size: 24rpx;
        color: $text-black;
        img {
          margin-bottom: 4rpx;
          vertical-align: middle;
          width: 62rpx;
          height: 62rpx;
        }
      }
    }
  }

  .my-order-panel{
    &-content{
      padding: 38rpx 0rpx !important;
    }
  }

  .complete-tip {
    margin-top: 20rpx;
    .weui-cell {
      padding-top: 16rpx;
      padding-bottom: 16rpx;
      font-size: 24rpx;
      background-color: #FFE6C2;
      color: #F00909;
      &__ft_in-access:after {
        border-color: #FFF;

      }
    }
  }

  .weui-panel{
    padding: 0 30rpx !important;
    box-sizing: border-box;
  }


  .my-service-box{
    &-item{
      height: 106rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #636363;
      font-size: 28rpx;
      box-sizing: border-box;
      width: 100%;
      border-bottom: 1rpx solid #eeeeee;
      &:nth-last-of-type(1){
        border-bottom: none;
      }
      &-main{
        flex: 1;
        display: flex;
        align-items: center;
      }
      &__icon{
        height: 48rpx;
        width: 48rpx;
        margin-right: 12rpx;
      }
    }
  }

  .contact-btn{
    height: 106rpx;
    width: 100%;
    background: none;
    padding: 0;
    color: #636363;
    font-size: 28rpx;
    display: flex;
    &::after{
      border: none !important;
    }
  }

  .my-order-panel-content{
    .weui-flex{
      justify-content: space-between;
    }
  }

</style>
