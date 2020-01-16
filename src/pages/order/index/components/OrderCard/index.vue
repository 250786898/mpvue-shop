<template>
  <div class="card" @click="tabCard">
    <div class="card-header">
      <div class="order-date">{{item.orderTime}}</div>
      <div class="order-state">
        <span class="wait-pickup" v-if="item.state == 20">待提货</span>
        <span class="wait-pickup" v-if="item.state == 10">待付款</span>
        <span  v-if="item.state == 0">已取消</span>
        <span  v-if="item.state == 40">已提货</span>
      </div>
    </div>
    <div class="card-main">
      <div class="goods-list">
        <div class="goods-item" v-for="(src, srcIndex) in item.goodsImags" v-bind:key="srcIndex">
          <img :src="src" class="goods-img" mode="aspectFit" v-if="srcIndex < 4">
        </div>

      </div>
      <div class="card-main-right">
        <div class="goods-num">共{{item.goodsNum}}件</div>
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order-right-icon.png" class="right-icon">
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-content">
        <div class="cencel-times">
          <!-- 订单将于<span class="times">300</span>秒后自动取消 -->
        </div>
        <div class="total-price">
           <span class="total-title">合计:</span>
           <OnlinePrice :price="item.payment" :color="'#333333'" :signSize="22" :beforeSize="32" :afterSize="32" :isBlod="true" />
        </div>
      </div>
      <div class="btn-group" v-if="item.state == 20 || item.state == 10">
        <!-- <button type="default" class="btn" v-if="item.state == 10" @click="cancelOrder">取消订单</button> -->
        <button type="primary" class="btn" v-if="item.state == 10" @click.stop="payOrder">立即付款</button>
        <button type="primary" plain class="btn" v-if="item.state == 20" @click.stop="showOrderCode">提货码</button>
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
import { Api } from '@/http/api'
export default {
  components: {
    OnlinePrice
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {

    /**
     * @description 点击订单卡片跳转详情
     */
    tabCard () {
      wx.navigateTo({
        url: `/pages/order/detail/main?id=${this.item.orderId}`
      })
    },

    /**
     * @description 通用操作promise
     */
    wrapOpPromise(promise, title) {
      wx.showLoading({ title })
      return promise.then(res => {
        wx.hideLoading()
        if (res.code === Api.CODES.SUCCESS) {
          // this.reload()
          this.$emit('refreshOrder')
        } else {
          wx.showToast({ title: res.message, icon: 'none' })
        }
      })
      .catch(e => wx.hideLoading())
    },

     payOrder() {
        wx.showLoading({ mask: true, title: '支付中' })
          Api.order.pay({
          paySn: this.item.paySn,
          paymentCode: this.item.paymentCode,
          paymentId: this.item.paymentId,
          paymentPasswd: void(0)
        }).then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          let params = JSON.parse(res.data.tocodeurl)
          wx.requestPayment({
            ...params,
            success: () => {
              wx.showLoading({ mask: true, title: '请稍等' })
              setTimeout(() => {
                wx.hideLoading()
                wx.redirectTo({
                  url: `/pages/order/detail/main?id=${ this.item.orderId }`
                })
              }, 3000)
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
     * @description 取消订单
     */
    cancelOrder() {
      this.wrapOpPromise(Api.order.cancel({ orderId: this.item.orderId }), '取消中')
    },

    /**
     * @description 到提货码页面组件
     */
    showOrderCode(order) {
      wx.navigateTo({ url: `/pages/pickup/detail/main?id=${ this.item.orderId }` })
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  background: #FFFFFF;
  border-radius: 10rpx;
  padding: 0 28rpx 0 20rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
  &-header{
    height: 89rpx;
    line-height: 89rpx;
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    border-bottom: 2rpx solid rgba(204, 204, 204, 0.3);
    .order-state{
      .wait-pickup{
        color: #FF0000;
        margin-right: 10rpx;
      }
    }
  }
  &-main{
    padding: 30rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2rpx solid rgba(204, 204, 204, 0.3);
    .goods-list{
      display: flex;
      .goods-img{
        width: 112rpx;
        height: 112rpx;
        margin-right: 10rpx;
      }
    }
    &-right{
      color: #717171;
      font-size: 28rpx;
      display: flex;
      align-items: center;
      .right-icon{
        width: 12rpx;
        height: 21rpx;
        margin-left: 28rpx;
      }
    }
  }
  &-footer{
    &-content{
      display: flex;
      justify-content: space-between;
      padding: 30rpx 0 37rpx;
      font-size: 28rpx;
      .cencel-times{
        color: #999999;
        font-size: 28rpx;
        .times{
          color: #FF0000;
        }
      }
      .total-price{
        display: flex;
        align-items: flex-end;
      }
    }
    .btn-group{
      padding-bottom: 32rpx;
      display: flex;
      justify-content: flex-end;
      .btn{
        width:174rpx;
        height:58rpx;
        line-height: 58rpx;
        border-radius:10rpx;
        display: inline-block;
        margin-left: 22rpx;
        font-size: 28rpx;
      }
    }
  }
}
</style>
