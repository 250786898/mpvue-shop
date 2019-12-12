<template>
  <div class="store-list">
    <div class="store-list-item">
       <div class="store-name">乐家生鲜（天朗店）</div>
       <div class="detail-address">广州市天河区华港花园华建小区14号铺（华景新城）</div>
    </div>
    <div class="store-list-item">
       <div class="store-name">乐家生鲜（天朗店）</div>
       <div class="detail-address">广州市天河区华港花园华建小区14号铺（华景新城）</div>
    </div>
    <div class="store-list-item">
       <div class="store-name">乐家生鲜（天朗店）</div>
       <div class="detail-address">广州市天河区华港花园华建小区14号铺（华景新城）</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
page{
  background: #F1F1F1;
}
</style>

<style lang="scss" scoped>
.store-list{
  background: #f5f5f5;
  padding: 20rpx 0 0rpx 0;
  &-item{
    background: #ffffff;
    padding: 40rpx 30rpx 20rpx;
    box-sizing: border-box;
    &:after{
      border-bottom: 1px solid #929292;
      content: ' ';
      display: block;
      height: 1px;
      width: 100%;
      margin-top: 20rpx;
    }
    &:nth-last-of-type(1) {
      &:after{
        border: none;
      }
    }

    .store-name{
      margin-bottom: 14rpx;
      font-size: 32rpx;
      font-weight:bold;
    }
    .detail-address{
      color: #999999;
      margin-top: 17rpx;
      font-size: 28rpx;
      line-height: 1.3;
    }
  }
}
</style>
