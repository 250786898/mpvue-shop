<template>
  <div>
    <div class="main-tip">店内购物请先定位门店</div>
    <shop-list></shop-list>
  </div>
</template>

<script>
  import ShopList from '@/components/ShopList'

  export default {
    components: {
      ShopList
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-tip {
    text-align: center;
    padding: 60rpx;
    font-size: 32rpx;
    color: $text-black;
    // font-weight: 700;
  }
</style>
