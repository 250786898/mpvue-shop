<template>
  <div class="details">
    <!-- 申请状态 -->
    <status-card :status="details.state" :time="details.applyTime" />

    <!-- 退款明细 -->
    <total-amount
      :amount="details.refundAmount"
      :wechatAmount="details.refundRealAmount"
      :couponsAmount="details.refundCouponAmount"
      :amountDetailShow="details.state==7"
    />

    <!-- 订单商品 -->
    <div class="details-goods">
      <good-card :goodsData="details.shopRefundGoodses" />
    </div>

    <!-- 订单详情 -->
    <order-details
      :time="details.applyTime"
      :number="details.refundSn"
      :reason="refundReasonText"
      :count="goodsNumber"
    />

    <!-- 底部 -->
    <bottom-bar v-if="details.state==1" @cancel="cancelRefund" />
  </div>
</template>

<script>
import StatusCard from "./componnets/StatusCard/index";
import TotalAmount from "./componnets/TotalAmount/index";
import GoodCard from "./componnets/GoodCard/index";
import OrderDetails from "./componnets/OrderDetails/index";
import BottomBar from "./componnets/BottomBar/index";
import { Api } from "@/http/api";

export default {
  components: {
    StatusCard,
    TotalAmount,
    GoodCard,
    OrderDetails,
    BottomBar
  },
  data() {
    return {
      id: "", //当前订单id
      details: {}, //当前订单信息
      reasons: [] //原因列表
    };
  },
  methods: {
    /**
     * @description 获取当前订单信息
     */
    async getDetails(id) {
      let data = await Api.refund.detail(id);
      if (data.code === Api.CODES.SUCCESS) {
        this.details = data.data;
      }
    },

    /**
     * @description 撤销售后
     */
    cancelRefund() {
      wx.showLoading({ title: "取消中" });
      Api.refund
        .cancel({
          id: this.details.refundId
        })
        .then(res => {
          wx.hideLoading();
          if (res.code === Api.CODES.SUCCESS) {
            this.getDetails({ id: this.details.refundId });
          } else {
            wx.showToast({
              title: res.message,
              icon: "none"
            });
          }
        })
        .catch(e => wx.hideLoading());
    },

    /**
     * @description 获取售后原因列表
     */
    async getReasons() {
      const res = await Api.refund.reason();
      if (res.code === Api.CODES.SUCCESS) {
        this.reasons = res.data;
      }
    }
  },
  onLoad(e) {
    if (e.id) {
      this.id = e.id;
      this.getDetails({id:e.id});
      this.getReasons();
    }
  },
  computed: {
    refundReasonText() {
      if (this.details.refundReason && this.reasons.length) {
        let selected = this.reasons.find(
          item => item.id == this.details.refundReason
        );
        return selected ? selected.reasonInfo : "";
      } else {
        return "";
      }
    },

    goodsNumber() {
      if (this.details.shopRefundGoodses) {
        let num = 0;
        this.details.shopRefundGoodses.forEach(item => {
          num += item.goodsNum;
        });
        return num;
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
page {
  background: #f1f1f1;
  padding-top: 20rpx;
  padding-bottom: 106rpx;
}
</style>

<style lang="scss" scoped >
.details {
  width: 710rpx;
  margin: 0 auto;
  &-goods {
    border-radius: 10rpx;
    margin-top: 20rpx;
    background: #fff;
    padding: 0 32rpx 0 32rpx;
  }
}
</style>

