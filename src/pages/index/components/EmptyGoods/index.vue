<template>
  <div class="empty-container">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/carticon.png" class="empty-icon">
      <div class="empty-tip__text_main">抱歉，没有团购</div>
      <div class="empty-tip__text">我们正在为您精选优质的商品</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty-container{
  width:100%;
  height:607rpx;
  box-shadow:0px 3rpx 36rpx 4rpx rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  .empty-icon{
    width: 380rpx;
    height: 260rpx;
    margin-top: 90rpx;
  }
  .empty-tip__text{
    color: #CCCCCC;
    font-size: 26rpx;
    line-height: 48rpx;
  }
  .empty-tip__text_main{
    color: #666666;
    font-size: 32rpx;
    line-height: 48rpx;
  }
}
</style>
