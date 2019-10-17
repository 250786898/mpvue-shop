<template>
  <div>
    <div class="weui-panel goods-list-panel" style="margin-top: 20rpx;">
      <div class="weui-panel__hd">
        退款商品
      </div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" v-for="item in returnOrderGoodsList" :key="item.goodsId">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="item.goodsImage" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <!-- if 赠品 -->
            <div v-if="item.isPresentation" class="weui-media-box__title">
              <span class="goods-tag">赠品</span>
              {{ item.goodsName }}
            </div>
            <div v-else class="weui-media-box__title weui-media-box__title_total">
              {{ item.goodsName }}
              <div class="goods-total">￥{{ item.onlinePrice * item.goodsNum }}</div>
            </div>
            <!-- else 赠品 -->
            <div style="color:#999;font-size:28rpx;" class="weui-media-box__desc" v-if="!item.isPresentation">
              <span>单价:￥{{ item.onlinePrice }}</span>
              <div class="goods-count goods-count_ih">数量: x{{ item.goodsNum }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div class="weui-cells weui-cells_no-border detail-form">
    <div class="lj-form">

        <div class="weui-cell">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/icon_arrow.png" alt="">
          <div  style="font-size:30rpx; width:300rpx;" class="weui-cell__hd">
           <p style="float:left;">退货原因： </p> <span style="color:#999;"> 请选填</span>

          </div>
          <div class="weui-cell__bd">
            <picker @change="onReasonChange" :value="reason" :range="reasonArray" range-key="reasonInfo">
              <view class="picker picker_triangle" v-if="reason">
                {{ reasonArray[reason] && reasonArray[reason].reasonInfo }}
              </view>
              <view class="picker picker_triangle" v-else>
                请选择
              </view>
            </picker>
          </div>
        </div>
    </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">退货说明：</div>
        <div class="weui-cell__bd">
          <input type="text" style="color:#999;" placeholder="选填" v-model="refundReason">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="">上传凭证</div>
          <image-uploader v-model="goodsImageMore" :maxlength="3"></image-uploader>
        </div>
      </div>
      <!-- <div class="weui-cell" hover-class="navigator-hover" @click="selectAddress">
        <div class="weui-cell__hd" style="width: 140rpx">提货地址</div>
        <div class="weui-cell__bd"></div>
        <div class="weui-cell__ft weui-cell__ft_in-access" style="line-height: 60rpx;">
          {{ addressInfo.areaInfo || '请选择' }}
        </div>
         <input type="text" v-model="address"> -->
      <!-- </div>  -->
    </div>

    <div class="footer-bar">
      <button type="primary" @click="submit">提 交</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import ImageUploader from '@/components/ImageUploader'

  export default {
    components: {
      ImageUploader
    },

    data () {
      return {
        reason: '',
        reasonArray: [],
        returnOrderGoodsList: [],

        orderId: '',
        goodsImageMore: '',
        address: '',
        addressInfo: {}
      }
    },

    methods: {
      onReasonChange(e) {
        this.reason = e.mp.detail.value
      },

      getReasonList() {
        Api.refund.reason().then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.reasonArray = res.data
          }
        })
      },

      selectAddress() {
        getApp().onAddressSelect = (item) => {
          this.addressInfo = item
          console.log(this.addressInfo)
        }
        wx.navigateTo({
          url: '/pages/address/list/main?mode=select&title=选择提货地址'
        })
      },

      submit() {
        var curHours = new Date().getHours()
        // if(curHours >= 20) {
        //   return wx.showToast({
        //     title: '请在20:00前退款',
        //     icon: 'none'
        //   })
        //   return false
        // }
        if (!this.reason) {
          return wx.showToast({
            title: '请选择退货原因',
            icon: 'none'
          })
        }
        // if (!this.addressInfo.addressId) {
        //   return wx.showToast({
        //     title: '请选择提货地址',
        //     icon: 'none'
        //   })
        // }

        wx.showLoading({ title: '提交中' })

        let list = this.returnOrderGoodsList.map(item => ({
          id: item.id,
          goodsNum: item.returnGoodsNum
        }))

        Api.refund.applyReturn({
          orderId: this.orderId,
          refundReason: this.reasonArray[this.reason].id,
          goodsImageMore: this.goodsImageMore,
          address: this.address,
          addressId: this.addressInfo.addressId,
          goodsJson: JSON.stringify(list)
        })
        .then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            wx.showToast({ title: '已提交' })
            wx.redirectTo({
              url: '/pages/order/returns/main'
            })
          } else if (res.code === 5010329) {
            wx.showModal({
              title: '提示',
              content: '订单签收超过7天，不能为您提供售后退款服务',
              showCancel: false,
              cancelText: '知道了'
            })
          } else {
            wx.showToast({ title: res.message, icon: 'none' })
          }
        })
        .catch(e => wx.hideLoading())
      }
    },

    onLoad(e) {
      this.reason = ''
      this.reasonArray = []
      this.goodsImageMore = ''
      this.address = ''

      this.orderId = e.id

      let returnOrderGoodsList = getApp().globalData.returnOrderGoodsList

      if (returnOrderGoodsList) {
        this.returnOrderGoodsList = returnOrderGoodsList
      }

      this.getReasonList()
    }
  }
</script>

<style>
  page { background-color: #F5F5F5; padding-bottom: 120rpx;padding-left:24rpx; }
</style>

<style lang="scss" scoped>
  .picker{
    color:#999;
  }
  .lj-form {
    .weui-cells {
      margin-top: 20rpx;
      border-radius: 14rpx;

    }
    .picker {
      padding-right: 43rpx;
      border: 0 none;
      text-align: right;
    }
  }

  .detail-form {
    margin-top: 20rpx;
    width: 702rpx;
    border-radius: 14rpx;
    .weui-cell {
      font-size: 30rpx;
      position: relative;
      img{
        width: 42rpx;
        height: 42rpx;
        position: absolute;
        top:33rpx;
        right:21rpx;
      }
      p{
        float: left;
      }
      &:before {
        display: block;
        left: 0;
        border-color: #EDEDED;
      }
    }
    /deep/ .uploader {
      margin: 20rpx 0 80rpx;
    }
  }
</style>
