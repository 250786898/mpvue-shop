<template>
  <div class="container">

    <div class="redeem-code">
      <div class="redeem-code-form">
        <input type="text" placeholder="请输入兑换码" class="redeem-code-input">
        <span class="redeem-code-form__btn">兑换</span>
      </div>
    </div>

    <div class="coupons-list-container">

       <div class="coupons-list-header">
          您有<span class="totol-coupons-num">2</span>张优惠券即将到期
       </div>

       <div class="coupons-list">
         <coupon-card v-for="item in list" :key="item.couponId" :item="item"></coupon-card>
         <coupon-card v-for="item in list" :key="item.couponId" :item="item" type="used"></coupon-card>
       </div>
    </div>

  </div>
  <!--


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
      <coupon-card :status="1":item="item"></coupon-card>
    </movable-view>
    <view class='slider-left-handle'>
      <view @click="del(item,index)" class="slider-left-handle__button red">
        删除
      </view>
    </view>
  </movable-area> -->
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import CouponCard from '../components/CouponCard'

  const OPEN_WIDTH = 180
  const MOVE_THRESHOLD = 30

  export default {
    components: {
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
  page { background:rgba(243,243,243,1) }
</style>

<style lang="scss" scoped>
.container{
  box-sizing: border-box;
}
.redeem-code{
  padding: 15rpx 25rpx;
  background: $white-color;
  width: 100vw;
  box-sizing: border-box;
  &-form{
    display: flex;
    align-items: center;
    &__btn{
      color:#000000;
      font-size: 28rpx;
      margin-left: 24rpx;
    }
  }
  &-input{
    flex: 1;
    height:72rpx;
    background:rgba(243,243,243,1);
    border-radius:36rpx;
    font-size: 28rpx;
    color: #7F7F7F;
    padding: 0 30rpx;
  }
}
.coupons-list-container{
  padding: 0 24rpx;
  .coupons-list-header{
    padding: 39rpx 0 24rpx 0;
    color: #7F7F7F;
    font-size: 28rpx;
  }
  .totol-coupons-num{
    color: #FF9900;
  }
}
</style>
