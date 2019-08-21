<template>
  <div class="goods-limit-tab">
    限购{{count}}件
  </div>
</template>

<script>
  export default {
    props: {
      count: {
        type: Number,
        default: 0
      },
    }
  }
</script>
<style lang="scss" scoped>
.goods-limit-tab{
    width:108rpx;
    height:34rpx;
    line-height: 34rpx;
    text-align: center;
    border:2rpx solid rgba(246,108,42,1);
    border-radius:10rpx;
    color: #F66C2A;
    font-size: 20rpx;
}

</style>
