<template>
  <div class="search">
    <div class="search-input">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/search_icon.png" mode="aspectFit" class="search-icon" alt="">
      <input class="search-placeholder" placeholder="请输入城市名" />
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_icon_close.png" mode="aspectFit" class="cancel-icon" alt="">
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
    width: 100%;
  }
  &-btn{
    color: #4A4949;
    font-size: 28rpx;
    margin-left: 26rpx;
    flex: 1;
  }
  .cancel-icon{
   width: 26rpx;
   height: 26rpx;
  }
}
</style>
