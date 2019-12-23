<template>
  <div class="bar">
    <div class="bar-input">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/commom_search_png.png" class="search-icon">
      <input placeholder="请输入商品名称" class="search-input">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_icon_close.png" class="cancel-icon">
    </div>
    <div class="search-btn">
      <span>搜索</span>
      <!-- <div class="cart-icon">
        <CartIcon />
      </div> -->
    </div>
  </div>
</template>

<script>
import CartIcon from '@/components/CartIcon'
export default {
  components: {
    CartIcon
  }
}
</script>

<style lang="scss" scoped>
.bar{
  padding: 20rpx 30rpx 20rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-input{
    width:620rpx;
    height:74rpx;
    background:rgba(243,243,243,1);
    border-radius:10rpx;
    display: flex;
    padding: 0 15rpx;
    box-sizing: border-box;
    align-items: center;
    .search-icon{
      width: 25rpx;
      height: 25rpx;
      margin-right: 15rpx;
    }
    .search-input{
      color: #929292;
      font-size: 30rpx;
      flex: 1;
    }
  }
  .search-btn{
    color: #4A4949;
    font-size: 28rpx;
  }
  .cancel-icon{
    width: 25rpx;
    height: 25rpx;
  }
}
</style>
