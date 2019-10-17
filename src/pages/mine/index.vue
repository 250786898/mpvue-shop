<template>
  <div>
      <img class="mine-card__bg" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/mine_bg.png"  alt="" >

    <div class="headline"> 我的 </div>
    <div class="dise"></div>
    <div class="mine-card">

      <div class="mine-card__user">
        <div class="weui-cell" @click="toSmessage">
          <!-- 箭头 -->
           <navigator hover-class="none"  > <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/icon_blackarrow.png" alt="" class="arrows" style="width:60rpx;height:60rpx;"> </navigator>

          <!-- 头像 -->
          <div class="weui-cell__hd">
            <div class="mine-card__avatar">
              <!-- if hasAvatar -->
              <img v-if="personCenter.avatar" :src="personCenter.avatar">
              <!-- else -->
              <img v-else src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_img_headportrait_n@2x.png" class="placeholder">
            </div>
          </div>
          <div class="weui-cell__bd">
            <!-- if 已经登录 -->
            <template v-if="sessionId">
              <h4>{{ personCenter.nickname }}</h4>
              <div class="mine-card__tag">
                <!-- <span class="mine-card__tag__l" v-if="personCenter.vipState == 1 || personCenter.vipState == 2">乐享VIP</span>
                <span class="mine-card__tag__r" v-if="personCenter.vipState == 2">体验卡</span>
                <span class="mine-card__tag__r" v-if="personCenter.vipState == 0">普通会员</span> -->
              </div>
            </template>
            <!-- else -->
            <div hover-class="none" @click="resgiterOrLogin"  v-else class="mine-card__login" >
              注册/登录
              <!-- <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_icon_blackarrow@2x.png"> -->
            </div>
          </div>
          <!-- <navigator hover-class="none" url="/pages/qrcode/index/main" class="weui-cell__ft">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_icon_qrcode@2x.png">
            <div>会员码</div>
          </navigator> -->
        </div>
      </div>
      <!-- <div class="weui-flex"> -->
        <!-- <navigator hover-class="none" url="/pages/membercard/charge/main" class="weui-flex__item">
          <div class="primary" v-if="sessionId">{{ personCenter.balance }}</div>
          <div class="primary" v-else="sessionId">***</div>
          <div>余额</div>
        </navigator>
        <navigator hover-class="none" url="/pages/bonuspoint/index/main" class="weui-flex__item">
          <div class="primary" v-if="sessionId">{{ personCenter.points }}</div>
          <div class="primary" v-else="sessionId">***</div>
          <div>积分</div>
        </navigator> -->

      <!-- </div> -->
      <!-- <navigator hover-class="none" url="/pages/vip/index/main" class="mine-card__ft">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_icon_ancrown@2x.png">
          </div>
          <div class="weui-cell__bd">乐享VIP</div>
          <div class="weui-cell__ft weui-cell__ft_in-access">
            及时抢购，即享优惠
          </div>
        </div>
      </navigator> -->
    </div>

    <!-- <navigator hover-class="none" v-if="completedTipShown" url="/pages/mine/info/main" class="complete-tip">
      <div class="weui-cell">
        <div class="weui-cell__bd">完善会员信息.我们能为您提供更好会员服务,另好礼大放送! </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </navigator> -->


    <div class="weui-panel entry-panel">
      <div class="xian"></div>
      <div class="weui-panel__hd">
        我的订单
        <div hover-class="none" @click="allOrder" url="/pages/order/index/main" class="weui-cell__ft weui-cell__ft_in-access"
          style="font-size: 24rpx; line-height: 40rpx;">查看全部订单</div>
      </div>
      <div class="weui-panel__bd">
        <div class="weui-flex">
          <div hover-class="none" @click="obligation " :url="'/pages/order/index/main?status=' + ORDER_STATE.UNPAID" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/payment_icon.png">
            <div>待付款</div>
            <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;" v-if="personCenter.notPayCount">{{ personCenter.notPayCount }}</span>
          </div>
          <div hover-class="none" @click="toPickUp" :url="'/pages/order/index/main?status=' + ORDER_STATE.POHYD" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/mention_icon.png">
            <div>待提货</div>
            <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;" v-if="personCenter.notVeriCount">{{ personCenter.notVeriCount }}</span>
          </div>
          <!-- <navigator hover-class="none" :url="'/pages/order/index/main?status=' + ORDER_STATE.UNRECEIVED" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_icon_deliveried@2x.png">
            <div>待收货</div>
            <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;" v-if="personCenter.notReceivingCount">{{ personCenter.notReceivingCount }}</span>
          </navigator> -->
          <div hover-class="none" @click="pickUp" :url="'/pages/order/index/main?status=' + ORDER_STATE.FINISHED" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/evaluate_icon.png">
            <div>已提货</div>
            <!-- <span class="weui-badge" style="position: absolute;top: -.4em;right: 1em;" v-if="personCenter.notEvaluationCount">{{ personCenter.notEvaluationCount }}</span> -->
          </div>
          <div hover-class="none" @click="salesReturn" :url="'/pages/order/returns/main'" class="weui-flex__item" style="position:relative">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/after_icon.png">
            <div>退货/售后</div>
          </div>
        </div>
      </div>
    </div>

     <div class="weui-panel entry-panel" style="margin-top:292rpx; height:37%;" >
      <div class="xian"></div>
      <div class="weui-panel__hd">
        我的服务
      </div>
      <div class="weui-panel__bd my-service-box">
        <div class="weui-flex">
          <!-- 二期
          <navigator hover-class="none" url="/pages/scanorder/index/main" class="weui-flex__item">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_icon_sweeporder@2x.png">
            <div>扫码购订单</div>
          </navigator>
          -->
          <!-- <navigator hover-class="none" url="/pages/pickup/index/main" class="weui-flex__item">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_icon_deliverycode@2x.png">
            <div>提货码</div>
          </navigator> -->
          <!-- 1.0 -->
          <navigator hover-class="none" @click="discount" class="weui-flex__item">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/coupon_icon.png">
            <!-- <div class="primary" v-if="sessionId">{{ personCenter.couponNum }}</div> -->
            <!-- <div class="primary" v-else="sessionId">***</div> -->
            <div>优惠券</div>
          </navigator>
          <!-- <navigator hover-class="none" url="/pages/order/teamlist/main" class="weui-flex__item">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_icon_tuan@2x.png">
            <div>我的团购</div>
          </navigator> -->
          <button open-type="contact" class="weui-flex__item no-style">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/service_icon.png">
            <div>联系客服</div>
          </button>

          <button  @click="toSettings"  class="weui-flex__item no-style">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/set_icon.png">
            <div>设置</div>
          </button>

          <!-- <button open-type="feedback" class="weui-flex__item no-style">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/me_icon_feedback@2x.png">
            <div>意见反馈</div>
          </button> -->
          <!-- <div class="weui-flex__item"></div> -->
          <!-- <div class="weui-flex__item"></div>  -->
        </div>
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

      showServiceActionSheet() {

        // wx.getSystemInfo({
        //   success: result => {
        //     //选项集合
        //     let itemList;
        //     itemList = ['在线客服']
        //     if(this.personCenter.serverPhone) {
        //     itemList.push(this.personCenter.serverPhone)

        //     if (result.platform == 'android') {
        //       itemList.push('取消')
        //         }
        //     }
        //     wx.showActionSheet({
        //       itemList,
        //       itemColor: '#0ECD99',
        //       success: res => {
        //         switch(res.tapIndex) {
        //           case 0:
        //           //   handleContact(e) {
        //           //   console.log(e.path)
        //           //   console.log(e.query)
        //           // }
        //             break;
        //           case 1:
        //             wx.makePhoneCall({
        //               phoneNumber: this.personCenter.serverPhone
        //             })
        //             break;
        //           case 2:
        //         }
        //       },
        //       fail: res => {
        //         console.log(res)
        //       }
        //     })
        //   }
        // })

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

<style lang="scss" scoped>

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

.my-service-box{
  padding: 30rpx 20rpx !important;
}
  .box{
    position: fixed;
    top:0rpx;
    left:0rpx;
  }


  .weui-panel__hd{
    padding: 28rpx 30rpx 26rpx 38rpx;
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
      height: 56%;
      width: 100%;
      // z-index: 100;
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
     top:356rpx;
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
        top:133rpx;
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
    &:before,
    &:after {
      display: none;
    }

    .weui-panel {
      &__hd {
        &:after {
          display: none;
        }
        font-size: 30rpx;
        color: $text-black;
        .weui-cell__ft {
          float: right;
          padding-right:39rpx;
        }
      }
      &__bd {
        padding: 18rpx 20rpx;
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

  // .weui-actionsheet {
  //   position: fixed;
  //   left: 0;
  //   bottom: 0;
  //   transform: translate(0, 100%);
  //   backface-visibility: hidden;
  //   z-index: 5000;
  //   width: 100%;
  //   background-color: #EFEFF4;
  //   //slide up animation
  //   transition: transform .3s;
  // }
  // .weui-actionsheet__menu {
  //   background-color: #FCFCFD;
  // }
  // .weui-actionsheet__action {
  //   margin-top: 6px;
  //   background-color: #FCFCFD;;
  // }
  // .weui-actionsheet__cell {
  //   position: relative;
  //   padding: 10px 0;
  //   text-align: center;
  //   font-size: 18px;
  //   &:before {
  //     content: " ";
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     right: 0;
  //     height: 1px;
  //     border-top: 1px solid #e5e5e5;
  //     color: #e5e5e5;
  //     -webkit-transform-origin: 0 0;
  //     transform-origin: 0 0;
  //     -webkit-transform: scaleY(0.5);
  //     transform: scaleY(0.5);
  //   }
  //   &:active{
  //       background-color: #ECECEC;
  //   }
  //   &:first-child{
  //     &:before{
  //         display: none;
  //     }
  //   }
  // }

  // //actionSheet aniamtion
  // .weui-actionsheet_toggle{
  //   transform: translate(0, 0);
  // }
</style>
