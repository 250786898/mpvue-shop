<template>
  <div class="list">
    <CouponCard v-for="item in list" v-bind:key="item.id" :item="item"/>
  </div>
</template>

<script>
import CouponCard from '../CouponCard'
export default {
  components: {
    CouponCard
  },
  props: {
    list: { //优惠券列表
      type: Array,
      default: () => []
    }
  }
}
</script>
