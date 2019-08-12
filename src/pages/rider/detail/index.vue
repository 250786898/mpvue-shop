<template>
  <div>
    <div class="rider-info">
      <div class="weui-cell bg-gradient">
        <div class="weui-cell__hd">
          <img src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg">
        </div>
        <div class="weui-cell__bd">
          <h4>紫小鲸</h4>
          <div>满意度50%</div>
        </div>
        <div class="weui-cell__ft" @click="callRider">
          <img src="/static/images/phone@2x.png">
        </div>
      </div>
    </div>
    <div class="weui-flex">
      <div class="weui-flex__item">
        <h4>3310公里</h4>
        <div>总里程</div>
      </div>
      <div class="weui-flex__item">
        <h4>100%</h4>
        <div>准时率</div>
      </div>
      <div class="weui-flex__item">
        <h4>33.1分钟</h4>
        <div>平均送时长</div>
      </div>
    </div>
  
    <div class="complaint">
      <navigator url="/pages/rider/complaint/main" class="weui-cell weui-cell_access">
        <div class="weui-cell__ft weui-cell__ft_in-access">
          投诉
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },

    methods: {
      callRider() {
        wx.makePhoneCall({
          phoneNumber: '10086'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rider-info {
    .weui-cell {
      padding-top: 48rpx;
      padding-bottom: 48rpx;
      &__hd img {
        vertical-align: middle;
        margin-right: 30rpx;
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
      }
      &__bd {
        font-size: 30rpx;
        color: #fff;
        h4 {
          font-size: 34rpx;
          line-height: 60rpx;
        }
      }
      &__ft img {
        vertical-align: middle;
        width: 45rpx;
        height: 49rpx;
      }
    }    
  }

  .weui-flex {
    padding-top: 40rpx;
    padding-bottom: 40rpx;
    &__item {
      text-align: center;
      font-size: 28rpx;
      h4 {
        font-size: 34rpx;
      }
    }
  }

  .complaint {
    .weui-cell {
      &__ft {
        margin: 0 auto;
        text-align: center;
        font-size: 32rpx;
        color: $theme-color-light;
        &:after {
          border-color: $theme-color-light;
        }
      }
    }
  }
</style>
