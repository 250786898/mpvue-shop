<template>
  <navigator url="/pages/cart/main" open-type="switchTab" class="container">
    <div class="black-cart">
      <img src="/static/images/theme-add-icon.png" class="cart-icon"  />
      <div class="cart-num" v-if="cartNum && cartNum < 10">{{cartNum}}</div>
      <div class="cart-num circle-radius" v-if="cartNum && cartNum >= 10">{{cartNum}}</div>
    </div>
  </navigator>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name:'ToCartIcon',
  computed: {
     ...mapState(['cartNum'])
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
    // border:3rpx solid rgba(255, 255, 255, 0.45);
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
    // border:3rpx solid rgba(255, 255, 255, 0.45);
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
