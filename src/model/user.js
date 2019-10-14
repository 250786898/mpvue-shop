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

}
export default UserModel