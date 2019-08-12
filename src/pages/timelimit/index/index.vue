<template>
  <div>
    <scroll-view :scroll-x="true">
      <div class="round-item acitve">
        <div class="round-item__title">8:00</div>
        <div class="round-item__desc">抢购中</div>
      </div>
      <div class="round-item">
        <div class="round-item__title">9:00</div>
        <div class="round-item__desc">即将开抢</div>
      </div>
      <div class="round-item">
        <div class="round-item__title">10:00</div>
        <div class="round-item__desc">即将开抢</div>
      </div>
      <div class="round-item">
        <div class="round-item__title">11:00</div>
        <div class="round-item__desc">即将开抢</div>
      </div>
      <div class="round-item">
        <div class="round-item__title">12:00</div>
        <div class="round-item__desc">即将开抢</div>
      </div>
      <div class="round-item">
        <div class="round-item__title">13:00</div>
        <div class="round-item__desc">即将开抢</div>
      </div>
      <div class="round-item">
        <div class="round-item__title">14:00</div>
        <div class="round-item__desc">即将开抢</div>
      </div>
      <div class="round-item">
        <div class="round-item__title">15:00</div>
        <div class="round-item__desc">即将开抢</div>
      </div>
    </scroll-view>

    <div class="timelimit-tip">
      <span>疯狂抢购中 不要在犹豫中错过</span>
      <div class="countdown">
        <span>距结束</span>
        <countdowner></countdowner>
      </div>
    </div>

    <div class="goods-row-item" v-for="item in [1,2,3]" :key="item">
      <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
          <img class="weui-media-box__thumb" src="http://bucketlejia.oss-cn-shenzhen.aliyuncs.com/home_banner.png@2x.png"/>
        </div>
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__title">西域香妃雪梨 1000g</div>
          <div class="weui-media-box__desc">天山雪水滋养，肌肤水嫩，肉质酥脆</div>
          <div style="height: 60rpx;">
            <div class="progress" v-if="item === 1">
              <div class="progress__fill" style="width: 60%;"></div>
              <div class="progress__text">已售60%</div>
            </div>
          </div>
          <div class="goods-row-item__tb">
            <span class="primary">￥13.80</span>
            <span class="secondary">￥13.80</span>
            <button type="primary" class="bg-red" v-if="item === 1">去抢购</button>
            <button type="primary" class="bg-gradient" v-if="item === 2">提醒我</button>
            <button type="primary" :plain="true" v-if="item === 3">取消提醒</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="fixed">
      <fixed-cart-icon></fixed-cart-icon>
    </div>
  </div>
</template>

<script>
  import Countdowner from '@/components/Countdowner'
  import FixedCartIcon from '@/components/FixedCartIcon'

  export default {
    components: {
      Countdowner,
      FixedCartIcon
    }
  }
</script>

<style lang="scss">
  page{ background-color: #FFE355; }
</style>

<style scoped lang="scss">
  scroll-view {
    height: 126rpx;
    background-color: #FF6363;
    white-space: nowrap;
  }
  .round-item {
    padding: 24rpx;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    color: rgba(255, 255, 255, .7);
    font-size: 26rpx;
    line-height: 40rpx;
    &__title {
      font-size: 34rpx;
    }
    &.acitve {
      color: rgb(255, 255, 255);
      font-size: 30rpx;
      .round-item__title {
        font-size: 38rpx;
      }
    }
  }

  .goods-row-item {
    margin: 20rpx;
    .weui-media-box {
      border-radius: 6rpx;
      background-color: #fff;
      &__hd {
        width: 194rpx;
        height: 194rpx;
      }
      &__title {
        margin-bottom: 6rpx;
      }
      &__desc {
        margin-bottom: 10rpx;
        height: 40rpx;
        -webkit-line-clamp: 1;
      }
  
      .progress {
        position: relative;
        width: 300rpx;
        height: 32rpx;
        border-radius: 16rpx;
        border: 2rpx solid #F51414;
        &__fill {
          position: absolute;
          left: 0;
          top: -2rpx;
          bottom: 0;
          border-radius: 16rpx;
          background-color: #F51414;
        }
        &__text {
          position: absolute;
          left: 40rpx;
          font-size: 26rpx;
          line-height: 32rpx;
          color: #fff;
        }
      }

      button {
        float: right;
        margin-top: 4rpx;
        padding-left: 0;
        padding-right: 0;
        width: 152rpx;
        border-radius: 26rpx;
        line-height: 52rpx;
        font-size: 28rpx;
      }
    }
  }

  .timelimit-tip {
    padding: 20rpx 20rpx 8rpx;
    font-size: 28rpx;
    .countdown {
      margin-top: 6rpx;
      font-size: 26rpx;
      float: right;
      span {
        margin-right: 10rpx;
      }
      /deep/ .countdowner {
        vertical-align: middle;
      }
    }
  }

  .fixed /deep/ .fixed-cart-icon {
    top: auto;
    bottom: 80rpx;
  }
</style>
