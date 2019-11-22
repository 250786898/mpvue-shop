<template>
  <!-- 底部 -->
  <div class="footer-bar">
    <span>合计:</span><span class="price">￥{{ orderAmount }}</span>
    <form report-submit @submit="uploadFormId" >
      <button  type="primary" class="radius bg-gradient" form-type="submit" @click="submit">提交订单</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    orderAmount: { //订单总价格
      type: Number,
      default: 0
    }
  },

  methods: {
    /**
     * @description 提交订单
     */
    submit () {
      this.$emit('submit')
    }

  }
}
</script>

<style lang="scss" scoped>
.footer-bar {
  width: 100%;
  height: 105rpx;
  background-color: #fff;
  text-align: left;
  z-index: 10;
  padding-left:23rpx;
  line-height: 93rpx;
  span {
    font-size: 36rpx;
    font-weight: 700;
    color: $text-black;
    vertical-align: middle;
    line-height: 80rpx;
    &.price {
      color: $text-red;
      margin-top:35rpx;
    }
  }

  button {
    margin-left: 40rpx;
    line-height: 105rpx;
    width: 251rpx;
    height: 105rpx;
    vertical-align: middle;
    float: right;
    font-size:32rpx;
  }
}
</style>
