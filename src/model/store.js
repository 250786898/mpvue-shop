import { post } from '@/http/api'
class StoreModel {

  constructor () {
    this.latestKey = 'latestStoreId'
  }

  /**
   * @description 获取最新访问门店（未登录状态）
   */
  getLatestStoreOFNoLogin () {
    return wx.getStorageSync(this.latestKey)
  }

  /**
   * @param {number} latestStoreId 最新访问门店id
   * @description 保存最新访问门店（未登录状态）
   */
  saveLatestStoreOFNoLogin (latestStoreId) {
    wx.setStorage({
      key: this.latestKey,
      data: latestStoreId
    })
  }

  /**
   * @param {stirng} storeId 门店Id
   * @param {stirng} longitude 经度
   * @param {stirng} latitude 纬度
   * @description 根据门店id获取一个门店信息
   */
  getOneStoreInfoByStoreId({ storeId, longitude, latitude }) {
    return post({
      url: '/store/data/findOneStore',
      data: { storeId, longitude, latitude }
    })
  }

  /**
   * @param {stirng} longitude 经度
   * @param {stirng} latitude 纬度
   * @description 根据定位获取推荐十公里门店
   */
  getRecommendStoreByLocate ({ longitude, latitude }) {
    return post({
      url: '/store/data/recommend',
      data: { longitude, latitude }
    })
  }

  /**
   * @description 获取最新的经常访问门店Id
   */
  getLastestUsuallyStoreId() {
    return post({
      url: '/index/queryStoreByLastest',
      data: {}
    })
  }

  /**
   * @param {stirng} longitude 经度
   * @param {stirng} latitude 纬度 116.397451,
   * @description 核对门店是否无服务
   */
  checkStoreIsNoService ({ longitude, latitude }) {
    return post({
      url: '/store/data/findStore',
      data: {
        longitude,
        latitude
      }
    })
  }


}

export default StoreModel
