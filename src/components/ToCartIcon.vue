<template>
  <navigator url="/pages/cart/main" open-type="switchTab" class="fixed-cart-icon">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/cart_icon.png">
    <span class="weui-badge">{{cartNum}}</span>
  </navigator>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
     ...mapState(['cartNum'])
    }
  }
</script>

<style scoped lang="scss">
  .fixed-cart-icon {
    position: relative;
    width: 64rpx;
    img {
      vertical-align: middle;
      width: 64rpx;
      height: 64rpx;
    }
    .weui-badge {
      position: absolute;
      top: 0rpx;
      right: 0rpx;
    }
  }
</style>
