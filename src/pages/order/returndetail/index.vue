<template>
  <div class="details">
    <!-- 申请状态 -->
    <status-card :status="details.state" :time="details.applyTime" />

    <!-- 退款明细 -->
    <total-amount :amount="details.refundAmount" />

    <!-- 订单商品 -->
    <div class="details-goods">
      <good-card :goodsData="details.shopRefundGoodses" />
    </div>

    <!-- 订单详情 -->
    <order-details :time="details.applyTime" :number="details.refundSn" :reason="details.refundReason" />

    <!-- 底部 -->
    <bottom-bar v-if="details.state==1||details.state==2||details.state==3" />

  </div>
</template>

<script>
import StatusCard from "./componnets/StatusCard/index";
import TotalAmount from "./componnets/TotalAmount/index";
import GoodCard from "./componnets/GoodCard/index";
import OrderDetails from './componnets/OrderDetails/index';
import BottomBar from './componnets/BottomBar/index';
import { Api } from '@/http/api';
// import OrderModel from '@/model/Order';
// const orderModel = new OrderModel();

export default {
  components: {
    StatusCard,
    TotalAmount,
    GoodCard,
    OrderDetails,
    BottomBar
  },
  data(){
    return{
      id:"6598224884185174016",//当前订单id
      details:{} //当前订单信息
    }
  },
  methods:{
    /**
     * @description 获取当前订单信息
     */
    async getDetails(){
      let data = await Api.refund.detail({id:this.id});
      console.log(data);
      this.details = data.data;
    }
  },
  onLoad(e){
    if(e.id){
      this.id = e.id;
      this.getDetails();
    }
  },
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

