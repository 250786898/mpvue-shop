export default {
  sessionId: '', //用户标识sessionId
  openId: '', ////用户标识openId
  personCenter: {}, // “我的”页面数据
  location: {}, //用户定位的相关信息
  wxUserInfo: {}, //微信用户信息
  wxPhoneNumber: '', //微信用户电话信息
  storeId: null, // 当前门店 ID null
  shopDetail:{},  //当前门店详细信息
  shareStoreId: null, // 从分享进来的门店 ID
  shareStoreInfo: {}, //分享的门店信息
  usuallyStoreInfo: {}, //经常访问的门店信息
  storeInfo: {},  //定位门店信息
  cartNum: 0, // 购物车数量
  cityName:'广州市', //选择的城市
  locateCity: '', //用户定位城市
  indexBarHeight: 0 , //首页顶部栏高度
  indexGoodsTop: 0, //首页时段活动距离顶部距离
  runingtime:0, //待支付倒计时时间
  pickup:'', //提货
  selectCouponOfsubmitOrder: {} //提交订单选择的优惠券
}
