<template>
  <div class="empty-container">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/empty-search-icon.png" class="empty-search-icon" />
    <div class="empty-desc">抱歉，没有搜索到门店</div>
    <div class="empty-desc">建议您，请选择离您 最近门店提货</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .empty-container{
    width: 100vw;
    height: 975rpx;
    background: #fff;
    padding: 46rpx 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .empty-search-icon{
    width: 329rpx;
    height: 289rpx;
    margin-bottom: 25rpx;
  }
  .empty-desc{
    font-size:24rpx;
    color: #666;
    line-height: 34rpx;
  }
</style>
