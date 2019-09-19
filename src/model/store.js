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
}

export default StoreModel