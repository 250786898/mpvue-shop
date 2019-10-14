import Fly from 'flyio/dist/npm/wx'
import qs from 'qs'
import config from '../config'
import store from '../store/index'
import md5 from 'js-md5/src/md5'
import {resgiterOrLogin} from '../utils/index'

const fly = new Fly

const { apiURL, appKey, appid } = config;

const objKeySort = function (obj) {//排序的函数
  var newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {};//创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj;//返回排好序的新对象
}



// fly.config.timeout = 20000
fly.config.baseURL = apiURL

fly.interceptors.request.use(req => {
  if(!req.body){
    req.body = {}
  }
  //产生随机数
  var param = objKeySort(req.body)

  var seriaJson = encodeURIComponent(qs.stringify(param))

  var apiSign = md5(md5(seriaJson) + "avEaVVnXE3RYUFAusgi5KHlzYORqlUKg")
  param.apiSign = apiSign;

  req.headers.sessionId = store.state.sessionId
  req.body = qs.stringify(Object.assign(param, {apiSign:param.apiSign}))
  return req
})

let redirectLock = false
fly.interceptors.response.use(res => {
  if (res.data.code === 40001) {
    let pages = getCurrentPages()
    let current = pages[pages.length - 1]

    console.log('40001')
    if (config.ALL_GUEST_PAGES.indexOf(current.route) === -1) {
      if (redirectLock) return
      redirectLock = true

      console.log('resgiterOrLogin40001')

      resgiterOrLogin()
      redirectLock = false
      // wx.reLaunch({
      //   url: '/pages/mine/auth/main',
      //   complete: () => redirectLock = false
      // });


    }
  }
  return res.data
},
  err => {
    console.log('err',err)
        wx.getNetworkType({
          success: function(res) {
            console.log('netword',res)
            if(res.networkType == 'none'){
              wx.redirectTo({
                url: '/pages/network/exceptions/main'
              })
            }else{
              //一般为服务器API出现出错情况
              // wx.showToast({
              //   title: '我们出现了个错误',
              //   icon: 'none'
              // })
            }

          }
        })

  }
)

export const get = (params) => {
  return fly.get(`${ params.url }`, qs.stringify(params.data))
}

// 通用的post请求
export const post = (params) => {
  return fly.post(`${ params.url }`,params.data)
}

export const DELIVERY_TYPE = {
  DELIVERY: 1,
  PICKUP: 2
}

/**
  订单状态：
  0:  已取消;
  10: 待付款;
  20: 待发货+待拣货;
  21: 待物流提货+待核销;
  30: 待收货+配送中;
  40: 交易完成;
  49: 已评价
  50: 已关闭;
  59: 售后中;
  60: 已售后;
  31：待提货（新增）

  后台
  订单状态：0:已取消;5待审核;10:待付款;20:待发货;30:待收货;40:交易完成;50:已提交;60:已确认;


*/
export const ORDER_STATE = {
  CANCELED: 0,
  UNPAID: 10,
  UNDELIVERY: 20,
  UNRECEIVED: 30,
  FINISHED: 40,
  UNVERIFICATION: 50,
  RETURNS: 60 ,
  POHYD:31
}

export const ORDER_STATE_TEXT = {
  [ORDER_STATE.CANCELED]: '订单关闭',
  [ORDER_STATE.UNPAID]: '待付款',
  [ORDER_STATE.UNDELIVERY]: '待配送',
  [ORDER_STATE.UNRECEIVED]: '待收货',
  [ORDER_STATE.FINISHED]: '交易成功',
  [ORDER_STATE.UNVERIFICATION]: '待核销',
  [ORDER_STATE.RETURNS]: '退货/售后',
  [ORDER_STATE.POHYD]: '待提货',
}

export const UPLOAD_URL = `${ apiURL }common/upload`

export const Api = {
  CODES: {
    SUCCESS: 1,
    FAILED: 0,
    UNVALID_PARAMS: 10003,
    SESSION_ERROR: 40001 // 未登录
  },

  // 通用
  common: {
    // 3.1. 发送短信验证码
    msg({ mobile }) {
      return post({
        url: '/common/msg',
        data: { mobile }
      })
    },

    // 3.2.  文件上传
    // @DEBUG:
    upload({ files }) {
      return fly.post('/common/upload', {
        files
      })
    }
  },

  auths: {
    // 4.1. 微信用户openId
    weixinOpenId(code) {
      return post({
        url: '/auths/weixinOpenId',
        data: { code }
      })
    },

    // 4.2. 微信用户信息
    weixinUserInfo({ code, encryptedData, iv }) {
      return post({
        url: '/auths/weixinUserInfo',
        data: { code, encryptedData, iv }
      })
    },

    // 4.3. 微信授权登录
    loginByWechat({ mobile, openid, nickname, avatar }) {
      return post({
        url: '/auths/loginByWechat',
        data: { mobile, openid, nickname, avatar }
      })
    },

    // 4.4. 校验用户是否存在
    checkAccount({ mobile, openid }) {
      return post({
        url: '/auths/checkAccount',
        data: { mobile, openid }
      })
    },

    // 4.5. 登录/注册
    registerOrLogin({ mobile, openid, code, nickname, avatar, truename, sex, birthday, address }) {
      return post({
        url: '/auths/registerOrLogin',
        data: { mobile, openid, code, nickname, avatar, truename, sex, birthday, address }
      })
    }
  },

  index: {

    // 5.1. 判断是否在配送范围内
    isDeliveryScope({ longitude, latitude, city }) {
      return post({
        url: '/index/isDeliveryScope',
        data: { longitude, latitude, city }
      })
    },

    // 5.2. 获取首页数据-不在配送范围内
    getDataOutScope({ longitude, latitude }) {
      return post({
        url: '/index/getDataOutScope',
        data: { longitude, latitude }
      })
    },

    // 5.3. 开通服务城市列表
    // 未使用
    getServiceCity() {
      return post({
        url: '/index/getServiceCity'
      })
    },

    // 5.4. 头条列表
    articleList({ acId, pageNumber, pageSize }) {
      return post({
        url: '/index/articleList',
        data: { acId, pageNumber, pageSize }
      })
    },

    // 5.5. 头条详情
    articleDetail({ articleId, storeId }) {
      return post({
        url: '/index/articleDetail',
        data: { articleId, storeId }
      })
    },

    // 5.6. 头条点赞/取消点赞
    spotOrCancel({ articleId }) {
      return post({
        url: '/index/spotOrCancel',
        data: { articleId }
      })
    },

    // 5.7. 首页数据
    getIndexData({ storeId }) {
      return post({
        url: '/index/getIndexData',
        data: { storeId }
      })
    },

    // 猜你喜欢
    likeGoods({ storeId, pageNumber, pageSize }) {
      return post({
        url: '/index/likeGoods',
        data: { storeId, pageNumber, pageSize }
      })
    },

    // 5.8. 首页-为你推荐
    topGoods({ storeId, pageNumber, pageSize }) {
      return post({
        url: '/index/topGoods',
        data: { storeId, pageNumber, pageSize }
      })
    },


    // 5.9. 门店列表-自提订单切换店铺//门店定位列表 city:城市名
    storeList({ longitude, latitude , activityId, city}) {
      return post({
        url: '/index/storeList',
        data: { longitude, latitude , activityId, city }
      })
    },

    // 6.0  当前门店信息
    findNowStore({ storeId }) {
      return post({
        url: '/index/findNowStore',
        data: { storeId }
      })
    },




    // 传id获取首页商品信息
    storeGoodsListByshopId({storeId}) {
      return post({
        url: '/index/storeGoodsListByshopId',
        data: {storeId}
      })
    },


    /**
     * @param {string} city 分类的城市
     * @param {string} storeNameLike 搜索关键字
     * @description 搜索门店
     */
    queryByRegin({ city, storeNameLike }) {
      return post({
        url: '/index/queryByRegin',
        data: { city, storeNameLike }
      })
    },

    /**
     * @param {number} storeId 门店id
     * @description 门店切换历史新增和更新
     */
    saveSwitchHistory({ storeId }) {
      return post({
        url: '/index/saveSwitchHistory',
        data: { storeId }
      })
    },

     /**
     * @description 门店切换历史门店
     */
    queryStoreByLastest() {
      return post({
        url: '/index/queryStoreByLastest',
        data: {}
      })
    }

  },

  goods: {
    // 6.1. 搜索热词
    searchHotKey({ storeId }) {
      return post({
        url: '/goods/searchHotKey',
        data: { storeId }
      })
    },

    // 6.2. 商品搜索推荐词
    goodsSearchKey({ storeId, keyword }) {
      return post({
        url: '/goods/goodsSearchKey',
        data: { storeId, keyword }
      })
    },

    // 6.3. 商品搜索
    goodsSearch({ storeId, keyword, pageNumber, pageSize }) {
      return post({
        url: '/goods/goodsSearch',
        data: { storeId, keyword, pageNumber, pageSize }
      })
    },

    // 6.4. 商品详情
    goodsDetail(data) {
      return post({
        url: '/goods/goodsDetail',
        data
      })
    },

    // 6.5. 商品分类
    // pcId 一级分类ID
    // gcId 二级分类ID
    goodsClassList({ storeId, keyword, pcId, gcId, pageNumber, pageSize }) {
      return post({
        url: '/goods/goodsClassList',
        data: { storeId, keyword, pcId, gcId, pageNumber, pageSize }
      })
    },

    evaluate({ orderId, pageNumber }) {
      return post({
        url: '/goods/evaluate',
        data: { orderId, pageNumber }
      })
    },

  },

  user: {
    //添加formId用于推送模板
    addFormId ({ formId }) {
      return post({
        url:'user/addFormId',
        data:{
          formId
        }
      })
    },
    // 8.1. 我的
    personCenter() {
      return post({
        url: '/user/personCenter'
      })
    },

    // 8.2. 会员基本信息
    profile() {
      return post({
        url: '/user/profile'
      })
    },

    // 8.3. 更新会员基本信息
    updateProfile({ truename, mobile, sex, birthday, education, maritalStatus }) {
      return post({
        url: '/user/updateProfile',
        data: { truename, mobile, sex, birthday, education, maritalStatus }
      })
    },

    // 8.6. 会员码
    userCode() {
      return post({
        url: '/user/userCode'
      })
    },

    // 8.7. 刷新付款码
    refreshPayCode() {
      return post({
        url: '/user/refreshPayCode'
      })
    },

    // 8.8. 验证是否设置支付密码
    checkSetPayPwd() {
      return post({
        url: '/user/checkSetPayPwd'
      })
    },

    // 8.9. 发送验证码-设置支付密码
    sendCode({ mobile }) {
      return post({
        url: '/user/sendCode',
        data: { mobile }
      })
    },

    // 8.10. 验证验证码-设置支付密码
    validCode({ code }) {
      return post({
        url: '/user/validCode',
        data: { code }
      })
    },

    // 8.11. 设置支付密码及安全问题
    setPayPwd({ password, checkPassword, question, answer }) {
      return post({
        url: '/user/setPayPwd',
        data: { password, checkPassword, question, answer }
      })
    },

    // 8.12. 验证原密码
    validOldPassword({ oldPassword }) {
      return post({
        url: '/user/validOldPassword',
        data: { oldPassword }
      })
    },

    // 8.13. 修改支付密码
    modifyPayPwd({  newPassword, checkNewPassword }) {
      return post({
        url: '/user/modifyPayPwd',
        data: { newPassword, checkNewPassword }
      })
    },

    // 8.14. 获取安全问题-已设置支付密码
    getSafeQuestion() {
      return post({
        url: '/user/getSafeQuestion'
      })
    },

    // 8.15. 验证答案
    validAnswer({ answer }) {
      return post({
        url: '/user/validAnswer',
        data: { answer }
      })
    },

    // 8.16. 登出
    logout() {
      return post({
        url: '/user/logout'
      })
    },

    // 8.17. 会员卡储值套餐
    rechargeMenu() {
      return post({
        url: '/user/rechargeMenu'
      })
    },

    // 8.18. 会员卡储值
    cardRecharge({ menuId, storeId }) {
      return post({
        url: '/user/cardRecharge',
        data: { menuId, storeId }
      })
    },

    // 8.19. VIP充值套餐
    vipMenu() {
      return post({
        url: '/user/vipMenu'
      })
    },

    // 8.20. VIP充值
    vipRecharge({ menuId }) {
      return post({
        url: '/user/vipRecharge',
        data: { menuId }
      })
    },

    // 8.21. 消费明细
    cardConsumeDetail({ pageNumber, pageSize }) {
      return post({
        url: '/user/cardConsumeDetail',
        data: { pageNumber, pageSize }
      })

    },

    // 积分明细 1-积分明细列表 2-兑换明细列表
    pointsDetail({ listType=1, pageNumber, pageSize }) {
      return post({
        url: '/user/pointsDetail',
        data: { listType, pageNumber, pageSize }
      })
    },

    //特权
    vipPrivilege ({ storeId ,pageNumber }) {
      return post({
        url: 'user/vipPrivilege',
        data: {
          storeId ,
          pageNumber
        }
      })
    },

    // 我的团购列表
    myGroupOrder({ pageNumber, groupType }) {
      return post({
        url: '/user/myGroupOrder.json',
        data: { pageNumber, groupType }
      })
    },

  },

  address: {
    // 9.1. 货地址列表
    addressList() {
      return post({
        url: '/address/addressList'
      })
    },

    // 9.2. 保存或更新收货地址
    saveOrUpdateAddress({ addressId, longitude, latitude, userName, sex, phone, areaInfo, address, label, provinceId, cityId, areaId }) {
      return post({
        url: '/address/saveOrUpdateAddress',
        data: { addressId, longitude, latitude, userName, sex, phone, areaInfo, address, label, provinceId, cityId, areaId }
      })
    },

    // 9.3. 设置默认收货地址
    setDefaultAddress({ addressId }) {
      return post({
        url: '/address/setDefaultAddress',
        data: { addressId }
      })
    },

    // 9.4. 收货地址详情
    addressDetail({ addressId }) {
      return post({
        url: '/address/addressDetail',
        data: { addressId }
      })
    },

    // 9.5. 删除收货地址
    deleteAddress({ addressId }) {
      return post({
        url: '/address/deleteAddress',
        data: { addressId }
      })
    },

    //9.6 领取优惠券
    getCoupon({ activityId,formId }) {
      return post({
        url: '/coupon/getCoupon',
        data: { activityId,formId }
      })
    }
  },

  coupon: {
    // 10.1. 我的优惠券
    // listType 1-未使用 2-已使用 3-已过期
    myCouponList({ listType = 1, pageNumber, pageSize }) {
      return post({
        url: '/coupon/myCouponList',
        data: { listType, pageNumber, pageSize }
      })
    },

    // 10.2. 删除优惠券
    deleteCoupon({ couponId }) {
      return post({
        url: '/coupon/deleteCoupon',
        data: { couponId }
      })
    },

    // 10.3. 优惠券限制商品
    couponLimitGoods({ couponId, storeId, keyword, pcId, pageNumber, pageSize }) {
      return post({
        url: '/coupon/couponLimitGoods',
        data: { couponId, storeId, keyword, pcId, pageNumber, pageSize }
      })
    },

    // 10.4. 优惠券限制门店
    couponLimitStore({ couponId, longitude, latitude }) {
      return post({
        url: '/coupon/couponLimitStore',
        data: { couponId, longitude, latitude }
      })
    },

    // 10.5. 线下核销码
    couponUseCode({ couponId, storeId }) {
      return post({
        url: '/coupon/couponUseCode',
        data: { couponId, storeId }
      })
    }
  },

  cart: {
    // 11.1. 购物车列表
    cartList({ storeId, carts }) {
      return post({
        url: '/cart/cartList',
        data: { storeId, carts, cartIds: carts }
      })
    },

    /**
     * 11.2.
     * @param cartIds 购物车id，多个以逗号拼接
     * @description 删除购物车
     */
    remove({ cartIds }) {
      return post({
        url: '/cart/remove',
        data: { cartIds }
      })
    },

    // 11.3. 更新购物车
    update({ cartId, num, storeId }) {
      return post({
        url: '/cart/update',
        data: { cartId, num, storeId }
      })
    },

    // 11.4. 购物车商品数量
    count() {
      return post({
        url: '/cart/count'
      })
    },

    // 11.5. 加入购物车
    add({ goodsId, activityId, activityType, count, storeId ,activityGoodsId }) {
      return post({
        url: '/cart/add',
        data: { goodsId, activityId, activityType, count, storeId ,activityGoodsId}
      })
    },

    // 11.6. 购物车结算页
    checkout({ cartIds, storeId, deliveryType, couponIds }) {
      return post({
        url: '/cart/checkout',
        data: { cartIds, storeId, deliveryType, couponIds }
      })
    },

    // 获取配送时间
    times({ storeId,activityGoodsId }) {
      return post({
        url: '/cart/times',
        data: { storeId, activityGoodsId }
      })
    },

    getCoupons ( { storeId,goodsAmountJson }) {
      return post({
        url: '/cart/getCoupons',
        data: {
          storeId,
          goodsAmountJson
        }
      })
    },

    // 去拼团,拼团,秒杀
    buyNow ( { goodsId,activityId,activityType,count,storeId,groupOrderId,activityGoodsId ,deliveryType }) {
      return post({
        url: '/cart/buyNow.json',
        data: {
          goodsId,
          activityId,
          activityType,
          count,
          storeId,
          groupOrderId,
          activityGoodsId,
          deliveryType
        }
      })
    },
  },

  order: {

    // 提货码调用
    findOrderStat({ orderId }) {
      return post({
        url: '/order/findOrderStat',
        data: { orderId }
      })
    },

    // 订单列表
    list({ pageSize, pageNumber, orderStatus, deliveryType}) {
      return post({
        url: '/order/list',
        data: { pageSize, pageNumber, orderStatus }
      })
    },

    // 提交订单
    submit({
      showPickUpTime,
      formId,
      cartIds,
      orderMessages,
      addressId,
      couponIds,
      // 是否使用积分
      isPp,
      deliveryType,
      deliveryStartTime,
      deliveryEndTime,
      // weixinAppletPaymentPlugin 微信
      // balancePaymentPlugin 会员卡
      paymentCode='weixinAppletPaymentPlugin',
      storeId,
      activityGoodsId,
      goodsId,
      count,
      groupBuyActivityId,
      groupOrderId,
    }) {
      return post({
        url: '/order/submit',
        data: {
          showPickUpTime,
          formId,
          cartIds,
          orderMessages,
          addressId,
          couponIds,
          isPp,
          deliveryType,
          paymentCode,
          storeId,
          activityGoodsId,
          count,
          groupBuyActivityId,
          groupOrderId,
          goodsId,
        }
      })
    },

    // 订单详情
    detail({ orderId }) {
      return post({
        url: '/order/detail',
        data: { orderId }
      })
    },

    // 取消订单
    cancel({ orderId }) {
      return post({
        url: '/order/cancel',
        data: { orderId }
      })
    },

    // 删除订单
    del({ orderId }) {
      return post({
        url: '/order/delete',
        data: { orderId }
      })
    },

    delivery: {
      // 订单提醒发货
      remind({ orderId }) {
        return post({
          url: '/order/delivery/remind',
          data: { orderId }
        })
      },
    },

    refundReturn: {
      // 售后详情
      forward({ orderGoodsId }) {
        return post({
          url: '/order/refundReturn/forward',
          data: { orderGoodsId }
        })
      }
    },

    // 收货确认
    finish({ orderId }) {
      return post({
        url: '/order/finish',
        data: { orderId }
      })
    },

    // 订单支付
    // paymentPasswd 使用会员卡支付时需要
    pay({ paySn, paymentCode, paymentId, paymentPasswd }) {
      return post({
        url: '/order/pay',
        data: { paySn, paymentCode, paymentId, paymentPasswd }
      })
    },

    // 订单评价
    evaluation({ orderId }) {
      return post({
        url: '/order/evaluation',
        data: { orderId }
      })
    },

    // 订单提货码
    orderPickUpCode({ orderId }) {
      return post({
        url: '/order/orderPickUpCode',
        data: { orderId }
      })
    },

    // 订单进度
    log({ orderId }) {
      return post({
        url: '/order/log',
        data: { orderId }
      })
    }
  },

  // 订单评价
  evaluate: {
    // 提交评价
    save({ orderId, img, goodsScore, storeScores, logisticsScores, comment }) {
      return post({
        url: '/evaluate/save',
        data: { orderId, img, goodsScore, storeScores, logisticsScores, comment }
      })
    },

    // 回复
    reply({ orderId, comment }) {
      return post({
        url: '/evaluate/reply',
        data: { orderId, comment }
      })
    }
  },

  // 退货
  refund: {
    // 提交售后申请
    applyReturn({ orderId, refundReason, goodsImageMore, address, addressId, goodsJson }) {
      return post({
        url: '/refund/applyReturn',
        data: { orderId, refundReason, goodsImageMore, address, addressId, goodsJson }
      })
    },

    // 获取售后原因列表
    reason() {
      return post({
        url: '/refund/reason'
      })
    },

    // 售后记录
    // state 0为待审核,1审核确认,2为同意,3为不同意, 4为退款完成 5-已取消 默认为0
    list({ pageNumber }) {
      return post({
        url: '/refund/list',
        data: { pageNumber }
      })
    },

    // 售后详情
    detail({ id }) {
      return post({
        url: '/refund/detail',
        data: { id }
      })
    },

    // 售后删除
    del({ id }) {
      return post({
        url: '/refund/delete',
        data: { id }
      })
    },

    // 售后取消
    cancel({ id }) {
      return post({
        url: '/refund/cancel',
        data: { id }
      })
    },

    // 售后协商记录
    listConsult({ id, pageNumber }) {
      return post({
        url: '/refund/listConsult',
        data: { id, pageNumber }
      })
    },

    // 添加协商记录
    addConsult({ id, content }) {
      return post({
        url: '/refund/addConsult',
        data: { id, content }
      })
    }
  },

  //14.活动API
  activity: {


    //14.1 添加提醒
    addRemindMsg({ formId, activityId, goodsId, activityGoodsId}) {
      return post({
        url: '/remindMsg/addRemindMsg.json',
        data: { formId, activityId, goodsId , activityGoodsId}
      })
    },

    //14.2 删除提醒
    cancelRemindMsg({ formId,id }) {
      return post({
        url: '/remindMsg/cancelRemindMsg.json',
        data: { formId,id }
      })
    },

    //14.3 活动商品列表
    /**
      activityType:
        xianshiqiang("xianshiqiang", "限时抢购", 10),
        manjiansong("manjiansong", "满减送", 20),
        tuangou("tuangou", "拼团活动", 30),
        activitySubject("activitySubject", "活动专题", 40),
        memberSubject("memberSubject", "会员活动专题", 50),
        coupon("coupon", "优惠券", 70),
        pointShop("pointShop", "积分商城", 80),
        payReward("payReward", "支付有礼", 90),
        invitation("invitation", "邀请有礼", 100);
      activityStatus:
        未开始 10
        已开始 20
        已结束 30
    */
    activityGoodsList({ pageNumber, storeId, activityId }) {
      return post({
        url: '/index/activityGoodsList.json',
        data: { pageNumber, storeId, activityId }
      })
    },

    //14.4 新人专享
    fresh({ activityId, storeId }) {
      return post({
        url: '/index/fresh.json',
        data: { activityId, storeId }
      })
    },

    //14.4 新人专享优惠券商品列表
    couponGoods({ activityId, storeId, pageNumber }) {
      return post({
        url: '/activity/couponGoods.json',
        data: { activityId, storeId, pageNumber }
      })
    },

    /**
     * 总换码
     */
    exchangeVipCard ({ cardNo }) {
      return post({
        url: '/shopActivity/exchangeVipCard',
        data: { cardNo }
      })
    },

    //我的团购详情
    groupOrderDetail({ groupOrderId, orderId }) {
      return post({
        url: '/shopActivity/groupOrderDetail.json',
        data: { groupOrderId, orderId }
      })
    },
  },

  // 免单
  freeOrder: {
    // 摇一摇中奖支付有礼
    getPayAward({ orderId, activityId }) {
      return post({
        url: '/shopActivity/payAward.json',
        data: { orderId, activityId }
      })
    },
    // 获取进行中的支付有礼
    hasPayAward({ orderId }) {
      return post({
        url: '/shopActivity/hasPayAward.json',
        data: { orderId }
      })
    },
    // 获取分享出来的支付有礼详情
    getPayShare({ activityId, shareMember }) {
      return post({
        url: '/shopActivity/payAwardShare.json',
        data: { activityId, shareMember }
      })
    },
  }
}
