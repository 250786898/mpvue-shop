<template>
  <navigator url="/pages/index/main" open-type="switchTab" class="fixed-cart-icon">
    <img src="/static/images/home-icon.png">
    <!-- <span class="weui-badge">{{cartNum}}</span> -->
  </navigator>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'FixedIndexIcon',
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
      width: 72rpx;
      height: 72rpx;
    }
    .weui-badge {
      position: absolute;
      top: 18rpx;
      right: 10rpx;
    }
  }
</style>
