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

  setStoreId(state, payload) {
    state.storeId = payload
  },

  setStoreInfo(state, payload) {
    state.storeInfo = payload
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
  setcityname(state,payload){
    state.cityName=payload
  },
  setItem(state,payload){
    state.shopDetail=payload
  },
  setRunTime(state,payload){
    state.runingtime = payload
  },
  pickuptime(state,payload){
    state.pickup=payload
  }
}