<template>
  <div>
    <!-- 订单为空 -->
    <empty-order-tips v-if="!orderList.length && !loading" />

    <!-- 订单不为空 -->
    <after-sales-order-card v-for="item in orderList" :key="item.orderId" :orderInfo="item"  />

    <!-- 正在加载中 -->
    <Loading v-if="loading" />

  </div>
</template>

<script>
import EmptyOrderTips from "./components/EmptyOrderTips/index";
import AfterSalesOrderCard from "./components/AfterSalesOrderCard/index";
import { Api } from "@/http/api";

const PAGE_SIZE = 10;

export default {
  components: {
    EmptyOrderTips,
    AfterSalesOrderCard
  },
  data() {
    return {
      pageNumber: 1, //页码参数
      orderList: [], //订单列表
      loading: false, //是否正在加载
      allLoaded: false //所有订单是否加载完成
    };
  },
  methods: {
    /**
     * @description 获取用户订单列表
     */
    async getList() {
      // this.loading = true;
      let data = await Api.refund.list({
        pageNumber: this.pageNumber
      });
      if (data.code === Api.CODES.SUCCESS) {
        this.loading = false;
        this.orderList = this.orderList.concat(data.data);
        this.allLoaded = data.data.length < PAGE_SIZE;
        wx.stopPullDownRefresh()
      } else{
        this.loading = false
      }
    },

    /**
     * @description 重新加载页面
     */
    reload() {
      this.orderList = [];
      this.pageNumber = 1;
      this.allLoaded = false;
      this.getList();
    }
  },

  /**
   * @description 页面初始加载
   */
  onLoad(e) {
    this.reload();
  },

  /**
   * @description 上拉触底加载
   */
  onReachBottom() {
    if (this.allLoaded || this.loading) return;
    this.pageNumber++;
    this.getList();
  },

  /**
   * @description 下拉刷新
   */
  onPullDownRefresh() {
    this.reload();
  }
};
</script>

<style>
page {
  background: #f1f1f1;
  padding-top: 20rpx;
}
</style>
<style lang="scss" scoped >
</style>
