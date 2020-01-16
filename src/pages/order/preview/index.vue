<template>
  <div>
    <pickup-store-info />
    <!-- <pickup-time /> -->
    <submit-goods-list :list="orderInfo.cartOrderVoList" />
    <CouponWrap :orderInfo="orderInfo" />
    <buyer-message v-model="buyerMessage " />
    <!-- 支付方式 -->
    <payways></payways>
    <price-info :orderInfo="orderInfo" />

    <footer-bar :orderAmount="orderInfo.orderAmount" @submit="submitOrder" />
    <payment-dialog :shown.sync="paymentDialogShowed" :amount="orderAmount" @complete="onComplete"></payment-dialog>

    <!-- 超库存弹窗-->
    <over-stock-popup
      :goods-list="orderInfo.limitCartOrderVoList"
      :show="isShowOverStockPopup"
      :effective-goods="orderInfo.cartOrderVoList"
    />
    <ComfirmStoreDialog :show.sync="comfirmDialogShowed" @comfirmPay="submitOrder" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api'
import Payways from './components/Payways'
import PaymentDialog from './components/PaymentDialog'
import ComfirmStoreDialog from './components/ComfirmStoreDialog'
import CouponWrap from './components/CouponWrap'
import overStockPopup from './components/overStockPopup'
import PickupStoreInfo from '../components/PickupStoreInfo'
import PickupTime from './components/PickupTime'
import SubmitGoodsList from './components/SubmitGoodsList'
import BuyerMessage from './components/BuyerMessage'
import PriceInfo from './components/PriceInfo'
import FooterBar from './components/FooterBar'
import { getCurrentRouter } from '@/utils'

export default {
  components: {
    Payways,
    PaymentDialog,
    overStockPopup,
    PickupStoreInfo,
    PickupTime,
    SubmitGoodsList,
    BuyerMessage,
    CouponWrap,
    PriceInfo,
    FooterBar,
    ComfirmStoreDialog
  },

  data() {
    return {
      buyerMessage: '', //买家留言
      orderInfo: {},
      isShowOverStockPopup: false, //是否显示超库存商品弹窗
      comfirmDialogShowed: false //确认门店的弹窗
    }
  },

  computed: {
    ...mapState(['storeId', 'shopDetail', 'selectCouponOfsubmitOrder'])
  },

  mounted() {
    Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
    this.getCheckoutData()
  },

  onUnload () {
    console.log('onUnload')
    this.$store.commit('setSubmitOrderCoupon',{}) //提交清空使用优惠券对象
  },

  watch: {
    selectCouponOfsubmitOrder: function () {
      console.log('selectCouponOfsubmitOrder')
      if(getCurrentRouter() == 'pages/coupon/select/main') {
        //只有选择优惠券页面组件选择优惠券才重新渲染数据
        this.getCheckoutData()
      }

    }
  },


  methods: {
    /**
     * @description  获取订单相关信息
     */
    getCheckoutData() {
      console.log('cartIds', this.$root.$mp.query)
      const cartIds = this.$root.$mp.query.cartIds
        ? this.$root.$mp.query.cartIds
        : '' //获取从上个页面组件传过来的购物车Id
      wx.showLoading({ mask: true })
      Api.cart
        .checkout({
          cartIds,
          storeId: this.storeId,
          deliveryType: 2, //配送方式： 1-同城配送  2-门店自提
          couponIds: this.selectCouponOfsubmitOrder.historysId //选择的优惠券系统编码
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.checkIsShowOverStockPopup(res.data.limitCartOrderVoList)
            this.orderInfo = res.data //保存相关的订单信息
          } else {
            wx.showModal({
              title: '提示',
              content: res.message || '该店铺没有此商品',
              showCancel: false,
              success: res => {
                wx.navigateBack()
              }
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
    },

    /**
     * @param {array} limitCartOrderVoList 超库存商品数组
     * @description 检测是否超库存
     */
    checkIsShowOverStockPopup(limitCartOrderVoList) {
      console.log('checkIsShowOverStockPopup', limitCartOrderVoList)
      if (limitCartOrderVoList && limitCartOrderVoList.length > 0) {
        this.isShowOverStockPopup = true //存在弹超库存商品弹窗
      }
    },

    submitOrder() {
      wx.showLoading({ mask: true, title: '提交中' })
      // 创建订单
      let form = {
        showPickUpTime: '',
        formId: '',
        cartIds: this.getSubmitOrderCartId(),
        orderMessages: this.buyerMessage,
        addressId: '',
        couponIds: this.selectCouponOfsubmitOrder.historysId, //选择的优惠券系统编码
        isPp: 0, //是否积分抵扣支付 0:否 1:是
        deliveryType: 2, //配送方式: 1-同城配送  2-门店自提
        paymentCode: 'weixinAppletPaymentPlugin', //支付方式: 1.weixinAppletPaymentPlugin 微信小程序支付 2.balancePaymentPlugin 余额支付
        storeId: this.storeId,
        activityGoodsId: '',
        goodsId: '',
        count: '',
        groupBuyActivityId: '',
        groupOrderId: ''
      }
      Api.order
        .submit(form)
        .then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            const order = res.data
            this.$store.dispatch('updateCartNum')
            this.$store.commit('setSubmitOrderCoupon',{}) //提交清空使用优惠券对象
            this.makeResultAfterSubmitOrder(order)
          } else {
            wx.showToast({
              title: res.message ? res.message : '服务器错误',
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
    },

    /**
     * @param {object} order 提交的订单
     * @description 提交订单后处理结果
     */
    makeResultAfterSubmitOrder(order) {
      if (order.resultPayCode == 2000001) {
        //使用了优惠券金额少于等于0，直接跳转支付成功界面
        wx.redirectTo({
          url: `/pages/order/payResult/main?id=${order.orderId}`
        })
      } else {
        this.pay(order) //拉起支付
      }
    },

    /**
     * @description 显示缺人门店弹窗
     */
    showComfirmDialog() {
      this.comfirmDialogShowed = true
    },

    pay(order, pwd) {
      wx.showLoading({ mask: true, title: '支付中' })
      Api.order
        .pay({
          paySn: order.orderPaySn,
          paymentCode: order.paymentCode,
          paymentId: order.paymentId,
          paymentPasswd: pwd ? pwd : void 0
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            // 微信支付

            let params = JSON.parse(res.data.tocodeurl)
            wx.requestPayment({
              ...params,
              success: () => {
                // 支付成功：延时以等待后端状态改变
                wx.showLoading({ mask: true, title: '请稍等' })
                setTimeout(() => {
                  wx.hideLoading()
                  wx.redirectTo({
                    url: `/pages/order/payResult/main?id=${order.orderId}`
                  })
                }, 3000)
              },
              fail: () => {
                // 取消订单：延时以等待后端状态改变
                wx.showLoading({ mask: true, title: '请稍等' })
                setTimeout(() => {
                  wx.hideLoading()
                  wx.redirectTo({
                    url: `/pages/order/detail/main?id=${order.orderId}`
                  })
                }, 3000)
              }
            })
          } else {
            wx.showToast({
              title: res.message ? res.message : '服务器错误',
              icon: 'none'
            })
          }
        })
        .catch(() => wx.hideLoading())
    },

    /**
     * @description 获取提交订单的购物车Id
     * @returns {string} 返回提交订单Id列表，逗号隔开
     */
    getSubmitOrderCartId() {
      if (!this.orderInfo.cartOrderVoList) return ''
      return this.orderInfo.cartOrderVoList.map(item => item.cartId).join(',')
    }
  }
}
</script>

<style>
page {
  background-color: #eeeeee;
  padding: 20rpx 20rpx 125rpx;
  box-sizing: border-box;
}
</style>

