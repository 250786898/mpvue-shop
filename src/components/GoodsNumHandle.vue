<template>
  <div class="counter">
    <div v-if="count > 1">
       <img src="/static/images/common_icon_duce.png" class="handle-img">
        <span class="count">{{ count }}</span>
       <img src="/static/images/common_icon_add.png" class="handle-img">
    </div>
    <div v-else>
      <img src="/static/images/common_btn_shopcart_sellout.png@2x.png" class="icon-cart" v-if="addDisabled">
       <img src="/static/images/common_btn_shopcart_small.png@2x.png" class="icon-cart" v-else>

    </div>

  </div>
</template>

<script>
  export default {
    props: {
      count: {
        type: Number,
        default: 1
      },
      addDisabled: {
        type: Boolean,
        default: false
      },
    },


    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .counter {
    .count {
      vertical-align: middle;
      padding-left: 26rpx;
      padding-right: 26rpx;
      font-size: 24rpx;
      color: #000000;
    }
    .handle-img {
      vertical-align: middle;
      width: 44rpx;
      height: 44rpx;
    }
    .icon-cart{
      width: 60rpx;
      height: 60rpx;
    }
  }
</style>
