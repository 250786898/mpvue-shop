<template>
  <div>
    <!-- 空值 -->
    <div v-if="!list.length && !loading" class="empty-tip">
      <img src="/static/images/myOrder_bg@2x.png">
      <div class="empty-tip__text">暂时没有订单喔~</div>
    </div>

    <div v-if="list.length">
      <div class="weui-panel order-panel" v-for="order in list" :key="order.refundId">
        <div class="weui-panel__hd">
          {{ order.applyTime }}
          <!-- 
          1为待审核,2服务端审核确认,3拣货员已验货上传图片,4为服务端同意退款,5(对应2)为服务端审核拒绝, 6(对应4)服务端拒绝退款,7为退款完成 8-已取消 100已关闭 默认为 1-->
          <span v-if="order.state === 1">处理中</span>
          <span v-else-if="order.state === 2">审核确认</span>
          <span v-else-if="order.state === 3">已验货</span>
          <span v-else-if="order.state === 4">同意退款</span>
          <span v-else-if="order.state === 5">审核拒绝</span>
          <span v-else-if="order.state === 6">拒绝退款</span>
          <span v-else-if="order.state === 7">退款完成</span>
          <span v-else-if="order.state === 8">已取消</span>
          <span v-else-if="order.state === 100">已关闭</span>
        </div>
        <div class="weui-panel__bd">
          <navigator :url="'/pages/order/returndetail/main?id=' + order.refundId" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <img :src="src" v-for="(src, srcIndex) in order.goodsImage">
            </div>
            <div class="weui-cell__ft weui-cell__ft_in-access">
              共{{ order.goodsImage.length }}件
            </div>
          </navigator>
        </div>
        <div class="weui-panel__ft">
          <div class="weui-cell order-panel__total">
            <div class="weui-cell__bd"></div>
            <div style=" font-weight:bold;" class="weui-cell__ft">
               合计：
              <span class="text-red">￥{{ order.refundAmount }}</span>
            </div>
          </div>

          <div class="weui-cell order-panel__buttons">
            <div class="weui-cell__bd"></div>
            <div class="weui-cell__ft">
              <!-- 处理中 -->
              <template v-if="order.state === 1">
                <button :plain="true" type="default" @click="cancel(order)">撤销售后</button>
              </template>
              <!-- 退款成功 -->
              <template v-else-if="order.state === 7 || order.state === 8 || order.state === 100">
                <button :plain="true" type="default" @click="del(order)">删除订单</button>
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
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import Loading from '@/components/Loading'

  const PAGE_SIZE = 10

  export default {
    components: {
      Loading
    },

    data () {
      return {
        pageNumber: 1,
        loading: false,
        allLoaded: false,
        list: []
      }
    },

    methods: {
      getList() {
        this.loading = true
        Api.refund.list({
          pageNumber: this.pageNumber
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            // res.data.forEach(item => item.goodsImags = item.goodsImags.split(',')) 
            this.list = this.list.concat(res.data)
            this.allLoaded = res.data.length < PAGE_SIZE
          }
        })
        .catch(e => console.log(e))
        .then(() => {
          this.loading = false
          wx.stopPullDownRefresh()
        })
      },

      reload() {
        this.pageNumber = 1
        this.list = []
        this.allLoaded = false
        this.getList()
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

      del({ refundId }) {
        wx.showModal({
          content: '确定删除该售后订单吗？',
          success: r => {
            if (r.confirm) {
              this.wrapOpPromise(Api.refund.del({ id: refundId }), '删除中')
            }
          }
        })
      },

      cancel({ refundId }) {
        this.wrapOpPromise(Api.refund.cancel({ id: refundId }), '取消中')
      }
    },

    onLoad(e) {
      this.reload()
    },

    onShow() {
      let { globalData } = getApp()
      if (globalData.needUpdateReturnList) {
        this.reload()
        delete globalData.needUpdateReturnList
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
  page { background-color: #F4F4F4; padding-left:24rpx;}
</style>

<style lang="scss" scoped>
  .order-panel {
    &:before, &:after {
      display: none;
    }
    .weui-panel {
      &__hd {
        font-size: 28rpx;
        color: $text-black;
        &:before {
          left: 20rpx;
          right: 20rpx;
          border-color: #DEDEDE;
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
             font-weight:bold;
             padding-right:39rpx;
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
    z-index: 11;
    top: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    &__holder {
      height: 88rpx;
    }
  }
</style>
