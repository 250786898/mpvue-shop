<template>
<div v-if="shown" class="popup">
  <div class="mask"></div>
   <div class="popnp">
    <img src="/static/images/popnp.png">
    <p class="confirm"  @click="confirm">确定</p>
  </div>
</div>

</template>
<script>
  import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
  export default {
       data () {
      return {
        ORDER_STATE,
        ORDER_STATE_TEXT

      }
    },

    props: {
      shown: {
        type: Boolean,
        default: false
      },
    },
     methods: {
      confirm(){ 
        wx.navigateTo({
          url:`/pages/order/index/main?status=${ORDER_STATE.FINISHED}`
        })
      },
     },
  }
</script>
<style scoped lang="scss">
  .popup{
    z-index: 99999;
  }
  .confirm{
      width:338rpx;
      height:86rpx;
      color: #fff;
      background:rgba(17,210,200,1);
      border-radius:41rpx;
      font-size: 32rpx;
      text-align:center;
      line-height: 86rpx;
      position: absolute;
      bottom:11%;
      left:18%;
      z-index: 999999;
     }
    .mask{
      background-color: #000;
      width: 100%;
      height: 100%;
      z-index: 99999;
      position: fixed;
      top:0rpx;
      left:0rpx;
      opacity: 0.8;
    }
  .popnp {
    position: fixed;
    top:16%;
    left:16%;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    text-align: center;
    z-index: 999999;
    // background: red;
    img {
      vertical-align: middle;
      width: 524rpx;
      height: 520rpx;
      position: relative;
       z-index: 99;
    }
    .text {
      padding:20rpx;
      font-size:26rpx;
      color:#999;
      text-align:center;
    }
   
  }
</style>