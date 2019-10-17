<template>
  <div class="container">
    <!-- 搜索栏 -->
    <goods-searchbar-cart placeholder="请搜索附近商家商品" :cart-goods-num="cartGoodsNum" @search="search" @clear="clearSearch">
    </goods-searchbar-cart>
    <div class="weui-flex">
      <div class="aside">
        <div v-for="(tab, index) in classOneList"
          class="aside__tab"
          :key="tab.pcId"
          :class="{ active: tab.selected }"
          @click="selectTab(tab)"
          >{{ tab.pcName }}</div>
      </div>
      <div class="mainer">
        <navigator :url="navigateToUrl[activityType][activitySubType]  + activityId" class="mainer__banner" v-if="activityUrl">
          <img :src="activityUrl" mode="widthFix">
        </navigator>
        <div class="mainer-tabs">
          <div class="mainer-tab" v-for="item in classTwoList"
            @click="selectGc(item)"
            :key="item.gcId"
            :class="{ active: item.selected }">{{ item.gcName }}</div>
          <img class="mainer-tab-chevron" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/classification_icon_ddm.png@2x.png" @click="mainerTabMenuShowed = !mainerTabMenuShowed">
        </div>
        <div class="mainer__bd">
          <scroll-view class="goods-list" scroll-y="true" @scrolltolower="onScrollToLower">
            <div>
              <template v-if="goodsList.length || loading">
                <goods-row-item  v-if="item.groupPartner == 0" v-for="item in goodsList" :key="item.goodsId" :item="item">
                </goods-row-item>
                <empty text="没有更多了" v-if="loaded"></empty>
                <loading v-if="loading"></loading>
              </template>
              <empty v-else></empty>
            </div>
          </scroll-view>
          <div class="mainer-modal" v-if="mainerTabMenuShowed" @click="mainerTabMenuShowed = false">
            <div class="mainer-selector" v-if="classTwoHideList.length">
              <div class="mainer-selector__item" v-for="item in classTwoHideList"
                @click="selectGc(item)"
                :key="item.gcId"
                :class="{ active: item.selected }">
                {{ item.gcName }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'
  import GoodsSearchbarCart from '@/components/GoodsSearchbarCart'
  import GoodsRowItem from '@/components/GoodsRowItem'
  import Empty from '@/components/Empty'
  import Loading from '@/components/Loading'
  import config from '@/config'

  const PAGE_SIZE = 10

  export default {
    components: {
      GoodsSearchbarCart,
      GoodsRowItem,
      Empty,
      Loading
    },

    data () {
      return {
        cartGoodsNum: 0,
        activityId: '',
        activitySubType: 0,
        activityType: 0 ,
        activityUrl: '',
        classOneList: [],
        classTwoList: [],
        goodsList: [],
        mainerTabMenuShowed: false,
        loading: false, // 是否加载中
        loaded: false, // 是否已全部加载完
        classTwoDividerIndex: -1,

        pcId: '',
        gcId: '',
        keyword: '',
        pageNumber: 1,
        navigateToUrl: config.ACTIVITY_TYPE

      }
    },

    computed: {
      ...mapState(['storeId']),
      classTwoHideList() {
        return this.classTwoDividerIndex === -1 ?
          // this.classTwoList :
          [] :
          this.classTwoList.slice(this.classTwoDividerIndex)
      }
    },

    methods: {
      getGoodsClassList({ keyword, pcId, gcId, pageNumber } = {}) {
        this.loading = true

        let promise = Api.goods.goodsClassList({
          storeId: this.storeId,
          keyword,
          pcId,
          gcId,
          pageNumber,
          pageSize: PAGE_SIZE
        })

        promise.catch(e => console.log(e)).then(() => this.loading = false)

        return promise
      },

      setClassTwoDividerIndex() {
        setTimeout(() => {
          this.classTwoDividerIndex = -1
          if (wx.canIUse('createSelectorQuery')) {
            wx.createSelectorQuery().selectAll('.mainer-tab').boundingClientRect(rects => {
              if (rects && rects[0]) {
                let index = rects.findIndex(r => r.top > rects[0].top)
                if (index !== this.classTwoDividerIndex) {
                  this.classTwoDividerIndex = index
                }
              }
            }).exec()
          }
        }, 500)
      },

      reload() {
        this.goodsList = []
        this.pageNumber = 1
        this.loaded = false

        this.mainerTabMenuShowed = false

        return this.getGoodsClassList({
          keyword: this.keyword,
          pcId: this.pcId,
          gcId: this.gcId,
          pageNumber: this.pageNumber
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.classOneList = res.data.classOneList
            this.classTwoList = res.data.classTwoList
            this.goodsList = res.data.goodsList
            this.activityUrl = res.data.activityUrl
            this.activityId = res.data.activityId
            this.activityType = res.data.activityType
            this.activitySubType = res.data.activitySubType
            this.setClassTwoDividerIndex()
            this.loaded = res.data.goodsList.length < PAGE_SIZE
          }
        })
      },



      loadMore() {
        this.pageNumber += 1

        return this.getGoodsClassList({
          keyword: this.keyword,
          pcId: this.pcId,
          gcId: this.gcId,
          pageNumber: this.pageNumber
        })
        .then(res => {
          console.log(res.data.goodsList.length)
            if (res.data.goodsList.length > 0 && res.code === Api.CODES.SUCCESS) {
              // @DEBUG:
              this.goodsList = [
                ...this.goodsList,
                ...res.data.goodsList,
              ]
              this.loaded = res.data.goodsList.length < PAGE_SIZE
            }
        })
      },

      selectTab(tab) {
        if (tab.selected) return
        this.classOneList.forEach(item => item.selected = false)
        tab.selected = true
        this.pcId = tab.pcId
        this.gcId = ''
        this.reload()
      },

      selectGc(gc) {
        if (gc.selected) return
        this.classTwoList.forEach(item => item.selected = false)
        gc.selected = true
        this.gcId = gc.gcId
        this.reload()
        this.mainerTabMenuShowed = false
      },

      onScrollToLower() {
        this.loadMore()
      },

      search(keyword) {
        this.keyword = keyword
        this.reload()
      },

      clearSearch() {
        this.search('')
      }
    },


    onShow(e) {
      let app = getApp()
      if (typeof app.globalData.pcId !== 'undefined') {
        this.pcId = app.globalData.pcId
        this.reload()
        setTimeout(() => delete app.globalData.pcId, 1000)
      }
    },

    onTabItemTap() {
      let app = getApp()
      if (typeof app.globalData.pcId === 'undefined') {
        this.pcId = ''
        this.reload()
      }
    },
  }
</script>

<style lang="scss">
  page { height: 100%; }
</style>

<style scoped lang="scss">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    > .weui-flex {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      border-top: 1rpx solid #D7D7D7;
    }
  }
  .aside {
    width: 168rpx;
    min-width: 168rpx;
    background-color: #F5F5F5;
    &__tab {
      position: relative;
      text-align: center;
      line-height: 100rpx;
      font-size: 26rpx;
      color: #444;
      &.active {
        background-color: #FFF;
        color: #0FD7C0;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 28rpx;
          bottom: 28rpx;
          width: 6rpx;
          background-color: #0FD7C0;
        }
      }
    }
  }
  .mainer {
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    flex-direction: column;
    max-width: 582rpx;
    &__banner {
      padding: 30rpx 22rpx 0;
      img {
        width: 100%;
        height: 194rpx;
        vertical-align: middle;
      }
    }
    &-tabs {
      position: relative;
      padding-right: 88rpx;
      border-bottom: 1rpx solid #E4E4E4;
      height: 88rpx;
      overflow: hidden;
    }
    &-tab {
      display: inline-block;
      vertical-align: middle;
      padding-left: 24rpx;
      padding-right: 24rpx;
      white-space: nowrap;
      overflow: hidden;
      width: 104rpx;
      line-height: 88rpx;
      font-size: 26rpx;
      color: #444;
      &.active {
        color: #0FD7C0;
      }
      & + .mainer-tab{
        margin-left: 18rpx;
      }
      &-chevron {
        position: absolute;
        right: 24rpx;
        top: 16rpx;
        width: 60rpx;
        height: 60rpx;
        vertical-align: middle;
      }
    }
    &__bd {
      position: relative;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      display: -webkit-flex;
      display: flex;
    }
    &-modal {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .4);
    }
    &-selector {
      padding: 20rpx;
      background-color: #fff;
      overflow: hidden;
      &__item {
        float: left;
        width: 32%;
        line-height: 66rpx;
        margin-left: 2%;
        border-radius: 4rpx;
        background-color: #EDEDED;
        font-size: 28rpx;
        text-align: center;
        &:nth-child(3n+1) {
          margin-left: 0;
        }
        &:nth-child(n+4) {
          margin-top: 14rpx;
        }
        &.active {
          color: $theme-color-light;
        }
      }
    }
  }
  .goods-list {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    // overflow-x: hidden;
    // overflow-y: auto;
    /deep/ .goods-row-item {
      .weui-media-box {
        &__hd {
          margin-right: 12rpx;
          width: 190rpx;
          height: 190rpx;
        }
        &__title {
          font-size: 28rpx;
          margin-bottom: 4rpx;
        }
      }
      &__tb {
        .primary {
          font-size: 28rpx;
        }
        .secondary {
          font-size: 22rpx;
        }
        .icon-cart {
          right: 0;
        }
      }
      &_member-only {
        .weui-media-box__desc {
          margin-bottom: 16rpx;
        }
        .goods-row-item__tb .primary {
          font-size: 26rpx;
        }
      }
    }
  }
</style>
