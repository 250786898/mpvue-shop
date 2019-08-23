<template>
  <div class="container">
    <!-- Swiper -->
    <div class="swiper-wrap">
      <swiper :indicator-dots="true" :autoplay="true" class="swiper" :style="swiperHeightStyle">
        <div v-for="item in imgUrls" :key="index">
          <swiper-item>
            <img :src="item" class="slide-image" mode="widthFix" @load="onSwiperImageLoad"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <!-- -->
    <div class="member-card">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <img src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg">
        </div>
        <div class="weui-cell__bd">
          <h4>
            乐小家
            <span class="bg-gradient">
              <img src="">
              普通会员
            </span>
          </h4>
          <p>
            <span>
              <img src="">
              ￥0.00
            </span>
            <span>
              <img src="">
              1000
            </span>
          </p>
        </div>
        <div class="weui-cell__ft">
          <navigator url="/pages/qrcode/index/main">
            <button type="primary" class="bg-gradient">
              <img src="">
              会员码
            </button>
          </navigator>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="entry">
      <div class="weui-cell entry__hd">
        <div class="weui-cell__bd">华景001店</div>
        <div class="weui-cell__ft">
          <img src="">
          切换门店
        </div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <navigator open-type="switchTab" url="/pages/goods/index/main" class="entry-block entry-block_l">
            <h4>乐家商城</h4>
            <button type="primary">快来乐家购物吧&gt;</button>
          </navigator>
        </div>
      </div>
    </div>

    <div class="buttons">
      <navigator url="/pages/scanorder/index/main">
        <button type="primary" class="bg-gradient">扫码购订单</button>
      </navigator>
      <navigator url="/pages/mine/info/main">
        <button type="primary" class="bg-gradient">会员资料</button>
      </navigator>
      <navigator url="/pages/bonuspoint/index/main">
        <button type="primary" class="bg-gradient">积分明细</button>
      </navigator>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imgUrls: [
          '/static/images/temp/home_banner.png@2x.png',
          '/static/images/temp/home_banner.png@2x.png',
          '/static/images/temp/home_banner.png@2x.png'
        ],
        swiperHeight: 0,
      }
    },

    computed: {
      swiperHeightStyle() {
        return this.swiperHeight ? `height: ${ this.swiperHeight }rpx;` : ''
      }
    },

    methods: {
      onSwiperImageLoad(e) {
        if (e.target.height > this.swiperHeight) {
          this.swiperHeight = e.target.height
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  img {
    background-color: #DDD;
  }

  .swiper-wrap {
    padding: 28rpx 20rpx 14rpx 20rpx;
    background-color: #fff;
  }
  
  .swiper img {
    vertical-align: middle;
    width: 100%;
  }

  .member-card {
    margin: 10rpx 20rpx;
    .weui-cell {
      padding: 30rpx 40rpx;
      border-radius: 10rpx;
      border: 2rpx solid #0FD7C0;
      &__hd {
        img {
          margin-right: 30rpx;
          width: 102rpx;
          height: 102rpx;
          border-radius: 51rpx;
          vertical-align: middle;
        }
      }
      &__bd {
        font-size: 26rpx;
        color: $text-black;
        h4 {
          margin-bottom: 10rpx;
          font-size: 32rpx;
          span {
            img {
              vertical-align: 0rpx;
              width: 20rpx;
              height: 20rpx;
            }
            display: inline-block;
            padding-left: 20rpx;
            padding-right: 24rpx;
            border-top-left-radius: 15rpx;
            border-bottom-left-radius: 15rpx;
            border-bottom-right-radius: 20rpx;
            height: 30rpx;
            line-height: 30rpx;
            vertical-align: middle;
            font-size: 20rpx;
            color: #FFF;
          }
        }
        p {
          span {
            img {
              vertical-align: -6rpx;
              width: 32rpx;
              height: 32rpx;
            }
            + span {
              margin-left: 16rpx;
            }
          }
        }
      }
      &__ft {
        padding: 20rpx 0 20rpx 40rpx;
        border-left: 2rpx solid #0FD7C0;
        button {
          border-radius: 4rpx;
          box-shadow: 4rpx 4rpx 8rpx rgba(15, 199, 199, 0.3);
          padding-left: 0;
          padding-right: 0;
          width: 126rpx;
          height: 126rpx;
          line-height: 40rpx;
          font-size: 28rpx;
          img {
            display: block;
            width: 56rpx;
            height: 56rpx;
            margin: 14rpx auto 6rpx;
          }
        }
      }
    }
  }

  .entry {
    &__hd {
      font-size: 28rpx;
      .weui-cell {
        &__ft {
          img {
            margin-right: 6rpx;
            vertical-align: 0;
            width: 24rpx;
            height: 24rpx;
          }
          color: #0FD7C0;
        }
      }
    }

    .weui-flex {
      &,
      &__item {
        padding-left: 10rpx;
        padding-right: 10rpx;
      }
    }

    &-block {
      border-radius: 10rpx;
      &_l {
        position: relative;
        height: 370rpx;
        background-image: -webkit-linear-gradient(top left, #74F8DB, #12CECD);
        background: -webkit-linear-gradient(top left, #74F8DB, #12CECD);
        h4 {
          padding-top: 12rpx;
          padding-left: 20rpx;
          font-size: 28rpx;
        }
        button {
          position: absolute;
          left: 40rpx;
          right: 40rpx;
          bottom: -28rpx;
          padding-left: 0;
          padding-right: 0;
          line-height: 56rpx;
          border-radius: 28rpx;
          background-image: -webkit-linear-gradient(left, #FFB14C, #FF7F00);
          background-image: linear-gradient(left, #FFB14C, #FF7F00);
          font-size: 28rpx;
          box-shadow: 4rpx 4rpx 6rpx rgba(176, 167, 158, 0.54);
        }
      }
      &_r {
        height: 176rpx;
        text-align: center;
        font-size: 28rpx;
        &:first-child {
          background-image: -webkit-linear-gradient(left, #EEEEFF, #D6D4FD);
          background-image: linear-gradient(left, #EEEEFF, #D6D4FD);
        }
        &:last-child {
          background-image: -webkit-linear-gradient(left, #F2FDE7, #D1F7B8);
          background-image: linear-gradient(left, #F2FDE7, #D1F7B8);
        }
        img {
          margin-top: 36rpx;
          margin-bottom: 8rpx;
          width: 60rpx;
          height: 60rpx;
        }
      }
    }
  }

  .buttons {
    margin: 70rpx 20rpx;
    button {
      margin: 40rpx 0;
      line-height: 120rpx;
      font-size: 38rpx;
      box-shadow: 4rpx 4rpx 8rpx rgba(15, 199, 199, 0.3);
    }
  }
</style>