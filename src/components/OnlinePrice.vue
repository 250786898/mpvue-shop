<template>
  <div class="current-price" :style="priceStyle">
    <span class="current-price__sign" :style="signStyle">￥</span>
    <span class="current-price-before-point" :style="beforeStyle" >{{priceBeforeSign}}</span>
    <span class="current-price__point" :style="beforeStyle">.</span>
    <span class="current-price-after-point" :style="aftetStyle">{{afterBeforeSign}}</span>
  </div>
</template>

<script>
export default {
  props: {
    price: {
       type: String,
       default: 24.00
    },
    color: {
      type: String,
      default: '#ff0000'
    },
    signSize: {
      type: Number,
      default: 24
    },
    beforeSize: {
      type: Number,
      default: 38
    },
    afterSize: {
      type: Number,
      default: 28
    },
    isbold: {
      type: Boolean,
      default: true
    }

  },

  computed: {
    priceBeforeSign () {
      if(this.price) {
        console.log('this.price',this.price)
        let priceaArr = this.price.toString().split('.')
       return priceaArr[0] ? priceaArr[0] : ''
      }else{
        return ''
      }

    },
    afterBeforeSign () {
      if(this.price) {
        let priceaArr = this.price.toString().split('.')
        return priceaArr[1] ?  priceaArr[1] : '00'
      }else{
        return ''
      }
    },
    signStyle () {
      return `font-size: ${this.signSize}rpx`
    },
    beforeStyle () {
      return `font-size: ${this.beforeSize}rpx`
    },
    aftetStyle () {
      return `font-size: ${this.afterSize}rpx`
    },
    priceStyle () {
      let fontWeight = this.isbold ? 'bold' : 400
      return `color:${this.color};font-weight: ${fontWeight};`
    }
  }
}
</script>

<style lang="scss" scoped>
.current-price{
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
