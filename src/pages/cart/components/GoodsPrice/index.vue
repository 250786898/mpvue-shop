<template>
  <div class="goods-row-item__price">
    <div class="primary" :class="{ 'failure-price' : isFailure  }">
      <OnlinePrice :signSize="24" :beforeSize="38" :afterSize="38" :price="item.onlinePrice" />
    </div>
    <div class="secondary" v-if="item.onlineScribingPrice">￥{{ item.onlineScribingPrice }}</div>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
  export default {
    components: {
      OnlinePrice
    },
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      isFailure: {
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
  align-items: flex-end;
  line-height: 1;
  .secondary{
    color: #3D3C3C;
    font-size: 24rpx;
    margin-left: 12rpx;
  }

}
.failure-price{
  color: #999999;
}

</style>
