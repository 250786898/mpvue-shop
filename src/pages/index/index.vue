<template>
  <div class="container">
    <!-- 悬浮顶部栏 -->
    <fixed-top-bar />

    <!-- 自定义导航栏 -->
    <!-- <nav-bar /> -->
    <!-- <goods-search-bar :location="location" :showtip="tipShown && !isCeiling"> </goods-search-bar> -->

    <div v-if="!showPageLoading" class="container-main">
      <template v-if="showRestStoreStatus || showNoServiceStoreStatus">
        <StoreStatusShow status="rest" v-if="showRestStoreStatus" />
        <StoreStatusShow status="noService" v-if="showNoServiceStoreStatus" />
      </template>

      <template v-else>
        <!-- Swiper -->


        <theme-area
          :theme-type="bannerThemeType"
          :list="storeData.bannerList"
          v-if="storeData && storeData.bannerShow"
        />

        <!-- 分类导航栏  -->
        <category-nav
          :list="storeData.classList"
          :numOfRow="storeData.goodsClassType + 2"
          v-if="storeData && storeData.goodsClassShow"
        />

        <theme-area
          :theme-type="adverThemeType"
          :list="storeData.advertisementList"
          v-if="storeData && storeData.advertisementShow"
        />

        <!-- 商品列表 -->
        <div class="goods-list-container">
          <goods-list :isCeiling="isCeiling" />
        </div>
      </template>
    </div>

    <page-loading :show="showPageLoading" />

    <SelectStoreDialog :show="showSelectStoreDialog" @comfirmStore="comfirmStore" />
    <ComfirmStoreDialog :show="showComfirmStoreDialog" @comfirmStore="comfirmStore" />

    <block v-for="(item,index) in activityCouponList" v-bind:key="item.id">
      <CouponDialog
        :shown="activityCouponDialogsStauts[index]"
        :index="index"
        :imgSrc="item.activityImg"
        @close="closeActivityCouponDialog"
        @fetchCoupon="fetchActivityCoupon"
      />
    </block>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api'
import { AMapWX } from '@/utils/amap-wx'
import config from '@/config'
import { resgiterOrLogin, getCurrentRouter } from '@/utils'
import FixedTopBar from './components/FixedTopBar'
import GoodsSearchBar from '@/components/GoodsSearchBar'
import CategoryNav from './components/CategoryNav'
import ThemeArea from './components/ThemeArea'
import ComfirmStoreDialog from '@/components/ComfirmStoreDialog'
import SelectStoreDialog from '@/components/SelectStoreDialog'
import GoodsList from './components/GoodsList/index'
import NavBar from './components/NavBar/index'
import CouponDialog from './components/CouponDialog'
import StoreStatusShow from './components/StoreStatusShow'
import StoreModel from '@/model/store'
import CouponModel from '../../model/coupon'
import LjLoading from '@/components/LjLoading'
var mta = require('../../utils/mta_analysis.js')
const storeModel = new StoreModel()
const couponModel = new CouponModel()

export default {
  components: {
    GoodsSearchBar,
    GoodsList,
    NavBar,
    ComfirmStoreDialog,
    SelectStoreDialog,
    FixedTopBar,
    CategoryNav,
    ThemeArea,
    CouponDialog,
    StoreStatusShow,
    LjLoading
  },

  data() {
    return {
      showPageLoading: true, //页面加载显示
      showSelectStoreDialog: false, //选择门店弹窗显示
      showComfirmStoreDialog: false, //确认门店弹窗显示
      showActivityCouponDialog: false, //优惠券活动弹窗
      showRestStoreStatus: false, //休息门店状态卡片是否显示
      showNoServiceStoreStatus: false, //无服务门店状态卡片是否显示
      tipShown: true, //搜索栏是否显示
      isCeiling: false, //商品列表组件是否吸顶
      storeData: {}, //门店相关数据，banner，分类等
      activityCouponList: [], //优惠券活动列表
      activityCouponDialogsStauts: {}, //优惠券活动弹窗列表显示状态
      storeList: [] //门店列表
    }
  },

  computed: {
    ...mapState([
      'location',
      'storeId',
      'shopDetail',
      'shareStoreId',
      'indexGoodsTop',
      'indexBarHeight'
    ]),
    occupyStyle() {
      return `height: ${this.indexBarHeight}px`
    },
    bannerThemeType() {
      const bannerTypeArr = ['image', 'swiper', 'ADOne', 'ADTwo']
      if (this.storeData) {
        const typeIndex = this.storeData.bannerType - 1 //主题类型数组索引
        return bannerTypeArr[typeIndex] //轮播类型 1-单张 2-单张轮播 3-左一右二 4-左二右二
      }
    },
    adverThemeType() {
      const bannerTypeArr = ['image', 'swiper', 'ADOne', 'ADTwo']
      if (this.storeData) {
        const typeIndex = this.storeData.advertisementType - 1 //主题类型数组索引
        return bannerTypeArr[typeIndex] //轮播类型 1-单张 2-单张轮播 3-左一右二 4-左二右二
      }
    }
  },

  watch: {
    storeId: function() {
      //确认门店开启分享功能
      console.log('shownPageLoadingshownPageLoadingshownPageLoadingshownPageLoading')
      this.shownPageLoading() //初始化显示页面lading
      console.log('watch storeId change')
      wx.showShareMenu({
        withShareTicket: true
      })
      this.loadAndShowCouponDialog() //加载显示优惠券弹窗
      this.updateStoreInfo() //更新门店相关信息
      this.updateStoreData() //更新新的门店数据
      this.hideComfirmStoreDialog()
      this.hideSelectStoreDialog()
    },
    showSelectStoreDialog: function(val) {
      if (val) {
        //如果选择门店弹窗显示，页面加载组件隐藏
        this.hidePageLoading()
      }
    },
    showComfirmStoreDialog: function(val) {
      if (val) {
        //如果确认门店弹窗显示，页面加载组件隐藏
        this.hidePageLoading()
      }
    }
  },

  async mounted() {
    wx.showTabBar()
    this.initPageData()

    const isAuthLocate = await this.isAuthorizedLocation() //获取定位授权情况

    const shareStoreId = this.$mp.page.options.shareStoreId

    if (shareStoreId == null && !this.storeId) {
      //分享门店不存在情况隐藏分享按钮
      wx.hideShareMenu()
    }

    if (shareStoreId) {
      this.setShareStoreId(shareStoreId)
    }
    if (this.storeId) {
      //防止已经确定门店继续执行下面确定门店逻辑
      return false
    }

    if (isAuthLocate) {
      //已授权确认门店
      this.authedComfirmStore()
    } else {
      //未授权定位
      this.authLocateAndcomfirmStore() //授权定位并且确认门店
    }
  },

  onLoad () {
    console.log('this.$mp.page.options',this.$mp.page.options,this.$mp.page.options.mtaCount)
    mta.Page.init() //第三方mta数据统计
    if(this.$mp.page.options.mtaCount) { //统计特定二维码访问数据
      mta.Event.stat("10001", {});
    }

  },


  /**
   * @description  鉴定滚动事件，从而是否显示回到顶部按钮和当前定位显示
   * */
  onPageScroll(e) {
    // this.tipShown = e.scrollTop < 100;
    this.checkCeiling(e.scrollTop)
  },

  //向上刷新数据
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.returnTop()
    this.updateStoreData()
  },

  methods: {
    /**
     * @description 初始化页面显示隐藏
     */
    initPageData() {
      (this.showRestStoreStatus = false), //休息门店状态卡片不显示
      (this.showNoServiceStoreStatus = false), //无服务门店状态卡片不显示
      (this.isCeiling = false); //设置时段活动商品不吸顶
      this.hideComfirmStoreDialog()
      this.hideSelectStoreDialog()
    },

    /**
     * @description 更新门店相关数据
        1.更新门店信息到vuex
        2.更新门店相关数据（banner，商品数据）
     */
    updateStoreData() {
      this.setIndexStoreData()
        .then(res => {
          console.log('++++++++++++++++++++++++updateStoreData++++++++++++++++++++++',this.showPageLoading)
          this.hidePageLoading()
           console.log('++++++++++++++++++++++++updateStoreData++++++++++++++++++++++2',this.showPageLoading)
          wx.stopPullDownRefresh()
          wx.hideNavigationBarLoading()
          console.log('updateStoreData', this.storeData)
          setTimeout(() => {
            this.$bus.$emit('setTimeActivityHeight')
          }, 100)
        })
        .catch(err => {
          wx.stopPullDownRefresh()
          wx.hideNavigationBarLoading()
        })
    },

    /**
     * @description 更新门店信息
     */
    async updateStoreInfo() {
      const storeInfo = await this.getStoreInfoByStoreId(this.storeId)
      console.log('updateStoreInfo', storeInfo)
      if (!storeInfo.isBusiness) {
        //如果该门店休息中，弹窗提示跳转选择其他门店
        this.showRestStoreStatus = true
      }
      this.setStoreItemInfo(storeInfo)
    },

    /*获取当前页url*/
    getCurrentPageUrl() {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length - 1] //获取当前页面的对象
      var url = currentPage.route //当前页面url
      return url
    },

    /**
     * @param {string} storeId 门店id
     * @description  获取店铺数据
     */
    setIndexStoreData() {
      return Api.index.getIndexData({ storeId: this.storeId }).then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          console.log('setIndexStoreDatasetIndexStoreDatasetIndexStoreData')
          this.storeData = res.data
        }
      })
    },

    /**
     * @description 已经授权情况确认相关门店业务
     */
    async authedComfirmStore() {
      this.setLocationInfoForAuthedLocate()

      const shareStoreId = this.$mp.page.options.shareStoreId //通过点击分享进来
      //判断是否从分享进来的
      if (shareStoreId) {
        //是从分享进来
        this.authedComfirmStoreByShareCase(shareStoreId)
      } else {
        //直接加载首页，确定进入程序的门店
        this.authedComfirmStoreByDirectLoad()
      }
    },

    /**
     * @description 直接加载首页，确定进入程序的门店
     */
    async authedComfirmStoreByDirectLoad() {
      const usuallyStoreId = await this.getUsuallyStoreId()

      if (!usuallyStoreId) {
        //如果经常访问门店Id为空,跳转选择门店页面组件
        wx.redirectTo({
          url: '/pages/store/select/main'
        })
        return false
      }

      if (this.storeId == usuallyStoreId) {
        //已经设置过门店id
        this.hidePageLoading()
        this.updateStoreInfo() //更新门店相关信息
      } else {
        this.setStoreId(usuallyStoreId)
      }
    },

    /**
     * @description 已经授权定位从分享情况进来确认门店
     */
    async authedComfirmStoreByShareCase(shareStoreId) {
      const usuallyStoreId = await this.getUsuallyStoreId()
      if (shareStoreId == usuallyStoreId) {
        //当前门店和经常访问门店是否一致？
        //一致：直接设置分享门店id为当前门店
        if (this.storeId == shareStoreId) {
          //已经设置过门店id
          this.hidePageLoading()
        } else {
          this.setStoreId(shareStoreId)
        }
      } else {
        //不一致：选择门店弹窗
        //设置当前门店和经常访问门店相关信息
        if (usuallyStoreId) {
          //经常访问门店存在
          const res = await this.setCurrentStoreInfo(shareStoreId)
          this.setUsuallyStoreInfo()
          this.shownSelectStoreDialog()
        } else {
          //经常访问门店不存存在，直接弹出确认门店弹窗
          const storeInfo = await this.getShareStoreInfo(shareStoreId)
          this.setStoreItemInfo(storeInfo) //设置当前门店
          this.shownComfirmStoreDialog()
        }
      }
    },

    /**
     * @@description 授权定位并确认门店加载数据
     */
    async authLocateAndcomfirmStore() {
      const locationInfo = await this.setUserLocationInfo() //设置用户相关定位信息：经纬度，详情地址
      const checkRes = await this.checkStoreIsNoService()
      if (checkRes.totalPage == 200002) {
        this.showNoServiceStoreStatus = true
        this.hidePageLoading() //隐藏页面加载
      }
      let storeInfo = null
      if (this.shareStoreId) {
        //如果是从分享进来，显示分享门店，否则根据定位推荐门店

        storeInfo = await this.getShareStoreInfo(this.shareStoreId)
      } else {
        storeInfo = await this.getRecommendStoreByLocation() //获取根据定位推荐门店
      }
      this.setStoreItemInfo(storeInfo) //设置当前门店
      if (storeInfo.isBusiness) {
        //门店正在营业才弹窗
        this.shownComfirmStoreDialog() //确认门店弹窗显示
      }
    },

    /**
     * @description 已经授权对位下设置定位信息
     */
    async setLocationInfoForAuthedLocate() {
      let location = wx.getStorageSync('location')
      if (wx.getStorageSync('location')) {
        //判断缓存中是否存在定位，避免丢失，没有需要重新定位
        this.$store.commit('setLocationInfo', location) //已经授权从缓存中存定位信息到vuex，方便其他组件使用
      } else {
        location = await this.setUserLocationInfo() //设置用户相关定位信息：经纬度，详情地址
        this.$store.commit('setLocationInfo', location) //已经授权从缓存中存定位信息到vuex，方便其他组件使用
      }
    },

    async checkStoreIsNoService() {
      const checkInfo = await storeModel.checkStoreIsNoService({
        longitude: this.location.longitude,
        latitude: this.location.latitude
      })
      return checkInfo
    },

    /**
     * @param {number} currentStoreId 当前门店id，即分享的门店id
     * @description 设置当前门店相关信息： 当前门店即分享门店
     */
    async setCurrentStoreInfo(currentStoreId) {
      const shareStoreItem = await this.getStoreInfoByStoreId(currentStoreId)
      this.$store.commit('setShareStoreInfo', shareStoreItem)
      this.$store.commit('setShareStoreId', currentStoreId) //存储分享分店Id到全局vuex
    },

    /**
     * @description 设置用户相关定位信息(经纬度，所在地详情等)
     */
    setUserLocationInfo() {
      let amap = new AMapWX({ key: config.AMAP_KEY })
      return new Promise((resolve, reject) => {
        amap.getPoiAround({
          success: res => {
            //用户成功授权
            const locationInfo = res.markers[0] //当前用户定位定位相关信息
            const cityName = res.poisData[0].cityname //用户定位当前城市
            // this.longitude = locationInfo.longitude
            // this.latitude = locationInfo.latitude
            console.log('setUserLocationInfo', locationInfo)
            this.$store.commit('setLocationInfo', locationInfo) //用户定位相关信息存到vuex
            this.$store.commit('setcityname', cityName)
            this.$store.commit('setLocateCity', cityName)
            this.saveLocationToStorage(locationInfo)
            resolve(locationInfo)
          },
          // 引导用户设置定位权限
          fail: e => {
            //用户授权取消
            reject(e)
            if (
              e.errMsg === 'getLocation:fail auth deny' ||
              'getLocation:fail:auth denied'
            ) {
              this.hidePageLoading()
              if (this.shareStoreId) {
                if (this.storeId) return //已经存在确认门店，则不显示确认门店弹窗
                this.getShareStoreInfo(this.shareStoreId).then(storeInfo => {
                  this.setStoreItemInfo(storeInfo) //设置当前门店
                  this.shownComfirmStoreDialog() //确认门店弹窗显示
                })
              } else {
                //不是从分享进来
                wx.redirectTo({ url: '/pages/location/main' }) //重定向到定位授权页面
              }
            }
          }
        })
      })
    },

    /**
     * @description 根据当前定位获取推荐门店
     */
    getRecommendStoreByLocation() {
      return new Promise((resolve, reject) => {
        storeModel
          .getRecommendStoreByLocate({
            longitude: this.location.longitude,
            latitude: this.location.latitude
          })
          .then(res => {
            resolve(res.data)
          })
          .catch(err => reject(err))
      })
    },

    /**
     * @description 获取一个门店相关信息
     */
    async getStoreInfoByStoreId(storeId) {
      console.log('getStoreInfoByStoreId', storeId)
      const storeInfo = await storeModel.getOneStoreInfoByStoreId({
        storeId: storeId,
        longitude: this.location.longitude,
        latitude: this.location.latitude
      })
      console.log('getStoreInfoByStoreId2', storeInfo)
      return storeInfo.data
    },

    /**
     * @description 获取分享门店信息
     */
    async getShareStoreInfo(shareStoreId) {
      const storeInfo = await storeModel.getOneStoreInfoByStoreId({
        storeId: this.shareStoreId,
        longitude: this.location.longitude,
        latitude: this.location.latitude
      })
      return storeInfo.data
    },

    /**
     * @description 保存当前门店相关信息（名称，id等）
     */
    setStoreItemInfo(storeInfo) {
      this.$store.commit('setCurrentStoreInfo', storeInfo) //保存门店id和名称到vuex
    },

    /**
     * @description 设置经常访问相关信息
     */
    async setUsuallyStoreInfo() {
      const usuallyStoreId = await this.getUsuallyStoreId()
      const usuallyStoreItem = await this.getStoreInfoByStoreId(usuallyStoreId)
      this.$store.commit('setUsuallyStoreInfo', usuallyStoreItem)
    },

    /**
     * @@description 获取经常访问门店Id
     */
    async getUsuallyStoreId() {
      //判断是否存在登录状态，已登录从api获取经常访问门店，未登录从缓存中读取

      if (this.$store.state.sessionId) {
        const res = await Api.index.queryStoreByLastest()
        if (res.code === Api.CODES.SUCCESS) {
          return res.data.storeId
        } else {
          return ''
        }
      } else {
        //未登录
        return storeModel.getLatestStoreOFNoLogin()
      }
    },

    /**
     *  @param {string} storeId 门店id
     *  设置门店Id，存储到全局vuex
     */
    setStoreId(storeId) {
      this.$store.commit('setStoreId', storeId)
    },

    /**
     * @description 隐藏页面加载loading
     */
    hidePageLoading() {
      this.showPageLoading = false //关闭页面加载Loading
    },

    /**
     * @description 显示页面加载loading
     */
    shownPageLoading() {
      this.showPageLoading = true //显示页面加载Loading
    },

    /**
     * @param {string} shareStoreId 分享门店id
     * @description 设置分享门店id
     */
    setShareStoreId(shareStoreId) {
      this.$store.commit('setShareStoreId', shareStoreId)
    },

    /**
     * @description 是否授权定位
     */
    isAuthorizedLocation() {
      return new Promise((resolve, reject) => {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userLocation'] == true) {
              resolve(true)
            } else {
              resolve(false)
            }
          }
        })
      })
    },

    /**
     * @description 保存用户位置相关信息到缓存
     */
    saveLocationToStorage(location) {
      wx.setStorageSync('location', location)
    },

    /**
     * @param {array} storeList 门店列表
     * @param {storeId} storstoreIdeList 门店Id
     * @description 通过门店找到相对应门店信息
     */
    findStoreItemByStoreId(storeList, storeId) {
      let storeItem = storeList.find(item => {
        return item.storeId == storeId
      })
      return storeItem
    },

    /**
     * @param {number} storeId 确认门店id
     * @description 确认门店，加载门店相关数据
     */
    comfirmStore(storeId) {
      console.log('comfirmStorestoreId', storeId)
      this.hideComfirmStoreDialog()
      this.hideSelectStoreDialog()
      this.$store.commit('setStoreId', storeId) //设置确认门店Id
      this.$store.dispatch('confirmOrSwitchStore', {
        storeId
      })
    },

    /**
     * @description 加载并显示优惠券
     */
    async loadAndShowCouponDialog() {
      const res = await couponModel.getActivtiyPopupInfo({
        storeId: this.storeId
      })
      if (res.code === Api.CODES.SUCCESS) {
        this.activityCouponList = res.data.shopCouponActivitys //获取赋值活动优惠券列表
        let defaultCouponDialogStatus = [] //定义默认优惠券弹窗状态
        this.activityCouponList.forEach((item, index) => {
          //默认全部显示
          this.$set(this.activityCouponDialogsStauts, index, true)
          defaultCouponDialogStatus.push(true)
        })

        //  = defaultCouponDialogStatus
      }
    },

    /**
     * @param {number} couponDialogIndex 优惠券弹窗操作的的索引
     * @description 关闭优惠券弹窗
     */
    closeActivityCouponDialog(couponDialogIndex) {
      // this.$set(this.activityCouponDialogsStauts,couponDialogIndex,false)
      this.activityCouponDialogsStauts[couponDialogIndex] = false
    },

    /**
     * @param {number} couponDialogIndex 优惠券弹窗操作的的索引
     * @description 获取活动优惠券
     */
    fetchActivityCoupon(couponDialogIndex) {
      this.$store
        .dispatch(
          'fetchActivityCoupon',
          this.activityCouponList[couponDialogIndex].id
        )
        .then(code => {
          if (code == 200001) {
            // 领取成功
            this.activityCouponDialogsStauts[couponDialogIndex] = false //隐藏当前优惠券弹窗
            wx.navigateTo({
              url: '/pages/coupon/index/main'
            })
          }
        })
    },

    /**
     * @description 回到顶部
     */
    returnTop() {
      wx.pageScrollTo({ scrollTop: 0 })
    },

    /**
     * @description 显示确认门店弹窗
     */
    shownComfirmStoreDialog() {
      this.showComfirmStoreDialog = true
    },

    /**
     * @description 隐藏确认门店弹窗
     */
    hideComfirmStoreDialog() {
      this.showComfirmStoreDialog = false
    },

    /**
     * @description 显示选择门店弹窗
     */
    shownSelectStoreDialog() {
      this.showSelectStoreDialog = true
    },

    /**
     * @description 隐藏选择门店弹窗
     */
    hideSelectStoreDialog() {
      this.showSelectStoreDialog = false
    },

    /**
     * @param {array} storeList 门店列表
     * @description 保存分享门店列表
     */
    setStoreList(storeList) {
      this.storeList = storeList
    },

    /**
     * @description 加载更多商品数据
     */
    loadMoreGoodsList() {
      if (this.isAllLoaded || this.loading) return
      //还有数据，加载数据
      this.currentPage++
    },

    /**
     * @description 监听商品列表组件是否要吸顶
     */
    checkCeiling(scrollTop) {
      const ceilingDistance = this.indexGoodsTop - this.indexBarHeight
      if (scrollTop >= ceilingDistance) {
        this.isCeiling = true //滚动距离顶部吸顶
      } else {
        this.isCeiling = false
      }
    }
  },

  /*
    * @description 页面分享
    */
  onShareAppMessage() {
    return {
      title: '满世界给你找好吃的',
      path: `/pages/index/main?shareStoreId=${this.storeId}`,
      imageUrl: ''
    }
  }
}
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>

<style scoped lang="scss">
.goods-list-container {
  display: flex;
  justify-content: center;
}
.container-main {
  padding: 20rpx 20rpx 0;
}
.fixed-goods-list {
  position: fixed;
  top: 208rpx;
  display: flex;
  align-items: center;
  width: 100vw;
  z-index: 99;
}
.occupy-box {
  margin-bottom: 20rpx;
}
</style>
