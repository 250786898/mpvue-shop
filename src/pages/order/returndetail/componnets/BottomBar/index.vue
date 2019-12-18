<!--
 * @description:
 -->
<!--
 * @description:底部撤销售后
 -->
<template>
  <div class="bar">
    <button type="default" class="bar-button">撤销售后</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped >
.bar {
  position: fixed;
  width: 100%;
  height: 106rpx;
  left: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &-button {
    margin-right: 20rpx;
    width: 187rpx;
    height: 64rpx;
    line-height: 64rpx;
    font-size: 32rpx;
  }
}
</style>
