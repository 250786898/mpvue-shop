<template>
  <div class="order-card">
    <div class="order-card-time">2019-09-26 09:59:40</div>
    <div class="order-card-goods">
      <div class="order-card-goods__img">
        <img src="/static/images/empty_order_tips.png" alt v-for="(item,index) in  4" :key="index" />
      </div>
      <div class="order-card-goods__more">
        <span>共4件</span>
        <img src="/static/images/right_arrows_icon.png" alt />
      </div>
    </div>
    <div class="order-card-status">
      <span>退货/退款</span>
      <span>待处理</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped >
.order-card {
  width: 710rpx;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 10rpx;
  &-time {
    height: 89rpx;
    padding-left: 22rpx;
    line-height: 89rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  &-goods {
    height: 170rpx;
    width: 662rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2rpx solid #ebebeb;
    border-bottom: 2rpx solid #ebebeb;
    margin: 0 auto;
    &__img {
      img {
        width: 112rpx;
        height: 112rpx;
        margin-right: 10rpx;
        border-radius: 50%;
        background: #ccc;
      }
    }
    &__more {
      display: flex;
      align-items: center;
      span {
        font-weight: 500;
        color: rgba(113, 113, 113, 1);
      }
      img {
        width: 46rpx;
        height: 46rpx;
      }
    }
  }
  &-status {
    height: 89rpx;
    line-height: 89rpx;
    font-weight: 500;
    color: rgba(175, 175, 175, 1);
    font-size: 28rpx;
    margin-left: 22rpx;
  }
}
</style>
