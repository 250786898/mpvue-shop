<template>
  <div class="search-bar">
    <div class="search-item">
      <div class="search-city" @click="navToSelectCity">{{cityName}}</div>
      <img src="/static/images/common_icon_dropdown.png" alt="" class="dropdown-icon">
      <div class="search-main">
        <label class="search-label" @click="navToSearch">
          <div class="search-placeholder">请输入提货地址</div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
  },
  computed: {
    ...mapState(['cityName'])
  }
}
</script>

<style lang="scss">
.search-bar{
  width:710rpx;
  height:64rpx;
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  margin-top: 30rpx;
  z-index: 9;
  font-size:24rpx;
  line-height: 28rpx;
  color: #929292;
}
.search-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.dropdown-icon{
  width:40rpx;
  height: 30rpx;
}
.search-main{
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}
.search-city{
  color: #929292;
  padding-left: 40rpx;
  height: 100%;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.search-label{
  display: flex;
  align-items: center;
  color: #929292;
  height: 100%;
  width: 100%;
  margin-left: 15rpx;
  &::before{
    content: ' ';
    width:2rpx;
    height:31rpx;
    display: block;
    background: #929292;
  }
  .search-placeholder{
    margin-left: 29rpx;
    font-size:24rpx;
  }
  .icon-search{
    margin-right: 14rpx;
    width: 28rpx;
    height: 28rpx;
  }
}
</style>
