<template>
  <div class="p-free-order">
    <div class="top-wrapper">
      <div class="red-package" v-if="couponType == 1">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/hongbao.png">
        <div class="coupon">
          <div class="price">
            <span class="left">{{ coupon.couponAmount }}</span>
            <span class="right">元</span>
          </div>
          <div class="desc">
            <div class="top">{{ coupon.couponName }}</div>
            <div class="middle">{{ coupon.useLimit }}</div>
            <div class="bottom">{{ coupon.startTime }}-{{ coupon.endTime }}</div>
          </div>
        </div>        
      </div>
      <div class="red-package" v-if="couponType == 2">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/hongbao2.png">
        <div class="vipcard">
          <div class="top">{{ vipcard.name }}</div>
          <div class="middle">手气真不错,邀请小伙伴们一起玩吧~</div>
          <div class="bottom">兑换码：{{ vipcard.card }}</div>
        </div>        
      </div>
      <div class="red-package" v-if="couponType == 3">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/hongbao3.png">      
      </div>
      <div class="use-btn-wrapper" v-if="couponType == 1 || couponType == 2">
        <button class="use-btn" @click="handleJumpToIndex">立即使用</button>
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="content">
        <div class="content-item">1.红包新老用户同享</div>
        <div class="content-item">2.领取红包的账户和使用红白的账户需要同一账号</div>
        <div class="content-item">3.红包仅限在乐家生鲜fresh小程序商城下单选择在线支付时使用</div>
        <div class="content-item">4.每个订单仅限时使用一个红包,红包不找零不体现</div>
        <div class="content-item">5.领取乐享VIP体验卡兑换码有“可分享“字样,表示兑换码可分享给好友体验,每个帐号只可使用一次</div>
        <div class="content-item">6.乐家生鲜fresh保留法律允许范围内对活动的解释权</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import RedPackage from '../../../components/RedPackage'

  export default {
    name: 'free-order',
    components: {
      RedPackage
    },
    data() {
      return {
        coupon: {},
        vipcard: {},
        couponType: 0,  // 1.优惠券 2.体验卡 3.失败
        detail: {},
        activityId: ''
      }
    },
    onShow () {
      this.init()
    },
    methods: {
      /**
       * 初始化
       */
      init () {
        this.handleGetPayAwrd()
      },
      handleGetPayAwrd () {
        let options = this.$mp.page.options
        if (!options.orderId) {
          return wx.showToast({
            title: '参数错误',
            icon: 'none'
          })
        }
        wx.showLoading()
        let params = {
          orderId: options.orderId,
          activityId: options.activityId
        }
        this.activityId = options.activityId
        Api.freeOrder.getPayAward(params)
        .then(res => {
          if (!res.data) {
            this.couponType = 3
          } else {
            if (res.data.vipcard) {
              this.couponType = 2
              this.vipcard = res.data.vipcard
            } else {
              this.couponType = 1
              this.coupon = res.data.coupon
            }
          }
        })
        .catch(err => console.log(err))
        .then(e => wx.hideLoading())
      },
      handleJumpToIndex () {
        wx.switchTab({ url: '/pages/index/main' })        
      }
    },
    onShareAppMessage() {
      return {
        title: '乐家生鲜',
        path: `pages/free-order/share-free-order/main?activityId=${this.activityId}`,
      }
    }
  }
</script>

<style lang="scss">
  page { background-color: #FEF9E6; }
</style>

<style lang="scss" scoped>
  .p-free-order{
    width: 100%;
    height: 100%;
    background-color: #FEF9E6;
    .top-wrapper{
      .red-package{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        img {
          width: 513rpx;
          height: 671rpx;
          display: inline-block;
        }
        .coupon{
          position: absolute;
          top: 150rpx;
          display: flex;
          align-items: center;
          height: 150rpx;
          width: 400rpx;
          .price {
            display: flex;
            align-items: center;
            width: 150rpx;
            height: 100%;
            .left {
              color: #FF432C;
              font-size: 86rpx;
              padding-left: 10rpx;
            }
            .right {
              color: #FF432C;
              font-size: 60rpx;
              flex: 1;
            }
          }
          .desc {
            .top {
              color: #333;
              font-size: 30rpx;
            }
            .middle {
              color: #666;
              font-size: 25rpx;
            }
            .bottom {
              color: #999;
              font-size: 19rpx;
            }
          }
        }
        .vipcard{
          position: absolute;
          top: 150rpx;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-items: center;
          height: 150rpx;
          width: 400rpx;
          .top{
            color: #333;
            font-size: 28rpx;
            padding-top: 35rpx;
            font-weight: bold;
          }
          .middle {
            color: #FF070C;
            font-size: 18rpx;
          }
          .bottom {
            color: #333;
            font-size: 18rpx;
            margin-top: 10rpx;
          }
        }
      }
      .use-btn-wrapper{ 
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50rpx;
        .use-btn {
          display: inline-block;
          width: 575rpx;
          height: 79rpx;
          line-height: 79rpx;
          background-color: #12CDCF;
          font-size: 40rpx;
          color: #fff;
          font-weight: bold;
          border-radius: 40rpx;
        }
      }
    }
    .bottom-wrapper{
      padding: 0 28rpx;
      .content {
        margin-top: 57rpx;
        padding-bottom: 72rpx;
        .content-item {
          font-size: 28rpx;
          color: #000;
          // margin-top: 10rpx;
          &:first {
            margin-top: 0;
          }
        }
      }
    }
  }
</style>
