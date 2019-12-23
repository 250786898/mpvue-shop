<template>
  <div class>
    <goods-card :goodList="goodList" @getChooseList="getChooseList" />
    <button type="primary" class="sure-button" @click="submit">确认退货商品</button>
  </div>
</template>

<script>
import GoodsCard from "./components/GoodsCard/index";
import { Api } from "@/http/api";

export default {
  components: {
    GoodsCard
  },
  data() {
    return {
      orderId: "6598224525651873792",
      goodList: [],
      chooseList: []
    };
  },
  methods: {
    /**
     * @description 获取商品列表
     */
    async getGoodList() {
      let data = await Api.order.detail({
        orderId: "6598224525651873792"
      });
      this.goodList = data.data.orderGoodsList;
    },

    /**
     * @description 获取选择的商品
     */
    getChooseList(val) {
      this.chooseList = val;
    },

    /**
     * @description 提交所选择的商品
     */
    submit() {
      if (this.chooseList.length) {
        wx.navigateTo({
          url: `/pages/order/returnapply/main?id=${
            this.orderId
          }&list=${JSON.stringify(this.goodList)}`
        });
      }else{
        wx.showToast({
          title: "请选择退货商品",
          icon: "none"
        });
      }
    }
  },
  onLoad(e) {
    wx.showLoading({ title: "加载中" });
    if (e.orderId) {
      this.orderId = e.orderId;
      this.getGoodList();
    }
    this.getGoodList();
    wx.hideLoading();
  }
};
</script>

<style>
page {
  background: #f1f1f1;
  padding-top: 20rpx;
}
</style>
<style lang="scss" scoped>
.sure-button {
  width: 470rpx;
  height: 80rpx;
  border-radius: 10rpx;
  font-size: 34rpx;
  line-height: 80rpx;
  margin: 0 auto;
  margin-top: 70rpx;
}
</style>
