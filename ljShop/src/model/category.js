import {Api,post} from '../http/api'
class CategoryModel {

  constructor () {
  }

  /**
   * @description 获取一级分类
   * @param {object} data 参数名
   */
  findPrimaryCategory(){
    return post({
      url:"goods/findAllClassOne"
    })
  }

  /**
   * @description 根据一级分类获取二级分类
   * @param {Object} 参数
   */
  findSecondaryCategory(data){
    return post({
      url:"goods/findClassByClassOne",
      data
    })
  }

  /**
   * @description 根据分类获取商品列表
   * @param {*} data 参数
   */
  findGoodsList(data){
    return post({
      url:"goods/findTimedGoodsByClass",
      data
    })
  }


}
export default CategoryModel
