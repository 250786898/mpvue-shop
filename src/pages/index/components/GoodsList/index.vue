<template>
  <view class="goods-recommend min-contaner" id="goods-list">
    <div v-if="tab.length && !loading">
      <van-tabs
        @tab="tabChange"
        :active="activeIndex"
        tab-active-class="tab-active-class"
        custom-class="custom-class"
        :swipe-threshold="4"
        tab-class="tab-class"
        line-width="26"
        line-height="5"
        :border="!isCeiling"
        line-bottom="11"
        color="#01BD9F"
        :ellipsis="false"
        :class="isCeiling ? 'fixed-tab' : ''"
        :style="isCeiling ? fixedTop : '' "
      >
        <van-tab v-for="item in tab" :title="item.activityName" :key="item.id"></van-tab>
      </van-tabs>
    </div>

    <!--  商品列表 -->
    <div
      class="goods-recommend__bd goods-list"
      :style="{ marginTop:isCeiling? '100rpx' : '0rpx' }"
      v-if="goodsList && goodsList.length > 0"
    >
      <template v-if="!tabLoading">
        <div class="goods-card" v-for="item in goodsList" :key="item.id">
          <goods-card :item="item" />
        </div>
      </template>
    </div>

    <!-- 触底刷新loading -->
    <LjLoading v-if="reachBottomLoading" />

    <!-- 加载更多 -->
    <div class="goods-recommend__footer">
      <div
        class="goods-tabs__tip"
        v-if="!reachBottomLoading && !tabLoading && goodsList.length && isAllLoaded"
      >我是有底线的！</div>
    </div>

    <!-- 加载gif图 -->
    <div class="tab-loading-icon" v-if="tab && tab.length & ( loading || tabLoading ) ">
      <FreshLoading />
    </div>

    <!-- <img
      src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/pull_down_refresh_icon.gif"
      alt


    /> -->

    <div
      class="empty-goods-tip"
      v-if="!reachBottomLoading && !loading && !tabLoading && goodsList.length == 0 "
    >
      <EmptyGoods />
    </div>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api'
import EmptyGoods from '@/components/EmptyGoodsTip'
import BaseGoodsCard from '../BaseGoodsCard/index'
import GoodsCard from './components/GoodsCard'
import BeginGoodsCard from '../BeginGoodsCard/index'
import LjLoading from '@/components/LjLoading'
import FreshLoading from '@/components/FreshLoading'
import GoodsModel from '@/model/goods'

const goodsModel = new GoodsModel()
//显示商品的数量
const showPageSize = 10

export default {
  props: {
    isCeiling: {
      //是否吸顶
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentPage: 1, //当前页数
      tab: [], //分类栏
      activityId: '', //当前分类编码
      activeIndex: 0, //当前分类索引
      goodsList: [], //商品列表
      isAllLoaded: false, //是否全部加载完毕
      loading: true, //数据加载中
      tabLoading: false, //tab切换更新数据中状态
      reachBottomLoading: false //是否向上触发更新数据中状态
    }
  },
  components: {
    EmptyGoods,
    BaseGoodsCard,
    BeginGoodsCard,
    GoodsCard,
    LjLoading,
    FreshLoading
  },
  computed: {
    ...mapState(['storeId', 'indexGoodsTop', 'indexBarHeight']),
    fixedTop() {
      return `top:${this.indexBarHeight}px`
    }
  },
  watch: {
    storeId: function() {
      console.log('goodlostStoreId修改了aaaaaaaaaaaaaaaaaaa')
      if (this.storeId) {
        this.initData()
        this.setTabsList()
      }
    }
  },

  //上触发加载分页数据
  onReachBottom: function() {
    if (!this.tab.length) return false
    if (this.tabLoading || this.isAllLoaded || this.reachBottomLoading || this.loading)
      return false
    //还有数据，加载数据
    this.reachBottomLoading = true
    this.currentPage++
    this.getGoodsListByActivityId(
      this.storeId,
      this.activityId,
      this.currentPage
    )
  },

  /**
   * @description 向上更新商品数据
   */
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    this.loading = true
    this.initData()
    this.setTabsList()
  },

  mounted() {
    console.log('goodlistMounted')
    let _this = this
    setTimeout(function() {
      _this.getElementHeight()
    }, 100)
    if (this.storeId) {
      console.log('goodlistMounted2')
      this.setTabsList()
    }
    this.$bus.$on('setTimeActivityHeight', this.getElementHeight)
  },

  methods: {
    getElementHeight() {
      let _query = wx.createSelectorQuery()
      _query.select('#goods-list').boundingClientRect()
      _query.exec(res => {
        console.log('getElementHeight', res)
        const tTop = res[0] && res[0].top != null ? res[0].top : ''
        this.$store.commit('setIndexGoodsTop', tTop)
      })
    },

    clickTab(event) {
      console.log('clickTab', event)
    },

    async setTabsList() {
      const res = await goodsModel.findActivityByStoreId({
        storeId: this.storeId || ''
      })
      if (res.code == Api.CODES.SUCCESS) {
        this.tab = res.data.activityList
        console.log('goodlistMounted3')
        this.activityId = this.tab && this.tab.length ? this.tab[0].id : '' //设置默认活动Id
        console.log('goodlistMounted33')
        if(!this.activityId) {
          //不存在活动就不继续加载活动商品
          this.loading = false //挂载加载完毕
          return
        }
        this.getGoodsListByActivityId(
          this.storeId,
          this.tab[0].id,
          this.currentPage
        ).then(res => {
          console.log('goodlistMounted4')
          this.loading = false //挂载加载完毕
        })
      }
    },

    async refreshTabsList() {
      const res = await goodsModel.findActivityByStoreId({
        storeId: this.storeId || ''
      })
      console.log('res.code11111111111111111', res.code)
      if (res.code == Api.CODES.SUCCESS) {
        this.tab = res.data.activityList
      }
    },

    getGoodsListByActivityId(storeId, activityId, pageNumber) {
      let promise
      return (promise = goodsModel
        .findGoodsByActivity({
          storeId,
          activityId,
          pageNumber
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            var data = res.data
            if (data.goodsList != null) {
              this.goodsList = this.goodsList.concat(data.goodsList)
            } else {
              //没有可以加载的数据了，显示到底
              this.isAllLoaded = true
            }
          }
        })
        .then(() => {
          this.tabLoading = false
          this.reachBottomLoading = false
        }))
    },

    /**
     * @description  切换分类
     */
    tabChange({mp: { detail: { index }  } }) {
      if(this.activeIndex == index) {
        return
      }
      console.log('index',this.activeIndex,index)
      if (this.isCeiling) {
        //如果已经处于吸顶状态切换到初始化相对应的滚动条
        const ceilingDistance = this.indexGoodsTop - this.indexBarHeight
        console.log(
          ' //如果已经处于吸顶状态切换到初始化相对应的滚动条',
          this.indexBarHeight,
          this.indexGoodsTop,
          ceilingDistance
        )
        wx.pageScrollTo({ scrollTop: ceilingDistance })
      }
      this.initTabData(index)
      this.tabLoading = true
      this.getGoodsListByActivityId(
        this.storeId,
        this.activityId,
        this.currentPage
      )
    },

    /**
     * @param {number} index tab索引
     * @description 初始化tab相关数据
     */
    initTabData(index) {
      this.tabLoading = true
      this.goodsList = []
      this.currentPage = 1
      this.isAllLoaded = false
      this.activeIndex = index
      this.activityId = this.tab[index].id
    },

    /**
     * @description 初始化相关数据
     */
    initData() {
      this.currentPage = 1
      this.goodsList = [] //商品数据
      this.activeIndex = 0 //恢复默认索引
      this.isAllLoaded = false //是否全部加载数据,
      this.reachBottomLoading = false //是否向上更新
    }
  }
}
</script>

<style lang="scss">
@keyframes fadeInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.min-contaner {
  min-height: 1300rpx;
}

//tab栏样式
.fixed-tab {
  z-index: 99;
  width: 100%;
  position: fixed;
  left: 0;
  animation: fadeInDown 0.3s linear;
}

//  /*从上到下进入*/
.fadeInDown {
  animation-name: fadeInDown;
}

.fixed-goods-list {
  z-index: 99;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 188rpx;
}

.tab-class {
  color: #798194 !important;
  font-size: 34rpx !important;
  font-weight: 500 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  z-index: 99 !important;
}

// 标签激活态样式类
.tab-active-class {
  color: #363f52 !important;
  font-weight: bold !important;
  font-size: 34rpx;
}

.tab-loading-icon {
  width: 80rpx;
  height: 120rpx;
  margin: auto;
  display: block;
  margin-top: 150rpx;
}
</style>

<style scoped lang="scss">
.goods-row-item {
  margin-bottom: 6rpx;
}

.goods-row-item__price {
  position: absolute;
  margin-top: 36rpx;
}

.goods-tabs__tip {
  padding: 25rpx 0 50rpx;
  font-size: 28rpx;
  color: #b2b2b2;
  text-align: center;
}

.empty-goods-tip {
  background: #fff;
  padding: 113rpx 0 390rpx;
}

.goods-recommend {
  width: 710rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  overflow: hidden;
  .goods-list {
    padding: 0 20rpx;
  }
  .goods-card {
    border-bottom: 1px solid rgba(204, 204, 204, 0.3);
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
  }
  &__bd {
    background: #fff;
    border-bottom-left-radius: 14rpx;
    border-bottom-right-radius: 14rpx;
  }
  &__footer {
    background: #f5f5f5;
  }
  &__title {
    margin: 0 auto;
    height: 90rpx;
    line-height: 90rpx;
    text-align: left;
    font-size: 36rpx;
    color: #272727;
    background: #fff;
    font-weight: 800;
    padding-left: 29rpx;
    border-top-left-radius: 14rpx;
    border-top-right-radius: 14rpx;
    border-bottom: #f0f0f0 1rpx solid;
    box-sizing: border-box;
    &::before,
    &::after {
      // content: '';
      display: inline-block;
      vertical-align: 8rpx;
      width: 10rpx;
      height: 10rpx;
      margin: 0 20rpx;
      border-radius: 10rpx;
      background-color: #333;
    }
  }
  .goods-list {
    .weui-flex {
      flex-wrap: wrap;
      &__item {
        flex: 0 0 48%;
        // border-radius: 16rpx;
        width: 48%;
        margin: 1%;
        height: 538rpx;
      }
    }

    /deep/ .goods-row-item {
      margin: 5rpx;
      background-color: rgb(146, 27, 27);
      // border-radius: 10rpx;
      height: 538rpx;
      .weui-media-box {
        padding: 10rpx;
        &_appmsg {
          flex-direction: column;
        }
        &__hd_in-appmsg {
          width: 330rpx;
          height: 330rpx;
          margin-right: 0;
        }
        &__bd {
          padding-left: 10rpx;
          padding-right: 10rpx;

          width: 100%;
          box-sizing: border-box;
        }
        &__title {
          margin-top: 10rpx;
          margin-bottom: 4rpx;
          font-size: 28rpx;
          width: 300rpx;
        }
        &__desc {
          margin-bottom: 30rpx;
          line-height: 32rpx;
          height: 32rpx;
          font-size: 24rpx;
          -webkit-line-clamp: 1;
        }
      }
      &__tb {
        min-height: 72rpx;
        padding-bottom: 16rpx;
        .primary {
          font-size: 32rpx;
        }
        .icon-cart {
          right: -4rpx;
          bottom: 22rpx;
        }
      }
    }
  }
}
</style>
