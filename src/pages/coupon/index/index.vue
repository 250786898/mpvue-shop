<template>
  <div class="container">
    <exchange-box />
    <CouponList/>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import ExchangeBox from './components/ExchangeBox/index'
  import CouponList from './components/CouponList'

  const OPEN_WIDTH = 180
  const MOVE_THRESHOLD = 30

  export default {
    components: {
      ExchangeBox,
      CouponList
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
</style>
