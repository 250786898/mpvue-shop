<template>
  <div class="box">
    <div class="goods-row-item__price" style=" position: absolute;top: 0rpx;">
      <div class="primary">￥{{ item.onlinePrice }}</div>
      <div class="secondary" v-if="item.onlineScribingPrice">￥{{ item.onlineScribingPrice }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      showNormalTag: {
        type: Boolean,
        default: () => false
      }
    }
  }
</script>
<style lang="scss" scoped>
.box{

  position: relative;
  .line-through{
  text-decoration: line-through;
}
.goods-row-item__price {
  position: absolute;
  top: 150rpx;
  .primary{
    position:absolute;
    top:7rpx;
  }
.secondary{
  position:absolute;
    top:35rpx;
}

}
}

</style>
