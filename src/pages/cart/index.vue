<template>
  <div>
    <div class="goods-list" v-if="(result.cartItemResultList && result.cartItemResultList.length) || (result.failureGoodsList && result.failureGoodsList.length)">
      <!-- <template v-if="result.globalActivityId">
        <div class="top-tip">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd">
              <div class="top-tip__tag">包邮</div>
            </div>
            <rich-text :nodes="result.globalActivityDescribe" class="weui-cell__bd"></rich-text>
            <navigator url="/pages/index/main" open-type="switchTab" class="weui-cell__ft weui-cell__ft_in-access" v-if="!result.matchState">去凑单</navigator>
          </div>
        </div>
        <div class="top-tip__placeholder"></div>
      </template> -->
      
      <div class="group" v-for="(list, activityId) in groupedCartList" :key="index">
        <!-- <div class="group-tip" v-if="activityId && list[0].activityDesc"> -->
        <div class="group-tip" v-if="false">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">{{ list[0].activityDesc }}</div>
            <!-- <div class="weui-cell__bd">还差<span>10.00</span>元 满50减10元</div> -->
            <!-- 会员 -->
            <!--
            <navigator v-if="list[0].activityType == 50"
              class="weui-cell__ft weui-cell__ft_in-access"
              :url="'/pages/activity/main?id=' + activityId + '&activityType=' + list[0].activityType + '&activitySubType=' + (list[0].activitySubType || 0)">
              去凑单
            </navigator>
            -->
          </div>
        </div>
        <div v-for="(item,index) in list" :key="item.goodsId">
          <movable-area class="slider-left-item" style="width: 930rpx; margin-left:-180rpx;">
            <movable-view class="slider-left-content"
              damping="0"
              :x="item.x"
              direction="horizontal"
              @touchstart="handleTouchestart(item, $event)"
              @touchend="handleTouchend(item, $event)"
              @change="handleChange(item, $event)">
              <div class="weui-panel goods-list-panel" >
                <div class="weui-panel__bd">
                  <div class="weui-media-box weui-media-box_appmsg">
                    <label class="checkbox">
                      <switch type="checkbox" class="weui-check" :checked="item.checked" @change="onGoodsCBChange($event, item,index)"/>
                      <div class="weui-cell__hd weui-check__hd_in-checkbox">
                        <icon v-if="item.checked" class="weui-icon-checkbox_success" type="success" size="23" color="#12D6BE" ></icon>
                        <icon v-else class="weui-icon-checkbox_circle" type="circle" size="23"></icon>
                      </div>
                    </label>
                    <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                      <image class="weui-media-box__thumb" :src="item.goodsImage" />
                    </div>
                    <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                      <div class="weui-media-box__title">
                        <span class="ddd" v-if="item.activityEnable && item.activityType == 20 && item.activityName">{{item.activityName}}</span>
                        {{ item.goodsName }}
                        </div>
                      <div class="goods-row-item__tb">
                        <goods-price :item="item" :showNormalTag="false"></goods-price>
                        <div class="goods-count">
                          <counter v-model="item.itemTotalNum" :max="item.maxNum" @change="onGoodsNumChange(item)"></counter>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </movable-view>
            <view class='slider-left-handle'>
              <view @click="del(item)" class="slider-left-handle__button red">
                删除
              </view>
            </view>
          </movable-area>
        </div>
      </div>
      
      <div class="group" v-if="result.failureGoodsList && result.failureGoodsList.length">
        <div class="group__title">失效商品</div>
        <div v-for="item in result.failureGoodsList" :key="item.goodsId">
          <movable-area class="slider-left-item" style="width: 930rpx; margin-left:-180rpx;">
            <movable-view class="slider-left-content"
              damping="0"
              direction="horizontal"
              :x="item.x"
              @touchstart="handleTouchestart(item, $event)"
              @touchend="handleTouchend(item, $event)"
              @change="handleChange(item, $event)"
              >
              <div class="weui-panel goods-list-panel">
                <div class="weui-panel__bd">
                  <div class="weui-media-box weui-media-box_appmsg disabled">
                    <div class="checkbox"></div>
                    <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                      <image class="weui-media-box__thumb" :src="item.goodsImage" />
                    </div>
                    <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                      <div class="weui-media-box__title">{{ item.goodsName }}</div>
                      <div class="weui-media-box__desc">
                       
                        <span class="goods-price">￥{{ item.onlinePrice }}</span>
                        <div class="goods-count" @touchstart.stop>
                          <counter :disabled="true" v-model="item.goodsNum"></counter>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </movable-view>
            <view class='slider-left-handle'>
              <view @click="del(item, true)" class="slider-left-handle__button red">
                删除
              </view>
            </view>
          </movable-area>
        </div>
      </div>
    </div>

    <div class="empty-tip" v-else>
      <img src="/static/images/shopcart_icon_bg.png@2x.png">
      <div class="empty-tip__text empty-tip__text_main">购物车为空~</div>
      <div class="empty-tip__text">赶紧去慰劳一下自己吧~</div>
      <button type="primary" class="radius" @click="toIndex">
        快去逛一逛吧~
      </button>
    </div>

    <!-- <goods-recommend :type="1"></goods-recommend> -->

    <div style="height: 120rpx;"></div>
    <div class="footer-bar">
      <div class="weui-flex">
        <label class="weui-cell weui-check__label">
          <switch type="checkbox" class="weui-check" :checked="allChecked" @change="onAllCheckedChange"></switch>
          <div class="weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!allChecked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" color="#0EDABC" size="23" v-if="allChecked"></icon>
          </div>
          <div>全选</div>
        </label>
        <div class="weui-flex__item">
          <div class="all-count">
            <h4>
              <span class="all-count__desc"></span>
              <span class="all-count__total">合计:</span>
              <span class="all-count__price">￥{{ result.totalAmount }}</span>
            </h4>
            <p>已优惠:-￥{{ result.promisAmount || 0 }}</p>
          </div>
        </div>
        <div>
          <button type="primary" class="radius bg-gradient"  @click="checkout" :disabled="!hasSelectedGoods">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import { mapState } from 'vuex'
  import GoodsRecommend from '@/components/GoodsRecommend'
  import Counter from '@/components/Counter'
  import GoodsPrice from '@/components/GoodsPrice'
  
  const OPEN_WIDTH = 200
  const MOVE_THRESHOLD = 30
  const SLIDE_PARAMS = {
    x: OPEN_WIDTH,
    open: false,
    moveInstance: 0,
    currentX: OPEN_WIDTH,
    checked: true
  }

  export default {
    components: {
      GoodsRecommend,
      Counter,
      GoodsPrice
    },

    data () {
      return {
        result: {}
      }
    },

    computed: {
      ...mapState(['storeId']),
      // 分组购物车
      groupedCartList() {
        let result = {}

        if (this.result && this.result.cartItemResultList) {
          this.result.cartItemResultList.forEach(item => {
            // if (item.activityEnable && item.activityId) {
            // if (item.activityId) {
            //   result[item.activityId] = result[item.activityId] || []
            //   result[item.activityId].push(item)
            // } else {
            //   result[''] = result[''] || []
            //   result[''].push(item)
            // }
              result[''] = result[''] || []
              result[''].push(item)
          })
        }
        console.log('result',result)
        return result
      },

      allChecked: {
        get() {
          return this.result.cartItemResultList && this.result.cartItemResultList.every(item => item.checked)
        },

        set(checked) {
          if (this.result.cartItemResultList) {
            this.result.cartItemResultList.forEach(item => item.checked = checked)
          }
        }
      },

      totalAmount() {
        let result = 0

        if (this.result.cartItemResultList) {
          result = this.result.cartItemResultList.reduce((base, item) => {
            if (!item.checked) return base
            // HACK: 处理浮点失准
            return base + (item.goodsPayPrice * item.goodsNum)
          }, 0)
        }

        return result.toFixed(2)
      },

      hasSelectedGoods() {
        return this.result.cartItemResultList &&
          this.result.cartItemResultList.some(item => item.checked)
      }
    },

    methods: {
      findSubListByItem(item) {
        let list

        for(let key in this.groupedCartList) {
          if (this.groupedCartList[key].indexOf(item) !== -1) {
            list = this.groupedCartList[key]
          }
        }

        return list
      },

      handleChange(item, e) {
        item.moveInstance = OPEN_WIDTH - e.x
        item.currentX = e.x
      },

      handleTouchend(item) {
        item.x = 0
        // 如果松开手指的时候，已经被拖拽到最左边或者最右边，则不处理
        if (item.currentX === 0) {
          return this.slideOpenItem(item)
        }
        if (item.currentX === OPEN_WIDTH) {
          return this.slideCloseItem(item)
        }
        // 如果当前菜单是打开的，只要往右移动的距离大于0就马上关闭菜单
        if (item.open && item.currentX > 0) {
          return this.slideCloseItem(item)
        }

        // 如果当前菜单是关着的，只要往左移动超过阀值就马上打开菜单
        if (item.moveInstance < MOVE_THRESHOLD) {
          this.slideCloseItem(item)
        } else {
          this.slideOpenItem(item)
        }
      },

      // 开始左滑时触发（轻触摸的时候也会触发），主要用于显示当前删除按钮前先 隐藏掉其它项的删除按钮
      handleTouchestart(item) {
        if (!item.open) {
          let list = this.findSubListByItem(item)

          if (list) {
            list.forEach(_item => {
              if (item !== _item) {
                this.slideCloseItem(_item)
              }
            })
          }
        }
      },

      slideOpenItem(item) {
        item.open = true
        item.x = 0
      },

      slideCloseItem(item) {
        item.open = false
        item.x = OPEN_WIDTH
      },

      onGoodsCBChange({ mp: { detail } }, item,index) {
        item.checked = detail.value
        this.updateActivityStatus(detail.value,index)  
      },

      onAllCheckedChange(e) {
        this.allChecked = e.mp.detail.value
        this.updateActivityStatus(e.mp.detail.value)
      },

      getCheckedCartIds() {
        if (!this.result || !this.result.cartItemResultList) return ''

        return this.result.cartItemResultList
          .filter(item => item.checked)
          .map(item => item.cartId)
          .join(',')
      },

      updateActivityStatus(checked,index) {
        wx.showLoading({})
        console.log(this.getCheckedCartIds())
        Api.cart.cartList({
          storeId: this.storeId,
          carts: this.getCheckedCartIds()
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            const UPDATE_PARAMS = {
              x: OPEN_WIDTH,
              open: false,
              moveInstance: 0,
              currentX: OPEN_WIDTH       
            }
           res.data.cartItemResultList = res.data.cartItemResultList.map( (item,currentIndex) => {      
              let checkedValue = currentIndex == index ? checked : ''
             return {
              ...item,
              ...UPDATE_PARAMS,
              checked: checkedValue? checkedValue : this.result.cartItemResultList[currentIndex].checked
            }
           })
           console.log(res.data.cartItemResultList)
           console.log(checked,index)
            this.result.cartItemResultList = res.data.cartItemResultList
            this.result.totalAmount  =  res.data.totalAmount
            this.result.globalActivityDescribe = res.data.globalActivityDescribe
            this.result.globalActivityType = res.data.globalActivityType
            this.result.globalActivityId = res.data.globalActivityId
            this.result.matchState = res.data.matchState
            this.result.promisAmount = res.data.promisAmount     
            // this.result.cartItemResultList = res.data.cartItemResultList
            wx.hideLoading({})
          }
        })
      },

      onGoodsNumChange(item) {
        Api.cart.update({
          cartId: item.cartId,
          num: item.itemTotalNum,
          storeId: this.storeId
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.updateActivityStatus()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
            if (res.code === 5000000) {
              // item.goodsNum--
            }
          }
        })
      },

      del(item, isFailureGoods) {
        wx.showLoading({
          title: '移除商品中',
          mask: true
        })
        Api.cart.remove({
          cartIds: item.cartId
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            if (isFailureGoods) {
              let index = this.result.failureGoodsList.indexOf(item)
              this.result.failureGoodsList.splice(index, 1)
            } else {
              let index = this.result.cartItemResultList.indexOf(item)
              this.result.cartItemResultList.splice(index, 1)
            }
            this.$store.dispatch('updateCartNum')
            this.updateActivityStatus()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())        
      },

      checkout() {
        if (this.result.cartItemResultList) {
          let cartIds = this.result.cartItemResultList
            .filter(item => item.checked)
            .map(item => item.cartId)
            .join(',')

          if (cartIds) {
            wx.navigateTo({
              url: `/pages/order/preview/main?cartIds=${ cartIds }`
            })
          }
        }
      },

      getCartList() {
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        Api.cart.cartList({
          storeId: this.storeId,
          carts: 'all'
        }).then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            res.data.cartItemResultList = res.data.cartItemResultList.map(item => ({
              ...item,
              ...SLIDE_PARAMS
            }))
            res.data.failureGoodsList = res.data.failureGoodsList.map(item => ({
              ...item,
              ...SLIDE_PARAMS 
            }))
            this.result = res.data
          }
        })
        .catch(e => console.log(e))
        .then(() => {
          wx.hideLoading()
          wx.stopPullDownRefresh()
        })
        this.$store.dispatch('syncCartTabbarBadge')
      },

      toIndex() {
        wx.switchTab({
          url: '/pages/index/main'
        })
      }
    },

    onLoad() {
      this.$bus.$on('updateCart', this.getCartList)
    },

    onUnload() {
      this.$bus.$off('updateCart', this.getCartList)
    },

    onShow() {
      this.getCartList()
      // wx.startPullDownRefresh()
    },

    onPullDownRefresh() {
      this.getCartList()
    }
  }
</script>

<style>
  page { background-color: #F5F5F5; }
</style>

<style lang="scss" scoped>
  .empty-tip {
    padding-top: 220rpx;
    padding-bottom: 220rpx;
    border-bottom: 1rpx solid #F4F4F4;
    button {
      margin-top: 50rpx;
      width: 428rpx;
    }
  }

  .top-tip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
    background-color: #FEF7D7;
    &__tag {
      margin-right: 10rpx;
      padding: 0 10rpx;
      border-radius: 10rpx;
      border: 2rpx solid #EF3737;
      line-height: 36rpx;
      height: 36rpx;
      font-size: 24rpx;
      color: #EF3737;
    }
    &__placeholder {
      height: 80rpx;
    }
    .weui-cell {
      &__bd {
        font-size: 26rpx;
        color: $text-black;
      }
      &__ft {
        font-size: 26rpx;
        color: #0FD7C0;
        &:after {
          border-color: #0FD7C0;
        }
      }
    }
  }

  .group {
    + .group {
      margin-top: 20rpx;
    }
    &-tip {
      background-color: #fff;
      padding-top: 20rpx;
      .weui-cell {
        padding-left: 96rpx;
        padding-top: 12rpx;
        padding-bottom: 12rpx;
        background-color: #EFFFDB;
        &__bd {
          font-size: 26rpx;
          span {
            color: #DA3535;
          }
        }
        &__ft {
          font-size: 26rpx;
          color: #0FD7C0;
          &:after {
            border-color: #0FD7C0;
          }
        }
      }
    }
    &__title {
      background-color: #fff;
      padding: 30rpx 0 10rpx;
      text-align: center;
      font-size: 32rpx;
      color: $text-black;
    }
  }
  
  .goods-list-panel {
    width: 100%;
    .weui-media-box {
      padding-top: 20rpx;
      padding-bottom: 20rpx;
      &__title {
        height: 100rpx;
        margin-bottom: 0;
      }
      .ddd {
        min-width:88px;
        text-align: center;
        padding: 0 10px;
        height:14px;
        line-height:14px;
        color: #E50F0F;
        font-size: 12px;
        border:1px solid rgba(229,15,15,1);
        border-radius:9px;
      }
      + .weui-media-box:before {
        display: block;
        left: 0;
        border-color: #F4F4F4;
      }
      &.disabled {
        .weui-media-box__title,
        .goods-price {
          color: $text-gray;
        }
      }
    }
    
    .member-only {
      line-height: 56rpx;
      font-size: 32rpx;
      color: #FFA442;
      font-weight: 700;
      &__tag {
        font-weight: 400;
        display: inline-block;
        margin-left: 10rpx;
        padding-left: 16rpx;
        padding-right: 16rpx;
        height: 36rpx;
        line-height: 36rpx;
        border-radius: 20rpx;
        background-color: #FFA442;
        font-size: 20rpx;
        color: #fff;
        vertical-align: middle;
      }
    }






    .goods-row-item__tb {
      height: 60rpx;
  // .goods-price{
  // .goods-row-item__price{
  //      position: absolute;
  //      top:0;
  //      left:0;
  //      .primary{
  //         position: absolute;
  //        top:-115rpx;
  //      }



  //    }
  // }
      
   
      .primary { font-size: 28rpx; }
      .secondary { font-size: 22rpx; }
      .goods-count {
        top: auto!important;
        bottom: 0!important;
      }
    }
  }

  .footer-bar {
    z-index: 101;
    padding: 15rpx 30rpx;
    background-color: #fff;
    .weui-check__label {
      padding-left: 0;
      padding-top: 0;
      padding-bottom: 0;
      font-size: 26rpx;
      color: $text-gray;
    }

    .all-count {
      margin-bottom: 4rpx;
      padding-right: 20rpx;
      text-align: right;
      line-height: 32rpx;
      font-size: 24rpx;
      color: $text-black;
      h4 {
        font-size: 26rpx;
        .all-count__desc {
          font-size: 20rpx;
          color: #999;
        }
        .all-count__total {
          font-size: 32rpx;
        }
        .all-count__price {
          font-weight: 700;
          color: #F03E3E;
          font-size: 32rpx;
        }
      }
    }

    button[type=primary] {
      margin-top: 4rpx;
      width: 188rpx;
      line-height: 70rpx;
      border-radius: 35rpx;
    }
  }
</style>
