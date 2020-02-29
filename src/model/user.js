import { post } from '@/http/api'

class UserModel {
  constructor () {

  }

  /**
   * @description 是否授权用户信息
   * @return {Promise}
   */
  checkUserInfoIsScope () {
   return new Promise ((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          if(res.authSetting['scope.userInfo']) {
            resolve(true)
          }else{
            resolve(false)
          }
        }
      })
    })
  }

  /**
   * @description 判断用户是否申请过团长
   */
  judgeIsApply(){
    return post ({
      url:"store/franchiseeApi/judgeIsApply",
      data:{}
    })
  }

}
export default UserModel
