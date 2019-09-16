import Vue from 'vue'
import App from './App'
import store from './store/index'
import mixin from './utils/mixin'
import { AMapWX } from "@/utils/amap-wx"

require('./styles/weui.css')
require('./styles/common.scss')
require('./styles/variable.scss')
require('./styles/mixin.scss')

var mta= require('./utils/mta_analysis')


//引入mixin
Vue.mixin(mixin)


Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.$bus = new Vue()

const sessionId = wx.getStorageSync('SESSION_ID')
const phoneNumber = wx.getStorageSync('PHONE_NUMBER')


// Do something initial when launch.
// mta.App.init({
//   "appID":"500683449",
//   "autoReport": true,
//   "statParam": true,
//   "ignoreParams": [],
// });



if (sessionId) {
  store.dispatch('login', sessionId)
  // store.commit('setSessionId', sessionId)
  if (phoneNumber) {
    store.commit('setWxPhoneNumber', phoneNumber)
  }
}


// let amap = new AMapWX({ key: '0928a875c2752ff132e36cfabb315fb0' })
// console.log('AMapWX')
// amap.getPoiAround({
//   success: res => { //用户成功授权
    
//     const locationInfo = res.markers[0] //当前用户定位定位相关信息
//     console.log('locationInfo',locationInfo)
//     store.commit("setLocationInfo",locationInfo)  //用户定位相关信息存到vuex
//   },
//   // 引导用户设置定位权限
//   fail: e => { //用户授权取消
//     if ( e.errMsg === "getLocation:fail auth deny" || "getLocation:fail:auth denied") {
//       wx.redirectTo({ url: "/pages/location/main" }) //重定向到定位授权页面
//     }
//   }
// })
