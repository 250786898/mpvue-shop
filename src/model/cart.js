import {Api,post} from '../http/api'
class CartModel {

  constructor () {
  }

  /**
   * @param {string || number} cartIds 购物车Id
   * @description 更新购物车选项
   */
  updateSelect ({ cartIds }) {
    return post({
      url: '/cart/updateSelect',
      data: {
        cartIds
      }
    })
  }




}
export default CartModel
