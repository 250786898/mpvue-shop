<template>
  <div class="weui-cells form-cells">
    <div class="weui-cell">
      <div class="weui-cell__hd">买家留言：</div>
      <div class="weui-cell__bd">
        <input type="text" :value="message" @input="inputMessage" placeholder="（选填）给卖家留言，最多100个字" maxlength="100">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: { //留言信息
      type: String,
      value: ''
    }
  },
  model: {
    prop:'message',
    event: 'inputMessage'
  },

  methods: {
    /**
     * @description 输入留言信息
     */
    inputMessage (e) {
      this.$emit('inputMessage',e.mp.detail.value)
    }
  }
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
