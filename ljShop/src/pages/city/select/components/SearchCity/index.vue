<template>
  <div class="search">
    <div class="search-input">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/search_icon.png" class="search-icon" mode="aspectFit" alt="">
      <span class="search-placeholder">请输入城市名</span>
    </div>
    <div class="search-btn">搜索</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.search{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  &-input{
    width:620rpx;
    box-sizing: border-box;
    height:64rpx;
    background:rgba(243,243,243,1);
    border-radius:10rpx;
    padding: 0 15rpx;
    display: flex;
    align-items: center;
  }
  &-icon{
    width:50rpx;
    height:50rpx;
  }
  &-placeholder{
    color: #929292;
    font-size: 24rpx;
  }
  &-btn{
    color: #4A4949;
    font-size: 28rpx;
    margin-left: 26rpx;
    flex: 1;
  }
}
</style>
