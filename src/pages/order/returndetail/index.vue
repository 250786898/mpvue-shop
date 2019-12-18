<!--
 * @description:
 -->

<template>
  <div class="details">
    <!-- 申请状态 -->
    <status-card />

    <!-- 退款明细 -->
    <total-amount />

    <!-- 订单商品 -->
    <div class="details-goods">
      <good-card />
    </div>

    <!-- 订单详情 -->
    <order-details />

    <!-- 底部 -->
    <bottom-bar />

  </div>
</template>

<script>
import StatusCard from "./componnets/StatusCard/index";
import TotalAmount from "./componnets/TotalAmount/index";
import GoodCard from "./componnets/GoodCard/index";
import OrderDetails from './componnets/OrderDetails/index';
import BottomBar from './componnets/BottomBar/index';
import { Api } from '@/http/api';

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
      id:"",//当前订单id
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
    }
  },
  onLoad(e){
    console.log(e);
    if(e.id){
      this.id = e.id;
      this.getDetails();
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

<style lang="scss" scoped >
.details {
  width: 710rpx;
  margin: 0 auto;
  &-goods {
    border-radius: 10rpx;
    margin-top: 20rpx;
    background: #fff;
    padding: 30rpx 32rpx 30rpx 32rpx;
  }
}
</style>

