import { get, post } from '../http/api'
class CouponModel {
  constructor () {

  }

  /**
   * @param {stirng} storeId 门店Id
   * @description 获取优惠券弹窗信息
   */
  getActivtiyPopupInfo ({ storeId }) {
    return get({
      url: '/couponAvtivity/activtiyPopup',
      data: { storeId }
    })
  }

  /**
   * @param {number} activityId 优惠券活动Id
   * @description 1.7.领取活动下的优惠券
   */
  receiveCouponByActivityId({ activityId }) {
    return post({
      url: '/couponAvtivity/receiveCouponByActivityId',
      data: { activityId }
    })
  }

  /**
   * @description 获取我的优惠券列表
   */
  getMineCouponList () {
    return get({
      url: '/coupon/list',
      data: { }
    })
  }

  /**
   * @param {number} systemCode 优惠券编码
   * @param {string} storeId 门店Id
   * @description 获取可使用商品
   */
  getApplyGoods({ systemCode, storeId }) {
    return get({
      url: '/coupon/applyGoods',
      data: { systemCode, storeId }
    })
  }

  /**
   * @param {number} systemCode 优惠券编码
   * @description 获取可使用商品
   */
  getApplyStore({ systemCode }) {
    return get({
      url: '/coupon/applyStore',
      data: { systemCode }
    })
  }

  /**
   * @param {number} systemCode 优惠券编码
   * @description 兑换、领取 优惠券
   */
  receiveCoupon({ systemCode }) {
    return post({
      url: '/coupon/receive',
      data: { systemCode }
    })
  }

  /**
   * @param {string || number} storeId  门店id
   * @description 获取购物车优惠券推荐商品列表
   */
  getCartCouponInfo({ storeId }) {
    return get({
      url: '/coupon/cartCouponList',
      data: { storeId }
    })
  }


}
export default CouponModel
