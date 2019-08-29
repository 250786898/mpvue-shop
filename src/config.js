//活动专题类型分类
const ACTIVITY_SUB_TYPE = {
  '1': '/pages/goodstheme/main?id=' ,
  '2': '/pages/goodstheme/main?id=' ,
  '4': '/pages/newcomepacks/main?id='
}
export default {
  OSS_URL: '/static/images',
  // apiURL: 'http://192.168.2.167:10002/api/',
  // apiURL: 'http://192.168.2.150:8092/api/',
  // apiURL: 'https://shop.freshlejia.com/apitest/api/',
  apiURL: 'https://shop.freshlejia.com/api/api/', //正式环境
  AMAP_KEY: '0928a875c2752ff132e36cfabb315fb0',
  // 允许访客身份返回的页面
  ALL_GUEST_PAGES: [
    "pages/index/main",
    "pages/index/selectaddress/main",
    "pages/index/searchgoods/main",
    "pages/cart/main",
    "pages/mine/main",
    "pages/location/main",
    "pages/topnews/list/main",
    "pages/topnews/detail/main",
    // "pages/newcomepacks/main",
    "pages/goodstheme/main",
    "pages/goods/index/main",
    "pages/goods/detail/main",
    "pages/rockpack/index/main",

    "pages/theme/manjian/main",
    "pages/theme/maisong/main",
    "pages/theme/miaosha/main",
    "pages/group/index/main",
    "pages/timelimit/index/main",
    "pages/mine/auth/main",
    "pages/mine/bind/main",
    "pages/mine/register/main",
    "pages/portal/main"
  ],
  
  //活动类型
  ACTIVITY_TYPE : {
    '10' : ['/pages/theme/miaosha/main?id='],
    '20' : ['/pages/theme/manjian/main?id='],
    '30' : ['/pages/group/index/main?id='],
    '40' : ACTIVITY_SUB_TYPE,
    '50': ['/pages/member/theme/main?id='],
    '80': ['/pages/bpshop/index/main?id='],
    '90': [''],
    '100': [''],
  }
}
