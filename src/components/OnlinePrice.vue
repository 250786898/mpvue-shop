<!--
 * @description:
 -->
<template>
  <div class="current-price" :style="priceStyle">
    <div class="current-price__sign" :style="signStyle">￥</div>
    <div class="current-price-before-point" :style="beforeStyle" >{{priceBeforeSign}}</div>
    <div class="current-price__point" :style="aftetStyle" v-if="showAfterSign">.</div>
    <div class="current-price-after-point" :style="aftetStyle" v-if="showAfterSign">{{priceAfterSign}}</div>
  </div>
</template>

<script>
export default {
  props: {
    price: { //价格
       type: String,
       default: 24.00
    },
    color: { //价格颜色
      type: String,
      default: '#ff0000'
    },
    signSize: { //符号字体大小
      type: Number,
      default: 24
    },
    beforeSize: { //符号前价格字体大小
      type: Number,
      default: 38
    },
    afterSize: { //符号后羿价格字体大小
      type: Number,
      default: 28
    },
    isbold: { //价格是否粗体
      type: Boolean,
      default: true
    },
    showAfterSign: { //是否显示小数点后两位
      type: Boolean,
      default: true
    }

  },

  computed: {
    priceBeforeSign () { //符号前价格数量
      if(this.price) {
        console.log('this.price',this.price)
        let priceaArr = this.price.toString().split('.')
       return priceaArr[0] ? priceaArr[0] : ''
      }else{
        return '0'
      }

    },
    priceAfterSign () { //符号后价格数量
      if(this.price) {
        let priceaArr = this.price.toString().split('.')
        return priceaArr[1] ?  priceaArr[1] : '00'
      }else{
        return '00'
      }
    },
    signStyle () { //符号的样式
      return `font-size: ${this.signSize}rpx;`
    },
    beforeStyle () { //符号前的样式
      return `font-size: ${this.beforeSize}rpx;`
    },
    aftetStyle () { //符号后的样式
      return `font-size: ${this.afterSize}rpx;`
    },
    priceStyle () { //价格后的样式
      let fontWeight = this.isbold ? 'bold' : 400
      return `color:${this.color};font-weight: ${fontWeight};`
    }
  }
}
</script>

<style lang="scss" scoped>
.current-price{
  display: flex;
  align-items: flex-end;
  font-size: 0;
  div {
    display: inline-block;
    vertical-align: bottom;
  }
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
