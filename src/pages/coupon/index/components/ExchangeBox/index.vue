<template>
  <div class="exchange">
      <div class="input-wrap">
        <img src="/static/images/search_icon.png" class="search-icon" alt="">
        <input type="text" placeholder="请输入兑换码" class="exchange-input">
      </div>
      <span class="exchange-btn">兑换</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.exchange{
  background: #ffffff;
  padding: 20rpx 30rpx 10rpx 20rpx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .input-wrap{
    width:618rpx;
    height:74rpx;
    background:rgba(243,243,243,1);
    border-radius:10rpx;
    display: flex;
    align-items: center;
    padding: 0 10rpx;
    margin-right: 26rpx;
    box-sizing: border-box;
    .search-icon{
      width: 50rpx;
      height: 50rpx;
      margin-right: 10rpx;
    }
    .exchange-input{
      color: #929292;
      font-size: 30rpx;
    }
  }
  &-btn{
    color: #4A4949;
    font-size: 28rpx;
  }
}
</style>
