import UserModer from '@/model/user'
const userModel = new UserModer()

export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatDate (date, sep='-') {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${ [year, month, day].map(formatNumber).join(sep) }`
}

/**
 * @param {string} date 标准时间字符串 如：2019-12-12 00:00:00
 * @description 格式化开售时间
 * @return {string} 返回格式化后的时间格式字符串 12月12日 00:00
 */
export function formatSaleDate (date) {
  const formatDate = date.replace(/-/g, '/')
  const dateObj = new Date(formatDate)
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const hour = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours()
  const minute = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()
  console.log('formatSaleDate',`${month}月${day}日 ${hour}:${minute}`)
  return `${month}月${day}日 ${hour}:${minute}`
}

/**
 * @param {string} date 标准时间字符串 如：2019-12-12 00:00:00
 * @description 格式化提货时间
 * @return {string} 返回格式化后的时间格式字符串 12月12日 00:00
 */
export function formatPickUpDate (date) {
  const formatDate = date.replace(/-/g, '/')
  const dateObj = new Date(formatDate)
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const hour = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours()
  const minute = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()
  console.log('formatSaleDate',`${month}月${day}日 ${hour}:${minute}`)
  return `${month}月${day}日`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function chunk(list, size=2, fillValue) {
  let result = []

  if (!Array.isArray(list)) return result

  for (let i = 0; i < list.length; i+=size) {
    result.push(list.slice(i, i + size))
  }

  if (typeof fillValue !== 'undefined') {
    let last = result[result.length - 1]
    if (last) {
      Array.prototype.push.apply(last, new Array(size - last.length).fill(fillValue))
    }
  }

  return result
}

const EARTH_RADIUS = 6378137.0;    //单位M
const PI = Math.PI;

function getRad(d){
  return d * PI / 180.0
}

export function getFlatternDistance(lat1, lng1, lat2, lng2){
  let f = getRad((lat1 + lat2)/2);
  let g = getRad((lat1 - lat2)/2);
  let l = getRad((lng1 - lng2)/2);

  let sg = Math.sin(g);
  let sl = Math.sin(l);
  let sf = Math.sin(f);

  let s, c, w, r, d, h1, h2;
  let a = EARTH_RADIUS;
  let fl = 1/298.257;

  sg = sg*sg;
  sl = sl*sl;
  sf = sf*sf;

  s = sg*(1-sl) + (1-sf)*sl;
  c = (1-sg)*(1-sl) + sf*sl;

  w = Math.atan(Math.sqrt(s/c));
  r = Math.sqrt(s*c)/w;
  d = 2*w*a;
  h1 = (3*r -1)/2/c;
  h2 = (3*r +1)/2/s;

  return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
}

export function serialize(page) {
  let { route, options } = page
  let params = Object.keys(options).map(key => `${ key }=${ options[key] }`).join('&')
  return `/${ route }?${ params }`
}


/**
 * @description 跳转注册登录组件
 */
export async function resgiterOrLogin () {


  console.log('resgiterOrLogin')

  const userInfoIsScope = await userModel.checkUserInfoIsScope() //获取用户是否已经授权用户信息
  console.log('userInfoIsScope',userInfoIsScope)
  if(userInfoIsScope) {
    //如果用户已经授权直接跳转快捷登录组件页面
    wx.navigateTo({
      url: '/pages/mine/bind/main'
    })
  }else{
    //未授权跳转授权用户信息组件页面
    wx.navigateTo({
      url: '/pages/mine/auth/main'
    })

  }

}


export default {
  formatNumber,
  formatTime,
  chunk
}
