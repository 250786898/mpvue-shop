<template>
  <div>
    <!-- 订单为空 -->
    <empty-order-tips v-if="false" />
    <!-- 订单不为空 -->
    <after-sales-order-card />
  </div>
</template>

<script>
import EmptyOrderTips from "./components/EmptyOrderTips/index"
import AfterSalesOrderCard from "./components/AfterSalesOrderCard/index"

export default {
  components: {
    EmptyOrderTips,
    AfterSalesOrderCard
  }
};
</script>

<style lang="scss" scoped >
</style>
