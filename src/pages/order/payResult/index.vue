<template>
 <div class="result">
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/pay-success-icon.png" class="result-icon">
    <div class="result-text">支付成功</div>

    <div class="btn-group">
      <button>订单详情</button>
      <button>返回首页</button>
    </div>
 </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.result{
  padding-top: 100rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-icon{
    width: 180rpx;
    height: 180rpx;
    margin-bottom: 19rpx;
  }
  &-text{
    font-size: 40rpx;
  }
  button{
    width:470rpx;
    height:80rpx;
    border:1rpx solid rgba(121,121,121,1);
    border-radius:10rpx;
    color: #797979;
    font-size: 34rpx;
    &:nth-of-type(1) {
      margin-bottom: 30rpx;
    }
  }
  .btn-group{
    position: fixed;
    bottom: 127rpx;
  }
}
</style>
