import {Api,post} from '../http/api'
class GoodsModel {

  constructor () {
  }

  /**
   * @param {string || number} storeId
   * @description 根据门店查询参与活动
   */
  findActivityByStoreId ({ storeId }) {
    return post({
      url: '/timedActivity/findActivityByStoreId',
      data: {
        storeId
      }
    })
  }

  /**
   * @param {string || number} storeId
   * @param {string || number} activityId
   * @param {string || number} pageNumber
   * @description 根据活动查找商品
   */
  findGoodsByActivity ({ storeId, activityId, pageNumber }) {
    return post({
      url: '/timedActivity/findGoods',
      data: {
        storeId, activityId, pageNumber
      }
    })
  }



}
export default GoodsModel
