import Vue from 'vue'
import App from './App'
import store from './store/index'
import mixin from './utils/mixin'
import PageLoading from "@/components/PageLoading"

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


if (sessionId) {
  store.dispatch('login', sessionId)  //缓存存在sessionId已经登录过,存在sessionId直接登录`
  console.log('mainLogin')
  // store.commit('setSessionId', sessionId)
  if (phoneNumber) {
    store.commit('setWxPhoneNumber', phoneNumber) //缓存有电话号码设置电话号码到vuex
  }
}




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


