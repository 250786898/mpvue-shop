<template>
  <navigator url="/pages/cart/main" open-type="switchTab" class="fixed-cart-icon">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_btn_floatcart.png@2x.png">
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
    position: fixed;
    left: 20rpx;
    top: 50%;
    img {
      vertical-align: middle;
      width: 92rpx;
      height: 92rpx;
    }
    .weui-badge {
      position: absolute;
      top: 18rpx;
      right: 10rpx;
    }
  }
</style>
