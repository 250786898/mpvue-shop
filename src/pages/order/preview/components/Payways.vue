<template>
  <div class="card">
      <div class="card-title">支付方式</div>
      <div class="card-content">
        <div>微信支付</div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 .card {
  font-size: 28rpx;
  display: flex;
  height: 87rpx;
  align-items: center;
  justify-content:space-between;
  padding: 0 30rpx;
  box-sizing: border-box;
  background: #ffffff;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
  margin-bottom: 20rpx;
  &-title{
    font-weight: bold;
  }
  &-content{
    color: #01BD9F;
    &__input{
      text-align: right;
    }
  }
}
</style>
