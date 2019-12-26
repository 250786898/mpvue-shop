<template>
  <div class="result">
    <div class="result-item">
      <span class="activity">车</span>厘子(100g)
    </div>
    <div class="result-item">
      <span>车</span>厘子(100g)
    </div>
    <div class="result-item">
      <span>车</span>厘子(100g)
    </div>
    <div class="result-item">
      <span>车</span>厘子(100g)
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.result{
  padding: 0 20rpx;
  box-sizing: border-box;
  &-item{
    color: #929292;
    font-size: 28rpx;
    height: 74rpx;
    line-height: 74rpx;
    border-bottom: 1rpx solid #E4E4E4;
    .activity{
      color: #01BD9F;
    }
  }
}
</style>
