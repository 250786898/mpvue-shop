<template>
  <div>
    <div class="container">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/scancodepurchase_logo.png@2x.png" class="logo">
      <div class="barcode">
        <canvas canvas-id="barcode" class="card__barcode"></canvas>
        <div class="barcode__text">{{detail.couponNum}}</div>
      </div>
      <div class="qrcode">
        <canvas canvas-id="qrcode" class="canvas"></canvas>
        <div class="qrcode__text">请向收银员出示</div>
      </div>
      <div class="divide"></div>
      <div class="weui-form-preview">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item" v-for="item in items" :key="item.label">
            <div class="weui-form-preview__label">{{ item.label }}</div>
            <div class="weui-form-preview__value" v-html="item.value"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ShopList from '@/components/ShopList'
  import { Api } from '@/http/api'
  import wxbarcode from 'wxbarcode'

  export default {
    data () {
      return {
        items: [],
        detail: Object,
         currentBrightness: 0
      }
    },
    computed: {
      ...mapState(['location', 'storeId'])
    },
    methods: {
        // 设置屏幕亮度
      getScreenBright () {
         var that = this;
        wx.getScreenBrightness({

          success: function (res) {

          that.currentBrightness = res.value

          }
        });
      
        wx.setScreenBrightness({
          value: 1,
        })
      },

      //恢复之前屏幕亮度
      recoverScreen () {
         
        var that = this;
        wx.setScreenBrightness({

        value: that.currentBrightness

        })
      },
      getCouponLimitQrcode () {
        wx.showLoading({})
        Api.coupon.couponUseCode({
          couponId: this.couponId,
          // @DEBUG: 
          storeId: this.storeId
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.detail = res.data
            this.items = [
              { label: '面值', value: res.data.couponValue },
              { label: '适用限制', value: res.data.useScope },
              { label: '有限期至', value: res.data.effectiveTime }
            ]
            wxbarcode.barcode('barcode', this.detail.couponNum, 620, 160)
            wxbarcode.qrcode('qrcode', this.detail.couponNum, 360, 360)
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      }
    },
    onShow () {
      this.getScreenBright()
    },
    onLoad (e) {
      this.couponId = e.id
      this.getCouponLimitQrcode()
    },
    onUnload () {
    }
  }
</script>

<style>
  page { background: rgba(3, 3, 3, 0.5) }
</style>

<style lang="scss" scoped>
  .container {
    border-top: 20rpx solid $theme-color-light;
    text-align: center;
    margin: 30rpx;
    background-color: #fff;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
  }
  .logo {
    margin-top: 40rpx;
    vertical-align: middle;
    width: 159rpx;
    height: 93rpx;
  }
  .barcode {
    margin-top: 40rpx;
    img {
      vertical-align: middle;
      width: 590rpx;
      height: 150rpx;
    }
    &__text {
      line-height: 50rpx;
      font-size: 30rpx;
      color: $text-black;
      letter-spacing: 8rpx;
    }
    .card__barcode{
      margin:0 auto;
      display:block;
      width:620rpx;
      height:160rpx;

    }
  }
  .qrcode {
    margin-top: 20rpx;
    .canvas {
      width: 282rpx;
      height: 282rpx;
      margin:0 auto;
      display:block;
      position:relative;
    right:20rpx;
    bottom:20rpx;
    }
    &__text {
      margin: 20rpx auto;
      width: 300rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      font-size: 30rpx;
      color: $text-black;
      border: 2rpx solid $text-gray;
      border-radius: 26rpx;
    }
  }

  .divide {
    position: relative;
    margin: 60rpx 0 20rpx;
    height: 1rpx;
    background-color: #DEDEDE;
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: -18rpx;
      width: 36rpx;
      height: 36rpx;
      border-radius: 18rpx;
      background-color: #818181;
    }
    &:before {
      left: -16rpx;
    }
    &:after {
      right: -16rpx;
    }
  }

  .weui-form-preview {
    background-color: transparent;
    &:before, &:after {
      display: none;
    }
    &__item {
      line-height: 72rpx;
    }
    &__label,
    &__value {
      font-size: 30rpx;
      color: $text-black;
    }
  }
</style>