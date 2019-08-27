<template>
  <div class="container" v-if="located">

    <!-- 自定义导航栏 -->
    <nav-bar />

    <!-- 搜索栏 -->
    <goods-search-bar :location="location" :showtip="tipShown" :storeName="storeName" v-if="storeName"> </goods-search-bar>

    <!-- Swiper -->
    <index-swiper :bannerList="storeData.bannerList" />

    <!-- 商品列表 -->
    <goods-list :goodsList="goodsList" :isAllLoaded="isAllLoaded" :loading="loading" />

    <!-- Fixed -->
    <to-top />

  </div>
</template>

<script>
import { mapState } from "vuex";
import { Api } from "@/http/api";
import { AMapWX } from "@/utils/amap-wx";
import config from "@/config.js";
import GoodsSearchBar from "@/components/GoodsSearchBar";
import GoodsList from "./components/GoodsList/index";
import IndexSwiper from "./components/IndexSwiper/index"
import ToTop from "./components/ToTop/index"
import NavBar from "./components/NavBar/index"
import { serialize } from '@/utils/';

var mta = require("../../utils/mta_analysis.js");

const PAGE_SIZE = 10 //一页商品的显示数量

export default {
  components: {
    GoodsSearchBar,
    GoodsList,
    IndexSwiper,
    ToTop,
    NavBar
  },

  data() {
    return {
      located: false, //是否已经定位，默认false
      storeData: {}, //门店相关数据，banner，分类等
      storeName: '', //门店名称
      tipShown: true, //搜索栏是否显示
      longitude:'', //经度
      latitude:'', //维度
      shareStoreId: 0, //分享的门店id
      goodsList: [], //商品列表
      isAllLoaded: false, //商品的数据是否全部加载完成,
      loading: true, //加载商品是否处于更新的状态
      currentPage: 1 //当前商品页数
    };
  },

  computed: {
    ...mapState(["location", "storeId","shopDetail"]),
  },



  methods: { 

    /**
     * @description 设置用户相关定位信息(经纬度，所在地详情等)
     */
    setUserLocationInfo () {
      wx.showLoading({ title: "定位中", mask: true }); 
       let amap = new AMapWX({ key: config.AMAP_KEY });
       return new Promise ((resolve, reject) => {
         amap.getPoiAround({
          success: res => { //用户成功授权
            wx.hideLoading() //关闭定位加载Loading
            this.located = true  //已经定位，开启开关
            const locationInfo = res.markers[0] //当前用户定位定位相关信息
            this.longitude =locationInfo.longitude
            this.latitude = locationInfo.latitude

            this.$store.commit("setLocationInfo",locationInfo)  //用户定位相关信息存到vuex
            resolve(locationInfo)
          },
          // 引导用户设置定位权限
          fail: e => { //用户授权取消
            reject(e)
            if ( e.errMsg === "getLocation:fail auth deny" || "getLocation:fail:auth denied") {
              wx.hideLoading() //关闭定位加载Loading
              wx.redirectTo({ url: "/pages/location/main" }) //重定向到定位授权页面
            }
          }
        })
       })
       
    },

    /**
     * @description 保存门店相关信息（名称，id等）
     */
    setStoreInfo (storeInfo) {
      this.storeName = storeInfo.storeName
      console.log('storeName',this.storeName)
      this.$store.commit('setItem',{storeName:storeInfo.storeName,storeId:storeInfo.storeId}) //保存门店id和名称到vuex
    },

    /**
     * @param {array} storeList 门店列表
     * @param {storeId} storstoreIdeList 门店Id
     * @description 通过门店找到相对应门店信息
     */
    findStoreItemByStoreId(storeList,storeId) { 
      console.log('storeList',storeList)
      console.log('storeId',storeId)
      let storeItem = storeList.find((item) => {
        console.log('item',item.storeId)
        console.log('item2',storeId)
         return item.storeId == storeId
      })
      return storeItem
    },
    


    /**
     *  @param {string} shareStoreId 分享进来的门店id
     *  根据经纬度设置门店相对应的Id
     */
    setStoreId(shareStoreId) {
      return new Promise ((resolve, reject) => {

        if(shareStoreId) { //通过分享进来设置成分享门店相关信息

          Api.index.storeList({ longitude:this.longitude, latitude:this.latitude}).then(res => {
            const storeInfo = this.findStoreItemByStoreId(res.data.storeList,shareStoreId)
            console.log('storeInfo',storeInfo)
            this.setStoreInfo(storeInfo)
            this.$store.commit("setStoreId",storeInfo.storeId)
            resolve(storeInfo.storeId)
          })
          this.$store.commit("setStoreId",shareStoreId)
          resolve(shareStoreId)
        } else{ //通过定位门店

          Api.index.storeList({ longitude:this.longitude, latitude:this.latitude}).then(res => {
            const storeInfo =  res.data.storeList[0]
            this.setStoreInfo(storeInfo)
            this.$store.commit("setStoreId",storeInfo.storeId)
            resolve(storeInfo.storeId)
          })

        }
      })

    },

    /**
     * @param {string} storeId 门店id
     * @description  获取店铺数据
     */
    setStoreData(storeId) {
      Api.index.getIndexData({ storeId }).then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.storeData = res.data;
        }
      });
   
    },

    /**
     * @param
     * @description 获取商品数据
     */
    setGoodsClassList(storeId, pcId, pageNumber, pageSize) {
      this.loading = true
      let promise
      console.log('getGoodsClassList',storeId)

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
        .then(() => this.loading = false)
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
    }

  },

  onShow() {
    console.log('getCurrentPages',getCurrentPages())
    if(this.shopDetail.storeName) {
      //切换了门店，重新渲染门店相关数据
      this.initIndexData() //先清空原门店数据
      this.storeName = this.shopDetail.storeName //更新门店名称
      this.setStoreData(this.storeId)//更新门店数据
      this.setGoodsClassList(this.storeId, '', this.currentPage, PAGE_SIZE) //更新商品数据
    }
    
  },


  onLoad(e) {
    const shareStoreId = this.$mp.page.options.storeId  //通过点击分享进来,覆盖初始化定位设置门店
    if (!this.location.longitude) { //不存在经纬度，首次定位，初始化数据
      this.setUserLocationInfo().then(res => {
        //设置用户定位成功后，获取相对应门店id来获取门店数据
        this.setStoreId(shareStoreId).then(storeId=> {
        //门店设置成功后获取首页相对应门店数据
        this.setStoreData(storeId)
        this.setGoodsClassList(shareStoreId ||storeId, '', this.currentPage, PAGE_SIZE)
        })
      })
    }

    
    mta.Page.init(); //第三方统计数据
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
  },

   //向上刷新数据
  onPullDownRefresh() {
     this.initIndexData()
     this.setStoreData(this.storeId)
     this.setGoodsClassList(this.storeId, '', 1, PAGE_SIZE) //更新为第一页最新的商品数据
  },

  /*
    * @description 页面分享
    */
  onShareAppMessage() {
    return {
      title: '满世界给你找好吃的',
      path: `/pages/index/main?storeId=${this.storeId}`,
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
  padding-top: 100rpx;
}
</style>
