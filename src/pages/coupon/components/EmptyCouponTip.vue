<template>
  <div class="empty-coupon-box">
     <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/empty-coupon_icon.png" class="empty-coupon_icon" alt="">
     <div class="empty-coupon_text">还没有券哦~</div>
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
  margin-top: 207rpx;
}
.empty-coupon_icon{
  width: 340rpx;
  height: 238rpx;
}
.empty-coupon_text {
  color: #666666;
  font-size: 24rpx;
}
</style>
