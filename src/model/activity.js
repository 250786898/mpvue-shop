import {Api,post,get} from '../http/api'
class ActivityModel {

  constructor () {
  }

  /**
   * @param {string || number} storeId
   * @param {string || number} activityId
   * @param {string || number} pageNumber
   * @description 根据活动查找商品
   */
  getActivityThemeById ({ storeId,activityId,pageNumber,pageSize }) {
    return get({
      url: '/timedActivity/findThemeGoods',
      data: {
        storeId,
        activityId,pageNumber,pageSize
      }
    })
  }




}
export default ActivityModel
