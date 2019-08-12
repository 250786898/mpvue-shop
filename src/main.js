import Vue from 'vue'
import App from './App'
import store from './store/index'

require('./styles/weui.css')
require('./styles/common.scss')
require('./styles/variable.scss')
require('./styles/mixin.scss')

var mta= require('./utils/mta_analysis')





Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.$bus = new Vue()

const sessionId = wx.getStorageSync('SESSION_ID')
const phoneNumber = wx.getStorageSync('PHONE_NUMBER')


// Do something initial when launch.
mta.App.init({
  "appID":"500683449",
  "autoReport": true,
  "statParam": true,
  "ignoreParams": [],
});



if (sessionId) {
  store.dispatch('login', sessionId)
  // store.commit('setSessionId', sessionId)
  if (phoneNumber) {
    store.commit('setWxPhoneNumber', phoneNumber)
  }
}

// @XXX: 无 sessionId 时尝试登录