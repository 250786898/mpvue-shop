<template>
  <!-- 底部 -->
  <div class="footer-bar">
    <div class="footer-bar-left">
       <span>应付款:</span>
       <div class="price"><online-price :price="orderAmount" :signSize="29" :beforeSize="44" :afterSize="44" /></div>
    </div>

    <form report-submit @submit="uploadFormId" >
      <button  type="primary" class="radius bg-gradient submit-btn" form-type="submit" @click="submit">提交订单</button>
    </form>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
export default {
  props: {
    orderAmount: { //订单总价格
      type: Number,
      default: 0
    }
  },

  components: {
    OnlinePrice
  },

  methods: {
    /**
     * @description 提交订单
     */
    submit () {
      this.$emit('submit')
    }

  }
}
</script>

<style lang="scss" scoped>
.footer-bar {
  width: 100%;
  height: 105rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  text-align: left;
  z-index: 10;
  padding-left:52rpx;
  padding-right: 20rpx;
  box-sizing: border-box;
  &-left{
    display: flex;
    align-items: center;
  }
  span {
    font-size: 36rpx;
    font-weight: 900;
    color: $text-black;
    vertical-align: middle;
    line-height: 80rpx;
  }

  .price {
    margin-left: 19rpx;
  }

  .submit-btn {
    width:220rpx;
    height:80rpx;
    line-height: 80rpx;
    text-align: center;
    background:rgba(1,189,159,1);
    border-radius:10rpx;
    font-size: 32rpx;
    color: #fff;
  }
}
</style>
