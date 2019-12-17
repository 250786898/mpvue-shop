<template>
  <div class="bar">
    <div class="pay-time-remaining">
      <span>支付剩余时间</span>
      <span class="timer"> 300S</span>
    </div>
    <div class="bar-tip">请在订单提交后，尽快付款，超时订单将自动取消</div>
    <div class="btn-group">
      <button type="default">取消订单</button>
      <button type="primary">立即支付</button>
      <button type="primary" :plain="true" >取消订单</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
