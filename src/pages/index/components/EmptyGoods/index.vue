<template>
  <div class="empty-container">
      <img src="/static/images/carticon.png" class="empty-icon">
      <div class="empty-tip__text_main">抱歉，您没有团购~</div>
      <div class="empty-tip__text">我们正在为您精选优质的商品~</div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.empty-container{
  width:702rpx;
  height:607rpx;
  background:rgba(255,255,255,1);
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
    font-size: 20rpx;
    line-height: 20rpx;
  }
  .empty-tip__text_main{
    color: #666666;
    font-size: 24rpx;
    line-height: 48rpx;
  }
}
</style>