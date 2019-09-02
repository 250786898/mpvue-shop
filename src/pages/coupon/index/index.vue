<template>
  <div>
    <div class="fixed-bar">
      <lj-tabs :tabs="tabs" v-model="activeIndex" :flex="true"></lj-tabs>
    </div>
    <div class="fixed-bar-ph"></div>
    <div>
      <!-- 二期
      <div class="exchange" v-if="activeIndex === 0">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入兑换码" v-model.trim="excode">
          </div>
          <div class="weui-cell__ft">
            <button type="primary" class="radius bg-gradient" :disabled="!excode">兑换</button>
          </div>
        </div>
      </div>
      -->
      <div class="container">
        <template v-if="activeIndex === 0">
          <coupon-card v-for="item in list" :key="item.couponId" :item="item"></coupon-card>
        </template>
        <template v-else-if="activeIndex === 1">
          <movable-area class="slider-left-item" style="width: 930rpx; margin-left:-180rpx;"
            v-for="(item, index) in list"
            :key="item.couponId">
            <movable-view class="slider-left-content"
              damping="100"
              :x="item.x"
              direction="horizontal"
              @touchstart="handleTouchestart(item, $event)"
              @touchend="handleTouchend(item, $event)"
              @change="handleChange(item, $event)">
              <coupon-card :status="1" :item="item"></coupon-card>
            </movable-view>
            <view class='slider-left-handle'>
              <view @click="del(item,index)" class="slider-left-handle__button red">
                删除
              </view>
            </view>
          </movable-area>
        </template>
        <template v-else>
          <!-- TODO: 更好的 SlideLeft -->
          <movable-area class="slider-left-item" style="width: 930rpx; margin-left:-180rpx;"
            v-for="(item, index) in list"
            :key="item.couponId">
            <movable-view class="slider-left-content"
              damping="100"
              :x="item.x"
              direction="horizontal"
              @touchstart="handleTouchestart(item, $event)"
              @touchend="handleTouchend(item, $event)"
              @change="handleChange(item, $event)">
              <coupon-card :status="2" :item="item"></coupon-card>
            </movable-view>
            <view class='slider-left-handle'>
              <view @click="del(item,index)" class="slider-left-handle__button red">
                删除
              </view>
            </view>
          </movable-area>
        </template>
      </div>
      <div class="empty-tip" v-if="!list.length">
        <img src="/static/images/coupon_bg@2x.png" alt="">
        <div class="empty-tip__text">还没有优惠券哦~</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import LjTabs from '@/components/LjTabs'
  import CouponCard from '@/components/CouponCard'

  const OPEN_WIDTH = 180
  const MOVE_THRESHOLD = 30

  export default {
    components: {
      LjTabs,
      CouponCard
    },

    data () {
      return {
        activeIndex: 0,
        // excode: '',
        list: [
        ],
        expiredNum: 0,
        notUsedNum: 0,
        userdNum: 0
      }
    },

    computed: {
      tabs() {
        return [
          { title: `未使用(${ this.notUsedNum })`, listType: 1 },
          { title: `已使用(${ this.userdNum })`, listType: 2 },
          { title: `已过期(${ this.expiredNum })`, listType: 3 }
        ]
      }
    },

    methods: {
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
          this.list.forEach(_item => {
            if (item !== _item) {
              this.slideCloseItem(_item)
            }
          })
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

      getMyCouponList() {
        this.list = []
        Api.coupon.myCouponList({
          listType: this.tabs[this.activeIndex].listType,
          pageSize: 1000
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.list = res.data.couponList.map(item => {
              return {
                ...item,
                x: OPEN_WIDTH,
                open: false,
                moveInstance: 0,
                currentX: OPEN_WIDTH
              }
            })
            this.expiredNum = res.data.expiredNum
            this.notUsedNum = res.data.notUsedNum
            this.userdNum = res.data.userdNum
          }
        })
      },

      /**
       * 删除过期优惠券
       * @option item Object  过期优惠券对象
       * @option index Number 删除的下标
       */
      del (item, index) {
        var that = this;
        wx.showModal({
          title: '提示',
          content: '确定要删除吗？',
          success: function (res) {
          if(res.confirm){

            //用户点击了确定，可以调用删除方法了
            Api.coupon.deleteCoupon({
              couponId: item.couponId
              }).then(res => {
              if(res.code === Api.CODES.SUCCESS) {

                //删除dom
                that.list.splice(index,1)

                //删除API数据成功，提示删除
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 3000
                })
              }
            })  

          } else if (res.cancel) {
              //取消删除
            }
          }
        })
      }

    },  

    onLoad() {
      this.getMyCouponList()
    },

    watch: {
      activeIndex() {
        this.getMyCouponList()
      }
    }
  }
</script>

<style lang="scss">
  page { background-color: #F7F7F7; }
</style>

<style lang="scss" scoped>
  .exchange {
    background-color: #fff;
    .weui-cell {
      padding-top: 30rpx;
      padding-bottom: 30rpx;
    }
    .weui-input {
      padding-left: 30rpx;
      padding-right: 30rpx;
      background-color: #F4F4F4;
      font-size: 28rpx;
      color: #B3B3B3;
      height: 62rpx;
      line-height: 62rpx;
      min-height: 62rpx;
      border-radius: 31rpx;
    }
    button[type=primary] {
      line-height: 62rpx;
      width: 160rpx;
      margin-left: 20rpx;
    }
  }

  .container {
    padding: 30rpx 0;
  }

  .slider-left-item {
    background-color: transparent;
    /deep/ .coupon-card {
      flex: 1;
      background-color: #F7F7F7;
    }
    .slider-left-handle {
      height: 260rpx;
      right: 20rpx;
    }
  }

  .fixed-bar {
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    right: 0;
    &-ph {
      height: 88rpx;
    }
  }
</style>