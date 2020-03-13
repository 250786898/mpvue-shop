<template>
  <div v-if="shown" class="popup">
    <div class="mask"></div>
    <div class="popnp">
      <div class="popnp-main">
        <img src="/static/images/successful-delivery.png" class="success-icon" />
        <img src="/static/images/pickup-fresh-icon.png" class="fresh-icon" />
        <p class="success-text">提货成功</p>
        <button class="confirm" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
export default {
  data() {
    return {
      ORDER_STATE,
      ORDER_STATE_TEXT
    }
  },

  props: {
    shown: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirm() {
      wx.switchTab({
        //如果核销成功，返回应该直接跳转我的
        url: '/pages/mine/main'
      })
      // wx.navigateTo({
      //   url:`/pages/order/index/main?status=${ORDER_STATE.FINISHED}`
      // })
    }
  }
}
</script>
<style scoped lang="scss">
.popup {
  z-index: 99999;
}
.confirm {
  width: 338rpx;
  height: 86rpx;
  background: rgba(1, 189, 159, 1);
  border-radius: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
  margin: 46rpx auto 0;
}
.mask {
  background-color: #000;
  width: 100%;
  height: 100%;
  z-index: 99999;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  opacity: 0.8;
}
.popnp {
  position: fixed;
  top: 480rpx;
  left: 80rpx;
  text-align: center;
  z-index: 999999;
  width: 590rpx;
  height: 377rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 20rpx;
  &-main{
    position: relative;
    top: -58rpx;
  }
  .success-icon {
    vertical-align: middle;
    width: 286rpx;
    height: 125rpx;
    z-index: 99;
  }
  .fresh-icon {
    width: 427rpx;
    height: 90rpx;
  }
  .success-text {
    font-size: 50rpx;
    font-weight: bold;
    position: relative;
    top: -10rpx;
    z-index: 99;
  }
  .text {
    padding: 20rpx;
    font-size: 26rpx;
    color: #999;
    text-align: center;
  }
}
</style>
