<template>
  <div class="empty-coupon-box">
     <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/picture_Default page_png.png" class="empty-coupon_icon" alt="">
     <div class="empty-coupon_text">还没有优惠券哦~</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty-coupon-box{
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 205rpx 0 288rpx 0;
  background: #ffffff;
  margin-top: 20rpx;
  border-radius:10rpx;
}
.empty-coupon_icon{
  width: 444rpx;
  height: 320rpx;
}
.empty-coupon_text {
  color: #666666;
  font-size: 28rpx;
}
</style>
