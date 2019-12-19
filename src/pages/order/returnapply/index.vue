<template>
  <div>
    <good-card :goodList="goodList" numberColor="#999" :checkboxShow="false" />
    <refund-proof @getProof="getProof" />
    <button type="primary" class="subit-button" @click="submit" >提交</button>
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
      orderId: "6598224525651873792",
      goodList: []
    };
  },
  methods: {
    /**
     * @description 获取商品列表
     */
    async getGoodList() {
      let data = await Api.order.detail({
        orderId: this.orderId
      });
      this.goodList = data.data.orderGoodsList;
    },

    /**
     * @description 获取凭证信息
     */
    getProof(val) {
      console.log(val);
    },

    /**
     * @description 提交当前申请
     */
    submit(){

    }

  },
  onLoad(e) {
    if(e.orderId){
      this.orderId = e.orderId;
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
.subit-button{
  width:470rpx;
  height:80rpx;
  margin: 0 auto;
  margin-top: 50rpx;
  line-height: 80rpx;
}
</style>
