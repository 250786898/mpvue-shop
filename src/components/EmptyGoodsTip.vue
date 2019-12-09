<template>
  <div class="empty-container">
      <img src="/static/images/empty-time-activity.png" class="empty-icon">
      <div class="empty-tip__text_main">{{title}}</div>
      <div class="empty-tip__text">我们正在为您精选优质的商品</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '抱歉，没有团购'
    }
  }
}
</script>

<style lang="scss" scoped>
.empty-container{
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  .empty-icon{
    width: 380rpx;
    height: 260rpx;
  }
  .empty-tip__text{
    color: #8E8D8D;
    font-size: 26rpx;
    line-height: 26rpx;
    margin-top: 9rpx;
  }
  .empty-tip__text_main{
    color: #3C3C3C;
    font-size: 28rpx;
    line-height: 28rpx;
    margin-bottom: 17rpx;
  }
}
</style>
