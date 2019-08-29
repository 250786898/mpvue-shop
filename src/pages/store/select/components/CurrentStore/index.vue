<template>
  <div class="select-store-card">
    <div class="select-store-card__title">当前门店</div>
    <store-card :item="item" />
  </div>
</template>

<script>
import StoreCard from '../StoreCard/index'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    console.log('storeInfo',this.storeInfo)
  },
  components: {
    StoreCard
  }
}
</script>

<style lang="scss" scoped>

</style>