<template>
  <div class="empty">{{ text }}</div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style scoped lang="scss">
  .empty {
    padding: 100rpx 40rpx;
    text-align: center;
    font-size: 28rpx;
    color: #999;
  }
</style>