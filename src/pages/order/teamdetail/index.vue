<template>
  <div class="team-order">
    <!-- 商品介绍 -->
    <div class="goods-list" v-if="order.goodList">
    <!-- <div class="goods-list" v-if="order.goodList"> -->
      <div class="goods-card" v-for="(item, index) in order.goodList" :key="index" @click="goToDetail(item)">
        <div class="goods-card__hd">
          <img :src="item.goodsImage" class="goods-card__bg" mode="aspectFill">
          <!-- <div class="goods-card__mark">
            <img src="/static/images/assemble_label@2x.png" alt="">
            <span>{{item.groupPartner}}人拼团</span>
          </div> -->
        </div>
        <div class="goods-card__bd">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title">{{item.goodsName}}</div>
              <div class="weui-media-box__desc">{{item.goodsSellDesc}}</div>
              <div class="weui-media-box__meta">
                <span class="text-price">￥{{item.activityPrice}}</span>
                <span class="text-price_old">￥{{item.onlinePrice}}</span>
                <span class="text-bold">已拼{{item.saleNum}}件</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="team-order-stauts">
      <div class="fail" v-if="order.orderType == 0 || order.orderType == 3">
        <!-- <img src="/static/images/assemble_icon_fail.png" alt=""> -->
        拼团失败
      </div>
      <div class="fail" v-if="order.orderType == 2">
        <!-- <img src="/static/images/icon_success_pintuan@2x.png" alt=""> -->
        拼团成功
      </div>
      <div class="fail" v-if="order.orderType == 4">
        <!-- <img src="/static/images/icon_success_pintuan@2x.png" alt=""> -->
        订单交易完成
      </div>
      <div class="fail" v-if="order.orderType == 1">
        <div class="success">
          还差<span>{{order.openNumber - order.orderCount}}人</span>成团
        </div>
        <div class="time">
          距离结束还剩<countdowner :countdown="countdown"></countdowner>
        </div>
      </div>
    </div>
    
    <div class="team-user" :class="{'team-user-c': orderMemberInfo.length < 6 ? true : false}" v-if="orderMemberInfo.length && order.openNumber > 1 ">
      <div class="img" v-for="(item, index) in orderMemberInfo" :key="index">
        <img :src="item ? item.headImgsUrl : '/static/images/assemble_icon_questionmark.png'" alt="">
        <span v-if="item ? item.isMainMember : false">
          <img src="/static/images/assemble_btn_green_long2.png" alt="">
          团长
        </span>
      </div>
       <!-- <div class="img">
        <img :src="(orderMemberInfo[1] && orderMemberInfo[1].headImgsUrl) || '/static/images/assemble_icon_questionmark.png'" alt="">
      </div>  -->
    </div>
    <div class="share" v-if="params.share">
      <!-- <div class="success">
        还差<span>{{order.openNumber - order.orderCount}}人</span>成团
      </div>
      <div class="time">
        距离结束还剩<countdowner :countdown="countdown"></countdowner>
      </div> -->
    </div>
    <div class="team-text" v-else-if="order.orderType == 0 || order.orderType == 3">
      本次未成团，退款已原路退回
    </div>
    <div class="btn animation1">
      <button type="button" name="button" v-if="params.share &&  order.orderType != 2" @click="confirmAddTeam">
        <img src="/static/images/assemble_btn_green_long.png" alt="">
        一键参团
      </button>
      <!-- <button type="button" name="button" v-else-if="order.orderType == 0" @click="refundTeam">
        <img src="/static/images/assemble_btn_green_long.png" alt="">
        查看更多拼团商品
      </button> -->
      <button type="button" name="button" v-else-if="order.orderType == 1" open-type="share">
        <img src="/static/images/assemble_btn_green_long.png" alt="">
        邀请好友拼团
      </button>
      <button type="button" name="button" v-else-if="order.orderType == 0" @click="refundTeam">
        <img src="/static/images/assemble_btn_green_long.png" alt="">
        重新拼团
      </button>
      <button type="button" name="button" v-else-if="order.orderType == 2 && order.deliveryType == 2" @click="showOrderCode">
        <img src="/static/images/assemble_btn_green_long.png" alt="">
        提货码
      </button>

      <button type="button" name="button" class="detail-btn" v-if="order.orderType == 4" @click="refundTeam">
        <img src="/static/images/assemble_btn_green_long.png" alt="">
        查看更多拼团商品
      </button>
    </div>

    <div class="weui-panel__ft group-order-detail" v-if="!share && (order.orderType == 2 || order.orderType == 1 || order.orderType == 0 || order.orderType == 4)" @click="goOrder">
          <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
              <div class="weui-cell__bd group-order-detail-text">订单详情</div>
              <span class="weui-cell__ft">></span>
          </a>    
    </div>

    <div class="top" v-if="goodList.length">
      <div class="title">
        <span>拼团Top榜</span>
      </div>
      <ul class="goods-list">
        <li v-for="(item, index) in goodList" :key="index" @click="goToDetail(item)">
          <img :src="item.goodsImage" alt="">
          <div class="nr">
            <div class="name">
              {{item.goodsName}}
            </div>
            <div class="num">
              <span class="group-buy-bar__tag">{{item.groupPartner}}人团</span>
              <span class="a">已拼团{{item.saleNum}}份</span>
            </div>
            <div class="money">
              ￥{{item.activityPrice}} <span>￥{{item.onlinePrice}}</span>
            </div>
            <button type="button" name="button">去拼团</button>
          </div>
        </li>
      </ul>
      <lj-loading @refreshData="handleRefresh" :isNeedRefresh="isNeedRefresh" :isLoadedAll="isLoadedAll">
      </lj-loading>
    </div>
  </div>
</template>

<script>
  import { Api, ORDER_STATE, ORDER_STATE_TEXT } from '@/http/api'
  import LjTabs from '@/components/LjTabs'
  import Loading from '@/components/Loading'
  import PaymentDialog from '@/components/PaymentDialog'
  import Countdowner from '@/components/Countdowner'
  import LjLoading from '@/components/LjLoading'
  import { mapState } from 'vuex'
  import { serialize } from '@/utils/'
  export default {
    components: {
      Countdowner,
      LjLoading
    },
    computed: {
      ...mapState(['storeId']),
    },
    data () {
      return {
        order: {
        },
        orderMemberInfo: '',
        countdown: 0,
        countdownTimer: null,
        params: {},
        page: {
          pageNumber: 1,
          storeId: '',
          activityId: ''
        },
        goodList: [],
        isNeedRefresh: false,
        isLoadedAll: false,
        share: ''  //是否是分享
      }
    },

    methods: {
      getData() {
        wx.showLoading({ mask: true, title: '加载中' })
        Api.activity.groupOrderDetail(this.params)
        .then(res => {
          if(res.code == Api.CODES.SUCCESS) {
            this.order = res.data
            this.page.activityId = res.data.activityId + ''
            this.page.storeId = res.data.storeId
            this.orderMemberInfo = res.data.orderMemberInfo
            this.orderMemberInfo.length = res.data.openNumber
            this.startCountdown(res.data.orderMemberInfo[0].times)
            this.getDataList()
          }
        }).catch(() => {
          wx.hideLoading()
        })
      },
      getDataList() {
        const { page } = this
        Api.activity.activityGoodsList(page).then(res => {
          if(res.code === Api.CODES.SUCCESS) {
            const data = res.data
            if (data.goodList.length > 0) {
              this.goodList = this.goodList.concat(data.goodList)
            } else {
              this.isLoadedAll = true
            }
          }
          wx.hideLoading()
        }).catch(() => {
          wx.hideLoading()
        })
      },
      startCountdown(countdown) {
        clearInterval(this.countdownTimer)
        this.countdown = countdown
        this.countdownTimer = setInterval(() => {
          this.countdown--
          if (this.countdown === 0) {
            clearInterval(this.countdownTimer)
            this.getData()
          }
        }, 1000)
      },

      refundTeam(order) {
        wx.navigateTo({ url: `/pages/group/index/main?id=${ this.order.activityId }&storeId=${this.order.storeId}` })
      },
      showOrderCode(order) {
        wx.navigateTo({ url: `/pages/pickup/detail/main?id=${ this.order.orderId }` })
      },
      goToDetail(order) {
        wx.navigateTo({ url: `/pages/goods/detail/main?id=${order.goodsId}&activityId=${order.activityId}` })
      },
      goOrder(order) {
        wx.navigateTo({ url: `/pages/order/detail/main?id=${this.order.orderId}&type=assemble` })
      },

      confirmAddTeam() {
        //点击一键拼团跳转到商品详情
          wx.navigateTo({ url: `/pages/goods/detail/main?id=${this.order.goodList[0].goodsId}&activityId=${this.order.activityId}&groupOrderId=${this.orderMemberInfo[0].groupOrderId}&storeId=${this.order.storeId}` })
        // this.$store.dispatch('addToActivity', {
        //   goodsId: this.order.goodList[0].goodsId,
        //   count: 1,
        //   activityId: this.order.activityId,
        //   activityType: 30,
        //   groupOrderId: this.orderMemberInfo[0].groupOrderId,
        //   activityGoodsId: this.order.goodList[0].activityGoodsId,
        // })
        // .then(res => {
        //   this.cancelAdd()
        // })
      },
    },

    onLoad(e) {
      this.share = this.$mp.page.options.share
      this.params = e
      this.page.pageNumber = 1
      this.goodList = []
      this.getData()
    },
    onShareAppMessage() {
      return {
        title: '商品详情',
        path: `/pages/index/main?r=${encodeURIComponent(serialize(this.$mp.page)+'&share=1') }`,
        imageUrl: ''
      }
    }
  }
</script>

<style>
  page { background-color: #fff; }
</style>

<style lang="scss" scoped>
  .detail-btn {
    margin-top: 10rpx;
  }
  .group-buy-bar {
    &__tag{
      margin-left:10rpx;
      padding:0 10rpx;
      border-radius:4rpx;
      min-width:60rpx;
      text-align:center;
      font-size:22rpx;
      line-height:30rpx;
      background:#fff;
      color:#FF1414;
      border: 1px solid #FF1414;
    }
  }
  .group-order-detail{
    margin-top: 40rpx;
    padding-right:15px;

  }
  .team-order {
    padding-top: 0;
    .team-order-stauts {
      font-size: 21px;
      color: #333333;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
      img {
        width: 72px;
        height: 72px;
        display: block;
        margin: 0 auto;
        margin-bottom: 18px;
      }
      .success{
        font-size: 25px;
        span{
          color: #0AC3B2;
        }
      }
      .time{
        font-size: 18px;
        margin-top: 5px;
        display:flex;
        justify-content:center;
        align-items:center;

        span{
          color: #0AC3B2;
        }
      }
    }
    .team-user {
      display: flex;
      // justify-content: center;
      width: 100%;
      height: 56px;
      overflow-y: auto;
      padding: 0 10px;
      box-sizing: border-box;
      .img {
        flex: 0 0 76px;
        height: 51px;
        position: relative;
        display:flex;
        justify-content:center;
        >img {
          width: 51px;
          height: 51px;
          position: relative;
          z-index: 1;
          border-radius: 50%;
        }
        >span {
          display: block;
          position: absolute;
          z-index: 2;
          left: 50%;
          bottom: -8px;
          width: 45px;
          height: 17px;
          line-height: 17px;
          background-size: 100% 100%;
          color: #FFFFFF;
          font-size: 12px;
          text-align: center;
          transform: translate(-50%,-50%);
          >img{
            width: 45px;
            height: 17px;
            left: 0;
            top: 0;
            position: absolute;
            z-index: -1;
          }
        }
      }
      .img+.img{
        margin-left: 10px
      }
    }
    .team-user-c {
      justify-content: center;
    }
    .team-text{
      color: #333333;
      font-size: 14px;
      margin: 30px auto 0;
      text-align: center;
    }
    .btn{
      margin-top: 20px;
      button {
        color: #FFFFFF;
        font-size: 18px;
        text-align: center;
        height: 45px;
        line-height: 45px;
        width: 305px;
        position: relative;
        background: none;
        border: 0;
        &:after{
          display: none;
        }
        &:before{
          display: none;
        }
        img {
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          height: 45px;
          width: 305px;
        }
      }
    }
    /deep/ .countdowner {
      vertical-align: middle;
      font-size: 0;
      span {
        background: none;
        font-size: 18px;
        color: #0AC3B2;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        &.num {
          width: 30px;
          line-height: 20px;
          height: 20px;
        }
      }
    }
    .top {
      margin: 20px 15px 0;
      .title {
        color: #0AC3B2;
        font-size: 18px;
        text-align: center;
        position: relative;
        span {
          display: inline-block;
          padding: 0 10px;
          position: relative;
          z-index: 1;
          background: #fff;
        }
        &:after{
          position: absolute;
          content: "";
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 1px;
          background: #D4D4D4;
        }
      }
      .goods-list {
        margin-top: 40px;
        li {
          display: flex;
          img {
            flex: 0 0 82px;
            height: 82px;
          }
          .nr {
            flex: 1;
            margin-left: 12px;
            min-width: 0;
            position: relative;
            .name {
              color: #333333;
              font-size: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .num {
              font-size: 0;
              margin-top: 6px;
              span {
                display: inline-block;
                vertical-align: top;
                color: #F84040;
                font-size: 13px;
                padding: 0 6px;
                line-height: 14px;
                border-radius: 4px;
              }
              .a {
                border: 0;
                background: #CEFFFB;
                font-size: 11px;
                color: #0AC3B2;
                margin-left: 6px;
              }
            }
            .money {
              color: #FC2626;
              font-size: 16px;
              margin-top: 20px;
              span {
                font-size: 12px;
                color: #999999;
                text-decoration: line-through;
              }
            }
            button {
              position: absolute;
              right: 0;
              bottom: 0;
              background: #0AC3B2;
              width: 78px;
              height: 30px;
              line-height: 30px;
              border-radius: 15px;
              color: #FFFFFF;
              font-size: 16px;
            }
          }
        }
        li+li{
          margin-top: 15px;
        }
      }
    }
  }
  .goods-card {
    position: relative;
    margin:80rpx 20rpx 50rpx;
    padding-top: 300rpx;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 12rpx 4rpx rgba(0, 0, 0, 0.1);
    &__hd {
      position: absolute;
      top: -70rpx;
      left: 20rpx;
      right: 20rpx;
    }
    &__bg {
      width: 100%;
      height: 382rpx;
      border-radius: 10rpx;
      vertical-align: middle;
    }
    &__mark {
      position: absolute;
      top: 0;
      left: 12rpx;
      color: #FFF;
      img {
        width: 123rpx;
        height: 72rpx;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 30rpx;
        line-height: 60rpx;
      }
    }
    &__countdown {
      position: absolute;
      right: 16rpx;
      bottom: 20rpx;
      > span {
        font-size: 26rpx;
        font-weight: 700;
        color: $text-black;
        vertical-align: top;
        margin-right: 16rpx;
      }
      /deep/ .countdowner {
        vertical-align: middle;
      }
    }
    &__bd {
      position: relative;
      margin: 0 28rpx 0;
      text-align: center;
      .weui-media-box {
        padding: 20rpx;
        &__hd_in-appmsg {
          margin-right: 20rpx;
          width: 220rpx;
          height: 220rpx;
        }
        &__title {
          color: $text-black;
          font-size: 32rpx;
          line-height: 44rpx;
          text-overflow:clip;
          white-space:pre-wrap;
          text-align:left;
        }
        &__desc {
          color: $text-gray;
          -webkit-line-clamp: 1;
          line-height: 44rpx;
          font-size: 26rpx;
        }
        &__meta {
          margin-top: 6rpx;
          .text-price {
            font-size: 34rpx;
            font-weight: 700;
            &_old {
              font-size: 26rpx;
              color: #909090;
              text-decoration: none;
            }
          }
          .text-bold {
            font-size: 26rpx;
            color: #909090;
          }
          span + span {
            margin-left: 8rpx;
          }
        }
        button {
          margin-top: 10rpx;
          margin-bottom: -60rpx;
          line-height: 72rpx;
          border-radius: 36rpx;
          width: 280rpx;
          font-size: 34rpx;
          &.bg-orange {
            background-color: #F99A09!important;
          }
          &[plain] {
            background-color: #fff;
            color: $text-black;
          }
        }
      }
    }

    & + .goods-card {
      margin-top: 170rpx;
    }
  }
  .share {
    text-align: center;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    margin-top: 24px;
    .success {
      display: inline-block;
      vertical-align: top;
    }
    .time {
      display: inline-block;
      vertical-align: top;
    }
    /deep/ .countdowner {
      vertical-align: middle;
      font-size: 0;
      span {
        background: none;
        font-size: 14px;
        color: #0AC3B2;
        font-weight: bold;
        line-height: 20px;
        height: 20px;
        &.num {
          width: 30px;
          line-height: 20px;
          height: 20px;
        }
      }
    }
  }
  @-webkit-keyframes lanimation
  {
    0% {transform: scale(1)}
    50% {transform: scale(0.9)}
    100% {transform: scale(1)}
  }

.animation1{
  animation: lanimation 1s ease-in infinite;
  // animation-delay 0.6s;
}

</style>
