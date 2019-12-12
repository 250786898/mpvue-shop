<template>
  <div class="current-price" :style="colorStyle">
    <span class="current-price__sign" :style="signStyle">￥</span>
    <span class="current-price-before-point" :style="beforeStyle" >13</span>
    <span class="current-price__point" :style="beforeStyle">.</span>
    <span class="current-price-after-point" :style="aftetStyle">80</span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#ff0000'
    },
    signSize: {
      type: Number,
      default: 46
    },
    beforeSize: {
      type: Number,
      default: 72
    },
    afterSize: {
      type: Number,
      default: 50
    }
  },

  computed: {
    signStyle () {
      return `font-size: ${this.signSize}rpx`
    },
    beforeStyle () {
      return `font-size: ${this.beforeSize}rpx`
    },
    aftetStyle () {
      return `font-size: ${this.afterSize}rpx`
    },
    colorStyle () {
      return `color:${this.color}`
    }
  }
}
</script>

<style lang="scss" scoped>
.current-price{
  font-weight: bold;
  &__sign{
    font-size: 24rpx;
  }
  &-before-point{
    font-size: 38rpx;
  }
  &__point{
    font-size: 38rpx;
  }
  &-after-point{
    font-size: 28rpx;
  }
}
</style>
