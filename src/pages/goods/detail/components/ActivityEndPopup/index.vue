<template>
  <div class="js_dialog" id="iosDialog2" style="opacity: 1;" v-if="show">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__bd">您访问的商品活动已结束, 去首页逛逛...</div>
        <div class="weui-dialog__ft">
            <button class="weui-dialog__btn weui-dialog__btn_primary" type="primary" @click="toIndex">返回首页</button>
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
    left: 80rpx;
    right: 100rpx;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    padding: 70rpx 0rpx;
    width: 590rpx;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 10rpx;
    &__bd{
      font-size: 30rpx;
      width: 348rpx;
      color: #3F3F3F;
      line-height: 45rpx;
    }
    &__btn{
      width: 306rpx;
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 10rpx;
      font-size: 32rpx;
      font-weight: bold;
      margin-top: 22rpx;
    }
}

</style>
