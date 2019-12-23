<template>
  <div v-if="shown" class="dialog">
    <div class="backdrop"></div>
    <div class="welcome-dialog" @click="hide">
      <div class="welcome-dialog-img">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/picture_popup window_png.png" mode="aspectFit" @click.stop="fetchCoupon">
        <icon type="cancel" class="welcome-dialog__footer" size="24" color="#fff" @click="hide"></icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      shown: {
        type: Boolean,
        default: true
      },
      activityInfo: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {

      /**
       * @description 隐藏
       */
      hide() {
        console.log('hide')
        this.shown = false
      },

      /**
       * @description 获取优惠券
       */
      fetchCoupon () {
        console.log('fetchCoupon')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .backdrop{
    z-index: 999;
    background-color: #353535;
    opacity: 0.6;
  }
  .dialog{
    position: relative;
  }
  .welcome-dialog {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    &-img{
      position: relative;
      width: 600rpx;
      height: 800rpx;
    }
    img {
      width: 100%;
      height: 100%;
    }
    &__footer {
      position:absolute;
      right:20rpx;
      text-align:center;
      top:-24rpx;
    }
  }
</style>
