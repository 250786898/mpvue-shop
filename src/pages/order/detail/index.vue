<template>
  <div class="container">
    <!-- 0已取消 10待付款 20待提货 40已提货 -->
    <pay-bar :orderId="this.order.orderId" v-if="order.state == 10"  @cancelOrder="cancelOrder" @payOrder="payOrder" />

    <status-info :status="order.state" v-if="order.state != 10" />

    <PickupStoreInfo :storeInfo="order" />

    <goods-info :orderInfo="order" />

    <order-info :orderInfo="order" />

    <fixed-footer :orderId="this.order.orderId" :orderstate="order.state" v-if="order.state > 10"  />

    <payment-dialog
      :shown.sync="paymentDialogShowed"
      :amount="order.orderAmount"
      @complete="onComplete">
    </payment-dialog>

    <page-loading :show="showPageLoading"/>
  </div>
</template>

<script>
  import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
  import StatusInfo from './components/StatusInfo'
  import PayBar from './components/PayBar'
  import PickupStoreInfo from './components/PickupStore'
  import GoodsInfo from './components/GoodsInfo'
  import OrderInfo from './components/OrderInfo'
  import FixedFooter from './components/FixedFooter'
  import PaymentDialog from './components/PaymentDialog/index'

  export default {
    components: {
      PayBar,
      PaymentDialog,
      StatusInfo,
      GoodsInfo,
      PickupStoreInfo,
      OrderInfo,
      FixedFooter
    },
    data () {
      return {
        order: {},  //订单信息
        paymentDialogShowed: false,  //其他支付模块
        showPageLoading: true //页面加载显示
      }
    },


    onLoad(e) {
      Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
      if (e.id) {
        this.id = e.id
        this.getDetail({ orderId: e.id })
      }

    },

    methods: {
      /**
       * @description 获取订单详情
       */
      getDetail({ orderId }) {
        Api.order.detail({ orderId  })
        .then(res => {
          this.hidePageLoading()
          if (res.code === Api.CODES.SUCCESS) {
            this.order = res.data
          } else {
            wx.showToast({
              icon: 'none',
              title: res.message
            })
          }
        })
        .catch(e => console.log(e))
      },


      /**
       * @description 取消订单
       */
      cancelOrder () {
        console.log('cancelOrder')
        wx.showLoading({ title: '取消中' })
        Api.order.cancel({
          orderId: this.order.orderId
        }).then(res => {
          wx.hideLoading()
            this.getDetail({ orderId: this.order.orderId })
          if (res.code === Api.CODES.FAILED) {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
            return false
          }

          if (res.code === Api.CODES.SUCCESS) {

          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
      },

      /**
       * @description 支付订单
       */
      payOrder() {
        wx.showLoading({ mask: true, title: '支付中' })
        Api.order.pay({
          paySn: this.order.paySn,
          paymentCode: this.order.paymentCode,
          paymentId: this.order.paymentId,
          paymentPasswd: void(0)
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            let params = JSON.parse(res.data.tocodeurl)
            wx.requestPayment({
              ...params,
              success: () => {
                wx.showLoading({ mask: true, title: '请稍等' })

              }
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
          wx.hideLoading()
        })
        .catch(() => wx.hideLoading())
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

      /**
       * @description 删除订单
       */
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
      }

  }
}
</script>

<style>
  page {
    box-sizing: border-box;
    padding: 20rpx 20rpx 154rpx;
    background: #EEEEEE;
  }
</style>
