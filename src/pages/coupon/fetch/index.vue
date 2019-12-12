<template>
  <div class="container">
    <CouponCard />
    <CouponCard />
    <CouponCard />
  </div>
</template>

<script>
import CouponCard from '../components/CouponCard'
export default {
  components: {
    CouponCard
  }
}
</script>

<style>
page{
  background: #EEEEEE;
}
</style>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}
</style>
