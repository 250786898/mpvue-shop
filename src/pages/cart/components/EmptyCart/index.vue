<template>
  <div class="cart">
    <img src="/static/images/carticon.png">
      <div class="empty-tip__text empty-tip__text_main">购物车为空~</div>
      <div class="empty-tip__text">赶紧去慰劳一下自己吧~</div>
      <button type="primary" class="radius" @click="toIndex">
        快去逛一逛吧~
      </button>
  </div>
</template>

<script>
  export default {
      
  }
</script>

<style lang="scss" scoped>
.cart{
     button {
      margin-top: 50rpx;
      width: 428rpx;
    }
    img{
      width: 380rpx;
      height: 264rpx;
      margin-bottom:0rpx;
    }
}
    
</style>