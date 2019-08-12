import Vue from 'vue'
import { Api } from '../http/api'

export default {
  login({ commit, dispatch }, payload) {
    commit('setSessionId', payload)
    dispatch('updateCartNum')
  },

  // 登出
  logout({ commit }) {
    wx.showLoading({
      title: '登出中',
      mask: true
    })
    Api.user.logout().then(res => {
      wx.hideLoading()
      if (res.code === Api.CODES.SUCCESS) {
        wx.showToast({
          title: res.message
        })
        wx.switchTab({
          url: '/pages/mine/main'
        })
        commit('setSessionId', '')
        commit('setWxPhoneNumber', '')
        commit('setPersonCenter', {})
        commit('setCartNum', 0)
        dispatch('syncCartTabbarBadge')
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
    .catch(e => wx.hideLoading())
  },

  updateCartNum({ commit, dispatch }) {
    Api.cart.count().then(res => {
      if (res.code == Api.CODES.SUCCESS) {
        commit('setCartNum', res.data)
        dispatch('syncCartTabbarBadge')
      }
    })
  },

  // 商品图标
  syncCartTabbarBadge({ state }) {
    if (state.cartNum) {
      wx.setTabBarBadge({
        index: 1,
        text: '' + state.cartNum
      })
    } else {
      wx.removeTabBarBadge({
        index: 1
      })
    }
  },

  // payload => { goodsId, activityId, activityType, count, storeId }
  addToCart({ state, dispatch }, payload) {
    wx.showLoading({
      title: '加购中',
      mask: true
    })

    return Api.cart.add({
      count: 1,
      storeId: state.storeId,
      ...payload
    })
    .then(res => {
      wx.hideLoading()
      if (res.code === Api.CODES.SUCCESS) {
        wx.showToast({ title: '添加成功' })
        dispatch('updateCartNum')
        Vue.prototype.$bus.$emit('updateCart')
      } else if (res.code === 40001) {
        wx.navigateTo({
          url: '/pages/mine/auth/main'
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
      return res
    })
    .catch(e => {
      wx.hideLoading()
      return Promise.reject(e)
    })
  },

  // 去拼团, 拼团, 秒杀
  addToActivity({ state, dispatch }, payload) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    return Api.cart.buyNow({
      count: 1,
      storeId: state.storeId || 1,
      ...payload
    })
    .then(res => {
      wx.hideLoading()
      if (res.code === Api.CODES.SUCCESS) {
        return Promise.resolve(res)
      } else if (res.code === 40001) {
        wx.navigateTo({
          url: '/pages/mine/auth/main'
        })
      } else {
    
        // wx.showToast({
        //   title: res.message,
        //   icon: 'none'
        // })
      }
      return res
    })
    .catch(e => {
      wx.hideLoading()
      return Promise.reject(e)
    })
  },

  // 单独购买
  addOneToCart({ state, dispatch }, payload) {
    wx.showLoading({
      title: '购买中',
      mask: true
    })

    return Api.cart.add({
      count: 1,
      storeId: state.storeId,
      ...payload
    })
    .then(res => {
      wx.hideLoading()
      if (res.code === Api.CODES.SUCCESS) {
        wx.navigateTo({
          url: `/pages/order/preview/main?cartIds=${res.data.cartOrderVoList[0].cartId}`
        })
      } else if (res.code === 40001) {
        wx.navigateTo({
          url: '/pages/mine/auth/main'
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
      return res
    })
    .catch(e => {
      wx.hideLoading()
      return Promise.reject(e)
    })
  },
}
