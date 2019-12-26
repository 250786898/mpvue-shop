<template>
  <div class="history">
    <div class="history-header">
      <div class="history-header__title">搜索历史</div>
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/search_icon_delete.png.png" class="delete-icon">
    </div>
    <div class="history-list">
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
      <div class="history-list-item">
        <Keyword />
      </div>
    </div>
  </div>
</template>

<script>
import Keyword from '../Keyword'
export default {
  components: {
    Keyword
  }
}
</script>

<style lang="scss" scoped>
.history{
  padding: 0 32rpx 0 20rpx;
  &-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 11rpx;
    &__title{
      color: #3B3D40;
      font-size: 30rpx;
      font-weight: bold;
    }
    .delete-icon{
      width: 46rpx;
      height: 46rpx;
    }
  }
  &-list{
    &-item{
      display: inline-block;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
    }
  }

}
</style>
