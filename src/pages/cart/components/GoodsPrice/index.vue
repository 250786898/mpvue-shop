<template>
  <div class="goods-row-item__price">
    <div class="primary">￥{{ item.onlinePrice }}</div>
    <div class="secondary" v-if="item.onlineScribingPrice">￥{{ item.onlineScribingPrice }}</div>
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
.line-through{
  text-decoration: line-through;
}
.goods-row-item__price {
  display: flex;
  .primary{

  }
  .secondary{

  }

}

</style>
