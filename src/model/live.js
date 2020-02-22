import {Api,post} from '../http/api'
class LiveModel {
  constructor () {
  }

  getLiveList () {
    return post({
      url: '/getliveinfo?access_token=wx78ba77fefdec0ccc',
      data: {

      },
      options: {
        baseURL: 'http://api.weixin.qq.com/wxa/business'
      }
    })
  }
}

export default LiveModel
