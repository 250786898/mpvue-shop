<template>
<div v-if="shown">
  <div class="mask"></div>
   <div class="popnp">
    <img src="/static/images/popnp.png">
    <p @click="confirm">确定</p>
  </div>
</div>
 
</template>
<script>
  export default {
    props: {
      shown: {
        type: Boolean,
        default: false
      },
    },

     methods: {
      confirm(){
         wx.navigateTo({
            url: '/pages/mine/main'
        })
      },
     },
  }
</script>

<style scoped lang="scss">
.mask{
  background-color: #000;
  width: 100%;
  height: 100%;
  z-index: 2;
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
    z-index: 10;
    // background: red;
    img {
      vertical-align: middle;
      width: 524rpx;
      height: 520rpx;
      position: relative;
       z-index: 11;
    }
    .text {
      padding:20rpx;
      font-size:26rpx;
      color:#999;
      text-align:center;
    }
    p{
      width:338rpx;
      height:86rpx;
      background:rgba(17,210,200,1);
      border-radius:41rpx;
      font-size: 32rpx;
      text-align:center;
      line-height: 86rpx;
      position: absolute;
      bottom:6%;
      left:18%;
      z-index: 99;
    }
  }
</style>