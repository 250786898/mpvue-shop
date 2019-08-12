<template>
  <div>
    <div class="weui-panel address-panel">
      <div class="weui-panel__bd" v-if="mode === 'select'">
        <div class="weui-media-box weui-media-box_text" v-for="item in list"
          :key="item.addressId" @click="selectAndBack(item)">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            {{ item.name }}&nbsp;&nbsp;{{ item.mobPhone }}
          </div>
          <div class="weui-media-box__desc">
            {{ item.areaInfo }}
          </div>
        </div>
      </div>
      
      <div v-else>
        <movable-area class="slider-left-item" style="width: 1110rpx; margin-left:-360rpx;"
          v-for="item in list"
          :key="item.addressId">
          <movable-view class="slider-left-content"
            damping="100"
            :x="item.x"
            direction="horizontal"
            @touchstart="handleTouchestart(item, $event)"
            @touchend="handleTouchend(item, $event)"
            @change="handleChange(item, $event)"
            @click="setDefault(item)">
            <div class="weui-media-box weui-media-box_text">
              <icon type="success_no_circle" color="#10D7C0" size="16" v-if="item.isDefaul"></icon>
              <div class="weui-media-box__title weui-media-box__title_in-text">{{ item.name }}&nbsp;&nbsp;{{ item.mobPhone }}</div>
              <div class="weui-media-box__desc">
                {{ item.areaInfo }}
              </div>
            </div>
          </movable-view>
          <view class='slider-left-handle'>
            <view @click="edit(item)" class="slider-left-handle__button primary">
              编辑
            </view>
            <view @click="del(item)" class="slider-left-handle__button red">
              删除
            </view>
          </view>
        </movable-area>
      </div>
    </div>

    <navigator class="footer-bar" url="/pages/address/form/main">
      <button type="primary" class="bg-gradient" hover-class="bg-gradient_hover">添加新的收货地址</button>
    </navigator>
  </div>
</template>

<script>
  import { Api } from '@/http/api'

  const OPEN_WIDTH = 180
  const MOVE_THRESHOLD = 30

  export default {
    components: {},

    data() {
      return {
        buttons: [
          { type: 'primary', text: '编辑', event: 'edit' },
          { type: 'red', text: '删除', event: 'delete' }
        ],

        list: [],

        mode: '', // select
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

      // 点击删除按钮触发的事件
      edit(item) {
        this.slideCloseItem(item)
        wx.navigateTo({
          url: `/pages/address/form/main?id=${ item.addressId }`
        })
      },

      del(item) {
        this.slideCloseItem(item)
        wx.showLoading({
          title: '删除中',
          mask: true
        })
        Api.address.deleteAddress({
          addressId: item.addressId
        })
        .then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            let index = this.list.indexOf(item)
            this.list.splice(index, 1)
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => wx.hideLoading())
      },

      getAddressList() {
        Api.address.addressList().then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.list = res.data.addressList.map(item => ({
              ...item,
              x: OPEN_WIDTH,
              open: false,
              moveInstance: 0,currentX: OPEN_WIDTH
            }))
          }
        })
      },

      setDefault(item) {
        if (item.isDefaul) return
        wx.showLoading()
        Api.address.setDefaultAddress({
          addressId: item.addressId
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.list.forEach(_item => _item.isDefaul = _item === item)
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },

      selectAndBack(address) {
        let app = getApp()
        this.$store.commit('updateTempOrder', { address })
        if (app.onAddressSelect) {
          app.onAddressSelect(address)
          delete app.onAddressSelect
        }
        wx.navigateBack()
      }
    },

    onShow() {
      let options = this.$mp.page.options
      this.getAddressList()
      this.mode = options.mode || ''
      wx.setNavigationBarTitle({
        title: options.title || '我的收货地址'
      })
    }
  }
</script>

<style lang="scss">
  page { background-color: #F3F3F3; }
</style>

<style lang="scss" scoped>
  .weui-panel {
    margin-top: 20rpx;
  }
  .slider-left-item + .slider-left-item {
    border-top: 1rpx solid #F0F0F0;
  }

  .slider-left-item .weui-media-box {
    flex: 1;
    padding-top: 16rpx;
    padding-bottom: 16rpx;
  }
</style>

