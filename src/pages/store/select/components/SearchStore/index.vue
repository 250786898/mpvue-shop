<template>
  <div class="search-bar">
    <div class="search-item">
      <div class="search-city" @click="navToSelectCity">{{cityName}}</div>
      <div class="search-main">
        <label class="search-label" @click="navToSearch">     
          <icon class="icon-search" type="search" size="14"></icon>
          <div class="search-bar__text">请输入小区名字</div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cityName: ''
  },
  methods: {
    /**
     * @description 跳转到搜索组件
     */
    navToSearch () {
      wx.navigateTo({
        url: '/pages/store/search/main',
      })
    },

    /**
     * @description 跳转至选择城市组件
     */
    navToSelectCity () {
       wx.navigateTo({
        url: '/pages/city/select/main',
      })
    }
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
  font-size:28rpx;
  line-height: 28rpx;
}
.search-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.search-main{
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}
.search-city{
  color: #7F7F7F;
  padding-left: 28rpx;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
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
  height: 100%;
  width: 100%;
  .icon-search{
    margin-right: 14rpx;
    width: 28rpx;
    height: 28rpx;
  }
}
</style>