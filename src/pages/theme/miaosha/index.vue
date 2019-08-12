<template>
  <div :style="{'background':activity.bgColor}" style="height:100%;">
    <div class="banner">
      <img :src="activity.activityBanner" mode="widthFix">
    </div>
    <div class="goods-list">
      <template v-for="(item, index) of goodList">
        <!-- 10 限时抢购 -->
        <div class="goods-card" :key="item.goodsId" v-if="activity.activityType == 10">
          <img src="https://ww1.sinaimg.cn/bmiddle/c4a4463cly1fyk1qkw7qtj23g02aoe81.jpg" class="goods-card__bg" mode="aspectFill">
          <!-- @TODO: 未开始 -->
          <template v-if="item.activityStatus == 10">
            <div class="goods-card__mark">秒杀预售</div>
            <div class="goods-card__countdown">
              <span>距开始</span>
              <countdowner :countdown="times" v-if="times > 0"></countdowner>
            </div>
          </template>
          <!-- 进行中 -->
          <template v-else-if="item.activityStatus == 20">
            <div class="goods-card__mark">秒杀抢购</div>
            <div class="goods-card__countdown">
              <span>距结束</span>
              <countdowner :countdown="times" v-if="times > 0"></countdowner>
            </div>
          </template>
          <!-- 已结束 -->
          <template v-else-if="item.activityStatus == 30"></template>
          <div class="goods-card__bd">
            <div class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                <img class="weui-media-box__thumb" mode="aspectFit" :src="item.goodsImage"/>
              </div>
              <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                <div class="weui-media-box__title">{{ item.goodsName }}</div>
                <div class="weui-media-box__desc">{{ item.goodsSellDesc }}</div>
                <div class="weui-media-box__desc weui-media-box__desc_red" v-if="item.bespeakStartTime">
                  最快{{ item.bespeakStartTime }}可以提货
                </div>
                <div class="weui-flex">
                  <div class="weui-flex__item">
                    <div class="text-price">￥{{ item.activityPrice }}</div>
                    <div class="text-price_old">￥{{ item.onlinePrice }}</div>
                  </div>
                  <div>
                    <template v-if="activity.activityStatus == 10">
                      <form report-submit="true" @submit="uploadFormId">
                        <button
                          v-if="item.remindMsgStatus == 2"
                          type="primary"
                          form-type="submit"
                          class="radius shadow bg-gradient_v"
                          @click.stop="handleAddRemind(item.activityId, item.goodsId, item.id, index)">
                          开启提醒
                        </button>
                        <button
                          v-else
                          type="primary"
                          form-type="submit"
                          class="radius shadow"
                          :plain="true"
                          @click.stop="cancelRemindMsg(item.remindMsgId, index)">
                          取消提醒
                        </button>
                      </form>
                    </template>
                    <navigator
                      v-else-if="activity.activityStatus == 20"
                      :url="'/pages/goods/detail/main?id=' + item.goodsId + '&activityId=' + activity.activityId">
                      <button type="primary" class="radius bg-orange shadow">立即抢购</button>
                    </navigator>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <lj-loading @refreshData="handleRefresh" :isNeedRefresh="isNeedRefresh" :isLoadedAll="isLoadedAll">
      </lj-loading>
    </div>
    <fixed-cart-icon></fixed-cart-icon>
  </div>
</template>

<script>
  import GoodsRowItem from '@/components/GoodsRowItem'
  import Countdowner from '@/components/Countdowner'
  import LjLoading from '@/components/LjLoading'
  import FixedCartIcon from '@/components/FixedCartIcon'
  import Empty from '@/components/Empty'
  import { Api } from '@/http/api'
  import { mapState } from 'vuex'

  export default {
    components: {
      GoodsRowItem,
      Countdowner,
      LjLoading,
      FixedCartIcon
    },
    data () {
      return {
        pageNumber: 1, //当前页码
        activity: {} , //活动相关信息
        times: 0 , //倒计时
        goodList: [],//商品列表
        interTimer: null, //定时器,
        activityId: -1, //活动id
        isNeedRefresh: false,
        isLoadedAll: false,
        formId: '',
      }
    },
    conputed: {
      ...mapState(['storeId']),
    },
    methods: {
      //获取抢购商品数据
      getGoodsList () {
        wx.showLoading({
          title: '加载中',
        })
        Api.activity.activityGoodsList({
          pageNumber: this.pageNumber ,
          storeId: this.storeId,
          activityId: this.activityId,
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            const data = res.data

            if (data.goodList.length > 0) {
              this.goodList = this.goodList.concat(data.goodList)
            } else {
              this.isLoadedAll = true
            }

            if (this.pageNumber === 1) {
              this.activity = data.activity
              this.times = data.activity.times
              wx.setNavigationBarTitle({
                title: data.activity.activityName
              })
            }

            if (data.activity.activityStatus == 30) {
              wx.showModal({
                content: '活动已结束',
                showCancel: false,
                success: () => wx.navigateBack()
              })
            }
          } else {
            wx.showModal({
              content: res.message,
              showCancel: false,
              success: () => wx.navigateBack()
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },

      uploadFormId (e) {
       this.formId = e.target.formId
      },

      /**
       * 添加提醒
       * @param activityId 活动id
       * @param goodsId 商品id
       * @param activityGoodsId 活动商品id
       */
      handleAddRemind (activityId, goodsId, activityGoodsId, index) {
        Api.activity.addRemindMsg({ formId: this.formId,activityId, goodsId, activityGoodsId }).then(res => {
          if(res.code == Api.CODES.SUCCESS) {
            wx.showToast({
              title: '设置成功,将在活动前3分钟提醒您~',
              icon: 'none',
              duration: 5000
            })
            this.goodList[index].remindMsgId = res.data.remindMsgId
            this.goodList[index].remindMsgStatus = 1
          } else if (res.code == Api.CODES.SESSION_ERROR) {
            wx.showToast({
              title: '亲，请先登录再来抢购~',
              icon: 'none',
              duration: 1500,
              success () {
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../../mine/auth/main'
                  })
                }, 1500)
              }
            })
          }
        })
      },

      /**
       * 删除提醒
       * @param id 提醒id
       */
      cancelRemindMsg (id , index) {
        Api.activity.cancelRemindMsg({ formId:this.formId , id }).then(res =>{
          if(res.code == Api.CODES.SUCCESS) {
            wx.showToast({
              title: '秒杀活动已取消,您有可能会抢不到哟~',
              icon: 'none',
              duration: 3000
            })
           this.goodList[index].remindMsgStatus = 2
           this.goodList[index].remindMsgId = 0
          } else if(res.code == Api.CODES.FAILED){
            wx.showToast({
              title: '服务器请求返回错误',
              icon: 'none',
              duration: 3000
            })
          }
        })
      },

      //秒速减1
      jianTimer () {
        this.times -= 1
      },

      //倒计时开启
      countdown () {
        this.interTimer = setInterval(() => {
          this.jianTimer()
        }, 1000)
      },

      //更新数据
      handleRefresh () {
        if(!this.isLoadedAll) {
          this.isNeedRefresh = true
          this.pageNumber++
          this.getGoodsList()
        }
      }
    },

    onLoad (options) {
      this.activityId = options.id
      this.getGoodsList()
      this.jianTimer()
      this.countdown()
    },

    onUnload () {
　　  clearInterval(this.interTimer)
    }
  }
</script>

<style>

</style>

<style scoped lang="scss">
  .banner {
    position: relative;
    img {
      vertical-align: middle;
      width: 100%;
    }
  }

  .goods-card {
    position: relative;
    margin: 10rpx 20rpx;
    &__bg {
      width: 100%;
      height: 424rpx;
      border-radius: 10rpx;
    }
    &__mark {
      position: absolute;
      left: 0;
      top: 34rpx;
      width: 162rpx;
      height: 58rpx;
      line-height: 58rpx;
      border-top-right-radius: 29rpx;
      border-bottom-right-radius: 29rpx;
      background-color: #ED1010;
      font-size: 28rpx;
      text-align: center;
      color: #FFF;
    }
    &__countdown {
      position: absolute;
      right: 36rpx;
      top: 44rpx;
      > span {
        font-size: 26rpx;
        color: #FFF;
        vertical-align: top;
        margin-right: 16rpx;
      }
      /deep/ .countdowner {
        vertical-align: middle;
      }
    }
    &__bd {
      position: relative;
      margin: -160rpx 28rpx 0;
      .weui-media-box {
        background-color: #fff;
        border-radius: 10rpx;
        padding: 20rpx;
        &__hd_in-appmsg {
          margin-right: 20rpx;
          width: 220rpx;
          height: 220rpx;
        }
        &__title {
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: $text-black;
          white-space: normal;
          font-size: 32rpx;
          line-height: 44rpx;
        }
        &__desc {
          color: $text-gray;
          -webkit-line-clamp: 1;
          line-height: 44rpx;
          font-size: 24rpx;
          &_red {
            font-size: 26rpx;
            color: $text-red;
          }
        }
        .weui-flex {
          margin-top: 20rpx;
          line-height: 36rpx;
          button {
            margin-top: 4rpx;
            width: 200rpx;
            line-height: 60rpx;
            border-radius: 32rpx;
            font-size: 28rpx;
          }
        }
      }
    }

    & + .goods-card {
      margin-top: 50rpx;
    }
  }
</style>
