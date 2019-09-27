<template>
  <div class="js_dialog" id="iosDialog2" style="opacity: 1;" v-if="show">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__title">提示</div>
        <div class="weui-dialog__bd">您访问的商品活动已结束，去首页逛逛...</div>
        <div class="weui-dialog__ft">
            <button class="weui-dialog__btn weui-dialog__btn_primary" @click="toIndex">返回首页</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
     /**
     * @description 返回首页
     */
    toIndex() {
      this.$store.commit('setStoreId','')  //返回首页先情况vuex门店，首页才能监听到门店ID的变化
      wx.reLaunch({
        url: '/pages/index/main'
      })   
      // wx.switchTab({
      //   url: '/pages/index/main'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.weui-mask {
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
}
.weui-dialog {
    position: fixed;
    z-index: 100;
    top: 50%;
    left: 100rpx;
    right: 100rpx;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    padding-bottom: 30rpx;
    border-radius: 32rpx;
    &__title{
      padding: 50rpx 0 0rpx 0;
      font-size: 30rpx;
      font-weight: 800;
    }
    &__bd{
      font-size: 32rpx;
      color: #666;
      padding: 15rpx 50rpx 25rpx;
      line-height: 40rpx;
    }
    &__btn{
      width: 250rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      border: 2rpx solid #0FD7C0;
      background: #fff;
      color: #0FD7C0;
      border: 2rpx solid #0FD7C0;
      border-radius: 60rpx;
      font-size: 32rpx;
    }
}

</style>