
<template>
  <div class="details">
    <div class="details-content">
      <span class="details-content__label">申请时间：</span>
      <span class="details-content__con">{{time}}</span>
    </div>
    <div class="details-content" v-if="number">
      <span class="details-content__label">退款编号：</span>
      <span class="details-content__con">{{number}}</span>
    </div>
    <div class="details-content" v-if="reason">
      <span class="details-content__label">退款原因：</span>
      <span class="details-content__con">{{reason}}</span>
    </div>
    <div class="details-content" v-if="count">
      <span class="details-content__label">申请件数：</span>
      <span class="details-content__con">{{count}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: ""
    }, //申请时间
    number: {
      type: String,
      default: ""
    }, //退款编号
    reason: {
      type: String,
      default: ""
    }, //退款原因
    count: {
      type: Number,
      default: 1
    } //退款数量
  }
};
</script>

<style lang="scss" scoped >
.details {
  width: 100%;
  background: #fff;
  border-radius: 10rpx;
  margin-top: 20rpx;
  &-content {
    padding: 0 35rpx 30rpx 35rpx;
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 28rpx;
    &:nth-of-type(1) {
      padding-top: 30rpx;
    }
  }
}
</style>
