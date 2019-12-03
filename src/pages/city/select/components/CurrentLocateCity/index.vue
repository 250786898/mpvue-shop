<template>
  <div class="locate">
    <div class="locate-desc">
      <img src="/static/images/common_icon_greenlocation.png" alt="" class="locate-icon">
      <span class="locate-text">当前定位城市</span>
    </div>
    <div class="current-city">
      广州市
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.locate{
  background: #ffffff;
  padding: 20rpx 30rpx;
  margin-top: 30rpx;
  &-desc{
    margin-bottom: 19rpx;
  }
  &-icon{
    width: 21rpx;
    height: 25rpx;
  }
  &-text{
    color: #999999;
    font-size:24rpx;
  }
  .current-city{
    width:150rpx;
    height:56rpx;
    line-height: 56rpx;
    text-align: center;
    border:2rpx solid rgba(1,189,159,1);
    border-radius:10rpx;
    color: #01BD9F;
    font-weight:bold;
  }
}
</style>
