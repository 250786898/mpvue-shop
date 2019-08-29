<template>
  <div class="search-bar">
    <div class="search-city" >{{cityName}}</div>
    <div class="search-main">
      <label class="search-label">     
        <icon class="icon-search" type="search" size="14"></icon>
        <div class="search-bar__text">请输入小区名字</div>
      </label>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    cityName: ''
  }
}
</script>

<style lang="scss">
.search-bar{
  width:702rpx;
  height:72rpx;
  background:rgba(255,255,255,1);
  border-radius:36rpx;
  z-index: 9;
  display: flex;
  align-items: center;
  font-size:28rpx;
}
.search-city{
  color: #7F7F7F;
  padding-left: 28rpx;
   &:after {
    content: '';
    display: inline-block;
    margin-left: 14rpx;
    vertical-align: middle;
    width: 0;
    height: 0;
    border-top: 10rpx solid #666;
    border-left: 8rpx solid transparent;
    border-right: 8rpx solid transparent;
  }
}
.search-label{
  display: flex;
  align-items: center;
  color: #7F7F7F;
  padding-left: 26rpx;
  .icon-search{
    margin-right: 14rpx;
  }
}
</style>