<template>
  <div class="header" >
    <div class="search" @click="navToSearch">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/search_icon.png" class="search-icon" alt="" mode="aspectFit">
      <span class="placeholder">搜索商品</span>
    </div>

    <cart-icon />

  </div>
</template>

<script>
import CartIcon from '@/components/CartIcon'
export default {
  components: {
    CartIcon
  },
  methods:{
    navToSearch(){
      wx.navigateTo({
        url: '/pages/goods/search/main'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  height:104rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  .search {
    width:620rpx;
    height:74rpx;
    display: flex;
    align-items: center;
    padding: 0 6rpx;
    color: #929292;
    font-size: 30rpx;
    background:rgba(243,243,243,1);
    border-radius:10rpx;
    margin-right: 24rpx;
    &-icon{
      width: 44rpx;
      height: 44rpx;
      margin-right: 4rpx;
    }
  }
}
</style>
