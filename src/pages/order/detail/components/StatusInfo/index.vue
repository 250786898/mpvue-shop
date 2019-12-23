<template>
  <div class="status">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/order-status-bg.png" class="status-bg">
    <div class="status-name">
      <span v-if="status === 0">已取消</span>
      <span v-if="status === 20">待提货</span>
      <span v-if="status === 40">已提货</span>
    </div>

    <div class="status-icon">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/order-cancel-icon.png" v-if="status === 0">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/wait-pickup-icon.png.png" v-if="status === 20">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/already-pickup-icon.png" v-if="status === 40">
    </div>

  </div>
</template>

<script>
export default {
  props: {
    status: { //订单状态
      type: Number,
      default: 0,
   }
  }
}
</script>

<style lang="scss" scoped>
.status {
  position: relative;
  height:180rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50rpx 0 35rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
  &-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &-name{
    z-index: 2;
    position: relative;
    font-size: 40rpx;
    font-weight: 800;
    color: #fff;
  }
  &-icon{
    z-index: 2;
    position: relative;
    width: 150rpx;
    height: 150rpx;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
