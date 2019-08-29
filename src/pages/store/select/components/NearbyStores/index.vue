<template>
  <div>
    <div class="select-store-card">
      <div class="select-store-card__title">附近门店</div>
      <template v-for="(item,index) in storeList">
        <store-card :key="index" :item="item" />
      </template>
    </div>
    <div class="no-store-tip">抱歉，您附近没有更多门店</div>
  </div>
  
   
</template>

<script>
import StoreCard from '../StoreCard/index'
export default {
  props: {
    storeList: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    StoreCard
  }
}
</script>

<style lang="scss" scoped>
.no-store-tip{
  padding: 60rpx 0;
  color: #999999;
  font-size: 24rpx;
  text-align: center;
}
</style>