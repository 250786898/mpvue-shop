<template>
  <div class="container" >
    <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/network_error_icon.png" mode="widthFix" class="error_icon">
    <p class="error_text">没有信号，点击刷新按钮试试~</p>
    <button type="primary" class="error_btn" @click="refresh">刷新一下</button>
  </div>

</template>

<script>
  export default {

    methods: {
      /**
       * @description 刷新一下，监听网络是否发生改变，监听到有网络则返回首页
       */
      refresh () {
        wx.showLoading()
        wx.getNetworkType({
          success: function(res) {
            console.log('refresh',res)
            console.log('netword',res)
            if(res.networkType != 'none'){
              //监听到有网络跳转回上一个页面
              console.log('监听到有网络跳转回上一个页面')
              wx.reLaunch({
                url: '/pages/index/main'
              })
            }else{
              //还是无网络留在此页面
              setTimeout(() => {
                wx.hideLoading()
              },1500)
            }
          }
        })
      },

      change (e) {
        console.log('e',e)
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .error_icon{
      width: 468rpx;
      height: 328rpx;
      margin: 215rpx 0 20rpx 0;
    }
    .error_text{
      font-size:28rpx;
      color: #666666;
      margin-bottom: 50rpx;
    }
    .error_btn{
      width:580rpx;
      height:80rpx;
      line-height: 80rpx;
      font-weight:bold;
      font-size: 32rpx;
      border-radius:10rpx;
    }
  }
</style>
