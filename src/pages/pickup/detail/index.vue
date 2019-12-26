<template>
  <div>

    <div class="card">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/deliverycode_card_bg@2x.png" class="card__bg">

      <div class="card__bd">
        <!-- 条形码 -->
        <canvas canvas-id="barcode" class="card__barcode" v-if="!popupShowed"></canvas>
        <div class="card__barcode-text">{{ result.pickUpCode }}</div>
        <canvas canvas-id="qrcode" class="card__qrcode" v-if="!popupShowed"></canvas>

          <!-- <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/membershipcode_qrcode@2x.png" class="card__qrcode"> -->
          <div class="card__qrcode-tip">自提订单提货凭证 请勿告诉陌生人</div>
          <!-- 门店 -->
          <div class="card__shop-item">
            <div class="weui-cell weui-cell_access" hover-class="navigator-hover" @click="openLocation">
              <div class="weui-cell__hd">
                <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/deliverycode_img_logo@2x.png">
              </div>
              <div class="weui-cell__bd">
                <div class="primary">提货门店{{ result.stroreName }}</div>
                <div class="second">{{ result.storeAddress }}</div>
              </div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </div>
          </div>

        </div>

        <div class="card__dt">
          <navigator url="/pages/pickup/instruction/main" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd">
              <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/deliverycode_icon_gifrbag@2x.png">
            </div>
            <div class="weui-cell__bd">提货须知</div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </navigator>
          <!-- <div class="weui-cell">
            <div class="weui-cell__hd">
              <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/deliverycode_icon_gifrbag@2x(1).png">
            </div>
            <div class="weui-cell__bd">提货时间：{{result.shippingTime }}</div>
          </div> -->
        </div>

    </div>

    <img src="http://bucketlejia.oss-cn-shenzhen.aliyuncs.com/deliverycode_bg@2x.png" class="footer__bg" mode="widthFix">
    <pickup-result-popup :shown="popupShowed" ></pickup-result-popup>
  </div>
</template>





<script>
  import wxbarcode from 'wxbarcode'
  import PageLoading from '@/components/PageLoading'
  import { Api } from '@/http/api'
  import PickupResultPopup from './components/PickupResultPopup/index'

  export default {
      components: {
       PickupResultPopup
    },
    data () {
      return {
        orderId: '',  //门店id
        result: {},  //提货订单信息
        currentBrightness: 0, //屏幕亮度
        timer: null, // 扫码提示定时
        popupShowed:false,  //核销成功提示
        pageLoading: true //页面加载状态
      }
    },

    computed: {

      pickup(){
          let pickup=this.$store.state.pickup;
          return pickup
      },

      showPickUpTime () { //显示的提货时间
          const hours = new Date().getHours()
          let showPickUpTime = ''
          if(hours > 20) {
            //超过20：00设置成显示后天提货
            showPickUpTime = this.getDateStr(2)
          }else{
            showPickUpTime = this.getDateStr(1)
          }
          return showPickUpTime
        },
      },
  mounted () {
    console.log('mounted核销',this.popupShowed)
    this.orderId = this.$mp.page.options.id
    clearInterval(this.timer)
    this.getOrderPickUpCodeDetail()
    this.timer = setInterval(() => {
      this.findOrderStat()
    }, 3000)
  },
  onShow () {
    if(this.popupShowed) {
      wx.switchTab({
        //如果核销成功，返回应该直接跳转我的
        url: '/pages/mine/main'
      })
    }
    console.log('onShow核销',this.popupShowed)
  },
  onUnload () {
    // this.recoverScreen()
    clearInterval(this.timer)
  },


  onLoad () {
    console.log('mixin',typeof this.data,this.$options.data())
    Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
    },

    methods: {
     /**
      * @description 核销后提示信息
      */
      findOrderStat() {
        Api.order.findOrderStat({ orderId: this.orderId })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            // this.result = res.data
            console.log('判断',res )
            this.popupShowed = true
            clearInterval(this.timer)
          }
        })
        .catch(e => console.log(e))
        .then(() => {})
      },

     /**
      * @description 条形码接口
      */
      getOrderPickUpCodeDetail() {
        Api.order.orderPickUpCode({ orderId: this.orderId })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.result = res.data
            console.log('条形码',this.result )
            setTimeout(() => {
              this.pageLoading = false
              wxbarcode.barcode('barcode', this.result.pickUpCode, 620, 160)
              wxbarcode.qrcode('qrcode', this.result.pickUpCode, 360, 360)
              wx.hideLoading()
            },1000);
          } else {
            this.pageLoading = false
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
            wx.hideLoading()
          }
        })
        .catch(e => console.log(e))
      },

      openLocation() {
        wx.openLocation({
          latitude: this.result.lat,
          longitude: this.result.lng,
          // scale
          name: this.result.stroreName,
          address: this.result.storeAddress
        })
      },

    /**
      * @description 获取明天后天时间
      */
       getDateStr(dayCount){
        if(null == dayCount){
          dayCount = 0;
        }
        var dd = new Date();
        dd.setDate(dd.getDate()+dayCount);//设置日期
        var m = dd.getMonth()+1;//获取当前月份的日期
        m = m < 10 ? `0${m}` : m
        var d = dd.getDate();
        d = d < 10 ? `0${d}` : d
        return `${m}月${d}日`
      },

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
      }
    }
  }
</script>

<style>
  page { background-color: #0FD7C0; }
</style>

<style lang="scss" scoped>
  .card {
    position: relative;
    z-index: 2;
    margin: 20rpx auto 0;
    width: 698rpx;
    height: 1022rpx;
    &__bg {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    &__bd {
      padding-top: 86rpx;
      position: relative;
      z-index: 2;
    }

    &__barcode {
      margin: 0 auto;
      display: block;
      width: 620rpx;
      height: 160rpx;
      z-index: 99;
      &-text {
        font-size: 30rpx;
        line-height: 60rpx;
        text-align: center;
        color: $text-black;
      }
    }

    &__qrcode {
      margin: -25rpx auto;
      display: block;
      width: 360rpx;
      height: 360rpx;
      z-index: 99;
      &-tip {
        font-size: 30rpx;
        line-height: 80rpx;
        text-align: center;
        color: $text-gray;
      }
    }

    &__shop-item {
      padding-left: 22rpx;
      padding-right: 22rpx;
      .weui-cell {
        &__hd img {
          margin-right: 20rpx;
          width: 64rpx;
          height: 64rpx;
          vertical-align: middle;
        }
        &__bd {
          width: 80%;
          font-size: 28rpx;
          color: #B3B3B3;
          .primary {
            font-size: 30rpx;
            color: #000;
            @include ellipsis
          }
          .second {
            @include ellipsis
          }
        }
        &__ft:after {
          border-color: #B3B3B3;
        }
      }
    }
    &__dt {
      padding-top: 20rpx;
      padding-left: 22rpx;
      padding-right: 22rpx;
      .weui-cell {
        padding-top: 2rpx;
        padding-bottom: 2rpx;
        &:before {
          display: none;
        }
        &__hd img {
          margin-right: 8rpx;
          width: 50rpx;
          height: 50rpx;
          vertical-align: -10rpx;
        }
        &__bd {
          font-size: 30rpx;
        }
        &__ft:after {
          border-color: #B3B3B3;
        }
      }
    }
  }

  .footer__bg {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
