<template>
  <div class="list">
    <div class="order-item" v-for="(item,index) in orderList" v-bind:key="index">
      <OrderCard :item="item" @refreshOrder="refreshOrder" />
    </div>

  </div>
</template>

<script>
import OrderCard from '../OrderCard'
export default {
  components: {
    OrderCard
  },
  props: {
    orderList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * @description 更新订单列表
     */
    refreshOrder () {
      this.$emit('refreshOrder')
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20rpx;
  box-sizing: border-box;
}
</style>
