<template>
  <div class="container">
     <div class="cart" v-if="type == 'white'">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/icon_shopping_png.png" class="cart-icon"  alt="">
      <div class="cart-num" v-if="num <10">{{num}}</div>
      <div class="cart-num circle-radius" v-else>{{num}}</div>
    </div>
    <div class="black-cart" v-else>
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/icon_shopping car_png.png" class="cart-icon"  alt="">
      <div class="cart-num" v-if="num < 100">{{num}}</div>
      <div class="cart-num circle-radius" v-else>{{num}}</div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    num: { //购物车数量
      type: Number,
      default: 15
    },
    type: { //icon类型 white black
      type: String,
      default: 'white'
    }
  }
}
</script>

<style lang="scss" scoped>
.cart{
  width: 57rpx;
  height: 52rpx;
  position: relative;
  &-icon{
    height: 100%;
    width: 100%;
  }
  &-num{
    position: absolute;
    top: -10rpx;
    right: -10rpx;
    min-width:32rpx;
    box-sizing: border-box;
    height:32rpx;
    line-height: 32rpx;;
    background:linear-gradient(90deg,rgba(255,70,40,1),rgba(254,38,38,1));
    border:3rpx solid rgba(255, 255, 255, 0.45);
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 22rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6rpx;
  }
  .circle-radius{
    border-radius: 16rpx;
  }
}
.black-cart{
  width: 80rpx;
  height: 80rpx;
  position: relative;
  &-icon{
    height: 100%;
    width: 100%;
  }
  &-num{
    position: absolute;
    top: -5rpx;
    right: -5rpx;
    box-sizing: border-box;
    height:29rpx;
    line-height: 29rpx;;
    background:linear-gradient(90deg,rgba(255,70,40,1),rgba(254,38,38,1));
    border:3rpx solid rgba(255, 255, 255, 0.45);
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 22rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6rpx;
  }
  .circle-radius{
    border-radius: 16rpx;
  }
}
</style>
