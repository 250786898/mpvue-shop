<template>
  <div class="bar">
    <div class="bar-main">
      <div class="bar-title">
        优惠券
      </div>
      <scroll-view
        :scroll-x="true"
        :scroll-into-view="toCurrentNavItem"
        :scroll-with-animation="true"
        style=" white-space: nowrap; "
        class="coupon-list"
      >
        <div class="coupon-item">
          <div>满99减15元</div>
          <div class="coupon-item-circle"></div>
        </div>
         <div class="coupon-item">
          <div>满99减15元</div>
          <div class="coupon-item-circle"></div>
        </div>
         <div class="coupon-item">
          <div>满99减15元</div>
          <div class="coupon-item-circle"></div>
        </div>
         <div class="coupon-item">
          <div>满99减15元</div>
          <div class="coupon-item-circle"></div>
        </div>
         <div class="coupon-item">
          <div>满99减15元</div>
          <div class="coupon-item-circle"></div>
        </div>

      </scroll-view>
    </div>

    <div class="grayarrow-icon">
      <img src="/static/images/downward-bg-icon.png" class="grayarrow-icon__bg" alt="">
       <img src="/static/images/common_icon_grayarrow.png.png" class="grayarrow-icon__main" mode="aspectFit">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.bar{
  height:86rpx;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0rpx 0 20rpx;
  box-sizing: border-box;
  background: #ffffff;
  &-main{
    display: flex;
    align-items: center;
  }
  &-title{
    color: #9B9B9B;
    font-size: 28rpx;
  }
  .coupon-list {
    display: flex;
    margin-left: 29rpx;
    width: 614rpx;
    padding: 0;
    align-items: center;
    font-size: 0;
    .coupon-item{
      position: relative;
      padding: 0 14rpx 0 8rpx;
      height:32rpx;
      line-height: 32rpx;
      text-align: center;
      display: inline-block;
      background:rgba(255,56,89,1);
      border-radius:3rpx;
      color: #fff;
      font-size: 20rpx;
      margin-right: 10rpx;
      &-circle{
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background: #fff;
        z-index: 2;
        position: absolute;
        right: -5rpx;
        top: 11rpx;
      }
    }
  }
  .grayarrow-icon{
    width:77rpx;
    height:86rpx;
    position: absolute;
    right: 0;
    top: 0;
    &__bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }
    &__main{
      width: 32rpx;
      height: 28rpx;
      position: absolute;
      top: 30rpx;
      left: 30rpx;
    }
  }
}
</style>
