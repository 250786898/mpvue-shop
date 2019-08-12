<template>
  <div class="share-view">
    <div class="bg" :style="{'background-image': detail.image}">
      <div class="top">
        <img class="avatar" :src="detail.avatar" />
        <div class="wrap">
          {{ detail.content }}
        </div>
      </div>
      <div class="bottom" v-if="couponType == 1">
        <div class="bottom-content">
          <div class="left">
            <div class="top">{{coupon.couponName}}</div>
            <div class="bottom-bottom bottom-bottom-1">{{coupon.useLimit}}</div>
          </div>
          <div class="right">
            <div class="txt">满世界给你找好吃的！</div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="couponType == 2">
        <div class="bottom-content">
          <div class="left">
            <div class="top">广州市鲜生壹号农产品有限公司</div>
            <div class="middle">{{ vipcard.name }}</div>
            <div class="bottom-bottom-2">{{ vipcard.card }}</div>
          </div>
          <div class="right">
            <div class="txt">满世界给你找好吃的！</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="use-btn" @click="handleJumpToIndex">立即使用</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  export default {
    data() {
      return {
        detail: {},
        coupon: {},
        vipcard: {},
        couponType: 0,  // 1.优惠券 2.体验卡 3.失败
      }
    },
    methods: {
      init () {
        this.getShareDetail()
      },
      getShareDetail () {
        let options = this.$mp.page.options
        if (!options.activityId) {
          return wx.showToast({
            title: '参数错误',
            icon: 'none'
          })
        }
        wx.showLoading()
        let params = {
          shareMember: localStorage.getItem('SESSION_ID'),
          activityId: options.activityId
        }
        Api.freeOrder.getPayShare(params)
        .then(res => {
          console.log('====================================');
          console.log(res);
          console.log('====================================');
          this.detail = res.data
          this.couponType = res.data.type
          if (this.couponType == 1) {
            this.coupon = res.data.coupon
          } else {
            this.vipcard = res.data.vipcard
          }
        })
        .catch(err => console.log(err))
        .then(e => wx.hideLoading())
      },
      handleJumpToIndex () {
        wx.switchTab({ url: '/pages/index/main' })        
      },
      showLoginModal() {
        wx.showModal({
          title: '提示',
          content: '请先登录',
          success: r => {
            if (r.confirm) {
              wx.switchTab({ url: '/pages/mine/main' })
            }
          }
        })
      }
    },
    onShow () {
      const sessionId = localStorage.getItem('SESSION_ID')
      if (sessionId) {
        this.init()
      } else {
        this.showLoginModal()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .share-view{
    .bg {
      width: 100%;
      height: 790rpx;
      .top{
        display: flex;
        align-items: center;
        justify-items: center;
        flex-direction: column;
        margin-top: 77rpx;
        .avatar{
          width: 150rpx;
          height: 150rpx;
          border-radius: 50%;
        }
      }
      .bottom{
        padding: 0 80rpx;
        margin-top: 114rpx;
        .bottom-content{
          border: 1px solid #FE9C0C;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .left{
          background-color: #FEC80C;
          width: 345rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .top {
            color: #B16900;
            font-size: 26rpx;
            margin-top: 27rpx;
          }
          .middle {
            font-size: 36rpx;
            color: #fff;
          }
          .bottom-bottom {
            color: #fff;
            font-size: 113rpx;
            &.bottom-bottom-1{
              font-size: 48rpx;
            }
          }
          .bottom-bottom-2 {
            color: #333;
            font-size: 36rpx;
          }
        }
        .right {
          background-color: #fff;
          flex: 1;
          display: flex;
          justify-content: center;
          .txt{
            width: 148rpx;
            font-size: 30rpx;
            color: #333;
          }
        }
      }
      .wrap{
        position: relative;
        width: 519rpx;
        // height: 400px;
        // border: 10px solid #3377aa;
        border-radius: 20rpx;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        padding: 15rpx 19rpx;
        box-sizing: border-box;
        color: 30rpx;
        margin-top: 20rpx;
        // &::before{
        //   position: absolute;
        //   content: '';
        //   width: 0;
        //   height: 0;
        //   // border-width: 40px 20px;
        //   border-style: solid;
        //   border-color: rgba(0, 0, 0, .3) transparent;
        //   top: 0rpx;
        //   left: 50%;
        //   margin-left: -20rpx;
        // }
        // &::after{
        //   position: absolute;
        //   content: '';
        //   width: 0;
        //   height: 0;
        //   // border-width: 40px 20px;
        //   border-style: solid;
        //   border-color: rgba(0, 0, 0, .3) transparent;
        //   top: 10rpx;
        //   left: 50%;
        //   margin-left: -20rpx;
        // }
      }
    }
    .btn-wrapper{ 
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
</style>
