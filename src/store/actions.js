import Vue from 'vue'
import { Api } from '../http/api'
import StoreModel from '@/model/store'
import {resgiterOrLogin} from '../utils/index'

const storeModel = new StoreModel()

export default {

  login({ commit, dispatch }, payload) {
    commit('setSessionId', payload)
    // dispatch('setUsuallyStoreId')
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

  /**
   * @param {object} store 实例对象
   * @param {object} payload 门店对象相关信息对象
   * @description 确定或则切换门店
   */
  confirmOrSwitchStore({ commit, dispatch },payload) {
    const storeId = payload.storeId
    storeModel.saveLatestStoreOFNoLogin(storeId)
    return Api.index.saveSwitchHistory({
      storeId
    }).then(res => {
      if (res.code === Api.CODES.SUCCESS) {
        console.log('confirmOrSwitchStore',storeId)
        commit('setStoreId',storeId)
        dispatch('updateCartNum')
      }
    })
  },

  /**
   * @description 确定经常访问门店
   */
   setUsuallyStoreId({ commit },payload) {
    storeModel.getLastestUsuallyStoreId().then(res => {
      if (res.code === Api.CODES.SUCCESS) {
        console.log('vuex登录Action设置',res)
        const storeId = res.data.storeId
        if(storeId) {
          commit('setStoreId',res.data.storeId)
        }
      }
    })
  },


  updateCartNum({ state, commit, dispatch }) {
    Api.cart.count({
      storeId: state.storeId
    }).then(res => {
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
        resgiterOrLogin()
      } else {
        wx.hideLoading()
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
      return res
    })
    .catch(e => {
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
