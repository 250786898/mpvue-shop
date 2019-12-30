<template>
  <div>
    <div class="select-store-card">
      <div class="select-store-card__title">附近门店</div>
      <template v-if="storeList.length > 0">
        <store-card v-for="(item,index) in storeList" :key="index" :item="item" :showLine="isShowLine(index)" :showDistance="isCurrentLocateCity" :last-router="lastRouter" />
      </template>
      <template v-else>
        <no-availabe-servie />
      </template>
    </div>
    <!-- <div class="no-store-tip" v-if="storeList.length > 0">抱歉，您附近没有更多门店</div> -->
  </div>


</template>

<script>
import StoreCard from '../../../components/StoreCard/index'
import storeMinxin  from '@/mixin/store'
import NoAvailabeServie from '../NoAvailabeServie/index'
export default {
  mixins: [storeMinxin],
  props: {
    storeList: {
      type: Array,
      default: () => ([])
    },
    isCurrentLocateCity: {
      type: Boolean,
      default: false
    },
    lastRouter:{ //上一个路由名称
      type: String,
      default: ''
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
    StoreCard,
    NoAvailabeServie
  }
}
</script>

<style lang="scss" scoped>
.select-store-card{
  z-index:10;
  position: relative;
}
.no-store-tip{
  padding: 60rpx 0;
  color: #999999;
  font-size: 24rpx;
  text-align: center;
}
</style>
