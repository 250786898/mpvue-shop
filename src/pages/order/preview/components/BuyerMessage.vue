<template>
  <div class="card">
      <div class="card-title">买家留言</div>
      <div class="card-content">
        <input
          type="text"
          class="card-content__input"
          :value="message"
          @input="inputMessage"
          placeholder="可以告诉我们您的需求"
          placeholder-style="color:#999999"
          maxlength="100"
        >
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
 .card {
  font-size: 28rpx;
  display: flex;
  height: 87rpx;
  align-items: center;
  justify-content:space-between;
  padding: 0 30rpx;
  box-sizing: border-box;
  background: #ffffff;
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
  border-bottom: 1rpx #E4E4E4 solid;
  &-title{
    font-weight: bold;
  }
  &-content{
    color: #999999;
    &__input{
      text-align: right;
    }
  }
}
</style>
