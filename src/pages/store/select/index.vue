<template>
  <div class="container">
    <top-bg/>
    <search-store :city-name="cityName" />
    <current-store :item="currentStoreInfo" />
    <current-location />
    <nearby-stores :store-list="nearbyStoreList" v-if="nearbyStoreList && nearbyStoreList.length" />
    <page-loading  :show="showPageLoading"/> 
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api' 
import TopBg from "./components/TopBg/index"
import SearchStore from "./components/SearchStore/index"
import CurrentStore from "./components/CurrentStore/index"
import CurrentLocation from "./components/CurrentLocation/index"
import NearbyStores from "./components/NearbyStores/index"
import PageLoading from "@/components/PageLoading"

export default {
  components: {
    SearchStore,
    TopBg,
    CurrentStore,
    CurrentLocation,
    NearbyStores,
    PageLoading
  },
  data () {
    return {
      showPageLoading: true, //页面数据师傅显示
      currentStoreInfo: {}, //当前门店相关信息
      nearbyStoreList: [] //附近门店
    }
  },
  computed : {
    ...mapState(['storeId','location','cityName'])
  },


  mounted (e) {
    console.log('a')
    this.initLoadStoreData()
  },

  methods: {
    /**
     * @description 获取当前门店信息Promise
     */
     getCurrentStorePromise() {
       return Api.index.findNowStore({
         storeId:this.storeId
       })
    },

     /**
     * @description 获取附近门店列表信息Promise
     */ 
     getStoreListPromise() {
       return Api.index.storeList({
         latitude: this.location.latitude,
         longitude: this.location.longitude,
         activityId: '',
         city: this.cityName
       })
     },

     /**
      * @param {string} cityName 城市名
      * @description 设置城市名字
      *  */ 
     setCityName (cityName) {
       if(!this.cityName) {
         this.$store.commit('setcityname',cityName) //第一次获取当前定位城市
       }
     },
    
     /**
      * @param {object} currentStoreInfo 当前城市相关信息
      * @description 设置当前城市
      *  */
     setCurrentStoreInfo (currentStoreInfo) {
       this.currentStoreInfo = currentStoreInfo
     },

     /**
      * @param {array} nearbyStoreList 附近门店列表
      * @description 设置附近门店
      *  */
     setNearbyStoreList (nearbyStoreList) {
       this.nearbyStoreList = nearbyStoreList
     },

      /**
       * @description 隐藏页面加载状态
       */
     hidePageLoading() {
       setTimeout(() => {
         console.log('hidePageLoading')
         this.showPageLoading = false
       }, 600);  
     },

    /**
     * @description 初始化加载门店相关数据
     */
    initLoadStoreData () {
      Promise.all([this.getCurrentStorePromise(),this.getStoreListPromise()]).then(res => {
        if(res[0].code == Api.CODES.SUCCESS && res[0].code == Api.CODES.SUCCESS ) { //两个都请求成功
          const currentStoreInfo =  res[0].data.shopStore //当前门店信息
          const nearbyStoreList =  res[1].data.storeList || res[1].data.cityStore //当前门店信息
          console.log('currentStoreInfo',currentStoreInfo)
          this.setCityName(currentStoreInfo.city) //设置城市名字
          this.setCurrentStoreInfo(currentStoreInfo) //设置当前门店相关信息
          this.setNearbyStoreList(nearbyStoreList)
          this.hidePageLoading()
        }     
      })
  
    }
  }
  
}
</script>

<style lang="scss">
page{
  width: 750rpx;
  box-sizing: border-box;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750rpx;
  box-sizing: border-box;
}
</style>