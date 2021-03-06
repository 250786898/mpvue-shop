import Vue from 'vue'
import { Api } from '../http/api'
import StoreModel from '@/model/store'
import CouponModel from '@/model/coupon'
import {resgiterOrLogin} from '../utils/index'

const couponModel = new CouponModel()
const storeModel = new StoreModel()

export default {

  login({ commit, dispatch }, payload) {
    console.log('login',payload)
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


  /**
   *
   * @description 更新购物车的数量
   */
  updateCartNum({ state, commit, dispatch }) {
    if(state.storeId) { //存在门店才更新购物车数量
      console.log('存在门店才更新购物车数量')
      Api.cart.count({
        storeId: state.storeId
      }).then(res => {
        if (res.code == Api.CODES.SUCCESS) {
          commit('setCartNum', res.data)
          dispatch('syncCartTabbarBadge')
        }
      })
    }

  },

  /**
   *
   * @param {object} state state对象
   * 为 购物车tabBar 某一项的右上角更新购物车数量
   */
  syncCartTabbarBadge({ state }) {
    console.log('syncCartTabbarBadge',state.cartNum)
    if (state.cartNum) {
      console.log('syncCartTabbarBadge2',state.cartNum.toString())
      wx.setTabBarBadge({
        index: 1,
        text: state.cartNum.toString()
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
        console.log('addToCart添加到购物车0')
        dispatch('updateCartNum')
        Vue.prototype.$bus.$emit('updateCart')
      } else if (res.code === 40001) {
        resgiterOrLogin()
      } else {
        wx.hideLoading()
        wx.showToast({
          title: res.message || '',
          icon: 'none'
        })
      }
      return res
    })
    .catch(e => {
      return Promise.reject(e)
    })
  },

   /**
     * @description 兑换领取优惠券
     */
  async exchangeOrFetchCoupon ({ state, commit, dispatch },exchangeCouponNO) {
    wx.showLoading({
      title: '领取中',
      mask: true
    })
    if(!exchangeCouponNO) {
      wx.showToast({
        title: '兑换码为空~', //提示的内容,
        icon: 'none' //图标,
      })
      return false
    }
    const res = await couponModel.receiveCoupon({
      systemCode: exchangeCouponNO
    })
    wx.hideLoading()
    console.log('exchangeOrFetchCoupon',res)
    return new Promise((resolve,reject) => {
      if(res.code == Api.CODES.SUCCESS) {
       resolve(res.data)
      }else{
        reject(res)
      }
    })
  },

  /**
   * @description 获取活动优惠券
   */
  async fetchActivityCoupon ({ state, commit, dispatch },activityIdOfCoupon) {
    wx.showLoading({
      title: '领取中',
      mask: true
    })
    const res = await couponModel.receiveCouponByActivityId({
      activityId : activityIdOfCoupon
    })
    wx.hideLoading()
    return new Promise((resolve,reject) => {
      if(res.code === Api.CODES.SUCCESS) {
        if(res.data === 200001) {
          wx.showToast({
            title: '恭喜你，抢到了!', //提示的内容,
            icon: 'none', //图标,
            duration: 1500, //延迟时间,
          })
          setTimeout(() => {
            //领取成功跳转我的优惠券
            resolve(200001) //领取成功后的操作
          },1500)
        }else if(res.data === 200002) {
          wx.showToast({
            title: '您来晚了，优惠券已被抢光~', //提示的内容,
            icon: 'none', //图标,
            duration: 1500, //延迟时间,
          })
          setTimeout(() => {
            //领取成功跳转我的优惠券
            resolve(200002) //领取成功后的操作
          },1500)
        }
      }else if (res.code === 40001) {
        console.log('跳转登录')
        resgiterOrLogin() //跳转登录
      }
    })

  }
}
