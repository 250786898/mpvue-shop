<template>
  <div>
    <pickup-store-info />
     <!-- <pickup-time /> -->
    <submit-goods-list :list="result.cartOrderVoList" />
    <buyer-message />
    <!-- 支付方式 -->
    <payways title="支付方式" ref="payways" v-model="paymentCode" :pp.sync="isPp" :rewardPoint="result.rewardPoint"></payways>
    <footer-bar :orderAmount="orderAmount" @submit="submit" />
    <payment-dialog :shown.sync="paymentDialogShowed" :amount="orderAmount" @complete="onComplete"></payment-dialog>
    <over-stock-popup :goods-list="result.limitCartOrderVoList" :show="isShowOverStockPopup" />


  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { formatDate } from '@/utils/'
  import { Api } from '@/http/api'
  import config from '@/config'
  import Payways from './components/Payways'
  import PaymentDialog from './components/PaymentDialog'
  import overStockPopup from './components/overStockPopup'
  import PickupStoreInfo from './components/PickupStoreInfo'
  import PickupTime from './components/PickupTime'
  import SubmitGoodsList from './components/SubmitGoodsList'
  import BuyerMessage from './components/BuyerMessage'
  import FooterBar from './components/FooterBar'

  let today = new Date()
  const TODAY_DATE = formatDate(today)
  const TOMORROW_DATE = formatDate(new Date(+today + 86400000))

  export default {
    components: {
      Payways,
      PaymentDialog,
      overStockPopup,
      PickupStoreInfo,
      PickupTime,
      SubmitGoodsList,
      BuyerMessage,
      FooterBar
    },

    data () {
      return {
        cartIds: '',
        orderMessages: '',
        paymentCode: 'weixinAppletPaymentPlugin', //支付方式
        isPp: false,
        result: {},
        isShowOverStockPopup: false //是否显示超库存商品弹窗
      }
    },

    computed: {
      ...mapState(['storeId', 'tempOrder','location']),
      orderAmount() {
        if (this.result) {
          if (this.isPp) {
            return this.result.orderAmount - this.result.rewardPointPrice
          } else {
            return this.result.orderAmount
          }
        } else {
          return 0
        }
      },
    },

     onLoad(e) {
      Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
      this.cartIds = e.cartIds
      this.getCheckoutData()
          if(e.storeId) {
            this.$bus.$on('shopChange', e => {
              this.getCheckoutData(e.storeId)
              // this.getTimeRange(e.storeId)
            })
          }
      this._setDefaultAddress()  //设置默认第一个门店地址
    },

    onUnload() {
      this.$store.commit('clearTempOrder')
      this.order = null
      this.$bus.$off('shopChange')
      this.initData()

    },

    methods: {



      initData () {
        this.formId = ''
         this.paymentDialogShowed = false
         this.payParams =null
         this.order=null
         this.cartIds= ''
         this.deliveryType= 1
         this.bills= [
          // { label: '优惠券', value: '' },
          // { label: '运费', value: '' }
        ],
         this.distributionTimeRangePickerShowed= false
         this.distributionTimeRange=[]
         this.distributionSelected={
          // day: '今天',
          // startTime: '13:00',
          // endTime: '14:00'
        }

         this.selfHelpTimeRangePickerShowed= false
         this.selfHelpTimeRange= []
         this.selfHelpSelected= {}
         this.orderMessages= ''
         this.paymentCode= 'weixinAppletPaymentPlugin'
         this.isPp= false

         this.result= {}
         this.list = []
         this.couponId= ''
         this.activityType= 1
         this.deliveryStatus= 0
         this.teamOrder= ''   //订单信息
         this.storeList= []   //门店信息
      },

      tapCouponItem (id){
        this.couponId = id
        this.getCheckoutData()
      },

      uploadFormId: function (e) {
        this.formId = e.target.formId
      },

      getMyCouponList(storeId) {
        this.list = []
        let goodsAmountJson = []
        goodsAmountJson = this.result.cartOrderVoList.map(item => {
          return {
            goodsId: item.goodsId,
            goodsNum: item.goodsNum,
            goodsAmount: item.goodsPayAmount
          }
        })

        Api.cart.getCoupons({
          storeId: storeId || this.storeId,
          goodsAmountJson: JSON.stringify(goodsAmountJson)
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.list = res.data
            // this.list = res.data.couponList.map(item => {
            //   return {
            //     ...item
            //   }
            // })
          }
        })
      },
    /**
     * @description  获取订单信息
     */
      getCheckoutData(storeId) {
        wx.showLoading({ mask: true })
        if(this.cartIds == 0 ) {
          this.$store.dispatch('addToActivity', {
            ...this.teamOrder,
            deliveryType: this.deliveryType
          })
          .then(res => {
            if (res.code == Api.CODES.SUCCESS) {
              this.handleData(res.data, this.storeId)
            } else if(res.code != 0) {
              wx.showModal({
                title: '提示',
                content:res.message || '服务器错误',
                showCancel: false,
                success: () => {
                   wx.navigateBack({ })
                }
              })
            }
          })

          .catch(e => console.log(e))
          .then(() => wx.hideLoading())
          return false
        }
        console.log('this.storeId',this.storeId)
        Api.cart.checkout({
          cartIds: this.cartIds,
          storeId:  this.storeId,
          deliveryType: 2,
          couponIds: this.couponId
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.checkIsShowOverStockPopup(res.data.limitCartOrderVoList)
            this.handleData(res.data, storeId)
          } else {
            wx.showModal({
                title: '提示',
                content:res.message || '该店铺没有此商品',
                showCancel: false,
                success: (res) => {
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
      checkIsShowOverStockPopup (limitCartOrderVoList) {
        console.log('checkIsShowOverStockPopup',limitCartOrderVoList)
        if(limitCartOrderVoList && limitCartOrderVoList.length > 0) {
          this.isShowOverStockPopup = true //存在弹超库存商品弹窗
        }
      },

      handleData(data, storeId) {
        this.result = data
        // this.getTimeRange()
        this.getMyCouponList(storeId)
        // 设置收货地址
        console.log('this.result.storeId',this.result)
        if (this.result.address) {

          this.$store.commit('setTempOrder', {
            address: this.result.address,
            store: {
               ...this.tempOrder.store,
              storeName: this.result.storeName,
              storeId: this.result.storeId,
            }
          })
        }

        if(this.result.cartOrderVoList[0].activityType == 30) {
          this.activityType = 0
        }
        // this.bills[0].value = `-￥${ (this.result.couponPrice || 0).toFixed(2) }`
        // this.bills[1].value = `￥${ (this.result.shippingFee || 0).toFixed(2) }`
      },

      onComplete(password) {
        if (this.order) {
          this.pay(this.order, password)
        }
      },

      /**
       * @description 获取提交订单的购物车Id
       * @returns {string} 返回提交订单Id列表，逗号隔开
       */
      getSubmitOrderCartId () {
        if (!this.result.cartOrderVoList) return ''
        return this.result.cartOrderVoList
          .map(item => item.cartId)
          .join(',')
      },

      pay(order, pwd) {
        wx.showLoading({ mask: true, title: '支付中' })
        Api.order.pay({
          paySn: order.orderPaySn,
          paymentCode: order.paymentCode,
          paymentId: order.paymentId,
          paymentPasswd: pwd ? pwd : void(0)
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            // 微信支付
            if (order.paymentCode === 'weixinAppletPaymentPlugin') {
              let params = JSON.parse(res.data.tocodeurl)
              wx.requestPayment({
                ...params,
                success: () => {
                  wx.showLoading({ mask: true, title: '请稍等' })
                  // 延时以等待后端状态改变
                  setTimeout(() => {
                    wx.hideLoading()
                    wx.redirectTo({
                      url: `/pages/order/detail/main?id=${ order.orderId }`
                    })
                  }, 3000)
                },
                complete: () => {
                  wx.showLoading({ mask: true, title: '请稍等' })
                  // 延时以等待后端状态改变
                  setTimeout(() => {
                    wx.hideLoading()
                    wx.redirectTo({
                      url: `/pages/order/detail/main?id=${ order.orderId }`
                    })
                  }, 3000)
                }
              })
            } else {
              wx.redirectTo({
                url: `/pages/order/detail/main?id=${ order.orderId }`
              })
            }
          } else {
            if (res.code === 5000000) {
              wx.showModal({
                title: '提示',
                content:res.message ? res.message : '支付密码错误，请重试',
                showCancel: false,
                success: () => {
                  this.paymentDialogShowed = true
                }
              })
            } else {
              wx.showToast({
                title: res.message ? res.message : '服务器错误',
                icon: 'none'
              })
            }
          }
          wx.hideLoading()
        })
        .catch(() => wx.hideLoading())
      },
    /**
     * @description  支付方式
     */
      submit() {
        new Promise((_resolve, _reject) => {
          if (this.paymentCode === 'balancePaymentPlugin') {
            if (this.orderAmount > this.$refs.payways.balance) {
              wx.showModal({
                title: '提示',
                content: '余额不足，请换一种支付方式',
                confirmText: '微信支付',
                success: res => {
                  if (res.confirm) {
                    this.paymentCode = 'weixinAppletPaymentPlugin'
                    this.submit()
                  }
                }
              })
              return _reject()
            }
            // 检查是否已设置密码
            Api.user.checkSetPayPwd().then(res => {
              if (res.code === Api.CODES.SUCCESS) {
                if (!res.data.isSetPayPwd) {
                  wx.showModal({
                    content: '设置乐享卡、积分支付密码，保护交易安全',
                    confirmColor: '#0FC4BE',
                    success: res => {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '/pages/password/set/main'
                        })
                      }
                    }
                  })
                  _reject()
                } else {
                  _resolve()
                }
              } else {
                wx.showToast({
                  title: res.message ? res.message : '服务器错误',
                  icon: 'none'
                })
              }

            })
          } else {
            _resolve()
          }
        }).then(() => {
          // 创建订单
          new Promise((resolve, reject) => {
            if (this.order) {
              resolve(this.order)
            } else {
              let form = {
                showPickUpTime:this.showPickUpTime,
                formId: this.formId,
                cartIds: this.getSubmitOrderCartId(),
                orderMessages: this.orderMessages,
                addressId: this.tempOrder.address && this.tempOrder.address.addressId,
                couponIds: this.couponId ||this.result.couponId, // @TODO: 优惠券
                isPp: +this.isPp,
                deliveryType: this.deliveryType,
                paymentCode: this.paymentCode,
                storeId: this.storeId,//this.tempOrder.store && this.tempOrder.store.storeId,
                activityGoodsId: this.result.cartOrderVoList[0].activityGoodsId ? this.result.cartOrderVoList[0].activityGoodsId : '',
                goodsId: this.result.cartOrderVoList[0].goodsId ? this.result.cartOrderVoList[0].goodsId :'',
                count: this.result.cartOrderVoList[0].goodsNum ? this.result.cartOrderVoList[0].goodsNum : '',
                groupBuyActivityId: this.result.cartOrderVoList[0].activityId ? this.result.cartOrderVoList[0].activityId : '',
                groupOrderId: this.result.groupOrderId || '',
              }
              console.log(form,22)

            //开启什么配送 0都不开启 1=都开启  2-只门店自提 3-只同城配送
            // private Integer deliveryStatus;    checkout接口加了这个参数

              // 配送
              if (this.deliveryType === 3) {
                // 如果没有地址
                if (!this.tempOrder.address) {
                  return wx.showToast({
                    title: '请先新增收货地址',
                    icon: 'none'
                  })
                }
                if (!this.distributionSelected.startTime || !this.distributionSelected.endTime) {
                  return wx.showToast({
                    title: '请选择送达时间',
                    icon: 'none'
                  })
                }

                let { day, startTime, endTime } = this.distributionSelected

                day = day === '今天' ? TODAY_DATE :
                  day === '明天' ? TOMORROW_DATE :
                  day

                form.deliveryStartTime = `${ day } ${ startTime }`
                form.deliveryEndTime = `${ day } ${ endTime }`
              // 自提
              } else if(this.deliveryType === 2) {
                // 如果没有地址
                if (!this.tempOrder.store) {
                  return wx.showToast({
                    title: '请选择自提店铺',
                    icon: 'none'
                  })
                }
                // if (!this.selfHelpSelected.startTime || !this.selfHelpSelected.endTime) {
                //   return wx.showToast({
                //     title: '请选择提货时间' ,
                //     icon: 'none'
                //   })
                // }

                let { day, startTime, endTime } = this.selfHelpSelected
                day = day === '今天' ? TODAY_DATE :
                  day === '明天' ? TOMORROW_DATE :
                  day

                form.deliveryStartTime = `${ day } ${ startTime }`
                form.deliveryEndTime = `${ day } ${ endTime }`
              }

              wx.showLoading({ mask: true, title: '提交中' })
              // 创建订单
              Api.order.submit(form).then(res => {
                wx.hideLoading()
                if (res.code === Api.CODES.SUCCESS) {
                  this.order = res.data
                  this.$store.dispatch('updateCartNum')
                  resolve(this.order)
                } else {
                  wx.showToast({
                    title: res.message ? res.message : '服务器错误',
                    icon: 'none'
                  })
                }
              })
              .catch(e => wx.hideLoading())
            }
          })
          .then(order => {
            if (this.paymentCode === 'balancePaymentPlugin') {
              this.paymentDialogShowed = true
            } else if (this.paymentCode === 'weixinAppletPaymentPlugin') {
              this.pay(order)
            } else {
              wx.showToast({
                title: '不支持的支付方式',
                icon: 'none',
                success: () => {
                  wx.redirectTo({
                    url: `/pages/order/detail/main?id=${ res.orderId }`
                  })
                }
              })
            }
          })
        })
      },

      timeRangeMapper(source, enableDesc=true) {
        return source.map(item => ({
          title: item.deliveryTime,
          ranges: item.dateList ?
            item.dateList.map(dl => ({
              startTime: dl.deliveryStartTime,
              endTime: dl.deliveryEndTime,
              desc: enableDesc ?
                (dl.deliveryPrice ? `${ dl.deliveryPrice }元配送费` : '') :
                ''
            }))
            : []
        }))
      },




      findStoreByStoreId (storeList,storeId) {
        console.log('findStoreByStoreId',storeList)
        for (let i=0; i<storeList.length; i++) {
           if(storeList[i].storeId == storeId) {
            return storeList[i]
          }
        }
      },


      /**
       * @description 获取门店信息
       */
      _setDefaultAddress() {
        wx.showLoading()
        Api.index.storeList({
          latitude: this.location.latitude,
          longitude: this.location.longitude,
          activityId: ''
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            if(res.data.storeList.length > 0) {
              console.log('storeId',this.storeId)
              console.log('storeList',res.data)
              const storeList = res.data.storeList
              const storeItem = this.findStoreByStoreId(storeList,this.storeId)
              console.log('storeItem',storeItem)
              this.$set(this.tempOrder,'store',storeItem)
              this.storeList = res.data.storeList
            }
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      }
    }
  }
</script>

<style>
  page {
    background-color: #F3F3F3;
    padding-bottom: 120rpx;
    padding-left:24rpx;
  }
</style>

