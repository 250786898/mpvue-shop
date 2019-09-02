<template>
  <div>
    <div class="select-store-card">
      <div class="select-store-card__title">附近门店</div>
      <template v-for="(item,index) in storeList">
        <store-card :key="index" :item="item" :showLine="isShowLine(index)" />
      </template>
    </div>
    <div class="no-store-tip">抱歉，您附近没有更多门店</div>
  </div>
  
   
</template>

<script>
import StoreCard from '../../../components/StoreCard/index'
export default {
  props: {
    storeList: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    /**
     * @description 判断是否显示底线，最后一个不显示
     */
    isShowLine (index) {
      return (index+1) == this.storeList.length ? false : true
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