import Vue from 'vue'
import App from './App'
import store from './store/index'
import mixin from './mixin/common'
import PageLoading from "@/components/PageLoading"
import { checkUpdateApp, onNetworkStatusChange, onLoginStatus } from './utils'

require('./styles/weui.css')
require('./styles/common.scss')
require('./styles/variable.scss')
require('./styles/mixin.scss')

// wx.hideTabBar() //隐藏tab
checkUpdateApp()
onNetworkStatusChange()
onLoginStatus()

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









