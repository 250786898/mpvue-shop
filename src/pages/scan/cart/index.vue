<template>
  <div>
    <div class="weui-panel goods-list-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">乐家优选安心谷物芝麻菜约150g 乐家优选安心谷物</div>
            <div class="weui-media-box__desc">
              <span class="goods-price">￥7.80</span>
              <div class="goods-count">×1</div>
            </div>
          </div>
        </div>
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">乐家优选安心谷物芝麻菜约150g 乐家优选安心谷物</div>
            <div class="weui-media-box__desc">
              <span class="goods-price">￥7.80</span>
              <div class="goods-count">
                <counter></counter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 优惠券 -->
    <div class="weui-cells coupon-cells">
      <div class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">优惠券</div>
        <div class="weui-cell__ft weui-cell__ft_in-access">未使用优惠券</div>
      </div>
    </div>
    
    <!-- 总额 -->
    <lj-form-preview :items="bills"></lj-form-preview>
    
    <payways></payways>

    <div class="scan-input-entry">
      <navigator url="/pages/scan/input/main">
        扫不出来？试试<span>输入条形码</span>
      </navigator>
    </div>
  
    <div class="footer-bar">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/scancodepurchase_btn_scan@2x.png" @click="scan">
      <span>合计：</span>
      <span class="price">￥10.8</span>
      <button type="primary" class="radius bg-gradient">结算(0)</button>
    </div>
  </div>
</template>

<script>
  import LjFormPreview from '@/components/LjFormPreview'
  import Payways from '@/components/Payways'
  import Counter from '@/components/Counter'

  export default {
    components: {
      LjFormPreview,
      Payways,
      Counter
    },

    data () {
      return {
        bills: [
          { label: '商品金额', value: '<span style="color: #F6CC26">￥0.00</span>' },
          { label: '优惠合计', value: '<span style="color: #0ECD99">￥0.00</span>' }
        ],
        payways: [
          {
            name: '微信支付',
            checked: true,
            icon: '/static/images/common_icon_wechat@2x.png'
          },
          {
            name: '会员卡支付(剩余：￥0.00）',
            checked: false,
            icon: '/static/images/common_icon_vip@2x.png'
          }
        ]
      }
    },

    methods: {
      scan() {
        wx.scanCode({})
      }
    }
  }
</script>

<style>
  page {
    background-color: #F3F3F3;
    padding-bottom: 110rpx;
  }
</style>

<style lang="scss" scoped>
  .goods-list-panel {
    &:before,
    &:after {
      display: none;
    }

    .weui-media-box {
      &:before {
        display: none;
      }
      + .weui-media-box {
        padding-top: 0;
      }

      &__hd {
        width: 160rpx;
        height: 160rpx;
      }
      &__title {
        margin-bottom: 20rpx;
        font-size: 28rpx;
        color: $text-black;
        white-space: normal;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
      &__desc {
        position: relative;
      }

      .goods-price {
        line-height: 50rpx;
        font-size: 28rpx;
        font-weight: 700;
        color: $text-red;
      }
      .goods-count {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 50rpx;
        &__form {
          span {
            vertical-align: middle;
            padding-left: 20rpx;
            padding-right: 20rpx;
            font-size: 28rpx;
            color: $text-black;
          }
          img {
            vertical-align: middle;
            width: 50rpx;
            height: 50rpx;
          }
        }
      }
    }
  }

  .weui-cells {
    margin-top: 20rpx;
    &:before,
    &:after {
      display: none;
    }
    .weui-cell {
      &:before {
        display: none;
      }
      padding-top: 24rpx;
      padding-bottom: 24rpx;
      font-size: 28rpx;
      &__ft_in-access:after {
        border-color: $text-gray;
      }
    }
  }

  .scan-input-entry {
    background-color: #fff;
    padding: 20rpx 0 100rpx;
    text-align: center;
    navigator {
      display: inline-block;
      padding-left: 40rpx;
      padding-right: 40rpx;
      border: 1rpx solid #D5D5D5;
      border-radius: 32rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      color: $text-black;
      span {
        color: $theme-color-light;
      }
    }
  }
  
  .footer-bar {
    padding: 15rpx 30rpx;
    background-color: #fff;
    border-top: 1rpx solid #DEDEDE;
    text-align: right;

    span {
      font-size: 34rpx;
      font-weight: 700;
      color: $text-black;
      vertical-align: middle;
      line-height: 80rpx;
      &.price {
        color: $text-red;
      }
    }

    img {
      position: absolute;
      left: 30rpx;
      bottom: 34rpx;
      width: 154rpx;
      height: 154rpx;
    }
    button {
      margin-left: 40rpx;
      display: inline-block;
      line-height: 80rpx;
      border-radius: 40rpx;
      width: 220rpx;
      vertical-align: middle;
    }
  }
</style>