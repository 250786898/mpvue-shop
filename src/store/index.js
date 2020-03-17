import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  // 引入vuex-persistedstate，将vuex的数据持久化到本地
  // plugins: [
  //   createPersistedState({
  //     storage: {
  //       getItem: key => wx.getStorageSync(key),
  //       setCurrentStoreInfo: (key, value) => wx.setStorageSync(key, value),
  //       removeItem: key => {}
  //     }
  //   })
  // ]
})
