<template>
  <div>
    <good-card :goodList="goodList" numberColor="#999" :checkboxShow="false" />
    <refund-proof @getProof="getProof" />
    <button type="primary" class="subit-button" @click="submit">提交</button>
  </div>
</template>

<script>
import refundProof from "./components/refundProof/index";
import GoodCard from "../returngoods/components/GoodsCard/index";
import { Api } from "@/http/api";

export default {
  components: {
    refundProof,
    GoodCard
  },
  data() {
    return {
      goodList: [],
      proof: {}
    };
  },
  methods: {
    /**
     * @description 获取凭证信息
     */
    getProof(val) {
      this.proof = val;
    },

    /**
     * @description 提交当前申请
     */
    async submit() {
      if (this.proof.refundReason) {
        let list = this.goodList.map(item => ({
          id: item.id,
          goodsNum: item.goodsNum
        }));

        wx.showLoading({ title: "提交中" });

        let data = await Api.refund.applyReturn({
          orderId: this.orderId,
          refundReason: this.proof.refundReason,
          goodsImageMore: this.proof.goodsImageMore,
          goodsJson: JSON.stringify(list)
        });

        wx.hideLoading();
        if (data.code === Api.CODES.SUCCESS) {
          wx.showToast({
            title: "申请成功"
          });

          setTimeout(() => {
            wx.redirectTo({
              url: `/pages/order/returns/main`
            });
          }, 1500);
        } else if (data.code === 5010329) {
          wx.showModal({
            title: "提示",
            content: "订单签收超过7天，不能为您提供售后退款服务",
            showCancel: false,
            cancelText: "知道了"
          });
        } else {
          wx.showToast({ title: data.message, icon: "none" });
        }
      } else {
        return wx.showToast({
          title: "请填写退货/退款原因",
          icon: "none"
        });
      }
    }
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data());
    if (e.id) {
      this.orderId = e.id;
      this.goodList = JSON.parse(e.list);
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
.subit-button {
  width: 470rpx;
  height: 80rpx;
  margin: 0 auto;
  margin-top: 50rpx;
  line-height: 80rpx;
}
</style>
