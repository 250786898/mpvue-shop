<template>
  <div class="container">

    <StatusInfo :status="order.state" />

    <PickupStoreInfo :storeInfo="order" />



    <payment-dialog
      :shown.sync="paymentDialogShowed"
      :amount="order.orderAmount"
      @complete="onComplete">
    </payment-dialog>

    <page-loading :show="showPageLoading"/>

    <!-- <red-package :shown="redPackageShow" @on-close="handleCloseRedPackage"></red-package> -->
  </div>
</template>

<script>
  import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
  import StatusInfo from './components/StatusInfo'
  import PickupStoreInfo from '../components/PickupStoreInfo'
  import PaymentDialog from './components/PaymentDialog/index'
  import Countdowner from '@/components/Countdowner'
  import RedPackage from '@/components/RedPackage'

  export default {
    components: {
      PaymentDialog,
      Countdowner,
      RedPackage,
      StatusInfo,
      PickupStoreInfo
    },
    data () {
      return {
        ORDER_STATE,
        ORDER_STATE_TEXT,
        la: null,
        ra: null,
        order: {},  //倒计时
        paymentDialogShowed: false,  //其他支付模块
        redPackageShow: false,  //摇一摇模块显示隐藏
        isRequestedFunction: false,  //摇一摇显示
        timers:299, //待支付订单倒计时
        timer:null,  //定时器
        showPageLoading: true //页面加载显示
      }
    },
    computed: {

      pickup(){
         let pickup=this.$store.state.pickup;
         return pickup
      },
      //倒计时
      hms() {
        let h = Math.floor(this.order.times / 3600)
        let m = Math.floor((this.order.times % 3600) / 60)
        let s = this.order.times % 60

        if (h > 99) {
          h = '99'
          m = '59'
          s = '59'
        } else {
          h = h < 10 ? `0${ h }` : `${ h }`
          m = m < 10 ? `0${ m }` : `${ m }`
          s = s < 10 ? `0${ s }` : `${ s }`
        }
        return { h, m, s }
      },

      /**
       * @description 支付方式文本
      */
      paymentCodeText() {
        if (this.order && this.order.paymentCode) {
          switch(this.order.paymentCode) {
            case 'weixinAppletPaymentPlugin':
              return '微信支付'
            case 'balancePaymentPlugin':
              return '会员卡支付'
            default:
              return '未知'
          }
        }
      },

      /**
       * @description 配送时间
      */
      deliveryRange() {
        if (this.order.deliveryStartTime && this.order.deliveryEndTime) {
          let [startDay, startTime] = this.order.deliveryStartTime.split(' ')
          let [endDay, endTime] = this.order.deliveryEndTime.split(' ')

          startTime = startTime.split(':').slice(0, 2).join(':')
          // endTime = endTime.split(':').slice(0, 2).join(':')

          if (startDay === endDay) {
            return `${ startDay } ${ startTime }-${ endTime }`
          } else {
            return `${ this.order.deliveryStartTime }+${ this.order.deliveryEndTime }`
          }
        }
      },

      deliveryRangeMD() {
        if (this.order.deliveryStartTime && this.order.deliveryEndTime) {
          let [startDay, startTime] = this.order.deliveryStartTime.split(' ')
          let [endDay, endTime] = this.order.deliveryEndTime.split(' ')

          let [sy, sm, sd] = startDay.split('-')
          let [ey, em, ed] = endDay.split('-')

          return `${ sm }月${ sd }日~${ em }月${ ed }日`
        }
      }
    },

     onLoad(e) {
      Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
      this.daojishi()
      if (e.id) {
        this.id = e.id
        this.getDetail({ orderId: e.id })
      }
      clearInterval(this.__timer)
      this.__timer = setInterval(() => {
        if(this.order.times >0) {
          this.$set(this.order,'times',this.order.times -=1)
        }
      }, 1000);
    },


    onUnload() {
      clearInterval(this.__timer)
    },

    methods: {
      /**
       * @description 待支付倒计时
      */
       daojishi(){
          let times=300
          let miao= 300
          let that =this
            clearInterval(that.timer);
          if(this.$store.state.runingtime>0){
            times = this.$store.state.runingtime
          }
          that.timer =  setInterval(() => {
            miao = --times
            that.timers=miao
            that.$store.commit('setRunTime',miao)
            if(miao==0){
               clearInterval(that.timer);
            }

          },1000)
        },


      copyOrderNO() {
        wx.setClipboardData({
          data: this.order.orderSn,
          success: () => wx.showToast({ title: '复制成功' }),
          fail: () => wx.showToast({ title: '复制失败', icon: 'none' })
        })
      },

       /**
     * @description 隐藏页面加载loading
     */
    hidePageLoading () {
      setTimeout(() => { //定时器避免关闭太快出现闪烁状态
        console.log('//关闭页面加载Loading')
        this.showPageLoading = false //关闭页面加载Loading
      },2000)

    },


      getDetail({ orderId }) {
        Api.order.detail({ orderId  })
        .then(res => {
          this.hidePageLoading()
          if (res.code === Api.CODES.SUCCESS) {
            this.order = res.data
            //支付有礼
          } else {
            wx.showToast({
              icon: 'none',
              title: res.message
            })
          }
        })
        .catch(e => console.log(e))
      },

      remind() {
        Api.order.delivery.remind({ orderId: this.order.orderId }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            wx.showToast({
              title: '已催单'
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      },

      del() {
        wx.showLoading({ title: '删除中' })
        Api.order.del({
          orderId: this.order.orderId
        }).then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            getApp().globalData.needUpdateOrderList = true
            wx.navigateBack()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
      },

      cancel() {
          wx.showLoading({ title: '取消中' })
          Api.order.cancel({
            orderId: this.order.orderId
          }).then(res => {
            wx.hideLoading()

            if (res.code === Api.CODES.FAILED) {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
              return false
            }

            if (res.code === Api.CODES.SUCCESS) {
              this.getDetail({ orderId: this.order.orderId })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
          })
          .catch(e => wx.hideLoading())
        },

        finish() {
          wx.showLoading({ title: '确认中' })
          Api.order.finish({
            orderId: this.order.orderId
          }).then(res => {
            wx.hideLoading()
            if (res.code === Api.CODES.SUCCESS) {
              this.getDetail({ orderId: this.order.orderId })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
          })
          .catch(e => wx.hideLoading())
        },

        onComplete(pwd) {
          this.__pay(this.order, pwd)
        },

        // 微信支付
        __pay(order, pwd) {
          wx.showLoading({ mask: true, title: '支付中' })
          Api.order.pay({
            paySn: order.paySn,
            paymentCode: order.paymentCode,
            paymentId: order.paymentId,
            paymentPasswd: pwd ? pwd : void(0)
          }).then(res => {
            if (res.code === Api.CODES.SUCCESS) {
              if (order.paymentCode === 'weixinAppletPaymentPlugin') {
                let params = JSON.parse(res.data.tocodeurl)
                wx.requestPayment({
                  ...params,
                  success: () => {
                    wx.showLoading({ mask: true, title: '请稍等' })

                  }
                })
              } else {
                wx.navigateTo({
                  url: `/pages/order/detail/main?id=${ order.orderId }`
                })
              }
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
              if (res.code === 5000000) {
                this.paymentDialogShowed = true
              }
            }
            wx.hideLoading()
          })
          .catch(() => wx.hideLoading())
        },

        pay() {
          if (this.order.paymentCode === 'balancePaymentPlugin') {
            this.paymentDialogShowed = true
          } else if (this.order.paymentCode === 'weixinAppletPaymentPlugin'){
            this.__pay(this.order)
          }
        },
  /**
   * des
   */
        applyReturns() {
          wx.navigateTo({
            url: `/pages/order/returngoods/main?id=${ this.order.orderId }`
          })
        },

        comment() {
          wx.navigateTo({
            url: `/pages/order/comment/main?id=${ this.order.orderId }`
          })
        },

        commentHistory() {
          wx.navigateTo({ url: `/pages/order/commenthistory/main?id=${ this.order.orderId }` })
        },

        showOrderCode(order) {
          wx.navigateTo({ url: `/pages/pickup/detail/main?id=${ this.order.orderId }` })
        },

        callRider() {
          wx.makePhoneCall({
            phoneNumber: this.order.riderPhone
          })
        },

        openLocation() {
          // @TODO: 经纬度信息
          wx.openLocation({
            latitude: +this.order.shippingStartLat,
            longitude: +this.order.shippingStartLon,
            // scale,
            name: this.order.receiverName,
            address: this.order.receiverAddress
          })
        }
      }
  }
</script>

<style>
  page {
    box-sizing: border-box;
    padding: 20rpx;
    background: #EEEEEE;
  }
</style>

<style lang="scss" scoped>

</style>
