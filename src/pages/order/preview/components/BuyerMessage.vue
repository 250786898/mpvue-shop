<template>
  <div class="weui-cells form-cells">
    <div class="weui-cell">
      <div class="weui-cell__hd">买家留言：</div>
      <div class="weui-cell__bd">
        <input type="text" v-model.trim="orderMessages" placeholder="（选填）给卖家留言，最多100个字" maxlength="100">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 .form-cells {
  width: 702rpx;
  border-radius:14rpx;
  margin-top: 20rpx;
  &:before,
  &:after {
    display: none;
  }
  .weui-cell {
    &__hd {
      color: $text-black;
      font-size: 28rpx;

    }
    &__bd input {
      font-size: 28rpx;
    }
  }
}
</style>
