<template>
  <div>
    <!-- 配送中 -->
    <div v-if="order.state === 30 && order.deliveryType === 1 && order.shippingCompany" class="order-map">
      <!-- @TODO: 经纬度信息 order.riderLng -->
      <map :longitude="order.riderLng" :latitude="order.riderLat" :markers="[{iconPath: '/static/images/markers.png',id: 0,latitude: order.riderLat,longitude: order.riderLng,width: 30, height: 30}]">
      </map>
      <cover-view class="order-countdown">
        <cover-view class="order-countdown__bg-left">
          <cover-view class="fill" :animation="la"></cover-view>
        </cover-view>
        <cover-view class="order-countdown__bg-right">
          <cover-view class="fill" :animation="ra"></cover-view>
        </cover-view>
        <cover-view class="order-countdown__bd">
          <cover-view class="order-countdown__title">{{hms.h}}:{{hms.m}}:{{hms.s}}</cover-view>
          <cover-view class="order-countdown__desc">送达倒计时</cover-view>
        </cover-view>
      </cover-view>
      <cover-view class="order-countdown-point"></cover-view>
    </div>

    <!-- 待支付、待配送、订单已关闭-->
    <div v-else>
      <div class="order-status bg-gradient">
        <!-- 待支付 -->
        <template v-if="order.state === 10">
          待支付<span v-if="true">({{timers}}秒后自动取消订单）</span>
        </template>
        <!-- 待配送 -->
        <template v-else-if="order.state === 20 || order.state === 21">
          <template v-if="order.deliveryType === 1">
            <div>
              待配送
              <div class="desc">预计{{ deliveryRange }}送达</div>
            </div>
          </template>
          <template v-else>
            <div>
              待提货
              <div class="desc">提货时间 ：{{  order.pickTime }}</div>
             
            </div>
          </template>
        </template>
        <template v-else-if="order.state === 30">
          <template v-if="order.deliveryType === 1">
            配送中
          </template>
          <template v-else>
            <div>
              待核销
              <div class="desc">提货时间:{{ deliveryRange }}<template v-if="order.orderType !=1 && order.orderType !=6">(期间未提货自动退款)</template></div>
            </div>
          </template>
        </template>
        <!-- 订单已关闭 -->
        <template v-else-if="order.state === 50">
          订单已关闭
        </template>
        <template v-else-if="order.state === 0 && !isAssemble">
          订单已取消
        </template>
        <template v-else-if="order.state === 0 && isAssemble">
          拼团失败
        </template>
        <!-- 订单已签收 改 交易成功 -->
        <template v-else-if="order.state === 40 || order.state === 49">
          交易成功
        </template>
        <template v-else-if="order.state === 59">
          售后中
        </template>
        <template v-else-if="order.state === 60">
          已售后
        </template>
        <template v-else-if="order.state === 15">
          拼团中
        </template>
        <!-- 交易成功 -->
        <template v-else-if="false">
          交易成功(已签收）
        </template>
      </div>

      <!-- if 配送 -->
      <div class="order-address" v-if="order.deliveryType === 1">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div>{{ order.receiverName }}&nbsp;&nbsp;{{ order.receiverMobile }}</div>
            <div class="desc">{{ order.receiverAddress }}</div>
          </div>
        </div>
      </div>

      <!-- else 自提 -->
      <div class="order-shop" @click="openLocation" v-else>
        <div class="weui-cell weui-cell_access" style="padding: 16rpx 25rpx;">
          <div class="weui-cell__bd">
            <div class="order-shop__title">
              <div class="weui-flex">
                <div class="weui-flex__item" v-show="false"></div>
                <div>提货店铺 {{ order.receiverName }}</div>
              </div>
            </div>
            <div class="order-shop__desc">{{ order.receiverAddress }}</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
    </div>

    <!-- 拼团商品列表 -->
    <div class="weui-panel goods-list-panel" v-if="isAssemble">
      <div class="weui-panel__bd">
        <navigator v-for="item in order.orderGoodsList"
          :key="item.goodsId"
          :url="'/pages/goods/detail/main?id=' + item.goodsId + '&activityId='+item.activityId"
          class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="item.goodsImage" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <!-- if 赠品 -->
            <div v-if="item.isPresentation && item.isPresentation != 2 " class="weui-media-box__title">
              <span class="goods-tag">赠品</span>
              {{ item.goodsName }}
            </div>
            <div v-else class="weui-media-box__title weui-media-box__title_total">
              {{ item.goodsName }}
              <div class="goods-total">
                ￥{{ item.onlinePrice * item.goodsNum }}
                <navigator v-if="item.refundState == 1 || item.refundState == 3" :url="'/pages/order/returndetail/main?id=' + item.refundId" @click.stop>
                  <button class="weui-btn" :plain="true" size="mini">售后</button>
                </navigator>
              </div>
            </div>

            <!-- 几人团 -->
            <div class="group-buy-bar" v-if="order.groupPartner">
              <span class="group-buy-bar__tag">{{ order.groupPartner }}人团</span>
            </div>

            <!-- else 赠品 -->
            <div class="weui-media-box__desc" v-if="!item.isPresentation || item.isPresentation == 2">
              <span >单价:￥{{ item.onlinePrice }}</span>
              <div class="goods-count goods-count_ih">数量: x{{ item.goodsNum }}</div>
            </div>
          </div>
        </navigator>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="weui-panel goods-list-panel" v-else>
      <div class="weui-panel__bd">
        <navigator v-for="item in order.orderGoodsList"
          :key="item.goodsId"
          :url="'/pages/goods/detail/main?id=' + item.goodsId"
          class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="item.goodsImage" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <!-- if 赠品 -->
            <div v-if="item.isPresentation && item.isPresentation != 2" class="weui-media-box__title">
              <span class="goods-tag">赠品</span>
              {{ item.goodsName }}
            </div>
            <div v-else class="weui-media-box__title weui-media-box__title_total">
              {{ item.goodsName }}
              <div class="goods-total">
                ￥{{ item.onlinePrice * item.goodsNum }}<span v-if="item.points">+积分{{item.points}}</span>
                <navigator v-if="item.refundState == 1 || item.refundState == 3" :url="'/pages/order/returndetail/main?id=' + item.refundId" @click.stop>
                  <buttom class="weui-btn" :plain="true" size="mini">售后</buttom>
                </navigator>
              </div>
            </div>


            <!-- else 赠品 -->
            <div class="weui-media-box__desc" v-if="!item.isPresentation || item.isPresentation == 2">
              <span >单价:￥{{ item.onlinePrice }}</span>
              <div class="goods-count goods-count_ih">数量: x{{ item.goodsNum }}</div>
            </div>
          </div>
        </navigator>
      </div>
    </div>





    <!-- 订单信息 -->
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">订单信息</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">下单时间：</div>
          <div class="weui-form-preview__value">{{ order.orderTime }}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">订单编号：</div>
          <div class="weui-form-preview__value">
            {{ order.orderSn }}
            <button :plain="true" type="default" @click="copyOrderNO">复制</button>
          </div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">支付方式：</div>
          <div class="weui-form-preview__value">{{ paymentCodeText }}</div>
        </div>
        <div class="weui-form-preview__item" v-if="order.redPacketAmount">
          <div class="weui-form-preview__label">
            <img src="/static/images/orderdetails_icon_redenvelopes@2x.png" class="redpack">
            {{ order.redPacketAmount }}元红包
          </div>
          <div class="weui-form-preview__value">-￥{{ order.redPacketAmount }}</div>
        </div>
        <div class="weui-form-preview__item" v-if="order.couponPrice">
          <div class="weui-form-preview__label">优惠券</div>
          <div class="weui-form-preview__value">-￥{{ order.couponPrice }}</div>
        </div>
        <!-- <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">配送费</div>
          <div class="weui-form-preview__value">￥{{ order.shippingFee }}</div>
        </div> -->
        <div class="weui-form-preview__item" v-if="order.pointNum">
          <div class="weui-form-preview__label">积分({{ order.pointNum }})</div>
          <div class="weui-form-preview__value">￥{{ order.pointPayAmount }}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">商品总价</div>
          <div class="weui-form-preview__value">￥{{ order.goodsAmount }}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label text-black">实际支付</div>
          <div class="weui-form-preview__value">￥{{ order.orderAmount }}</div>
        </div>
      </div>
    </div>



    <!-- 待配送、配送中 -->
    <template v-if="order.deliveryType === 1">
      <div v-if="order.state == 20 || order.state == 21 || order.state == 30 || order.state == 40 || order.state == 49"
        class="weui-cells weui-cells_no-border order-cells">
        <navigator
          :url="'/pages/order/progress/main?id=' + order.orderId"
          class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">订单进度</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
      </div>
      <!-- 配送中 -->
      <div v-if="order.state == 30 || order.state == 40 || order.state == 49" class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">配送信息</div>
            <div class="weui-form-preview__value">
              <!-- XXX: 骑手详情不用做 -->
              <div class="text-green" @click="callRider">
                联系骑手
                <img src="/static/images/orderdetails_icon_phone@2x.png" class="tel-icon">
              </div>
            </div>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">配送服务：</div>
            <div class="weui-form-preview__value">{{ order.shippingCompany || '乐家配送' }}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">配送骑手：</div>
            <!-- XXX: 投诉不用做 -->
            <div class="weui-form-preview__value">
              <div class="weui-cell__ft weui-cell__ft_in-access gray">
                {{ order.rider }}
              </div>
            </div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">支付方式：</div>
            <div class="weui-form-preview__value">{{ paymentCodeText }}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">配送地址：</div>
            <div class="weui-form-preview__value">
              <div class="text-black">
                {{ order.receiverName }}&nbsp;{{ order.receiverMobile }}
              </div>
              <div style="font-size: 28rpx; margin-top: -10rpx">
                {{ order.receiverAddress }}
              </div>
            </div>
          </div>
          <div class="weui-form-preview__item" v-if="order.orderMessage">
            <div class="weui-form-preview__label">买家留言：{{ order.orderMessage }}</div>
          </div>
        </div>
      </div>
    </template>


    <!-- 积分 -->
    <div v-if="(order.state == 40 || order.state == 49) && order.pointNum" class="weui-cells weui-cells_no-border">
      <div class="weui-cell">
        <div class="bonus-point">
          <span>积分</span>
          +{{ order.pointNum }}
        </div>
      </div>
    </div>
    <!-- Footer Start -->
    <!-- 待支付 -->
    <div class="footer-bar" v-if="order.state === 10">
      <button :plain="true" type="default" @click="cancel" v-if="order.orderType !=1">取消订单</button>
      <button :plain="true" type="primary" @click="pay">去支付</button>
      
    </div>

    <!-- 已关闭 -->
    <div class="footer-bar" v-else-if="order.state === 0 && !isAssemble">
      <button :plain="true" type="default" @click="del">删除订单</button>
    </div>

    <!-- 重新拼团-->
    <div class="footer-bar" v-else-if="order.state === 0 && isAssemble">
       <button type="primary" class="bg-gradient" @click="regroup">重新拼团</button>
    </div>

    <!-- 交易成功 -->
    <div class="footer-bar" v-else-if="order.state === 40">
      <button :plain="true" type="default" @click="del">删除订单</button>
      <button :plain="true" type="default" @click="applyReturns">申请售后</button>
      <button :plain="true" type="primary" v-if="order.evaluateState == 1" @click="commentHistory">历史评价</button>
      <button :plain="true" type="primary" v-else  @click="comment">评价</button>
    </div>
    <div class="footer-bar" v-else-if="order.state === 49">
      <button :plain="true" type="default" @click="del">删除订单</button>
      <button :plain="true" type="default" @click="applyReturns">申请售后</button>
      <button :plain="true" type="primary" @click="commentHistory">历史评价</button>
    </div>

    <template v-if="order.deliveryType === 1">
      <!-- 待配送 -->
      <div class="footer-bar" v-if="order.state === 20 || order.state === 21">
        <button :plain="true" type="default" @click="cancel" v-if="order.orderType !=1">取消订单</button>
      </div>
      <!-- 配送中 -->
      <div class="footer-bar" v-else-if="order.state === 30">
        <!-- @TODO: -->
        <button :plain="true" type="default" @click="remind">催单</button>
        <button :plain="true" type="primary" @click="finish">确认收货</button>
      </div>
    </template>
    <template v-else-if="order.deliveryType === 2">
      <!-- 待核销 -->
      <div class="footer-bar" v-if="order.state === 20 || order.state === 21 || order.state === 30">
        <template v-if="isAssemble">
          <button :plain="true" type="default" @click="applyReturns">申请售后</button>
        </template>
        <template v-else>
          <button :plain="true" type="default" @click="cancel" v-if="order.orderType !=1">取消订单</button> 
        </template>

        <button type="primary" class="bg-gradient" @click="showOrderCode">提货码</button>
      </div>
    </template>

    <payment-dialog
      :shown.sync="paymentDialogShowed"
      :amount="order.orderAmount"
      @complete="onComplete">
    </payment-dialog>

    <!-- <red-package :shown="redPackageShow" @on-close="handleCloseRedPackage"></red-package> -->
  </div>
</template>

<script>
  import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
  import PaymentDialog from '@/components/PaymentDialog'
  import Countdowner from '@/components/Countdowner'
  import RedPackage from '@/components/RedPackage'

  export default {
    components: {
      PaymentDialog,
      Countdowner,
      RedPackage
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
        isAssemble: false, //是否是拼团页面详情
        timers:299, //待支付订单倒计时
        timer:null,  //定时器

      }
    },
    computed: {

      pickup(){
         let pickup=this.$store.state.pickup;
         return pickup
      },

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
      },
      // 支付方式文本
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

      // 配送时间
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
    methods: {

      // 待支付
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
              // console.log(miao)
              that.timers=miao
              that.$store.commit('setRunTime',miao)
              // console.log(that.timers)
            if(miao==0){
               clearInterval(that.timer);
            }

          },1000)
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
       * @description 跳转拼团商品详情
       */
      regroup() {
        wx.navigateTo({ url: `/pages/goods/detail/main?id=${this.order.orderGoodsList[0].goodsId}&activityId=${this.order.orderGoodsList[0].activityId}` })
        },

      // 图形进度条
      setPercent(percent=100) {
        percent = Math.min(Math.max(0, percent), 100)

        if (!this._la) {
          this._la = wx.createAnimation({
            duration: 0,
            transformOrigin: '100% 50% 0'
          })
        }
        if (!this._ra) {
          this._ra = wx.createAnimation({
            duration: 0,
            transformOrigin: '0% 50% 0'
          })
        }

        let rdeg = Math.min((100 - percent) * 3.6, 180)

        this._ra.rotate(rdeg).step()
        this.ra = this._ra.export()

        if (percent <= 50) {
          let ldeg = (50 - percent) * 3.6
          this._la.rotate(ldeg).step()
          this.la = this._la.export()
        }
      },
      copyOrderNO() {
        wx.setClipboardData({
          data: this.order.orderSn,
          success: () => wx.showToast({ title: '复制成功' }),
          fail: () => wx.showToast({ title: '复制失败', icon: 'none' })
        })
      },

      getDetail({ orderId }) {
        wx.showLoading({ title: '加载中' })
        Api.order.detail({ orderId  })
        .then(res => {
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
        .then(() => wx.hideLoading())
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

      __pay(order, pwd) {
        wx.showLoading({ mask: true, title: '支付中' })
        Api.order.pay({
          paySn: order.paySn,
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
                  // 支付有礼
                  // this.redPackageShow = true
                  // this.shake()
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

      applyReturns() {
        var curHours = new Date().getHours()
        if(curHours >= 20) {
          return wx.showToast({
            title: '请在20:00前退款',
            icon: 'none'
          })
          return false
        }
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
      },

      shake () {
        let numX = 1 //x轴
        let numY = 1 // y轴
        let numZ = 0 // z轴
        // let stsw = true // 开关，保证在一定的时间内只能是一次，摇成功
        this.stsw = true // 开关，保证在一定的时间内只能是一次，摇成功
        // let positivenum = 0 //正数 摇一摇总数
        wx.onAccelerometerChange((res) => {  //小程序api 加速度计
          if (numX < res.x || numY < res.y) {  //个人看法，一次正数算摇一次，还有更复杂的
            this.positivenum++
            setTimeout(() => { this.positivenum = 0 },2000) //计时两秒内没有摇到指定次数，重新计算
          }
          if (numZ < res.z || numY < res.y) { //可以上下摇，上面的是左右摇
            this.positivenum++
            setTimeout(() => { this.positivenum = 0 }, 2000) //计时两秒内没有摇到指定次数，重新计算
          }
          if (this.positivenum == 2 && this.stsw){ //是否摇了指定的次数，执行成功后的操作
            this.stsw = false
            // console.log('摇一摇成功')
            Api.freeOrder.hasPayAward({
              orderId: this.order.orderId
            }).then(res => {
              this.isRequestedFunction = false
              this.redPackageShow = false
              wx.redirectTo({
                url: `/pages/free-order/free-order/main?orderId=${this.order.orderId}&activityId=${ res.data }`
              })
            })
            setTimeout(() => { 
              this.positivenum = 0 // 摇一摇总数，重新0开始，计算
              this.stsw = true
            },2000)
          }
        })
      },
        /**
       * @description 设置该页面类型是拼团页面
       */
      _setAssemblePageType () {
        this.isAssemble = true
      },

      /**
       * 关闭摇一摇红包
       */
      // handleCloseRedPackage () {
      //   this.redPackageShow = false
      //   setTimeout(() => {
      //     wx.hideLoading()
      //     wx.navigateTo({
      //       url: `/pages/order/detail/main?id=${ order.orderId }`
      //     })
      //   }, 1000)
      // }
    },

    onLoad(e) {
      console.log('提货',this.$store.state.pickup)
      let pickup=this.$store.state.pickup;

      this.daojishi()
      if (e.id) {
        this.id = e.id
        this.getDetail({ orderId: e.id })
      }
      if(e.type && e.type == 'assemble') {
        //如果是拼团页面过来的，设置页面类型是拼团页面详情
        this._setAssemblePageType()
      }
      clearInterval(this.__timer)
      this.__timer = setInterval(() => {
        if(this.order.times >0) {
          this.$set(this.order,'times',this.order.times -=1)
        }
      }, 1000);
    },

    onShow() {
      let app = getApp()
      if (app.globalData.orderCommentted) {
        delete app.globalData.orderCommentted
        this.getDetail({ orderId: this.id })
      }
    },

    onUnload() {
    clearInterval(this.__timer)
    }
  }
</script>

<style>
  page { background-color: #F5F5F5; padding-bottom: 120rpx; }
</style>

<style lang="scss" scoped>
  .group-buy-bar {
    &__tag{
      margin-left:10rpx;
      padding:0 10rpx;
      border-radius:4rpx;
      min-width:60rpx;
      text-align:center;
      font-size:22rpx;
      line-height:30rpx;
      background:#fff;
      color:#FF1414;
      border: 1px solid #FF1414;
    }
  }
  .order-status {
    height: 196rpx;
    padding: 0 30rpx;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    font-size: 36rpx;
    color: #fff;
    word-break: break-all;
    .desc {
      font-size: 28rpx;
     
    }
  }

  .order-address {
    .weui-cell {
      background-color: #fff;
      font-size: 30rpx;
      color: $text-black;
      .desc {
        font-size: 26rpx;
        color: $text-gray;
      }
    }
  }

  .order-shop {
    background-color: #fff;
    &__title {
      font-size: 26rpx;
      color: $text-black;
      word-break: break-all;
    }
    &__desc {
      text-align:left;
      font-size: 24rpx;
      color: $text-gray;
      margin-left:114rpx
    }
  }

  .weui-form-preview {
    margin-top: 20rpx;
    // padding-bottom: 100rpx;
    &:before, &:after {
      display: none;
    }
    .redpack {
      vertical-align: -6rpx;
      width: 27rpx;
      height: 41rpx;
    }
    &__label,
    &__value {
      font-size: 30rpx;
    }
    &__value {
      button {
        display: inline-block;
        vertical-align: middle;
        margin-left: 8rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;
        line-height: 44rpx;
        border-radius: 22rpx;
        font-size: 26rpx;
      }
    }
    &__hd {
      line-height: inherit;
      padding-bottom: 0;
      .weui-form-preview__label {
        font-size: 34rpx;
        color: $text-black;
      }
      &:after { display: none; }
    }
    // &__bd {
    //   padding-top: 10rpx;
    //   padding-bottom: 10rpx;
    // }
  }

  .order-cells {
    margin-top: 20rpx;
    .weui-cell {
      &__bd {
        font-size: 34rpx;
        color: $text-black;
      }
    }
  }

  .order-map {
    position: relative;
    padding-top: 24rpx;
    padding-bottom: 80rpx;
    map {
      width: 100%;
      height: 502rpx;
    }
  }

  .order-countdown {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    background-color: #DEDEDE;
    box-shadow: 0 0 20rpx 4rpx rgba(184, 184, 184, 0.57);
    width: 242rpx;
    height: 242rpx;
    border-radius: 121rpx;
    &__bg {
      &-left {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 121rpx;
        .fill {
          transform-origin: right center;
        }
      }
      &-right {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 121rpx;
        .fill {
          transform-origin: left center;
        }
      }
      &-left,
      &-right {
        .fill {
          width: 100%;
          height: 100%;
          background-color: #0EDABD;
        }
      }
    }
    &__bd {
      position: absolute;
      top: 10rpx;
      left: 10rpx;
      width: 222rpx;
      height: 222rpx;
      border-radius: 111rpx;
      background-color: #fff;
      text-align: center;
    }
    &__title {
      margin-top: 70rpx;
      font-size: 36rpx;
      color: $text-black;
    }
    &__desc {
      line-height: 50rpx;
      font-size: 28rpx;
      color: $text-black;
    }
    &-point {
      position: absolute;
      left: 50%;
      bottom: 226rpx;
      transform: translateX(-50%);
      border-radius: 12rpx;
      width: 24rpx;
      height: 24rpx;
      background-color: #0EDABD;
      box-shadow: 0 6rpx 4rpx rgba(147, 147, 147, 0.57);
    }
  }



  .footer-bar {
    padding: 15rpx 30rpx;
    text-align: right;
    background-color: #fff;
    button {
      display: inline-block;
      min-width: 184rpx;
      line-height: 60rpx;
      vertical-align: middle;
      border: 1px solid!important;
      border-radius: 30rpx;
      & + button {
        margin-left: 24rpx;
      }
    }
  }

  .tel-icon {
    vertical-align: -2rpx;
    width: 37rpx;
    height: 33rpx;
  }

  .bonus-point {
    height: 100rpx;
    font-size: 32rpx;
    color: #F40909;
    span {
      border-radius: 10rpx;
      border: 2rpx solid #FF9800;
      color: #FF9800;
      padding: 0 16rpx;
    }
  }

  .return-info {
    .weui-cell__ft {
      color: $text-black;
    }
    &__hd {
      .weui-cell {
        &__bd,
        &__ft {
          font-size: 34rpx;
          font-weight: 700;
        }
        &__ft {
          color: #F3181F;
        }
      }
    }

    &__sep {
      &:before {
        display: block;
        left: 0;
        border-color: #ECECEC;
      }
    }
    &__combine {
      padding-bottom: 0;
    }
    &__progress {
      padding-left: 10rpx;
      padding-right: 10rpx;
      text-align: center;
      &__icon {
        margin: 0 auto 36rpx;
        border-radius: 16rpx;
        width: 32rpx;
        height: 32rpx;
        background-color: $text-gray;
        &_checked {
          width: 44rpx;
          height: 44rpx;
          border-radius: 22rpx;
          margin-top: -6rpx;
          margin-bottom: 30rpx;
          position: relative;
          background-color: transparent;
          icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      &__route {
        position: absolute;
        top: 14rpx;
        left: -45%;
        right: 55%;
        height: 4rpx;
        background-color: $text-gray;
      }
      &__title {
        font-size: 26rpx;
        color: $text-black;
      }
      &__desc {
        font-size: 22rpx;
        color: $text-gray;
        line-height: 50rpx;
      }

      .weui-flex {
        width: 100%;
        &__item {
          position: relative;
          &.active {
            .return-info__progress {
              &__icon,
              &__route {
                background-color: #0FD7C0;
              }
            }
          }
        }
      }
    }
  }

  .goods-total {
    text-align: right;
    // max-width: 87rpx;
    width: 83rpx;
    height: 35rpx;
    white-space:nowrap;
  }
  .goods-total .buttom {
    border:1rpx solid #ccc;
    margin-top: 4rpx;
    border-color: #999;
    color: #999;
    font-size: 24rpx;
    line-height: 1.5;
    padding: 0 20rpx;
  }
</style>
