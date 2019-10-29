<template>
    <div class="container">

      <!-- 自定义导航栏 -->
      <!-- <nav-bar /> -->
      <goods-search-bar :location="location" :showtip="tipShown && !isCeiling"> </goods-search-bar>
      <template v-if="!showPageLoading">
        <!-- 搜索栏 -->


        <!-- Swiper -->
        <index-swiper :bannerList="storeData.bannerList" />

        <!-- 商品列表 -->
        <div class="goods-list-container">
          <!-- <goods-list :goodsList="goodsList" :isAllLoaded="isAllLoaded" :loading="loading" :isCeiling="isCeiling" /> -->
           <goods-list  :isCeiling="isCeiling" />
        </div>



      </template>

      <page-loading  :show="showPageLoading"/>

      <SelectStoreDialog :show="showSelectStoreDialog" @comfirmStore="comfirmStore"/>

      <ComfirmStoreDialog :show="showComfirmStoreDialog"  @comfirmStore="comfirmStore" />

      <!-- Fixed -->
      <to-top />

  </div>


</template>

<script>
import { mapState } from "vuex"
import { Api } from "@/http/api"
import { AMapWX } from "@/utils/amap-wx"
import config from "@/config"
import GoodsSearchBar from "@/components/GoodsSearchBar"
import ComfirmStoreDialog from "@/components/ComfirmStoreDialog"
import SelectStoreDialog from "@/components/SelectStoreDialog"
import PageLoading from "@/components/PageLoading"
import GoodsList from "./components/GoodsList/index"
import IndexSwiper from "./components/IndexSwiper/index"
import ToTop from "./components/ToTop/index"
import NavBar from "./components/NavBar/index"
import { serialize } from '@/utils/'
import StoreModel from '@/model/store'

const storeModel = new StoreModel()
var mta = require("../../utils/mta_analysis.js");

const PAGE_SIZE = 10 //一页商品的显示数量
const CEILING_DISTANCE = 135 //滚动多少吸顶

export default {
  components: {
    GoodsSearchBar,
    PageLoading,
    GoodsList,
    IndexSwiper,
    ToTop,
    NavBar,
    ComfirmStoreDialog,
    SelectStoreDialog
  },

  data() {
    return {
      showPageLoading: false, //页面数据师傅显示
      showSelectStoreDialog: false, //选择门店弹窗显示
      showComfirmStoreDialog: false, //确认门店弹窗显示
      tipShown: true, //搜索栏是否显示
      isCeiling: false, //商品列表组件是否吸顶
      storeData: {}, //门店相关数据，banner，分类等
      storeList: [] //门店列表
    }
  },

  computed: {
    ...mapState(["location", "storeId","shopDetail","shareStoreId"]),
  },

  watch: {
    storeId: function () {
      console.log('首页storeId修改了',this.storeId)
      //确认门店开启分享功能
      wx.showShareMenu({
        withShareTicket: true
      })
      this.updateStoreInfo() //更新门店相关信息
      this.updateStoreData() //更新新的门店数据
      this.hidePageLoading()
      this.hideComfirmStoreDialog()
      this.hideSelectStoreDialog()
    },
    showSelectStoreDialog: function(val) {
      if(val){
        //如果选择门店弹窗显示，页面加载组件隐藏
        this.hidePageLoading()
      }

    },
    showComfirmStoreDialog: function(val) {
      if(val){
        //如果确认门店弹窗显示，页面加载组件隐藏
        this.hidePageLoading()
      }
    },
  },


  async mounted () {
    console.log('首页mountedshareStoreId',this.$mp.page.options.shareStoreId)
    this.initPageShowHide()

    const isAuthLocate = await this.isAuthorizedLocation() //获取定位授权情况

    const shareStoreId = this.$mp.page.options.shareStoreId

     if(shareStoreId == null && !this.storeId) {
        //分享门店不存在情况隐藏分享按钮
        wx.hideShareMenu()
      }


    if(shareStoreId) {
      this.setShareStoreId(shareStoreId)
    }
    if(this.storeId){
      this.hidePageLoading()
      return false
    }

    if(isAuthLocate) {
      //已授权确认门店
      this.authedComfirmStore()
      }else{
      //未授权定位
      this.authLocateAndcomfirmStore() //授权定位并且确认门店
    }

  },

  /**
   * @description 页面向上触发事件
   */
  onReachBottom () {
  },

  /**
   * @description  鉴定滚动事件，从而是否显示回到顶部按钮和当前定位显示
   * */
  onPageScroll(e) {
    this.backToTopButtonShowed = e.scrollTop >= 200;
    this.tipShown = e.scrollTop < 100;
    console.log('onPageScroll',e.scrollTop)
    this.checkCeiling(e.scrollTop)
  },

   //向上刷新数据
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    this.returnTop()
    this.updateStoreData()
  },

  methods: {

    /**
     * @description 初始化页面显示隐藏
     */
    initPageShowHide () {
      this.isCeiling = false //设置时段活动商品不吸顶
      this.shownPageLoading() //显示页面加载组件
      this.hideComfirmStoreDialog()
      this.hideSelectStoreDialog()
    },

    /**
     * @description 更新门店相关数据
        1.更新门店信息到vuex
        2.更新门店相关数据（banner，商品数据）
     */
    updateStoreData() {
      // this.shownPageLoading()
      this.setIndexStoreData().then(res => {
        this.hidePageLoading()
        wx.stopPullDownRefresh()
      })
      // this.setIndexStoreData() //banner数据
    },

    /**
     * @description 更新门店信息
     */
    async updateStoreInfo () {
      const storeInfo = await this.getStoreInfoByStoreId(this.storeId)
      if(!storeInfo.isBusiness) {
        //如果该门店休息中，弹窗提示跳转选择其他门店
         wx.showModal({
          title: '提示',
          content: `经常访问“${storeInfo.storeName}”，休息中请重新选择服务门店~`,
          showCancel: false,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if (result.confirm) {
              wx.reLaunch({
                url: '/pages/store/select/main'
              })
            }
          }
        })
      }
      console.log('首页更新门店信息',storeInfo)
      this.setStoreItemInfo(storeInfo)
    },

    /*获取当前页url*/
      getCurrentPageUrl(){
        var pages = getCurrentPages()    //获取加载的页面
        var currentPage = pages[pages.length-1]    //获取当前页面的对象
        var url = currentPage.route    //当前页面url
        return url
      },

    /**
     * @param {string} storeId 门店id
     * @description  获取店铺数据
     */
    setIndexStoreData() {
      return Api.index.getIndexData({ storeId : this.storeId }).then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.storeData = res.data
        }
      })
    },

    /**
     * @description 已经授权情况确认相关门店业务
     */
    async authedComfirmStore () {
      console.log('authedComfirmStore')
      this.setLocationInfoForAuthedLocate()
      this.setStoreListForAuthedLocate()

      const shareStoreId = this.$mp.page.options.shareStoreId  //通过点击分享进来
      //判断是否从分享进来的
      if(shareStoreId) {
        //是从分享进来
       this.authedComfirmStoreByShareCase(shareStoreId)
      }else{
        //直接加载首页，确定进入程序的门店
        console.log('直接加载首页，确定进入程序的门店')
        this.authedComfirmStoreByDirectLoad()

      }
    },

    /**
     * @description 直接加载首页，确定进入程序的门店
     */
    async authedComfirmStoreByDirectLoad () {
      console.log('authedComfirmStoreByDirectLoad',usuallyStoreId)
      const usuallyStoreId = await this.getUsuallyStoreId()
      console.log('authedComfirmStoreByDirectLoad',usuallyStoreId)

      if(!usuallyStoreId) {
        //如果经常访问门店Id为空,跳转选择门店页面组件
        wx.redirectTo({
          url: '/pages/store/select/main'
        })
        return false
      }

      if(this.storeId == usuallyStoreId){
        //已经设置过门店id
        this.hidePageLoading()
        this.updateStoreInfo() //更新门店相关信息
        console.log('已经设置过门店id，直接设置经常访问门店Id',this.storeId,usuallyStoreId)
      }else {
        console.log('直接设置经常访问门店Id',usuallyStoreId)
        this.setStoreId(usuallyStoreId)
      }
    },

    /**
     * @description 已经授权定位从分享情况进来确认门店
     */
    async authedComfirmStoreByShareCase (shareStoreId) {

      console.log('是从分享进来shareStoreId',shareStoreId)
      const usuallyStoreId = await this.getUsuallyStoreId()
      if(shareStoreId == usuallyStoreId) { //当前门店和经常访问门店是否一致？
        //一致：直接设置分享门店id为当前门店
        console.log('一致：直接设置分享门店id为当前门店')
        if(this.storeId== shareStoreId){
          //已经设置过门店id
          this.hidePageLoading()
          console.log('已经设置过门店id，第二次进入分享相同门店id得加载相对应数据')
        }else {
          this.setStoreId(shareStoreId)
        }
      }else{
        //不一致：选择门店弹窗
        //设置当前门店和经常访问门店相关信息

        console.log('设置当前门店和经常访问门店相关信息')
        if(usuallyStoreId) {
          //经常访问门店存在
          const res = await this.setCurrentStoreInfo(shareStoreId)
          console.log('不一致：选择门店弹窗',this.storeList)
          this.setUsuallyStoreInfo()
          this.shownSelectStoreDialog()
        }else{
          //经常访问门店不存存在，直接弹出确认门店弹窗
          console.log('经常访问门店不存存在，弹出确认门店就行')
          const storeInfo =  await this.getShareStoreInfo(shareStoreId)
          this.setStoreItemInfo(storeInfo) //设置当前门店
          this.shownComfirmStoreDialog()
        }

      }

    },

    /**
     * @@description 授权定位并确认门店加载数据
     */
    async authLocateAndcomfirmStore () {
      console.log('authLocateAndcomfirmStore')
      const locationInfo = await this.setUserLocationInfo() //设置用户相关定位信息：经纬度，详情地址
      console.log('locationInfo',locationInfo)
      let storeInfo = null
      if(this.shareStoreId) {
        //如果是从分享进来，显示分享门店，否则根据定位推荐门店

        storeInfo =  await this.getShareStoreInfo(this.shareStoreId)
        console.log('从分享进来',storeInfo)
      }else{
        storeInfo = await this.getRecommendStoreByLocation() //获取根据定位推荐门店
      }

      console.log('storeInfo',storeInfo)
      this.setStoreItemInfo(storeInfo) //设置当前门店
      console.log('确认门店弹窗显示')
      this.shownComfirmStoreDialog()//确认门店弹窗显示
    },

    /**
     * @description 已经授权对位下设置定位信息
     */
    async setLocationInfoForAuthedLocate() {
      let location = wx.getStorageSync('location')
      if(wx.getStorageSync('location')) {
        //判断缓存中是否存在定位，避免丢失，没有需要重新定位
        this.$store.commit('setLocationInfo',location)  //已经授权从缓存中存定位信息到vuex，方便其他组件使用
      }else{
          location = await this.setUserLocationInfo() //设置用户相关定位信息：经纬度，详情地址
          this.$store.commit('setLocationInfo',location)  //已经授权从缓存中存定位信息到vuex，方便其他组件使用
      }
    },

    /**
     * @description 已经授权对位下设置门店列表
     */
    async setStoreListForAuthedLocate() {
       const storeList = await this.getStoreListOfAuthedLocate() //获取门店列表才能设置当前门店和经常访问门店
       this.setStoreList(storeList)
    },

    /**
     * @param {number} currentStoreId 当前门店id，即分享的门店id
     * @description 设置当前门店相关信息： 当前门店即分享门店
     */
    async setCurrentStoreInfo (currentStoreId) {
      console.log('setCurrentStoreInfo',currentStoreId)
      const shareStoreItem = await this.getStoreInfoByStoreId(currentStoreId)
      console.log('setCurrentStoreInf2o',shareStoreItem)
      this.$store.commit('setShareStoreInfo',shareStoreItem)
      this.$store.commit('setShareStoreId',currentStoreId) //存储分享分店Id到全局vuex
    },

    /**
     * @description 设置用户相关定位信息(经纬度，所在地详情等)
     */
    setUserLocationInfo () {
       console.log('config',config)
       let amap = new AMapWX({ key: config.AMAP_KEY })
       console.log('amap',amap)
       return new Promise ((resolve, reject) => {
         amap.getPoiAround({
          success: res => { //用户成功授权
            const locationInfo = res.markers[0] //当前用户定位定位相关信息
            const cityName = res.poisData[0].cityname || res.pois[0].cityname //用户定位当前城市
            console.log('AMapWX',res)
            this.longitude =locationInfo.longitude
            this.latitude = locationInfo.latitude
            this.$store.commit("setLocationInfo",locationInfo)  //用户定位相关信息存到vuex
            this.$store.commit("setcityname",cityName)
            this.$store.commit("setLocateCity",cityName)
            this.saveLocationToStorage(locationInfo)
            resolve(locationInfo)
          },
          // 引导用户设置定位权限
          fail: e => { //用户授权取消
            reject(e)
            if ( e.errMsg === "getLocation:fail auth deny" || "getLocation:fail:auth denied") {
              console.log('拒绝授权定位')
              this.hidePageLoading()
              if(this.shareStoreId) {
                if(this.storeId) return  //已经存在确认门店，则不显示确认门店弹窗
                 this.getShareStoreInfo(this.shareStoreId).then(storeInfo => {
                   console.log('确认门店弹窗显示2',storeInfo)
                    this.setStoreItemInfo(storeInfo) //设置当前门店
                    this.shownComfirmStoreDialog()//确认门店弹窗显示
                 })

              }else{
                 //不是从分享进来
                wx.redirectTo({ url: "/pages/location/main" }) //重定向到定位授权页面
              }
            }
          }
        })
       })

    },

    /**
     * @description 根据当前定位获取推荐门店
     */
    getRecommendStoreByLocation () {
       return new Promise ((resolve, reject) => {
        Api.index.storeList({ longitude:this.longitude, latitude:this.latitude}).then(res => {
          const storeList = res.data.storeList
          const storeInfo =  storeList[0]
          this.setStoreList(storeList)
          resolve(storeInfo)
        })
      })
    },

     /**
     * @description 获取一个门店相关信息
     */
    async getStoreInfoByStoreId (storeId) {
      const storeInfo = await storeModel.getOneStoreInfoByStoreId({
        storeId: storeId,
        longitude: this.location.longitude,
        latitude: this.location.latitude,
      })
      return storeInfo.data
    },

    /**
     * @description 获取分享门店信息
     */
    async getShareStoreInfo (shareStoreId) {
      const storeInfo = await storeModel.getOneStoreInfoByStoreId({
        storeId: this.shareStoreId,
        longitude: this.location.longitude,
        latitude: this.location.latitude,
      })
      return storeInfo.data
    },

    /**
     * @description 保存当前门店相关信息（名称，id等）
     */
    setStoreItemInfo (storeInfo) {
      this.$store.commit('setCurrentStoreInfo',storeInfo) //保存门店id和名称到vuex
    },

    /**
     * @description 设置经常访问相关信息
     */
    async setUsuallyStoreInfo () {
      console.log('setUsuallyStoreInfo',this.storeList)
      console.log('setUsuallyStoreInfo2',this.getUsuallyStoreId())
      const usuallyStoreId = await this.getUsuallyStoreId()
      const usuallyStoreItem = await this.getStoreInfoByStoreId(usuallyStoreId)
      console.log('usuallyStoreItem',usuallyStoreItem)
      this.$store.commit('setUsuallyStoreInfo',usuallyStoreItem)
    },

    /**
     * @@description 获取经常访问门店Id
     */
    async getUsuallyStoreId() {
      //判断是否存在登录状态，已登录从api获取经常访问门店，未登录从缓存中读取

      if(this.$store.state.sessionId) {
        console.log('getUsuallyStoreId')
        const res = await Api.index.queryStoreByLastest()
        console.log('getUsuallyStoreId1',res)
        if(res.code === Api.CODES.SUCCESS) {
          console.log('getUsuallyStoreId2',res.data.storeId )
          return res.data.storeId
        }else{
          return ''
        }
      }else{
        //未登录
       console.log('未登录',storeModel.getLatestStoreOFNoLogin())
       return storeModel.getLatestStoreOFNoLogin()
      }

    },

    /**
     *  @param {string} storeId 门店id
     *  设置门店Id，存储到全局vuex
     */
    setStoreId(storeId) {
      this.$store.commit('setStoreId',storeId)
    },

    /**
     * @description 隐藏页面加载loading
     */
    hidePageLoading () {
       this.showPageLoading = false //关闭页面加载Loading
    },

    /**
     * @description 显示页面加载loading
     */
    shownPageLoading () {
       this.showPageLoading = true //显示页面加载Loading
    },

    /**
     * @param {string} shareStoreId 分享门店id
     * @description 设置分享门店id
     */
    setShareStoreId (shareStoreId) {
      this.$store.commit('setShareStoreId',shareStoreId)
    },

    /**
     * @description 是否授权定位
     */
    isAuthorizedLocation () {
      return new Promise((resolve,reject) =>{
        wx.getSetting({
          success: (res) => {
            if (res.authSetting["scope.userLocation"] == true) {
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
    findStoreItemByStoreId(storeList,storeId) {
      let storeItem = storeList.find((item) => {
         return item.storeId == storeId
      })
      return storeItem
    },

    /**
     * @param {number} storeId 确认门店id
     * @description 确认门店，加载门店相关数据
     */
    comfirmStore (storeId) {
      this.hideComfirmStoreDialog()
      this.hideSelectStoreDialog()
      this.$store.commit("setStoreId",storeId) //设置确认门店Id
      this.$store.dispatch('confirmOrSwitchStore', {
        storeId
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
    shownComfirmStoreDialog () {
      this.showComfirmStoreDialog = true
    },

    /**
     * @description 隐藏确认门店弹窗
     */
    hideComfirmStoreDialog () {
      this.showComfirmStoreDialog = false
    },

    /**
     * @description 显示选择门店弹窗
     */
    shownSelectStoreDialog () {
      this.showSelectStoreDialog = true
    },

    /**
     * @description 隐藏选择门店弹窗
     */
    hideSelectStoreDialog () {
      this.showSelectStoreDialog = false
    },


    /**
     * @description 获取已经授权情况门店列表，已经授权用户经纬度从缓存中读取
     */
    getStoreListOfAuthedLocate() {
      const location = wx.getStorageSync('location')
      return new Promise ((resolve, reject) => {
        Api.index.storeList({ longitude: location.longitude, latitude: location.latitude}).then(res => {
          const storeList =  res.data.storeList
          resolve(storeList)
        })
      })
    },

    /**
     * @description 获取门店列表
     */
    getStoreList () {
      return new Promise ((resolve, reject) => {
        Api.index.storeList({ longitude: this.location.longitude, latitude: this.location.latitude}).then(res => {
          const storeList =  res.data.storeList
          this.storeList = storeList
          resolve(storeList)
        })
      })
    },

    /**
     * @param {array} storeList 门店列表
     * @description 保存分享门店列表
     */
    setStoreList (storeList) {
      this.storeList = storeList
    },

    /**
     * @param {number} shareStoreId 分享门店id
     * @description 保存分享门店相关信息（名称，id等）
     */
    async setShareStoreInfo (shareStoreId) {
     const storeList = await this.getStoreList()
     const shareStoreItem =  this.findStoreItemByStoreId(storeList,shareStoreId)
     const currentStoreItem =  this.findStoreItemByStoreId(storeList,this.storeId)
     this.$store.commit('setShareStoreInfo',shareStoreItem)
     this.$store.commit('setCurrentStoreInfo',currentStoreItem)
     this.shownSelectStoreDialog()
    },

    /**
     * @description 加载更多商品数据
     */
    loadMoreGoodsList () {
       if (this.isAllLoaded || this.loading) return
      //还有数据，加载数据
      this.currentPage++
    },


    /**
     * @description 监听商品列表组件是否要吸顶
     */
    checkCeiling (scrollTop) {
      if(scrollTop >= CEILING_DISTANCE) {
        this.isCeiling = true  //滚动距离顶部150吸顶
      }else{
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
.goods-list-container{
  display: flex;
  justify-content: center;
}
.fixed-goods-list {
  position: fixed;
  top: 208rpx;
  display: flex;
  align-items: center;
  width: 100vw;
  z-index: 99;

}
</style>
