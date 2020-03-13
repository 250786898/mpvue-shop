<template>
  <div class="container">
    <div class="banner" v-if="bannerUrl">
      <img :src="bannerUrl" />
    </div>

    <div class="container-main">
      <div class="goods-list" v-if="goodsList && goodsList.length > 0">
        <template v-for="(item,index) in goodsList">
          <div class="goods-item" :key="index">
            <GoodsRowItem :item="item" />
          </div>
        </template>
      </div>
      <div
        class="empty-goods-tip"
        v-if="!reachBottomLoading && !loading  && goodsList.length == 0 "
      >
        <EmptyGoods />
      </div>
    </div>

    <!-- 加载中loading -->
    <div class="fresh-loading" v-if="loading">
      <FreshLoading />
    </div>

    <!-- 触底刷新loading -->
    <LjLoading v-if="reachBottomLoading" />

    <!-- 加载更多 -->
    <div class="goods-recommend__footer">
      <div
        class="goods-tabs__tip"
        v-if="!reachBottomLoading  && goodsList.length && isAllLoaded"
      >我是有底线的！</div>
    </div>

    <div class="to-home-icon">
      <to-home-icon />
    </div>
    <div class="cart-icon">
      <ToCartIcon />
    </div>
  </div>
</template>

<script>
import GoodsRowItem from '@/components/GoodsRowItem'
import ToHomeIcon from '@/components/ToHomeIcon'
import ToCartIcon from '@/components/ToCartIcon'
import EmptyGoods from '@/components/EmptyGoodsTip'
import ActivityModel from '@/model/activity'
import LjLoading from '@/components/LjLoading'
import FreshLoading from '@/components/FreshLoading'
import { mapState } from 'vuex'
import { Api } from '@/http/api'

const activityModel = new ActivityModel()
const PAGE_SIZE = 10 //每次加载页数
export default {
  data() {
    return {
      title: '', //页面标题
      bannerUrl: '', //活动banner
      currentPage: 1, //当前页数
      activityId: '', //当前分类编码
      goodsList: [], //商品列表
      isAllLoaded: false, //是否全部加载完毕
      loading: true, //数据加载中
      reachBottomLoading: false //是否向上触发更新数据中状态
    }
  },

  computed: {
    ...mapState(['storeId'])
  },

  components: {
    GoodsRowItem,
    ToHomeIcon,
    ToCartIcon,
    EmptyGoods,
    LjLoading,
    FreshLoading
  },

  onShow() {
    Object.assign(this.$data, this.$options.data())
    this.loading = true
    this.setActivityId()
    this.getActivityThemeById()
  },

  //上触发加载分页数据
  onReachBottom: function() {
    console.log('onReachBottom')
    if (this.isAllLoaded || this.reachBottomLoading || this.loading)
      return false
    //还有数据，加载数据
    this.reachBottomLoading = true
    this.currentPage++
    this.getActivityThemeById()
  },

  /**
   * @description 向上更新商品数据
   */
  onPullDownRefresh() {
    this.loading = true
    this.initData()
    this.getActivityThemeById()
  },

  /*
    * @description 页面分享
  */
  onShareAppMessage() {
    return {
      title: this.title
    }
  },

  methods: {
    /**
     * @description 初始化相关数据
     */
    initData() {
      this.currentPage = 1
      this.goodsList = [] //商品数据
      this.isAllLoaded = false //是否全部加载数据,
      this.reachBottomLoading = false //是否向上更新
    },

    /**
     * @description 设置活动Id
     */
    setActivityId() {
      const activityId = this.$mp.page.options.id
      if (activityId) {
        this.activityId = activityId
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '活动Id不得为空', //提示的内容,
          icon: 'none', //图标,
          duration: 2000, //延迟时间,
          mask: true //显示透明蒙层，防止触摸穿透,
        })
      }
    },

    /**
     * @param {string} title 页面标题
     * @description 设置页面标题
     */
    setNavigationBarTitle(title) {
      wx.setNavigationBarTitle({
        title
      })
    },

    /**
     * @param {string} bannerUrl banner图片地址
     * @description 设置banner地址
     */
    setBannerUrl(bannerUrl) {
      this.bannerUrl = bannerUrl
    },

    /**
     * @description 获取活动主题信息
     */
    getActivityThemeById() {
      let promise
      return (promise = activityModel
        .getActivityThemeById({
          storeId: this.storeId,
          activityId: this.activityId,
          pageNumber: this.currentPage,
          pageSize: PAGE_SIZE
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            const data = res.data
            if(data.activity) {
                this.title = data.activity.activityName
                this.setNavigationBarTitle(data.activity.activityName)
                this.setBannerUrl(data.activity.activityImage)
            }

            console.log('data.goodsList',data.goodsList)
            if (data.goodsList != null) {
              console.log('不为空')
              this.goodsList = this.goodsList.concat(data.goodsList)
            } else {
              console.log('//没有可以加载的数据了，显示到底')
              //没有可以加载的数据了，显示到底
              this.isAllLoaded = true
            }
          }
        })
        .then(() => {
          setTimeout(() => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            ;(this.loading = false), (this.reachBottomLoading = false)
          }, 1000)
        }))
    }
  }
}
</script>

<style>
page {
  background: #f3f0f1;
}
</style>

<style lang="scss" scoped>
.container {
  padding-bottom: 362rpx;
  .banner {
    width: 750rpx;
    height: 466rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-main {
    padding: 20rpx;
  }
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .to-home-icon {
    position: fixed;
    bottom: 106rpx;
    left: 20rpx;
  }
  .cart-icon {
    position: fixed;
    bottom: 217rpx;
    left: 20rpx;
  }
  .empty-goods-tip {
    background: #fff;
    border-radius: 20rpx;
    padding: 113rpx 0 159rpx;
  }
  .goods-tabs__tip {
    padding: 25rpx 0 50rpx;
    font-size: 28rpx;
    color: #b2b2b2;
    text-align: center;
  }
}
.fresh-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
}
</style>
