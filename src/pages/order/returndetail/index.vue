<template>
  <div>
    <!-- 
          1为待审核,2服务端审核确认,3拣货员已验货上传图片,4为服务端同意退款,5(对应2)为服务端审核拒绝, 6(对应4)服务端拒绝退款,7为退款完成 8-已取消 100已关闭 默认为 -->
    <div  style="position: relative; margin-bottom:24rpx;z-index:10" class="order-status bg-gradient">
      <!-- 待审核、审核确认 -->
      <template v-if="detail.state === 1">您已成功申请退款,请等待商家处理</template>
      
      <template v-else-if="detail.state === 2">审核确认</template>
      <template v-else-if="detail.state === 3">已验货</template>
      <!-- 同意 -->
      <template v-else-if="detail.state === 4">商家已同意退款</template>
      <template v-else-if="detail.state === 5">审核拒绝</template>
      <!-- 不同意 -->
      <template v-else-if="detail.state === 6">商家已拒绝退款</template>
      <!-- 退款成功 -->
      <div style="z-index:10;" v-else-if="detail.state === 7">
        <p style="margin-left:24rpx;">退款成功</p>
      </div>
      <!-- 已取消 -->
      <template v-else-if="detail.state === 8">已取消退款申请</template>
      <template v-else-if="detail.state === 100">已关闭退款申请</template>

      <img class="BackImg" src="/static/images/background_icon.png" alt="">

    </div>
    
    <!-- 退款成功 -->
    <div class="weui-cells weui-cells_no-border order-cells return-info" style="margin-top: 0;position: relative;" >
      <!-- TODO: 后端返回字段不完整 -->
      <template v-if="detail.state === 7">
        <div class="weui-cell return-info__hd">
          <div class="weui-cell__bd">退款总金额</div>
          <div class="xian"></div>
          <div class="weui-cell__ft">￥{{ detail.refundAmount }}</div>
        </div>
        <!-- <div class="weui-cell return-info__sep">
          <div class="weui-cell__bd">退回微信</div>
          <div class="weui-cell__ft">￥278.00</div>
        </div> -->
        <div class="weui-cell return-info__progress">
          <div class="weui-flex">
            <div class="weui-flex__item active">
              <div class="return-info__progress__icon"></div>
              <div class="return-info__progress__title">卖家退款</div>
              <div class="return-info__progress__desc">{{ detail.applyTime }}</div>
            </div>
            <div class="weui-flex__item active">
              <div class="return-info__progress__route"></div>
              <div class="return-info__progress__icon"></div>
              <div class="return-info__progress__title">商家受理</div>
              <!-- <div class="return-info__progress__desc">2018-11-22 09:58:20</div> -->
            </div>
            <div style="z-index:10;" class="weui-flex__item active">
              <div class="return-info__progress__route"></div>
              <div class="return-info__progress__icon return-info__progress__icon_checked">
                <icon type="success_no_circle" color="#FFF" size="14"></icon>
              </div>
              <div  class="return-info__progress__title">退款成功</div>
              <!-- <div class="return-info__progress__desc">2018-11-22 09:58:20</div> -->
            </div>
          </div>
        </div>
        

        
        <div class="weui-cell return-info__sep return-info__combine">
          <div class="weui-cell__bd">退回优惠券</div>
          <div class="weui-cell__ft">￥{{ detail.refundCouponAmount }}</div>
        </div>
        <div class="weui-cell return-info__combine">
          <div class="weui-cell__bd">退回积分</div>
          <div class="weui-cell__ft">{{ detail.refundPoint }}</div>
        </div>
        
      </template>
      <navigator :url="'/pages/order/consult/main?id=' + detail.refundId" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">协商历史</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
    </div>
  
    <!-- TODO: -->
    <!--
    <div class="weui-cells weui-cells_no-border order-cells return-info" v-if="detail.state === 4">
      <navigator url="/pages/order/commenthistory/main" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">售后评价</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
    </div>
    -->
  
    <div class="weui-panel goods-list-panel">
      <div class="weui-panel__bd">
        <url v-for="item in detail.shopRefundGoodses"
          :key="item.goodsId"
          class="weui-media-box weui-media-box_appmsg">
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
              <div class="goods-total">￥{{ item.goodsPayPrice * item.goodsNum }}</div>
            </div>
            <!-- else 赠品 -->
            <div class="weui-media-box__desc" v-if="!item.isPresentation">
              <span>单价:￥{{ item.goodsPayPrice }}</span>
              <div class="goods-count goods-count_ih">数量: x{{ item.goodsNum }}</div>
            </div>
          </div>
        </url>
      </div>
    </div>
    
    <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">退款原因 </div>
          <div class="weui-form-preview__value">{{ refundReasonText }}</div>
        </div>
        <!-- if 退款成功 -->
        <div class="weui-form-preview__item" v-if="detail.state === 4">
          <div class="weui-form-preview__label">退款金额 </div>
          <div class="weui-form-preview__value">￥{{ detail.refundAmount }}</div>
        </div>
        <!-- endif; -->
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请时间</div>
          <div class="weui-form-preview__value">{{ detail.applyTime }}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">退款编号</div>
          <div class="weui-form-preview__value">{{ detail.refundSn }}</div>
        </div>
      </div>
    </div>
    
    <!-- Footer Start -->
    <div class="footer-bar">
      <!-- 待审核、已审核 -->
      <button v-if="detail.state === 1"
        @click="cancel"
        :plain="true"
        type="default"
        style="border-color: #333; color: #333">
        撤销售后
      </button>
      <!-- 退款成功、已拒绝、已取消 -->
      <!-- <button v-else-if="detail.state === 7 || detail.state === 8 || detail.state === 100"
        @click="del"
        :plain="true"
        type="default">
        删除订单
      </button> -->
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    data () {
      return {
        detail: {},
        reasons: []
      }
    },

    computed: {
      refundReasonText() {
        if (this.detail.refundReason && this.reasons.length) {
          let selected = this.reasons.find(item => item.id == this.detail.refundReason)
          return selected ? selected.reasonInfo : ''
        } else {
          return ''
        }
      }
    },

    methods: {
      getDetail({ id }) {
        wx.showLoading({ title: '加载中' })
        Api.refund.detail({ id })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.detail = res.data
          } else {
            wx.showToast({
              icon: 'none',
              title: res.message
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },

      del() {
        wx.showLoading({ title: '删除中' })
        Api.refund.del({
          id: this.detail.refundId
        }).then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            getApp().globalData.needUpdateReturnList = true
            wx.navigateBack()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
      },

      cancel() {
        wx.showLoading({ title: '取消中' })
        Api.refund.cancel({
          id: this.detail.refundId
        }).then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            this.getDetail({ id: this.detail.refundId })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
      }
    },

    onLoad(e) {
      if (e.id) {
        this.getDetail({ id: e.id })
      }

      Api.refund.reason().then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.reasons = res.data
        }
      })
    }
  }
</script>

<style>
  page { background-color: #F5F5F5; padding-left:24rpx;  }
</style>

<style lang="scss" scoped>
  .xian{
      width:702rpx;
      height:1rpx;
      background:rgba(204,204,204,1);
      opacity:0.4;
      position: absolute;
      top:95rpx;
      left:0rpx;
  }
 .BackImg{
    width: 702rpx;
    height: 196rpx;
    position: absolute;
    top:0rpx;
    left:0rpx;
  }
  .order-status {

    height: 196rpx;
    // padding: 0 30rpx;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    font-size: 36rpx;
    color: #fff;
    word-break: break-all;
    margin-top:24rpx;
    width: 702rpx;
    .desc {
      font-size: 28rpx;
    }
  }

  .order-address {
    .weui-cell {
      background-color: #fff;
      font-size: 30rpx;
      color: $text-black;
      .desc {
        font-size: 26rpx;
        color: $text-gray;
      }
    }
  }

  .order-shop {
    background-color: #fff;
    &__title {
      font-size: 26rpx;
      color: $text-black;
      word-break: break-all;
    }
    &__desc {
      text-align: right;
      font-size: 24rpx;
      color: $text-gray;
    }
  }

  .weui-form-preview {
    margin-top: 20rpx;
    margin-bottom: 40rpx;
    width: 702rpx;
    border-radius: 14rpx;
    &:before, &:after {
      display: none;
    }
    .redpack {
      vertical-align: -6rpx;
      width: 27rpx;
      height: 41rpx;
    }
    &__label,
    &__value {
      font-size: 30rpx;
    }
    &__value {
      button {
        display: inline-block;
        vertical-align: middle;
        margin-left: 8rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;
        line-height: 44rpx;
        border-radius: 22rpx;
        font-size: 26rpx;
      }
    }
    &__hd {
      line-height: inherit;
      padding-bottom: 0;
      .weui-form-preview__label {
        font-size: 34rpx;
        color: $text-black;
      }
      &:after { display: none; }
    }
    // &__bd {
    //   padding-top: 10rpx;
    //   padding-bottom: 10rpx;
    // }
  }

  .order-cells {
    margin-top: 20rpx;
    width: 702rpx;
    border-radius: 14rpx;
    .weui-cell {
      &__bd {
        font-size: 30rpx;
        color: $text-black;
      }
    }
  }

  .order-map {
    position: relative;
    padding-top: 24rpx;
    padding-bottom: 80rpx;
    map {
      width: 100%;
      height: 502rpx;
    }
  }
  
  .order-countdown {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    background-color: #DEDEDE;
    box-shadow: 0 0 20rpx 4rpx rgba(184, 184, 184, 0.57);
    width: 242rpx;
    height: 242rpx;
    border-radius: 121rpx;
    &__bg {
      &-left {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 121rpx;
        .fill {
          transform-origin: right center;
        }
      }
      &-right {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 121rpx;
        .fill {
          transform-origin: left center;
        }
      }
      &-left,
      &-right {
        .fill {
          width: 100%;
          height: 100%;
          background-color: #0EDABD;
        }
      }
    }
    &__bd {
      position: absolute;
      top: 10rpx;
      left: 10rpx;
      width: 222rpx;
      height: 222rpx;
      border-radius: 111rpx;
      background-color: #fff;
      text-align: center;
    }
    &__title {
      margin-top: 70rpx;
      font-size: 36rpx;
      color: $text-black;
    }
    &__desc {
      line-height: 50rpx;
      font-size: 28rpx;
      color: $text-black;
    }
    &-point {
      position: absolute;
      left: 50%;
      bottom: 226rpx;
      transform: translateX(-50%);
      border-radius: 12rpx;
      width: 24rpx;
      height: 24rpx;
      background-color: #0EDABD;
      box-shadow: 0 6rpx 4rpx rgba(147, 147, 147, 0.57);
    }
  }

  .footer-bar {
    padding: 15rpx 30rpx;
    text-align: right;
    background-color: #fff;
    button {
      display: inline-block;
      min-width: 184rpx;
      line-height: 60rpx;
      vertical-align: middle;
      border: 1px solid!important;
      border-radius: 30rpx;
      & + button {
        margin-left: 24rpx;
      }
    }
  }

  .tel-icon {
    vertical-align: -2rpx;
    width: 37rpx;
    height: 33rpx;
  }

  .bonus-point {
    height: 100rpx;
    font-size: 32rpx;
    color: #F40909;
    span {
      border-radius: 10rpx;
      border: 2rpx solid #FF9800;
      color: #FF9800;
      padding: 0 16rpx;
    }
  }

  .return-info {
    .weui-cell__ft {
      color: $text-black;
    }
    &__hd {
      margin-bottom:24rpx;
      .weui-cell {
        &__bd,
        &__ft {
          font-size: 34rpx;
          font-weight: 700;
        }
        &__ft {
          color: #F3181F;
        }
      }
    }

    &__sep {
      &:before {
        display: block;
        left: 0;
        border-color: #ECECEC;
      }
    }
    &__combine {
      padding-bottom: 0;
    }
    &__progress {
      padding-left: 10rpx;
      padding-right: 10rpx;
      text-align: center;
      &__icon {
        margin: 0 auto 36rpx;
        border-radius: 16rpx;
        width: 32rpx;
        height: 32rpx;
        background-color: $text-gray;
        &_checked {
          width: 44rpx;
          height: 44rpx;
          border-radius: 22rpx;
          margin-top: -6rpx;
          margin-bottom: 30rpx;
          position: relative;
          background-color: transparent;
          icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      &__route {
        position: absolute;
        top: 14rpx;
        left: -45%;
        right: 55%;
        height: 4rpx;
        background-color: $text-gray;
      }
      &__title {
        font-size: 26rpx;
        color: $text-black;
      }
      &__desc {
        font-size: 22rpx;
        color: $text-gray;
        line-height: 50rpx;
      }

      .weui-flex {
        width: 100%;
        &__item {
          position: relative;
          &.active {
            .return-info__progress {
              &__icon,
              &__route {
                background-color: #0FD7C0;
              }
            }
          }
        }
      }
    }
  }
</style>