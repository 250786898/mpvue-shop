<template>
  <div class="bar">
    <div class="item" @click="discount">
      <div class="item-left">
        <img src="/static/images/mine-coupon-icon.png" class="item-left__icon">
        <span class="item-left__desc">我的优惠券</span>
      </div>
      <div class="item-right">
        <span class="item-right__content">2张优惠券可用</span>
        <img src="/static/images/me_icon_blackarrow.png.png" alt="">
      </div>
    </div>
    <div class="item">
      <button open-type="contact" class="contact-btn">
        <div class="item-left">
          <img src="/static/images/mine-service-icon.png" class="item-left__icon">
          <span class="item-left__desc">客服和帮助</span>
        </div>

        <div class="item-right">
          <img src="/static/images/me_icon_blackarrow.png.png" alt="">
        </div>
      </button>
    </div>
    <div class="item" @click="toSettings">
      <div class="item-left">
        <img src="/static/images/mine-setting-icon.png" class="item-left__icon">
        <span class="item-left__desc">设置</span>
      </div>
      <div class="item-right">
        <img src="/static/images/me_icon_blackarrow.png.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {

    /**
     * @description 优惠券
     */
    discount() {
      this.$emit('discount')
    },

    toSettings () {
      this.$emit('toSettings')
    }
  }
}
</script>

<style lang="scss" scoped>
.bar{
  background:rgba(255,255,255,1);
  border:1px solid rgba(255,255,255,1);
  border-radius:10rpx;
  padding: 0 40rpx;
  .contact-btn{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: #ffffff;
    justify-content: space-between;
  }
  .item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30rpx;
    border-bottom: 1px solid #E4E4E4;
    height:106rpx;
    box-sizing: border-box;
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    &-left{
      display: flex;
      color: #636363;
      align-items: center;
      &__icon {
        width: 42rpx;
        height: 42rpx;
        margin-right: 21rpx;
      }
    }
    &-right{
      display: flex;
      align-items: center;
      color: #CACACA;
      position: relative;
      right: -14rpx;
      img{
        width: 46rpx;
        height: 46rpx;
      }
    }
  }
}
</style>
