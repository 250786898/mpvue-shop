<template>
  <div>
    <div class="tabs">
      <LjTabs :tabs="tabs" @change="tabChange" />
    </div>

    <order-list :order-list="orderList" @refreshOrder="reloadOrderList" v-if="orderList && orderList.length" />

    <EmptyOrder />
     <!-- 空值 -->
    <!-- <div v-if="!orderList.length && !loading" class="empty-tip">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/myOrder_bg@2x.png">
      <div class="empty-tip__text">暂时没有订单喔~</div>
    </div> -->

  </div>
</template>

<script>
import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
import LjTabs from './components/LjTabs'
import OrderList from './components/OrderList'
import EmptyOrder from './components/EmptyOrder'
const PAGE_SIZE = 10 //定义订单每一页加载的数量
export default {
  components: {
    LjTabs,
    OrderList,
    EmptyOrder
  },
  data () {
    return {
      tabs: [ //订单栏目tab
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
      orderList: [], //订单列表
      pageNumber: 1, //当前页数
      activeIndex: 0, //当前激活tab索引
      allLoaded: false, //是否全部加载完成
      loading: false //数据正在加载中
    }
  },
  mounted () {
    this.getOrderList()
    console.log('getOrderList')
  },
  onReachBottom() {
    if (this.allLoaded || this.loading) return
    this.pageNumber++
    this.getOrderList()
  },

  onPullDownRefresh() {
    this.reloadOrderList()
  },
  methods: {
    /**
     * @description 获取订单列表
     */
    getOrderList () {
      this.loading = true
      Api.order.list({
        pageNumber: this.pageNumber,
        pageSize: PAGE_SIZE,
        orderStatus: this.tabs[this.activeIndex].status,
        deliveryType: this.tabs[this.activeIndex].deliveryType
      })
      .then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.orderList = [...this.orderList, ...res.data.map(item => ({
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

    /**
     * @description 重新刷新订单列表
     */
    reloadOrderList () {
      this.initLoadData()
      this.getOrderList()
    },

    /**
     * @description tab栏改变
     */
    tabChange (currentTabIndex) {
      this.activeIndex = currentTabIndex
      this.initLoadData()
      this.getOrderList()
    },

    /**
     * @description 初始化加载数据
     */
    initLoadData () {
      this.pageNumber = 1
      this.orderList = []
      this.allLoaded = false
    }
  }
}
</script>

<style>
page{
  background: #F1F1F1;
  padding-top: 100rpx;
}
</style>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  top: 0;
}
</style>
