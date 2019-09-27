<template>
    <div class="container">

      <!-- 自定义导航栏 -->
      <!-- <nav-bar /> -->
      <goods-search-bar :location="location" :showtip="tipShown && !isCeiling" :storeName="storeName"> </goods-search-bar>
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
      goodsList: [], //商品列表
      isAllLoaded: false, //商品的数据是否全部加载完成,
      loading: false, //加载商品是否处于更新的状态
      storeData: {}, //门店相关数据，banner，分类等
      goodsList: [], //商品列表
      storeList: [], //门店列表
      currentPage: 1 //当前商品页数
    }
  },

  computed: {
    ...mapState(["location", "storeId","shopDetail","shareStoreId"]),
  },

  watch: {
    storeId: function () {
      console.log('首页storeId修改了')
      this.updateStoreInfo() //更新门店相关信息
      this.updateStoreData() //更新新的门店数据
      this.hideComfirmStoreDialog()
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
    console.log('mountedmountedmountedmountedmountedmounted',shareStoreId)
    this.initPageShowHide()
    const isAuthLocate = await this.isAuthorizedLocation() //获取定位授权情况
    const shareStoreId = this.$mp.page.options.shareStoreId
    if(shareStoreId) {
      this.setShareStoreId(shareStoreId)
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
    this.loadMoreGoodsList()
  },

  /**
   * @description  鉴定滚动事件，从而是否显示回到顶部按钮和当前定位显示
   * */
  onPageScroll(e) {
    this.backToTopButtonShowed = e.scrollTop >= 200;
    this.tipShown = e.scrollTop < 100;
    this.checkCeiling(e.scrollTop)
  },

   //向上刷新数据
  onPullDownRefresh() {
      this.updateStoreData()
  },

  methods: { 

    /**
     * @description 初始化页面显示隐藏
     */
    initPageShowHide () {
      this.isCeiling = false
      this.shownPageLoading()
      this.hideComfirmStoreDialog()
      this.hideSelectStoreDialog()
    },
    
    /**
     * @description 更新门店相关数据
        1.更新门店信息到vuex
        2.更新门店相关数据（banner，商品数据）
     */
    updateStoreData() {
      this.shownPageLoading()
      Promise.all([this.setIndexStoreData(),this.setInitGoodsClassList()]).then(res => {
        console.log('updateStoreData',res)
        this.hidePageLoading()
      })
      // this.setIndexStoreData() //banner数据
      // this.setInitGoodsClassList() //商品数据
    },
    
    /**
     * @description 更新门店信息
     */
    updateStoreInfo () {
      if(this.storeList.length > 0) {
        console.log('updateStoreInfo')
        const storeItemInfo =  this.findStoreItemByStoreId(this.storeList,this.storeId)
        this.setStoreItemInfo(storeItemInfo)
      } 
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
     * @param
     * @description 获取商品数据
     */
    setInitGoodsClassList() {
      this.loading = true
      let promise
        promise = Api.index.topGoods({ storeId : this.storeId, pcId: '', pageNumber: 1, pageSize: PAGE_SIZE }).then(res => {
          if(res.code == Api.CODES.SUCCESS){
            let data = res.data     
            if(data.shopGoodsList.length > 0) {
              this.goodsList = data.shopGoodsList       
            } else {
              //没有可以加载的数据了，显示到底
              this.isAllLoaded = true
            }
          }
        })

        promise
        .catch(e => e)
        .then(() => { //延迟一定时间关闭加载分类动画
          this.loading = false
        } )
      return promise
    },

    /**
     * @description 核对是否要选择门店
     */
    async checkSelectStore () {
      const shareStoreId = this.$mp.page.options.shareStoreId  //通过点击分享进来,覆盖初始化定位设置门店
      // let location = wx.getStorageSync('location')
      let location = {"latitude":23.124561,"longitude":113.361945,"width":22,"height":32,"id":0,"name":"猪杂汤饭","address":"石牌街道广州天河区尚品天河一楼猪杂汤饭"}
      this.$store.commit('setLocationInfo',location)
 
      let storeId = await this.getStoreId(this.location)
      this.$store.commit('setStoreId',storeId)

      if(this.location.longitude && shareStoreId) { //已授权用户进入当前分享商城
          //判断是否跟当前门店一致
          if(shareStoreId == this.storeId) {
            //分享的商城门店和定位推荐当前门店一致,直接进入首页
            this.initLoadData()
          }else{
            //不一致, 选择合适门店弹出
            this.setShareStoreInfo(shareStoreId)
          }
      }else{
        //已经授权，但不是分享进来，直接加载情况
        this.initLoadData()
      }
    },

    /**
     * @description 已经授权情况确认相关门店业务
     */
    async authedComfirmStore () {
      console.log('authedComfirmStore')
        let location = wx.getStorageSync('location')
        if(wx.getStorageSync('location')) {
          //判断缓存中是否存在定位，避免丢失，没有需要重新定位
          this.$store.commit('setLocationInfo',location)  //已经授权从缓存中存定位信息到vuex，方便其他组件使用
        }else{
            location = await this.setUserLocationInfo() //设置用户相关定位信息：经纬度，详情地址
            this.$store.commit('setLocationInfo',location)  //已经授权从缓存中存定位信息到vuex，方便其他组件使用
        }
      
      
        const shareStoreId = this.$mp.page.options.shareStoreId  //通过点击分享进来

       const storeList = await this.getStoreListOfAuthedLocate() //获取门店列表才能设置当前门店和经常访问门店
       this.setStoreList(storeList)
      //判断是否从分享进来的
      if(shareStoreId) { 
        //是从分享进来
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
          console.log('不一致：选择门店弹窗',storeList)
          if(storeList) {  
            this.setCurrentStoreInfo(shareStoreId)
            this.setUsuallyStoreInfo()
            this.shownSelectStoreDialog()
          }     
        }

      }else{
        //直接加载首页，确定进入程序的门店 
        console.log('直接加载首页，确定进入程序的门店')
        const usuallyStoreId = await this.getUsuallyStoreId()
        if(this.storeId == usuallyStoreId){
            //已经设置过门店id
            this.hidePageLoading()
            this.updateStoreInfo() //更新门店相关信息
            console.log('已经设置过门店id，直接设置经常访问门店Id',this.storeId,usuallyStoreId)
          }else {      
            console.log('直接设置经常访问门店Id',usuallyStoreId)
            this.setStoreId(usuallyStoreId)  
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


      // const shareStoreId = this.$mp.page.options.shareStoreId  //通过点击分享进来,覆盖初始化定位设置门店
      // this.setShareStoreId(shareStoreId)
      // if (!this.location.longitude) { //不存在经纬度，首次定位，初始化数据
      // this.showPageLoading = true
      // const locationInfo = await this.setUserLocationInfo()
      // this.hidePageLoading() //隐藏页面加载
      // this.setStoreDetailInfo(shareStoreId)
      // }
    },

    /**
     * @param {number} currentStoreId 当前门店id，即分享的门店id
     * @description 设置当前门店相关信息： 当前门店即分享门店
     */
    setCurrentStoreInfo (currentStoreId) {    
      console.log('setCurrentStoreInfo',currentStoreId)
      const shareStoreItem =  this.findStoreItemByStoreId(this.storeList,currentStoreId) 
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
     * @description 获取分享门店信息
     */
    async getShareStoreInfo (shareStoreId) {
      const storeInfo = await storeModel.getOneStoreInfoByStoreId({
        storeId: this.shareStoreId,
        longitude: this.longitude, 
        latitude: this.latitude, 
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
      const usuallyStoreItem =  this.findStoreItemByStoreId(this.storeList,usuallyStoreId)
      this.$store.commit('setUsuallyStoreInfo',usuallyStoreItem)
    },

    /**
     * @@description 获取经常访问门店Id
     */
    async getUsuallyStoreId() {
      //判断是否存在登录状态，已登录从api获取经常访问门店，未登录从缓存中读取
      if(this.$store.state.sessionId) {
        const res = await Api.index.queryStoreByLastest()
        console.log('getUsuallyStoreId',res)

        if(res.code === Api.CODES.SUCCESS) {
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
     * @description 获取用户已经授权的位置：经纬度
     */
    getUserLocation () {
      const location = wx.getStorageSync('userLocation').split(',')
      return {
        longitude: location[0], //经度
        latitude:  location[1] //维度 
      }
    },


    

    /**
     * @description 初始化加载数据
     */
    async initLoadData() {
      this.storeList = await this.getStoreList()
      const storeInfo = this.findStoreItemByStoreId(this.storeList,this.storeId)
      this.$store.commit('setCurrentStoreInfo',storeInfo)//更新全局门店信息
      this.storeName = storeInfo.storeName //更新当前页面门店名称
      this.setStoreData(this.storeId)   //门店设置成功后获取首页相对应门店数据
      this.setGoodsClassList(this.storeId, '', this.currentPage, PAGE_SIZE)
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
     * @param {string} longitude 经纬度
     * @param {string} latitude 经纬度
     * @description 根据用户定位获取门店ID
     * @return {Promise} 获取门店id
     */
    async getStoreId({longitude, latitude}) {
       const res =  await Api.index.storeList({ longitude, latitude })
       return res.data.storeList[0].storeId
    },


    // /**
    //  *  @param {string} shareStoreId 分享进来的门店id
    //  *  根据经纬度设置门店相对应的Id
    //  */
    // setStoreId(shareStoreId) {
    //   return new Promise ((resolve, reject) => {

    //     if(shareStoreId) { //通过分享进来设置成分享门店相关信息

    //       Api.index.storeList({ longitude:this.longitude, latitude:this.latitude}).then(res => {
    //         const storeInfo = this.findStoreItemByStoreId(res.data.storeList,shareStoreId)
    //         this.setStoreInfo(storeInfo)
    //         this.$store.commit("setStoreId",storeInfo.storeId)
    //         resolve(storeInfo.storeId)
    //       })
    //       this.$store.commit("setStoreId",shareStoreId)
    //       resolve(shareStoreId)
    //     } else{ //通过定位门店

    //       Api.index.storeList({ longitude:this.longitude, latitude:this.latitude}).then(res => {
    //         const storeInfo =  res.data.storeList[0]
    //         this.setStoreInfo(storeInfo)
    //         this.$store.commit("setStoreId",storeInfo.storeId)
    //         resolve(storeInfo.storeId)
    //       })

    //     }
    //   })

    // },

    

    /**
     *  @description 设置门店相关信息
     */
    setStoreDetailInfo() {
      return new Promise ((resolve, reject) => {
        Api.index.storeList({ longitude:this.longitude, latitude:this.latitude}).then(res => {
          const storeInfo =  res.data.storeList[0]
          this.setStoreList(res.data.storeList)
          this.setStoreInfo(storeInfo)
          resolve()
        })
      })

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
     * @param
     * @description 获取商品数据
     */
    setGoodsClassList(storeId, pcId, pageNumber, pageSize) {
      this.loading = true
      let promise
        promise = Api.index.topGoods({ storeId, pcId, pageNumber, pageSize }).then(res => {
          if(res.code == Api.CODES.SUCCESS){
            var data = res.data
            this.tab = data.classList        
            if(data.shopGoodsList.length > 0) {
              this.goodsList = this.goodsList.concat(data.shopGoodsList)          
            } else {
              //没有可以加载的数据了，显示到底
              this.isAllLoaded = true
            }
          }
        })

        promise
        .catch(e => e)
        .then(() => { //延迟一定时间关闭加载分类动画
          this.loading = false
        } )
    },

    /**
     * @description 加载更多商品数据
     */
    loadMoreGoodsList () {
       if (this.isAllLoaded || this.loading) return
      //还有数据，加载数据
      this.currentPage++
      this.setGoodsClassList(this.storeId, '', this.currentPage , PAGE_SIZE)
    },

    /**
     * @description  初始化首页数据
     */
    initIndexData() {
      this.isAllLoaded = false, //商品的数据是否全部加载完成,
      this.loading = true, //加载商品是否处于更新的状态
      this.currentPage = 1 //当前商品页数
      this.goodsList = []
    },

    /**
     * @description 监听商品列表组件是否要吸顶
     */
    checkCeiling (scrollTop) {
      if(scrollTop >= 156) {
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
};
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>

<style scoped lang="scss">
.container {
  height: 2000rpx;
}
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
