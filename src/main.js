import Vue from 'vue'
import App from './App'
import store from './store/index'
import mixin from './utils/mixin'
import config from "@/config"
import PageLoading from "@/components/PageLoading"
import { AMapWX } from "@/utils/amap-wx"

require('./styles/weui.css')
require('./styles/common.scss')
require('./styles/variable.scss')
require('./styles/mixin.scss')

var mta= require('./utils/mta_analysis')

wx.hideTabBar()

//引入mixin
Vue.mixin(mixin)

//全局注册组件
Vue.component('page-loading',PageLoading)


Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'





const app = new Vue(App)
app.$mount()

Vue.prototype.$bus = new Vue()

const sessionId = wx.getStorageSync('SESSION_ID')
const phoneNumber = wx.getStorageSync('PHONE_NUMBER')


// Do something initial when launch. 第三方数据统计
// mta.App.init({
//   "appID":"500683449",
//   "autoReport": true,
//   "statParam": true,
//   "ignoreParams": [],
// });



if (sessionId) {
  store.dispatch('login', sessionId)  //缓存存在sessionId已经登录过,存在sessionId直接登录`
  console.log('mainLogin')
  // store.commit('setSessionId', sessionId)
  if (phoneNumber) {
    store.commit('setWxPhoneNumber', phoneNumber) //缓存有电话号码设置电话号码到vuex
  }
}


//用户进入程序的时候刷新自己的相关定位信息
// let amap = new AMapWX({ key: config.AMAP_KEY })
// console.log('AMapWX1')
// amap.getPoiAround({
//   success: res => { //用户成功授权
//     console.log('AMapWX1success',res)
//     const locationInfo = res.markers[0] //当前用户定位定位相关信息
//     const cityName = res.poisData[0].cityname //用户定位当前城市
//     console.log('程序进来定位',locationInfo)
//     store.commit("setcityname",cityName)
//     store.commit("setLocateCity",cityName)
//     store.commit("setLocationInfo",locationInfo)  //用户定位相关信息存到vuex
//   },
//   fail: info => {
//     console.log('AMapWX1fail',info)
//   }
// })


//监听忘了改变,如果没有网络情况跳转网络异常页面
wx.onNetworkStatusChange(function (res) {
  console.log('onNetworkStatusChange1',res.isConnected)
  console.log('onNetworkStatusChange2',res.networkType)
  if(res.networkType == 'none'){
    wx.redirectTo({
      url: '/pages/network/exceptions/main'
   })
  }
})


