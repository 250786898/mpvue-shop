<template>
  <div class="counter">
    <div v-if="count > 1">
       <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_icon_duce.png" class="handle-img">
        <span class="count">{{ count }}</span>
       <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_icon_add.png" class="handle-img">
    </div>
    <div v-else>
       <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_btn_shopcart_sellout.png@2x.png" :style="iconStyle" class="icon-cart" v-if="addDisabled">
       <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/common_btn_shopcart_small.png@2x.png" :style="iconStyle" class="icon-cart" v-else>

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
      iconSize: {
        type: Number,
        default: 60
      }
    },

    computed: {
      iconStyle () {
        return `width: ${this.iconSize}rpx;height:${this.iconSize}rpx;`
      }
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
