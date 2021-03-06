<template>
  <div class="container">
    <top-bg />
    <search-store :city-name="cityName" />
    <current-store
      :item="currentStoreInfo"
      v-if="( storeId ) && currentStoreInfo.storeName"
    />
    <current-location />
    <nearby-stores
      :store-list="nearbyStoreList"
      :last-router="lastRouter"
      :isCurrentLocateCity="isCurrentLocateCity"
    />
    <page-loading :show="showPageLoading" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api'
import TopBg from './components/TopBg/index'
import SearchStore from './components/SearchStore/index'
import CurrentStore from './components/CurrentStore/index'
import CurrentLocation from './components/CurrentLocation/index'
import NearbyStores from './components/NearbyStores/index'
import PageLoading from '@/components/PageLoading'

export default {
  components: {
    SearchStore,
    TopBg,
    CurrentStore,
    CurrentLocation,
    NearbyStores,
    PageLoading
  },
  data() {
    return {
      isCurrentLocateCity: false, //是否处于当前定位城市
      showPageLoading: true, //页面数据师傅显示
      currentStoreInfo: {}, //当前门店相关信息
      nearbyStoreList: [], //附近门店
      lastRouter: '' //上一个访问的路由名称
    }
  },
  computed: {
    ...mapState([
      'storeId',
      'location',
      'cityName',
      'locateCity',
      'shareStoreId'
    ])
  },
  watch: {
    location: function() {
      const pageList = getCurrentPages()
      const currentPage = pageList[pageList.length - 1].route
      if (currentPage == 'pages/store/select/main') {
        this.initLoadStoreData()
      }
    }
  },
  mounted(e) {
    const routerName = this.$mp.page ? this.$mp.page.options.router : ''
    this.setLastRouter(routerName)
    this.initLoadStoreData()
  },

  methods: {
    /**
     * @description 设置上一个访问的路由
     */
    setLastRouter(routerName) {
      this.lastRouter = routerName
    },

    /**
     * @description 获取当前门店信息Promise
     */
    getCurrentStorePromise() {
      const storeId = this.storeId ? this.storeId : this.shareStoreId
      return Api.index.findNowStore({
        storeId
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
        city: ''
        //  city: this.cityName
      })
    },

    /**
     * @param {string} cityName 城市名
     * @description 设置城市名字
     *  */
    setCityName(cityName) {
      if (!this.cityName) {
        this.$store.commit('setcityname', cityName) //第一次获取当前定位城市
      }
    },

    /**
     * @param {object} currentStoreInfo 当前城市相关信息
     * @description 设置当前城市
     *  */
    setCurrentStoreInfo(currentStoreInfo) {
      this.currentStoreInfo = currentStoreInfo
    },

    /**
     * @param {array} nearbyStoreList 附近门店列表
     * @description 设置附近门店
     *  */
    setNearbyStoreList(nearbyStoreList) {
      console.log('2', nearbyStoreList)
      console.log('isCurrentLocateCity', this.isCurrentLocateCity)
      switch (this.isCurrentLocateCity) {
        case true:
          //处于定位城市
          this.setNearbyStoreOfLocateCity(nearbyStoreList)
          break
        case false:
          this.nearbyStoreList = nearbyStoreList
          break
      }
    },

    /**
     * @description 处于定位当前城市，两种情况
     */
    setNearbyStoreOfLocateCity(nearbyStoreList) {
      let storeList = [] //过滤后返回的附近门店列表
      storeList = nearbyStoreList.filter(item => {
        return item.storeDistance && item.storeDistance <= 10
      })
      console.log('setNearbyStoreOfLocateCity', storeList)

      //判断是否存在3KM内的门店，存在显示3KM内的门店，3KM内没有门店显示全部门店
      if (storeList && storeList.length > 0) {
        this.nearbyStoreList = storeList
      } else {
        this.nearbyStoreList = nearbyStoreList
      }
    },

    /**
     * @description 隐藏页面加载状态
     */
    hidePageLoading() {
      this.showPageLoading = false
    },

    /**
     * @description 设置定位城市状态
     */
    setLocateCityStatus() {
      console.log('this.cityName', this.cityName)
      const locateCity = this.locateCity
        ? this.locateCity
        : wx.getStorageSync('locateCity') //vuex中不存在从缓存中读取
      console.log('currentLocateCity', locateCity)

      if (locateCity == this.cityName) {
        //判断当前选择的城市是定位城市
        this.isCurrentLocateCity = true
      } else {
        this.isCurrentLocateCity = false
      }
    },

    /**
     * @description 初始化加载门店相关数据
     */
    initLoadStoreData() {
      Promise.all([
        this.getCurrentStorePromise(),
        this.getStoreListPromise()
      ]).then(res => {
        if (
          res[0].code == Api.CODES.SUCCESS &&
          res[0].code == Api.CODES.SUCCESS
        ) {
          //两个都请求成功
          this.hidePageLoading()

          const currentStoreInfo = res[0].data.shopStore //当前门店信息
          console.log('currentStoreInfo', currentStoreInfo)

          if (currentStoreInfo) {
            this.setCurrentStoreInfo(currentStoreInfo) //设置当前门店相关信息
          }

          this.setLocateCityStatus() //设置定位城市状态

          const nearbyStoreList = res[1].data.storeList || res[1].data.cityStore //当前门店信息

          if (nearbyStoreList) {
            this.setNearbyStoreList(nearbyStoreList) //设置附近门店
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
page {
  width: 750rpx;
  box-sizing: border-box;
  background: #f5f5f5;
  padding-bottom: 138rpx;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750rpx;
  box-sizing: border-box;
  background: #f5f5f5;
}
</style>
