<template>
  <div>
    <div class="fixed-top">
      <lj-tabs :tabs="tabs" v-model="activeIndex" @change="onChange" :flex="true"></lj-tabs>
    </div>
    <div class="fixed-top__holder"></div>
    <!-- 空值 -->
    <div v-if="!list.length && !loading" class="empty-tip">
      <img src="/static/images/myOrder_bg@2x.png">
      <div class="empty-tip__text">暂时没有订单喔~</div>
    </div>

    <div v-if="list.length">
      <div class="weui-panel order-panel" v-for="order in list" :key="order.orderId">
        <div class="time">
          <span>{{order.createTime}}</span>
          <span class="status">
            <template v-if="order.orderType == 0">
              拼团失效
            </template>
            <template v-else-if="order.orderType == 1">
              拼团中
            </template>
            <template v-else-if="order.orderType == 2">
              已成功
            </template>
            <template v-else-if="order.orderType == 3">
              拼团失效
            </template>
            <template v-else-if="order.orderType == 4 ">
              订单交易完成
            </template>
          </span>
        </div>
        <div class="goods" @click="commentHistory(order)">
          <img :src="order.goodsImage" alt="">
          <div class="goods-nr">
            <div class="title">
              {{order.goodsName}}
            </div>
            <div class="num">
              {{order.openNumber}}人团
            </div>
            <div class="money">
              ￥{{order.activityPrice}}<span>￥{{order.onlinePrice}}</span>
            </div>
          </div>
        </div>
        <div class="btn" v-if="order.orderType == 0">
          <button type="button" name="button" @click="refundTeam(order)">重新拼团</button>
        </div>
        <div class="btn" v-if="order.orderType == 2">
          <button type="button" name="button" @click="showOrderCode(order)">提货码</button>
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
  import { mapState } from 'vuex'
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
            status: 0,
            title: '全部'
          },
          {
            status: 1,
            title: '拼团中'
          },
          {
            status: 2,
            title: '已成功'
          },
        ],
        pageNumber: 1,
        loading: false,
        allLoaded: false,
        list: [],

        paymentDialogShowed: false,
        payingOrder: {}
      }
    },

    methods: {
      getList() {
        this.loading = true
        Api.user.myGroupOrder({
          pageNumber: this.pageNumber,
          pageSize: PAGE_SIZE,
          groupType: this.tabs[this.activeIndex].status,
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.list = [...this.list, ...res.data.myOrderInfo.map(item => ({
              ...item,
              // goodsImags: item.goodsImags ? item.goodsImags.split(',').slice(0, 4) : []
            }))]
            this.allLoaded = res.data.myOrderInfo.length < PAGE_SIZE
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
        wx.navigateTo({ url: `/pages/order/teamdetail/main?orderId=${ order.orderId }&groupOrderId=${order.groupOrderId}` })
      },

      showOrderCode(order) {
        wx.navigateTo({ url: `/pages/pickup/detail/main?id=${ order.orderId }` })
      },

      refundTeam(order) {
        wx.navigateTo({ url: `/pages/group/index/main?id=${ order.activityId }&storeId=${order.storeId}` })
      }
    },

    onLoad(e) {
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
  page { background-color: #F4F4F4; }
</style>

<style lang="scss" scoped>
  .order-panel{
    margin-top: 10px;
    background: #fff;
    .time{
      height: 45px;
      line-height: 45px;
      margin: 0 10px;
      border-bottom: 1px solid #DEDEDE;
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      display: flex;
      span{
        flex:0 0 auto;
      }
      .status{
        margin-left: auto;
        color: #E62026;
      }
    }
    .goods{
      margin: 0 10px;
      border-bottom: 1px solid #DEDEDE;
      display: flex;
      padding: 15px 0;
      img{
        width: 90px;
        height: 90px;
        flex:0 0 90px;
      }
      .goods-nr{
        flex: 1;
        margin-left: 20px;
        min-width: 0;
        .title{
          font-size: 16px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .num{
          display: inline-block;
          vertical-align: top;
          border:1px solid #F84040;
          border-radius:4px;
          font-size: 13px;
          color: #F84040;
          padding: 0 6px;
        }
        .money{
          color: #FC2626;
          font-size: 16px;
          span{
            margin-left: 10px;
            color: #999999;
            font-size: 12px;
            text-decoration:line-through;
          }
        }
      }
    }
    .btn{
      padding: 10px;
      text-align: right;
      button{
        display: inline-block;
        vertical-align: middle;
        width:87px;
        height:29px;
        line-height:29px;
        background:linear-gradient(90deg,rgba(18,205,207,1),rgba(12,225,179,1));
        border-radius:14px;
        font-size: 14px;
        color: #FFFFFF;
        font-weight: bold;
      }
    }
  }
</style>
