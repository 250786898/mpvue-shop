<template>
  <div>
    <div style="height: 20rpx; background-color: #F3F3F3"></div>

    <div v-if="list.length">
      <div class="weui-panel weui-panel_card" v-for="order in list" :key="order.orderId">
        <div class="weui-panel__hd">
          {{ order.orderTime }}
          <span>待提货</span>
        </div>
        <div class="weui-panel__bd">
          <navigator :url="'/pages/order/detail/main?id=' + order.orderId" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <img :src="src" v-for="(src, srcIndex) in order.goodsImags" :key="src" mode="aspectFill">
            </div>
            <div class="weui-cell__ft weui-cell__ft_in-access">共{{ order.goodsNum }}件</div>
          </navigator>
        </div>
        <div class="weui-panel__ft">
          <navigator :url="'/pages/pickup/detail/main?id=' + order.orderId">
            <button type="primary" class="radius">
            提货码
            </button>
          </navigator>
        </div>
      </div>
    </div>

    <!-- 空值 -->
    <div class="empty-tip" v-if="!loading && !list.length">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/shopcart_icon_bg.png@2x.png">
      <div class="empty-tip__text empty-tip__text_main">购物车为空~</div>
      <div class="empty-tip__text">赶紧去慰劳一下自己吧~</div>
      <button type="primary" class="radius" @click="toIndex()">
        快去逛一逛吧~
      </button>
    </div>

    <loading v-if="loading && list.length"></loading>
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
        list: [],
        loading: false,
        allLoaded: false
      }
    },

    methods: {
      getPickupList() {
        this.loading = true

        Api.order.list({
          pageNumber: this.pageNumber,
          pageSize: PAGE_SIZE,
          orderStatus: 31,
          deliveryType: 2
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
        .then(r => {
          this.loading = false
          wx.stopPullDownRefresh()
        })
      },

      reload() {
        this.pageNumber = 1
        this.list = []
        this.loading = this.allLoaded = false
        this.getPickupList()
      },

      toIndex() {
        wx.switchTab({
          url: '/pages/index/main'
        })
      }
    },

    onLoad() {
      this.reload()
    },

    onReachBottom() {
      if (this.loading || !this.allLoaded) return
      this.pageNumber++
      this.getPickupList()
    },

    onPullDownRefresh() {
      this.reload()
    }
  }
</script>

<style lang="scss" scoped>
  .empty-tip {
    padding-top: 200rpx;
    button {
      margin-top: 50rpx;
      width: 428rpx;
    }
  }
</style>
