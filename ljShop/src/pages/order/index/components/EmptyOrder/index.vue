<template>
  <div class="empty-container">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/order-list-empty-icon.png">
    <div class="empty-container__text">暂时没有订单哦</div>
    <div class="empty-container__desc">赶紧去首页犒劳一下自己~</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty-container{
  width:710rpx;
  height:858rpx;
  margin: 20rpx auto;
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  img{
    width: 468rpx;
    height: 346rpx;
  }
  &__text{
    color:#666666;
    font-size: 32rpx;
    margin: 9rpx 0;
  }
  &__desc{
    color: #B2B2B2;
    font-size: 26rpx;
  }
}
</style>
