<template>
  <div class="cart">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/empry-carticon.png" class="empty-icon">
      <div class="empty-tip__text">购物车啥都没有哟</div>
      <div class="empty-tip__text">给自已定一个小目标，先下一单~</div>
      <button type="primary" class="radius" @click="toIndex">
        去逛逛
      </button>
  </div>
</template>

<script>
export default {
  methods: {
     /**
     * @description 返回首页
     */
    toIndex() {
      wx.switchTab({
        url: '/pages/index/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cart{
  width:710rpx;
  height:100%;
  box-sizing: border-box;
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 103rpx;
  .empty-icon{
    width: 468rpx;
    height: 355rpx;
  }
  .empty-tip__text{
    color: #666666;
    font-size: 26rpx;
    line-height: 26rpx;
    &:nth-of-type(1){
      margin-bottom: 10rpx;
    }
  }
  button {
    width:200rpx;
    height:67rpx;
    line-height: 67rpx;
    text-align: center;
    background:rgba(1,189,159,1);
    border-radius:10rpx;
    color: #FFFFFF;
    font-size: 32rpx;
    font-weight:bold;
    margin-top: 49rpx;
  }
}

</style>
