<template>
  <div class>
    <goods-card :goodList="goodList" @changeGoodsStatus="changeGoodsStatus" />
    <button type="primary" class="sure-button" @click="submit">确定退货商品</button>
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
      orderId: '',
      goodList: [],
      chooseList: [] //勾选的商品列表
    };
  },
  methods: {
    /**
     * @description 获取商品列表
     */
    async getGoodList() {
      let res = await Api.order.detail({
        orderId: this.orderId
      });
      console.log('==getGoodList==',Api.CODES.SUCCESS)
      if(res.code == Api.CODES.SUCCESS) {
        this.goodList = res.data.orderGoodsList.map(item => ({
        ...item,
        checked: false
      }));
        wx.hideLoading()
      }

    },

    /**
     * @description 获取选择的商品
     */
    changeGoodsStatus(val) {
      this.goodList[val.index].checked = val.checked;
    },

    /**
     * @description 提交所选择的商品
     */
    submit() {
      let checkedGoodsList = JSON.stringify(this.goodList.filter((item)=>{
          return item.checked
          }))
      if (checkedGoodsList.length) {
        wx.navigateTo({
          url: `/pages/order/returnapply/main?id=${
            this.orderId
          }&list=${checkedGoodsList}`
        });
      }else{
        wx.showToast({
          title: "请选择退货商品",
          icon: "none"
        });
      }
    }
  },
  onLoad({ id }) {
    console.log('onLoad',id)
    wx.showLoading({ title: "加载中" });
    if (id) {
      this.orderId = id;
      this.getGoodList();
    }
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
