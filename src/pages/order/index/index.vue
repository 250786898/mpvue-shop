<template>
  <div>
    <div class="fixed-top">
      <lj-tabs :tabs="tabs" v-model="activeIndex" @change="onChange"></lj-tabs>
    </div>
    <div class="fixed-top__holder"></div>
    <!-- 空值 -->
    <div v-if="!list.length && !loading" class="empty-tip">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/myOrder_bg@2x.png">
      <div class="empty-tip__text">暂时没有订单喔~</div>
    </div>

    <div v-if="list.length">
      <div class="weui-panel order-panel" v-for="order in list" :key="order.orderId">
        <div class="weui-panel__hd">
          {{ order.orderTime }}
          <span style="margin-left:16rpx;" v-if="order.state === 50">订单关闭</span>
          <span v-else-if="order.state === 0">订单已取消</span>
          <span v-else-if="order.state === 10">待付款</span>
          <span v-else-if="order.state === 20 || order.state === 21">
            <!-- <template v-if="order.deliveryType === 1">待配送</template>
            <template v-else>待核销</template> -->
           待提货
          </span>
          <span v-else-if="order.state === 30">
            <template v-if="order.deliveryType === 1">待收货</template>
            <template v-else>待核销</template>
          </span>
          <span v-else-if="order.state === 40 || order.state === 49">交易成功</span>
          <span v-else-if="order.state === 59">售后中</span>
          <span v-else-if="order.state === 60">已售后</span>
        </div>
        <div class="weui-panel__bd">
          <navigator :url="'/pages/order/detail/main?id=' + order.orderId" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <img :src="src" v-for="(src, srcIndex) in order.goodsImags" mode="aspectFit">
              <!-- <img src="https://wx4.sinaimg.cn/mw690/9b60d56cly1fyi5udqoxrj21240qon2w.jpg" mode="aspectFill"> -->
            </div>
            <div class="weui-cell__ft weui-cell__ft_in-access">
              共{{ order.goodsNum }}件
            </div>
          </navigator>
        </div>
        <div class="weui-panel__ft">
          <div class="weui-cell order-panel__total">
            <div class="weui-cell__bd">
              <!-- @TODO: 目前订单没有自动关闭 -->
              <!--
              <template v-if="order.state === ORDER_STATE.UNPAID">
                订单将于<span class="text-red">10分钟</span>后自动关闭
              </template>
              -->
            </div>
            <div class="weui-cell__ft">
              共{{ order.goodsNum }}件 合计：
              <span class="text-red">￥{{ order.payment }}</span>
              <span class="text-red" v-if="order.points">+积分{{ order.points }}</span>
            </div>
          </div>

          <div class="weui-cell order-panel__buttons">
            <div class="weui-cell__bd"></div>
            <div class="weui-cell__ft">
              <!-- 0:  已取消;
              10: 待付款;
              20: 待发货+待拣货;
              21: 待物流提货+待核销;
              30: 待收货+配送中;
              40: 交易完成;
              50: 已关闭;
              59: 售后中;
              60: 已售后;
              31：待提货；新加
              -->

              <!-- 待付款 -->
              <template v-if="order.state === 10">
                <!-- <button :plain="true" type="default" @click="cancel(order)">取消订单</button> -->
                <button type="primary" class="bg-gradient" @click="pay(order)">立即付款</button>
              </template>
              <!-- 交易成功，未评价 -->
              <template v-else-if="order.state === 40">
                <!-- <button :plain="true" type="default" @click="del(order)">删除订单</button> -->
                <!-- <button :plain="true" type="primary" v-if="order.evaluateState == 1" @click="commentHistory(order)">
                  历史评价
                  <span class="weui-badge weui-badge_dot"></span>
                </button>
                <button :plain="true" type="primary" v-else @click="comment(order)">评价</button> -->
              </template>
              <!-- 交易成功，已评价 -->
              <template v-else-if="order.state === 49">
                <!-- <button :plain="true" type="default" @click="del(order)">删除订单</button> -->
                <!-- <button :plain="true" type="primary" @click="commentHistory(order)">
                  历史评价
                  <span class="weui-badge weui-badge_dot"></span>
                </button> -->
              </template>
              <!-- 待发货 -->
              <template v-else-if="order.state === 20 || order.state === 21">
                <template v-if="order.deliveryType == 1">
                  <!-- <button :plain="true" type="default" @click="cancel(order)">取消订单</button> -->
                </template>
                <template v-else>
                  <!-- <button :plain="true" type="default" @click="cancel(order)">取消订单</button> -->
                  <button type="primary" class="bg-gradient" @click="showOrderCode(order)">提货码</button>
                </template>
              </template>
              <!-- 待收货 -->
              <template v-else-if="order.state === 30">
                <template v-if="order.deliveryType == 1">
                  <button type="primary" class="bg-gradient" @click="finish(order)">确认收货</button>
                </template>
                <template v-else>
                  <button :plain="true" type="default" @click="cancel(order)">取消订单</button>
                  <button type="primary" class="bg-gradient" @click="showOrderCode(order)">提货码</button>
                </template>
              </template>
              <!-- 待配送（无可用操作） -->
              <!-- 订单关闭 -->
              <template v-else-if="order.state === 0">
                <!-- <button :plain="true" type="default" @click="del(order)">删除订单</button> -->
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <loading v-if="list.length && !allLoaded"></loading>
    <div v-if="list.length && allLoaded" class="empty-tip" style="padding: 40rpx 0">
      <div class="empty-tip__text">没有更多了...</div>
    </div>

    <payment-dialog
      :shown.sync="paymentDialogShowed"
      :amount="payingOrder.payment"
      @complete="onComplete">
    </payment-dialog>
  </div>
</template>

<script>
  import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
  import LjTabs from '@/components/LjTabs'
  import Loading from '@/components/Loading'
  import PaymentDialog from '@/components/PaymentDialog'

  const PAGE_SIZE = 10

  export default {
    components: {
      LjTabs,
      Loading,
      PaymentDialog
    },

    data () {
      return {
        ORDER_STATE,
        ORDER_STATE_TEXT,
        activeIndex: -1,

        tabs: [
          {
            status: -1,
            title: '全部'
          },
          {
            status: 10,
            title: '待付款'
          },
          // {
          //   status: 20,
          //   title: '待配送',
          //   deliveryType: 1
          // },
          {
            status: 31,
            title: '待提货',
            deliveryType: 1
          },
          {
            status: 40,
            title: '已提货'
          },
          // {
          //   status: 31,
          //   title: '待核销',
          //   deliveryType: 2
          // }
        ],
        pageNumber: 1,
        loading: false,
        allLoaded: false,
        list: [],

        paymentDialogShowed: false,
        payingOrder: {}
      }
    },
    onLoad(){
      console.log(this. getList())

    },

    methods: {
      getList() {
        this.loading = true
        Api.order.list({
          pageNumber: this.pageNumber,
          pageSize: PAGE_SIZE,
          orderStatus: this.tabs[this.activeIndex].status,
          deliveryType: this.tabs[this.activeIndex].deliveryType
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.list = [...this.list, ...res.data.map(item => ({
              ...item,
              goodsImags: item.goodsImags ? item.goodsImags.split(',').slice(0, 4) : []
            }))]
            this.allLoaded = res.data.length < PAGE_SIZE
          }
        })
        .catch(e => console.log(e))
        .then(() => {
          this.loading = false
          wx.stopPullDownRefresh()
        })
      },

      onChange() {
        this.reload()
      },

      reload() {
        console.log('9999',this.tabs[this.activeIndex].status)
        this.pageNumber = 1
        this.list = []
        this.allLoaded = false
        this.getList()
      },

      onComplete(password) {
        if (this.payingOrder) {
          this.__pay(this.payingOrder, password)
        }
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
                  setTimeout(() => {
                    wx.hideLoading()
                    wx.navigateTo({
                      url: `/pages/order/detail/main?id=${ order.orderId }`
                    })
                  }, 1000)
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

      pay(order) {
        if (order.paymentCode === 'balancePaymentPlugin') {
          this.payingOrder = order
          this.paymentDialogShowed = true
        } else if (order.paymentCode === 'weixinAppletPaymentPlugin'){
          this.__pay(order)
        }
      },

      wrapOpPromise(promise, title) {
        wx.showLoading({ title })
        return promise.then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            this.reload()
          } else {
            wx.showToast({ title: res.message, icon: 'none' })
          }
        })
        .catch(e => wx.hideLoading())
      },

      cancel({ orderId }) {
        this.wrapOpPromise(Api.order.cancel({ orderId }), '取消中')
      },

      del({ orderId }) {
        this.wrapOpPromise(Api.order.del({ orderId }), '删除中')
      },

      finish({ orderId }) {
        this.wrapOpPromise(Api.order.finish({ orderId }), '确认中')
      },

      comment(order) {
        wx.navigateTo({ url: `/pages/order/comment/main?id=${ order.orderId }` })
      },

      commentHistory(order) {
        wx.navigateTo({ url: `/pages/order/commenthistory/main?id=${ order.orderId }` })
      },

      showOrderCode(order) {
        wx.navigateTo({ url: `/pages/pickup/detail/main?id=${ order.orderId }` })
      }
    },

    onLoad(e) {
      console.log('onLoad',e.status)
      if (e.status) {
        this.activeIndex = this.tabs.findIndex(item => item.status == e.status)
      } else {
        this.activeIndex = 0
      }
      this.reload()
    },

    onShow() {
      let { globalData } = getApp()
      if (globalData.needUpdateOrderList) {
        this.reload()
        delete globalData.needUpdateOrderList
      }
    },

    onReachBottom() {
      if (this.allLoaded || this.loading) return
      this.pageNumber++
      this.getList()
    },

    onPullDownRefresh() {
      this.reload()
    }
  }
</script>

<style>
  page { background-color: #F4F4F4;padding-left:24rpx; }
</style>

<style lang="scss" scoped>
  .order-panel {
    &:before, &:after {
      display: none;
    }
    .weui-panel {
      &__hd {
        font-size: 28rpx;
        position: relative;
        color: $text-black;
        &:before {
          left: 20rpx !important;
          right: 20rpx !important;
          border-color: #DEDEDE;
          content: " ";
          position: absolute;
          top: 0;
          height: 1rpx;
        }
        &:after{
          left: 20rpx !important;
          right: 20rpx !important;
        }
        span {
          float: right;
          color: #E62026;
        }
      }
      &__bd {
        .weui-cell {
          padding-top: 30rpx;
          padding-bottom: 30rpx;
          &__bd {
            img {
              vertical-align: middle;
              width: 112rpx;
              height: 112rpx;
              & + img {
                margin-left: 8rpx;
              }
            }
          }
          &__ft {
            font-size: 28rpx;
            color: $text-black;
          }
        }
      }
      &__ft {
        position: relative;
        padding-bottom: 20rpx;
        &:before {
          content: " ";
          position: absolute;
          left: 20rpx;
          top: 0;
          right: 20rpx;
          height: 1rpx;
          border-bottom: 1rpx solid #DEDEDE;
        }
      }
    }
    &__total {
      padding-bottom: 0;
      font-size: 28rpx;
      .weui-cell__ft {
        color: $text-black;
      }
    }
    &__buttons {
      padding-top: 0;
      padding-bottom: 0;
      &:before { display: none; }
      button {
        margin-top: 20rpx;
        position: relative;
        display: inline-block;
        vertical-align: top;
        line-height: 54rpx;
        border-radius: 30rpx;
        font-size: 28rpx;
        min-width: 174rpx;
        overflow: visible;
        &[type=default] {
          border-color: $text-gray;
          color: $text-gray;
        }
        & + button {
          margin-left: 20rpx;
        }
        &.bg-gradient {
          line-height: 58rpx;
          padding-left: 15px;
          padding-right: 15px;
        }
        .weui-badge {
          position: absolute;
          top: -8rpx;
          right: 20rpx;
        }
      }
    }
  }
  .fixed-top {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    &__holder {
      height: 88rpx;

    }
  }
</style>
