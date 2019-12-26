<template>
  <div class="status" style>
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order-status-bg.png" alt />
    <p class="status__text" v-if="status==1||status==2||status==3" >申请成功，待商家处理</p>
    <p class="status__text" v-if="status==4||status==5" >请将退货商品退还给门店，待商家退款</p>
    <p class="status__text" v-if="status==6" >拒绝申请</p>
    <p class="status__text" v-if="status==7" >退款成功</p>
    <p class="status__text" v-if="status==8" >撤销成功</p>

    <p class="status__time">{{time}}</p>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 1
    }, //订单状态
    time: {
      type: String,
      default: ""
    } //订单时间
  },
  methods: {
    getStatus() {
          return "退款成功";

    }
  }
};
</script>

<style lang="scss" scoped >
.status {
  width: 100%;
  height: 180rpx;
  border-radius: 10rpx;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 710rpx;
    height: 180rpx;
    z-index: -99;
  }
  &__text {
    margin-top: 52rpx;
    margin-left: 36rpx;
    font-size: 36rpx;
    color: rgba(255, 255, 255, 1);
    font-weight: 800;
    font-family: PingFang SC;
  }
  &__time {
    margin-top: 14rpx;
    margin-left: 36rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    font-size: 26rpx;
  }
}
</style>
