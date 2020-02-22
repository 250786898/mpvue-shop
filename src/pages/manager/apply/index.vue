<template>
  <div class="container">
    <img src="/static/images/manager-apply-bj.png" class="apply-bg" />
    <div class="content-card">
      <h3 class="title">申请团长</h3>
      <p class="desc">需要您填写真实姓名和手机号，便于联系</p>
      <div class="item">
        <div class="item-title">申请小区</div>
        <input class="item-input" placeholder="请输入小区名称" placeholder-style="color:#D2D2D2;font-size:30rpx;" />
      </div>
      <div class="item">
        <div class="item-title">所在地址</div>
        <!-- <div class="address">请选择地址</div> -->
        <div class="address-content">广东省广州市天河区天河城百货 (东 圃店)</div>
        <!-- <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/me_icon_blackarrow.png.png" class="arrow-icon"> -->
      </div> 
      <div class="item">
        <div class="item-title">手机号</div>
        <input class="item-input" placeholder="请输入手机号" placeholder-style="color:#D2D2D2;font-size:30rpx;" />
      </div> 
      <div class="item">
        <div class="item-title">姓名</div>
        <input class="item-input" placeholder="请输入姓名" placeholder-style="color:#D2D2D2;font-size:30rpx;" />
      </div> 
      <div class="item">
        <div class="item-title">备注</div>
        <input class="item-input" placeholder="请输入备注、选填" placeholder-style="color:#D2D2D2;font-size:30rpx;" />
      </div>   
    </div>

    <button class="submit-btn">提交申请</button>  
  </div>  
</template>

<style>
page{
  background: #F85254;
  padding-bottom: 74rpx;
}
</style>

<style lang="scss" scoped>
.container{
  min-height: 100vh;
  .apply-bg{
    width: 750rpx;
    height: 771rpx;
  }
  .content-card{
    width:710rpx;
    background:rgba(255,255,255,1);
    box-shadow:0px 15rpx 20rpx 7rpx rgba(121,1,3,0.3);
    border-radius:10rpx;
    margin: 0 auto 40rpx;
    padding: 50rpx 30rpx;
    box-sizing: border-box;
    color: #000;
    .title{
      font-weight: bold;
      font-size: 40rpx;
      white-space: nowrap;
    }
    .desc{
      font-size: 30rpx;
      padding: 20rpx 0;
    }
  }
  .item{
    padding: 30rpx 0;
    line-height: 40rpx;
    font-size: 30rpx;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #EFEFEF;
    &:nth-last-of-type(1){
      border-bottom: none;
    }
    .address{
      color: #D2D2D2;
      flex: 1;
      &-content{
        flex: 1;
      }
    }
    &-title{
      text-align-last:justify;
      text-align: justify;
      width: 120rpx;
      margin-right: 50rpx;
    }
    &-input{
      flex: 1;
    }
    .arrow-icon{
      width: 46rpx;
      height: 46rpx;
    }
  }
  .submit-btn{
    width:710rpx;
    height:88rpx;
    background:rgba(255,153,32,1);
    border-radius:10rpx;
    margin: auto;
    color: #ffffff;
    font-size: 34rpx;
    font-weight: bold;
    text-align: center;
    line-height: 88rpx;
  }
}
</style>
