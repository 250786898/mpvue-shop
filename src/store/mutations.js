import * as types from './mutation-types'

export default {
  // @XXX: 可能需要改用 action 逆地址解析
  setLocationInfo(state, payload) {
    state.location = payload
  },

  setWxUserInfo(state, payload) {
    state.wxUserInfo = payload
  },

  setWxPhoneNumber(state, payload) {
    state.wxPhoneNumber = payload
    wx.setStorageSync('PHONE_NUMBER', payload)
  },

  setOpenId(state, payload) {
    state.openId = payload
  },

  setSessionId(state, payload) {
    state.sessionId = payload
    wx.setStorageSync('SESSION_ID', payload)
  },

  /**
   * @description 设置门店Id
   */
  setStoreId(state, payload) {
    state.storeId = payload
  },

  /**
   * @description 设置分享的门店ID
   */
  setShareStoreId(state, payload) {
    state.shareStoreId = payload
  },

  /**
   * @description 设置分享门店相关信息
   */
  setShareStoreInfo(state, payload) {
    state.shareStoreInfo = payload
  },

  /**
   * @description 设置经常访问门店相关信息
   */
  setUsuallyStoreInfo(state, payload) {
    state.usuallyStoreInfo = payload
  },


  /**
   * @description 设置门店相关信息
   */
  setCurrentStoreInfo(state,payload){
    state.shopDetail = payload
  },



  setPersonCenter(state, payload) {
    console.log('payload',payload)
    state.personCenter = payload
    console.log('state.personCenter ',state.personCenter )
  },

  // setAddressList(state, payload) {
  //   state.addressList = payload
  // },

  setCartNum(state, cartNum) {
    state.cartNum = cartNum
  },

  updateTempOrder(state, payload) {
    state.tempOrder = {
      ...state.tempOrder,
      ...payload
    }
  },

  setTempOrder(state, payload) {
    state.tempOrder = payload
  },

  clearTempOrder(state) {
    state.tempOrder = {}
  },

  setGradePrivilegeExplain(state, payload) {
    state.gradePrivilegeExplain = payload
  },

  /**
   * @description 设置当前选择城市
   */
  setcityname(state,payload){
    state.cityName=payload
  },

  /**
   * @description 设置当前用户定位城市
   */
  setLocateCity(state,payload){
    state.locateCity=payload
    wx.setStorageSync('locateCity', payload)
  },

  /**
   * @description 设置首页顶部栏高度
   */
  setIndexBarHeight (state,payload) {
    state.indexBarHeight = payload
  },

  /**
   * @description 设置首页时段活动距离顶部距离
   */
  setIndexGoodsTop (state,payload) {
    state.indexGoodsTop = payload
  },



  setRunTime(state,payload){
    state.runingtime = payload
  },

  pickuptime(state,payload){
    state.pickup=payload
  }
}
