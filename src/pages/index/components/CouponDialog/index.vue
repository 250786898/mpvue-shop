<template>
  <div v-if="shown" class="dialog">
    <div class="backdrop"></div>
    <div class="welcome-dialog">
      <div class="welcome-dialog-img">
        <img :src="imgSrc" mode="widthFix" @click.stop="fetchCoupon">
        <icon type="cancel" class="welcome-dialog__footer" size="24" color="#fff" @click="hide"></icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      shown: {//当前弹窗是否显示
        type: Boolean,
        default: true
      },
      index: { //当前优惠券弹窗索引
        type: Number,
        default: 0
      },
      imgSrc: { //优惠券图片
        type: String,
        default: ''
      }
    },
    methods: {

      /**
       * @description 隐藏
       */
      hide() {
        console.log('hide')
        this.$emit('close',this.index)
      },

      /**
       * @description 获取优惠券
       */
      fetchCoupon () {
        console.log('fetchCoupon')
        this.$emit('fetchCoupon',this.index)
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
      // width: 600rpx;
      // height: 800rpx;
    }
    img {
      // width: 100%;
      // height: 100%;
    }
    &__footer {
      position:absolute;
      right:20rpx;
      text-align:center;
      top:-70rpx;
    }
  }
</style>
