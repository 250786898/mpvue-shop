<template>
  <div class="cart">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/carticon.png" class="empty-icon">
      <div class="empty-tip__text_main">购物车为空</div>
      <div class="empty-tip__text">赶紧去慰劳一下自己吧</div>
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
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 124rpx;
  .empty-icon{
    width: 380rpx;
    height: 260rpx;
  }
  .empty-tip__text{
    color: #CCCCCC;
    font-size: 26rpx;
    line-height: 48rpx;
  }
  .empty-tip__text_main{
    color: #666666;
    font-size: 32rpx;
    line-height: 48rpx;
  }
  button {
    margin-top: 115rpx;
    width:380rpx;
    height:90rpx;
    border-radius:45rpx;
    font-weight:bold;
    font-size: 32rpx;
  }
}

</style>
