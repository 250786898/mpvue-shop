<template>
  <form>
    <!-- Tab -->
    <div class="tabs" v-if=" deliveryStatus == 2 ">
      <div class="weui-flex">
       <!-- <div class="weui-flex__item" :class="{ active: deliveryType === 3 }" @click="deliveryType = 3" v-if="deliveryStatus == 3">同城配送</div> -->
       <div class="weui-flex__item" :class="{ active: deliveryType === 2 }" @click="deliveryType = 2" v-if="deliveryStatus == 2">门店自提</div>
      </div>
    </div>

    <!-- Tab 同城配送 -->
    <!-- <div v-if="deliveryType === 3">
      <div class="address-area">
        <navigator url="/pages/address/list/main?mode=select" class="weui-cell weui-cell_access" v-if="tempOrder && tempOrder.address">
          <div class="weui-cell__bd">
            <div>{{ tempOrder.address.name }}   {{ tempOrder.address.mobPhone }}</div>
            <div class="desc" v-if="tempOrder.address.areaInfo">{{ tempOrder.address.areaInfo }}</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access">
            切换地址
          </div>
        </navigator>
        <navigator v-else url="/pages/address/form/main?op=select"
          class="address-area__empty-btn"
          hover-class="address-area__empty-btn_hover">
          + 新增收货地址
        </navigator>
        <img class="address-area__border" src="/static/images/order_dividingline@2x.png">
      </div>

      <div class="weui-panel goods-list-panel">
        <div class="weui-panel__hd" @click="distributionTimeRangePickerShowed = true">
          送达时间
          <div class="weui-cell__ft weui-cell__ft_in-access">
            <template v-if="distributionSelected.startTime && distributionSelected.endTime">
              {{ distributionSelected.dataTime }} {{ distributionSelected.startTime }}-{{ distributionSelected.endTime }}
            </template>
            <template v-else>选择送达时间</template>
          </div>
        </div>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg" v-for="item in result.cartOrderVoList"
            :key="item.goodsId">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="item.goodsImage" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title">{{ item.goodsName }}</div>
              <div class="weui-media-box__desc" style="top:-30rpx;">
                <span class="goods-price">￥{{ item.goodsPayPrice }}</span>
                <div class="goods-count">数量: ×{{ item.goodsNum || 1 }}</div>
              </div>
              <div class="weui-media-box__desc" v-if="item.normalNum" style="top:-30rpx;">
                <span class="goods-price">￥{{ item.onlinePrice }}</span>
                <div class="goods-count">数量: ×{{ item.normalNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
<!-- :url="'/pages/order/selectshop/main?activityId=' + result.cartOrderVoList[0].activityId" -->
    <!-- Tab 门店自提 -->
    <div v-else >
      <div class="address-area">
        <div v-if="result.cartOrderVoList"  class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">
            <template v-if="tempOrder.store">
              <div>提货门店：{{ tempOrder.store.storeName }}</div>
              <div v-if="tempOrder.store.storeAddress" class="desc">
                {{ tempOrder.store.storeAddress }}
              </div>
              <!-- <div class="desc" v-if="tempOrder.address.areaInfo">{{ tempOrder.address.areaInfo }}</div> -->
            </template>
          </div>
          <!-- <div cla ss="weui-cell__ft weui-cell__ft_in-access">
            切换店铺
          </div> -->
        </div>
        <img class="address-area__border" src="/static/images/order_dividingline@2x.png">
      </div>

      <div class="weui-panel goods-list-panel">
        <!-- <div class="weui-panel__hd" @click="selfHelpTimeRangePickerShowed = true"> -->
          <div class="weui-panel__hd">
          <img src="/static/images/details_icon_clock@2x.png">
          提货时间
          <div class="time">{{showPickUpTime}}</div>
          <!-- <div class="weui-cell__ft weui-cell__ft_in-access">
            <template v-if="selfHelpSelected.startTime && selfHelpSelected.endTime">
             {{ selfHelpSelected.dataTime }} {{ selfHelpSelected.startTime }}-{{ selfHelpSelected.endTime }}
            </template>
            <template v-else>选择提货时间</template>
          </div> -->
        </div>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg" v-for="item in result.cartOrderVoList"
            :key="item.goodsId">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="item.goodsImage" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title">{{ item.goodsName }}</div>
               <div class="weui-media-box__desc">
                <span class="goods-price">￥{{ item.goodsPayPrice }}</span>
                <div class="goods-count">数量: ×{{ item.goodsNum || 1 }}</div>
              </div>
              <div class="weui-media-box__desc" v-if="item.normalNum">
                <span class="goods-price">￥{{ item.onlinePrice }}</span>
                <div class="goods-count">数量: ×{{ item.normalNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="weui-cells form-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd">买家留言：</div>
        <div class="weui-cell__bd">
          <input type="text" v-model.trim="orderMessages" placeholder="（选填）给卖家留言，最多100个字" maxlength="100">
        </div>
      </div>
    </div>

    <!-- 结算预览 -->
    <lj-form-preview  :items="bills" :deliveryType="deliveryType" :activityType="activityType" :list="list" @tapCouponItem="tapCouponItem" :couponPrice="result.couponPrice"></lj-form-preview>

    <!-- 支付方式 -->
    <payways title="支付方式" ref="payways" v-model="paymentCode" :pp.sync="isPp" :rewardPoint="result.rewardPoint"> -->
    </payways> 

    <!-- 底部 -->
    <div class="footer-bar">
      <span>合计:</span><span class="price">￥{{ orderAmount }}</span>
      <form report-submit @submit="uploadFormId">
        <button type="primary" class="radius bg-gradient" form-type="submit" @click="submit">提交订单</button>
      </form>
    </div>

    <!-- 送货上门时间选择 -->
    <!-- <time-range-picker
      title="选择送达时间"
      :shown.sync="distributionTimeRangePickerShowed"
      :data="distributionTimeRange"
      empty-tip="不在配送时间范围内"
      v-model="distributionSelected">
    </time-range-picker> -->

    <!-- 门店自取时间选择 -->
    <time-range-picker
      title="选择提货时间"
      :shown.sync="selfHelpTimeRangePickerShowed"
      :data="selfHelpTimeRange"
      empty-tip="不在自提时间范围内"
      v-model="selfHelpSelected">
    </time-range-picker>

    <payment-dialog :shown.sync="paymentDialogShowed" :amount="orderAmount" @complete="onComplete"></payment-dialog>
  </form>
</template>

<script>
  import { mapState } from 'vuex'
  import { formatDate } from '@/utils/'
  import { Api } from '@/http/api'
  import config from '@/config'
  import LjFormPreview from '@/components/LjFormPreview'
  import Payways from '@/components/Payways'
  import PaymentDialog from '@/components/PaymentDialog'
  import TimeRangePicker from '@/components/TimeRangePicker'

  let today = new Date()
  const TODAY_DATE = formatDate(today)
  const TOMORROW_DATE = formatDate(new Date(+today + 86400000))

  export default {
    components: {
      LjFormPreview,
      Payways,
      PaymentDialog,
      TimeRangePicker
    },

    data () {
      return {
        formId: '',
        paymentDialogShowed: false,
        payParams: null,
        order: null,
        cartIds: '',
        deliveryType: 2,
        bills: [
          // { label: '优惠券', value: '' },
          // { label: '运费', value: '' }
        ],
        distributionTimeRangePickerShowed: false,
        distributionTimeRange: [],
        distributionSelected: {
          // day: '今天',
          // startTime: '13:00',
          // endTime: '14:00'
        },

        selfHelpTimeRangePickerShowed: false,
        selfHelpTimeRange: [],
        selfHelpSelected: {},

        orderMessages: '',
        paymentCode: 'weixinAppletPaymentPlugin',
        isPp: false,

        result: {},
        list : [],
        couponId: '',
        activityType: 2,
        deliveryStatus: 0,
        teamOrder: '',
        positivenum: 0,
        stsw: true,
        storeList: [],
        activityGoodsIdOftimes: '' //时间接口。单独购买调用
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
      showPickUpTime () { //显示的提货时间
        const hours = new Date().getHours()
        let showPickUpTime = ''
        if(hours > 20) {
          //超过20：00设置成显示后天提货
          showPickUpTime = this.getDateStr(2)
        }else{
          showPickUpTime = this.getDateStr(1)
        }
        return showPickUpTime
      }
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
         this.teamOrder= ''
         this.storeList= []
         this.activityGoodsIdOftimes= '' //时间接口。单独购买调用
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

      getCheckoutData(storeId) {
        // 获取订单信息
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
          deliveryType: this.deliveryType,
          couponIds: this.couponId
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
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
        this.bills[0].value = `-￥${ (this.result.couponPrice || 0).toFixed(2) }`
        this.bills[1].value = `￥${ (this.result.shippingFee || 0).toFixed(2) }`
      },

      onComplete(password) {
        if (this.order) {
          this.pay(this.order, password)
        }
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
                    if(this.result.cartOrderVoList[0].activityType == 30) {
                      wx.redirectTo({
                        url: `/pages/order/teamdetail/main?orderId=${order.orderId}`
                      })
                    }else {
                      wx.redirectTo({
                        url: `/pages/order/detail/main?id=${ order.orderId }`
                      })
                    }
                  }, 3000)
                },
                complete: () => {
                  wx.showLoading({ mask: true, title: '请稍等' })
                  // 延时以等待后端状态改变
                  setTimeout(() => {
                    wx.hideLoading()
                    if(this.result.cartOrderVoList[0].activityType == 30) {
                      wx.redirectTo({
                        url: `/pages/order/teamdetail/main?orderId=${order.orderId}`
                      })
                    }else {
                      wx.redirectTo({
                        url: `/pages/order/detail/main?id=${ order.orderId }`
                      })
                    }
                  }, 3000)
                }
              })
            } else {
              if(this.result.cartOrderVoList[0].activityType == 30) {
                wx.redirectTo({
                  url: `/pages/order/teamdetail/main?orderId=${order.orderId}`
                })
              }else {
                wx.redirectTo({
                  url: `/pages/order/detail/main?id=${ order.orderId }`
                })
              }
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
                formId: this.formId,
                cartIds: this.cartIds,
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
                  if(this.result.cartOrderVoList[0].activityType == 30) {
                    // wx.redirectTo({
                    //   url: `/pages/order/teamdetail/main?groupOrderId=${this.result.groupOrderId || ''}&orderId=${order.orderId}`
                    // })
                  }else {
                    wx.redirectTo({
                      url: `/pages/order/detail/main?id=${ res.orderId }`
                    })
                  }
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

      // getTimeRange(storeId) {
      //   Api.cart.times({ storeId: storeId || this.storeId , activityGoodsId: this.result.cartOrderVoList[0].activityGoodsId || this.activityGoodsIdOftimes })
      //   .then(res => {
      //     if (res.code === Api.CODES.SUCCESS) {
      //       this.distributionTimeRange = this.timeRangeMapper(res.data)
      //       this.selfHelpTimeRange = this.timeRangeMapper(res.data, false)
      //     }
      //   })
      // },

      findStoreByStoreId (storeList,storeId) {
        console.log('findStoreByStoreId',storeList)
        for (let i=0; i<storeList.length; i++) {
           if(storeList[i].storeId == storeId) {
            return storeList[i]
          }
        }
       
      },

        /**
         * @description 获取明天后天时间
         */
       getDateStr(dayCount){
        if(null == dayCount){
          dayCount = 0;
        }
        var dd = new Date();
        dd.setDate(dd.getDate()+dayCount);//设置日期
        var m = dd.getMonth()+1;//获取当前月份的日期
        m = m <10 ? `0${m}` : m 
        var d = dd.getDate();
        d = d <10 ? `0${d}` : d
        return `${m}月${d}日`
      },

      /**
       * @description 
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
    },

    watch: {
      deliveryType(value) {
        this.getCheckoutData()
      }
    },

     onLoad(e) {
      // let teamOrder = wx.getStorageSync('teamOrder') || ''
      // if(teamOrder) {
      //   this.teamOrder = teamOrder
      //   this.deliveryStatus = this.teamOrder.deliveryStatus
      //   this.deliveryType = this.teamOrder.deliveryType
      //   this.activityGoodsIdOftimes = this.teamOrder.activityGoodsIdOftimes
      //   wx.removeStorageSync('teamOrder')
      // }
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

    }
  }
</script>

<style>
  page {
    background-color: #F3F3F3;
    padding-bottom: 120rpx;
  }
  .address-top {
    margin-top: 40rpx;
  }
</style>

<style lang="scss" scoped>

  .time{
    // margin-right:20rpx;
    float: right;
  }

  .tabs {
    margin-top: 40rpx;
    .weui-flex {
      background-color: #fff;
      &__item {
        font-size: 34rpx;
        text-align: center;
        line-height: 100rpx;
        background-color: #E5E5E5;
        &.active {
          color: $theme-color-light;
          background-color: transparent;
        }
        &:first-child {
          border-top-right-radius: 20rpx;
        }
        &:last-child {
          border-top-left-radius: 20rpx;
        }
      }
    }
  }

  .address-area {
    padding-top: 30rpx;
    background-color: #fff;
    &__border {
      display: block;
      width: 100%;
      height: 8rpx;
    }
    &__empty-btn {
      margin: 50rpx auto;
      width: 386rpx;
      line-height: 80rpx;
      border: 4rpx dashed $text-gray;
      text-align: center;
      font-size: 30rpx;
      &_hover {
        border-color: $theme-color-light;
        color: $theme-color-light;
      }
    }
    .weui-cell {
      padding-top: 30rpx;
      padding-bottom: 30rpx;
      &__bd {
        font-size: 34rpx;
        > .desc {
          font-size: 30rpx;
          color: $text-gray;
        }
      }
      &__ft {
        font-size: 28rpx;
        color: $theme-color-light;
        &:after {
          border-color: $theme-color-light;
        }
      }
    }
  }

  /** TODO: 通用化考虑 */
  .goods-list-panel {
    .weui-panel {
      &__hd {
        padding-top: 20rpx;
        font-size: 28rpx;
        color: $text-black;
        > img {
          margin-right: 8rpx;
          vertical-align: middle;
          width: 24rpx;
          height: 24rpx;
        }
        &:after { left: 0; }
        .weui-cell__ft_in-access {
          float: right;
          font-size: 28rpx;
          color: $theme-color-light;
          &:after {
            border-color: $theme-color-light;
          }
        }
      }
    }
    .weui-media-box__title {
      margin-bottom: 0;
      height: 100rpx;
    }
  }
  .member-only {
    line-height: 56rpx;
    font-size: 32rpx;
    color: #FFA442;
    font-weight: 700;
    &__tag {
      font-weight: 400;
      display: inline-block;
      margin-left: 10rpx;
      padding-left: 16rpx;
      padding-right: 16rpx;
      height: 36rpx;
      line-height: 36rpx;
      border-radius: 20rpx;
      background-color: #FFA442;
      font-size: 20rpx;
      color: #fff;
      vertical-align: middle;
    }
  }

  .goods-row-item__tb {
    
    .primary { font-size: 28rpx; }
    .goods-count {
      line-height: 30rpx;
      top: auto!important;
      bottom: 0!important;
    }
  }

  .form-cells {
    margin-top: 20rpx;
    &:before,
    &:after {
      display: none;
    }
    .weui-cell {
      &__hd {
        color: $text-black;
        font-size: 28rpx;
      }
      &__bd input {
        font-size: 28rpx;
      }
    }
  }

  .footer-bar {
    padding: 15rpx 30rpx;
    background-color: #fff;
    // border-top: 1rpx solid #DEDEDE;
    text-align: right;
    // background-color: #DEDEDE;
    z-index: 10;

    span {
      font-size: 34rpx;
      font-weight: 700;
      color: $text-black;
      vertical-align: middle;
      line-height: 80rpx;
      &.price {
        color: $text-red;
      }
    }

    button {
      margin-left: 40rpx;
      display: inline-block;
      line-height: 80rpx;
      border-radius: 40rpx;
      width: 220rpx;
      vertical-align: middle;
    }
  }

  .timerange-picker {
    position: fixed;
    z-index: 11;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    &__hd {
      text-align: center;
      line-height: 100rpx;
      font-size: 30rpx;
      border-bottom: 1rpx solid #E7E7E7;
    }
    &__bd {
      height: 476rpx;
      display: -webkit-flex;
      display: flex;
    }
    &__aside {
      width: 150rpx;
      background-color: #F3F3F3;
      &__item {
        font-size: 30rpx;
        text-align: center;
        line-height: 100rpx;
        color: $text-gray;
        &.active {
          background-color: #fff;
          color: $text-black;
        }
      }
    }
    &__mainer {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      .weui-cell {
        position: relative;
        padding-top: 28rpx;
        padding-bottom: 28rpx;
        &__bd,
        &__ft {
          font-size: 28rpx;
          color: $text-black;
        }
        &.active {
          .weui-cell {
            &__bd,
            &__ft {
              color: $theme-color-light;
            }
          }
          &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 56rpx;
            height: 56rpx;
            background-image: -webkit-linear-gradient(top right, #10D4C6, #10D4C6 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0));
            background-image: linear-gradient(top right, #10D4C6, #10D4C6 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0));
          }
        }
        icon {
          position: absolute;
          right: 4rpx;
          top: 4rpx;
          z-index: 2;
        }
      }
    }
  }
</style>
