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

<style lang="scss" scoped>
.store-list{
  background: #f5f5f5;
  padding: 20rpx 0 0 0;
  &-item{
    background: #ffffff;
    padding: 20rpx;
    box-sizing: border-box;
    &:after{
      border-bottom: 1px solid #eee;
      content: ' ';
      display: block;
      height: 1px;
      width: 100%;
      margin-top: 10rpx;
    }

    .store-name{
      margin-bottom: 14rpx;
      font-size: 32rpx;
    }
    .detail-address{
      color: $text-gray;
      font-size: 26rpx;
    }
  }
}
</style>
