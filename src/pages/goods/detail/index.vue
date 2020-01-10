<template>
  <div v-if="goodsDetailInfo">
    <!-- fixed-top -->
    <FixedTop
      :current-price="goodsDetailInfo.onlinePrice"
      :goodsBanner="goodsDetailInfo.goodsBanner"
    />

    <!-- Swiper -->
    <DetailSwiper :bannerList="goodsDetailInfo.goodsBanner" :videoSrc="goodsDetailInfo.video" />

    <!-- 商品信息bar -->
    <goods-info
      :current-price="goodsDetailInfo.onlinePrice"
      :original-price="goodsDetailInfo.onlineScribingPrice"
      :end-time="endTime"
      :start-time="startTime"
      :is-sale="goodsDetailInfo.isSale"
      :saleNum="goodsDetailInfo.salesNum"
      :virtualSalesNum="goodsDetailInfo.virtualSalesNum"
    />

    <!-- 商品相关描述（名称） -->
    <goods-desc
      :goods-name="goodsDetailInfo.goodsName"
      :goods-desc="goodsDetailInfo.goodsSellDesc"
    />

    <!-- Type start: 提货时间 -->
    <!-- <pickup-timer  :pickup-time="goodsDetailInfo.pickUpTime"  /> -->

    <!-- Type end; -->

    <!--  -->
    <div style="margin-top:20rpx;">
      <!-- 限购 -->
      <limit-purchase
        v-if="goodsDetailInfo.activityLimitNum"
        :num="goodsDetailInfo.activityLimitNum"
      />
      <!-- 优惠券 -->
      <CouponBar
        :list="couponList"
        @fetchCoupon="fetchCoupon"
        v-if="couponList && couponList.length"
      />
    </div>

    <!-- 商品推荐 -->
    <GoodsRecommend :commendGoodsList="commendGoodsList" />

    <!-- 商品详情 -->
    <goods-detail :detail-info="goodsDetailInfo.mobileBody" />

    <!-- 底部栏 -->
    <bottom-bar
      :goods-id="goodsDetailInfo.goodsId"
      :activityStock="goodsDetailInfo.activityStock"
      :activityId="goodsDetailInfo.activityId"
    />

    <!-- 活动结束弹窗 -->
    <ActivityEndPopup :show="popupShow" />

    <!-- 活动结束弹窗 -->
    <RestStorePopup :show="isShowRestStorePopup" />

    <SelectStoreDialog :show="showSelectStoreDialog" @comfirmStore="comfirmStore" />

    <ComfirmStoreDialog :show="showComfirmStoreDialog" @comfirmStore="comfirmStore" />

    <!-- <canvas
      canvas-id="shareCanvas"
      style="width:200px;height:180px;position:fixed;top:30%;left:0%;opacity:0;position:fixed;top:999999999999999999999rpx;"
    ></canvas> -->

    <page-loading :show="showPageLoading" />
  </div>
</template>

<script>
import { Api, UPLOAD_URL } from '@/http/api'
import { mapState } from 'vuex'
import { serialize } from '@/utils/'
import { AMapWX } from '@/utils/amap-wx'
import PageLoading from '@/components/PageLoading'
import GoodsInfo from './components/GoodsInfo/index'
import GoodsDesc from './components/GoodsDesc/index'
import LimitPurchase from './components/LimitPurchase/index'
import PickupTimer from './components/PickupTimer/index'
import GoodsRecommend from './components/GoodsRecommend/index'
import GoodsDetail from './components/GoodsDetail/index'
import DetailSwiper from './components/DetailSwiper/index'
import BottomBar from './components/BottomBar/index'
import CouponBar from './components/CouponBar/index'
import ActivityEndPopup from './components/ActivityEndPopup/index'
import RestStorePopup from './components/RestStorePopup'
import FixedTop from './components/FixedTop/index'
import ComfirmStoreDialog from '@/components/ComfirmStoreDialog'
import SelectStoreDialog from '@/components/SelectStoreDialog'
import StoreModel from '@/model/store'
import CouponModel from '@/model/coupon'
import config from '@/config'

const couponModel = new CouponModel()
const storeModel = new StoreModel()
export default {
  components: {
    GoodsInfo,
    GoodsDesc,
    PickupTimer,
    GoodsRecommend,
    GoodsDetail,
    DetailSwiper,
    BottomBar,
    ActivityEndPopup,
    RestStorePopup,
    ComfirmStoreDialog,
    SelectStoreDialog,
    PageLoading,
    LimitPurchase,
    FixedTop,
    CouponBar
  },

  data() {
    return {
      goodsDetailInfo: {}, //商品详情
      couponList: [], //优惠券列表
      commendGoodsList: [], //推荐商品列表
      popupShow: false, //popup是否显示
      isShowRestStorePopup: false, //是否显示休息门店
      showSelectStoreDialog: false, //选择门店弹窗显示
      showComfirmStoreDialog: false, //确认门店弹窗显示
      showPageLoading: false, //页面加载显示
      shareImg: '' //分享图片路径
    }
  },

  onLoad() {
    // this.goodsDetailInfo = {} //初始化商品详情信息
    Object.assign(this.$data, this.$options.data())
  },

  async mounted() {
    Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
    this.hidePopup()
    this.saveGoodsDetailOptions()
    const shareStoreId = this.$mp.page.options.shareStoreId

    if (shareStoreId == null && !this.storeId) {
      //分享门店不存在情况隐藏分享按钮
      wx.hideShareMenu()
    }

    if (shareStoreId) {
      //从分享商品进来
      this.setShareStoreId(shareStoreId)
      this.loadDataByIsAuthLocate()
    } else {
      this.getDetail()
      this.getGoodsDetailsCoupon()
    }
  },

  watch: {
    storeId: function() {
      if (this.getCurrentPageUrl() == 'pages/goods/detail/main') {
        //只有当前页面发生才触发
        //确认门店开启分享功能
        wx.showShareMenu({
          withShareTicket: true
        })
        this.hideComfirmStoreDialog()
        this.hideSelectStoreDialog()
        this.getDetail()
        this.getGoodsDetailsCoupon()
      }
    }
  },

  /*
     * @description 页面分享
    */
  onShareAppMessage() {
    let options = `id=${this.$mp.page.options.id}&shareStoreId=${this.storeId}`
    return {
      title: this.goodsDetailInfo.shareDescription,
      path: `/pages/goods/detail/main?${options}`,
      imageUrl: this.goodsDetailInfo.goodsImage
    }
  },

  computed: {
    ...mapState([
      'storeId',
      'cartNum',
      'shareStoreId',
      'location',
      'locateCity',
      'shareStoreInfo',
      'usuallyStoreInfo'
    ]),
    endTime() {
      return this.goodsDetailInfo.time >= 0 ? this.goodsDetailInfo.time : 3600000
    },
    startTime() {
      return this.goodsDetailInfo.startDateTime >= 0 ? this.goodsDetailInfo.startDateTime : 3600000
    }
  },

  methods: {
    /**
     * @description 获取详情页面具体的数据
     */
    getDetail() {
      let options =
        this.$mp.page == null
          ? this.getGoodsDetailOptions()
          : this.$mp.page.options //获取商品相关参数,如果是从切换门店页面返回则从缓存中读取
      // if (!options.id) {
      //   return wx.showToast({
      //     title: '参数错误',
      //     icon: 'none'
      //   })
      // }

      this.showPageLoading = true //页面加载组件开启
      let params = {
        type: options.type ? options.type : '', // 为2通过首页banner跳转过来
        goodsId: options.id,
        storeId: this.storeId
      }

      Api.goods
        .goodsDetail(params)
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.goodsDetailInfo = res.data.goodsDetailInfo
            this.commendGoodsList = res.data.commendGoodsList
            // this.createShareImg()
          } else {
            this.popupShow = true //库存不足或则下架显示
          }
        })
        .catch(e => console.log(e))
        .then(e => {
          setTimeout(() => {
            //定时器避免关闭太快出现闪烁状态
            this.showPageLoading = false //页面加载组件关闭
          }, 1000)
        })
    },

    /**
     * @description 获取优惠券
     */
    async getGoodsDetailsCoupon() {
      const res = await couponModel.getGoodsDetailsCoupon({
        goodsId: this.$mp.page.options.id,
        storeId: this.storeId,
        restricted: 0,
        typeNum: this.$mp.page.options.type ? 1 : 0
      })
      if (res.code == Api.CODES.SUCCESS) {
        this.couponList = res.data
      }
    },

    /**
     * @description 跳转领取优惠券
     */
    fetchCoupon() {
      wx.navigateTo({
        url: `/pages/coupon/fetch/main?id=${this.$mp.page.options.id}`
      })
    },

    /**
     * @description 生成分享图片
     */
    async createShareImg() {
      var that = this
      var ctx = wx.createCanvasContext('shareCanvas')
      const goodsImgUrl = this.getHtppsImgUrl(this.goodsDetailInfo.goodsImage)
      const path = await this.getLocationImg(goodsImgUrl)
      ctx.drawImage(path, 20, 0, 140, 140)
      ctx.drawImage(
        'https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/goods-detail-bar__bg.png',
        0,
        140,
        200,
        40
      )
      ctx.setFillStyle('white')
      ctx.setFontSize(20)
      ctx.fillText(`￥${this.goodsDetailInfo.onlinePrice}`, 30, 160, 100, 100)
      ctx.draw(true, () => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 250,
          height: 220,
          destWidth: 250, // 输出的图片的宽度
          destHeight: 220, // 输出的图片的高度
          canvasId: 'shareCanvas', // 指定canvas的id
          success(res) {
            //  res.tempFilePath :  生成文件的临时路径
            that.uploadImages(res.tempFilePath)
          }
        })
      })
    },

    getHtppsImgUrl(url) {
      let subUrl = url.substring(4)
      return `https${subUrl}`
    },

    getLocationImg(imgPath) {
      return new Promise(function(resolve, reject) {
        // 异步处理返回数据
        // 将网络图片缓存至本地
        wx.getImageInfo({
          src: imgPath,
          success: function(res) {
            resolve(res.path)
          }
        })
      })
    },

    uploadImages(tempFilePaths) {
      var that = this
      if (tempFilePaths) {
        wx.uploadFile({
          url: UPLOAD_URL, // 仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'files',
          formData: {},
          success: res => {
            const data = JSON.parse(res.data)
            that.shareImg = data.data.result
            // res.data =
          }
        })
      }
    },

    /**
     * @description 初始化显示
     */
    hidePopup() {
      this.popupShow = false
    },

    /**
     * @description 显示确认门店弹窗
     */
    shownComfirmStoreDialog() {
      this.showComfirmStoreDialog = true
    },

    /**
     * @description 显示休息门店弹窗
     */
    showRestStorePopup() {
      this.isShowRestStorePopup = true
    },

    /*获取当前页url*/
    getCurrentPageUrl() {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length - 1] //获取当前页面的对象
      var url = currentPage.route //当前页面url
      return url
    },

    /**
     * @description 隐藏确认门店弹窗
     */
    hideComfirmStoreDialog() {
      this.showComfirmStoreDialog = false
    },

    /**
     * @description 显示选择门店弹窗
     */
    shownSelectStoreDialog() {
      this.showSelectStoreDialog = true
    },

    /**
     * @description 隐藏选择门店弹窗
     */
    hideSelectStoreDialog() {
      this.showSelectStoreDialog = false
    },

    /**
     *  @param {string} storeId 门店id
     *  设置门店Id，存储到全局vuex
     */
    setStoreId(storeId) {
      this.$store.commit('setStoreId', storeId)
    },

    /**
     * @param {number} storeId 确认门店id
     * @description 确认门店，加载门店相关数据
     */
    async comfirmStore(storeId) {
      this.hideComfirmStoreDialog()
      this.hideSelectStoreDialog()
      this.$store.commit('setStoreId', storeId) //设置确认门店Id
      const shareStoreItem = await this.getOneStoreInfoByStoreId(storeId)
      this.$store.commit('setCurrentStoreInfo', shareStoreItem)
      this.$store.dispatch('confirmOrSwitchStore', {
        storeId
      })
      this.getDetail()
    },

    /**
     * @description 已经授权定位设置定位相关信息
     */
    async setLocationInfoAuthedLocate() {
      let location = wx.getStorageSync('location')
      if (location) {
        //判断缓存中是否存在定位，避免丢失，没有需要重新定位
        this.$store.commit('setLocationInfo', location) //已经授权从缓存中存定位信息到vuex，方便其他组件使用
      } else {
        location = await this.setUserLocationInfo() //设置用户相关定位信息：经纬度，详情地址
        this.$store.commit('setLocationInfo', location) //已经授权从缓存中存定位信息到vuex，方便其他组件使用
      }
    },

    /**
     * @description 已经授权定位去确认相关门店
     */
    async comfirmStoreForAuthedLocate() {
      this.setLocationInfoAuthedLocate()

      const usuallyStoreId = await this.getUsuallyStoreId()
      if (this.shareStoreId == usuallyStoreId) {
        //判断用户当前所在门店是否跟分享商品门店一致
        //一致：直接设置分享门店id为当前门店
        if (this.storeId == usuallyStoreId) {
          //已经设置过门店Id，第二次访问相同门店不会触发watch，应该直接获取详情数据
          this.getDetail()
        } else {
          this.setStoreId(usuallyStoreId)
        }
      } else {
        if (usuallyStoreId) {
          //不一致：选择门店弹窗
          //设置当前门店和经常访问门店相关信息
          await this.setCurrentStoreInfo(this.shareStoreId)
          await this.setUsuallyStoreInfo()
          if (
            this.usuallyStoreInfo.isBusiness == 0 &&
            this.shareStoreInfo.isBusiness == 0
          ) {
            //当前门店和经常访问都休息弹出休息弹窗
            this.showRestStorePopup()
            return false
          }
          this.shownSelectStoreDialog()
        } else {
          //usuallyStoreId为空，第一次访问为空，直接弹出确认门店弹窗
          const storeInfo = await this.getOneStoreInfoByStoreId(
            this.shareStoreId
          )
          this.setStoreItemInfo(storeInfo) //设置当前门店
          if (storeInfo.isBusiness == 0) {
            //分享的休息弹出休息弹出
            this.showRestStorePopup()
            return false
          }
          this.shownComfirmStoreDialog()
        }
      }
    },

    /**
     * @description 未授权定位确认门店
     */
    async comfirmStoreForNoAuthLocate() {
      const locationInfo = await this.setUserLocationInfo() //显示定位授权弹窗设置用户相关定位信息：经纬度，详情地址
      if (locationInfo) {
        //同意授权
        const storeInfo = await this.getOneStoreInfoByStoreId(this.shareStoreId)
        this.setStoreItemInfo(storeInfo) //设置当前门店
        this.shownComfirmStoreDialog() //确认门店弹窗显示
      } else {
        //拒绝授权
        const storeInfo = await this.getOneStoreInfoByStoreId(this.shareStoreId)
        this.setStoreItemInfo(storeInfo) //设置当前门店
        this.shownComfirmStoreDialog() //确认门店弹窗显示
      }
    },

    /**
     * @description 根据是否授权定位加载相对应数据
     */
    async loadDataByIsAuthLocate() {
      const isAuthLocate = await this.isAuthorizedLocation() //获取定位授权情况
      if (isAuthLocate) {
        //已经授权定位
        this.comfirmStoreForAuthedLocate()
      } else {
        //未授权定位
        this.comfirmStoreForNoAuthLocate()
      }
    },

    /**
     * @param {number} currentStoreId 当前门店id，即分享的门店id
     * @description 设置当前门店相关信息： 当前门店即分享门店
     */
    async setCurrentStoreInfo(currentStoreId) {
      const shareStoreItem = await this.findStoreItemByStoreId(currentStoreId)
      this.$store.commit('setShareStoreInfo', shareStoreItem)
      this.$store.commit('setShareStoreId', currentStoreId) //存储分享分店Id到全局vuex
    },

    /**
     * @description 设置经常访问相关信息
     */
    async setUsuallyStoreInfo() {
      const usuallyStoreId = await this.getUsuallyStoreId()
      const usuallyStoreItem = await this.findStoreItemByStoreId(usuallyStoreId)
      this.$store.commit('setUsuallyStoreInfo', usuallyStoreItem)
    },

    async findStoreItemByStoreId(storeId) {
      const res = await storeModel.getOneStoreInfoByStoreId({
        storeId: storeId,
        longitude: this.location.longitude,
        latitude: this.location.latitude
      })
      if (res.code == Api.CODES.SUCCESS) {
        return res.data
      }
    },

    /**
     * @@description 获取经常访问门店Id
     */
    async getUsuallyStoreId() {
      //判断是否存在登录状态，已登录从api获取经常访问门店，未登录从缓存中读取
      if (this.$store.state.sessionId) {
        const res = await Api.index.queryStoreByLastest()
        if (res.code === Api.CODES.SUCCESS) {
          return res.data.storeId
        } else {
          return ''
        }
      } else {
        //未登录
        return storeModel.getLatestStoreOFNoLogin()
      }
    },

    /**
     * @description 设置用户相关定位信息(经纬度，所在地详情等)
     */
    setUserLocationInfo() {
      let amap = new AMapWX({ key: config.AMAP_KEY })
      return new Promise((resolve, reject) => {
        amap.getPoiAround({
          success: res => {
            //用户成功授权
            const locationInfo = res.markers[0] //当前用户定位定位相关信息
            const cityName = res.poisData[0].cityname //用户定位当前城市
            this.longitude = locationInfo.longitude
            this.latitude = locationInfo.latitude
            this.$store.commit('setLocationInfo', locationInfo) //用户定位相关信息存到vuex
            this.$store.commit('setcityname', cityName)
            this.$store.commit('setLocateCity', cityName)
            this.saveLocationToStorage(locationInfo)
            resolve(locationInfo)
          },
          // 引导用户设置定位权限
          fail: e => {
            //用户授权取消
            if (
              e.errMsg === 'getLocation:fail auth deny' ||
              'getLocation:fail:auth denied'
            ) {
              resolve(false)
            } else {
              reject(e)
            }
          }
        })
      })
    },

    /**
     * @description 保存用户位置相关信息到缓存
     */
    saveLocationToStorage(location) {
      wx.setStorageSync('location', location)
    },

    /**
     * @description 保存当前门店相关信息（名称，id等）
     */
    setStoreItemInfo(storeInfo) {
      this.$store.commit('setCurrentStoreInfo', storeInfo) //保存门店id和名称到vuex
    },

    /**
     * @description 获取分享门店信息
     */
    async getOneStoreInfoByStoreId(storeId) {
      const res = await storeModel.getOneStoreInfoByStoreId({
        storeId: storeId,
        longitude: this.location.longitude,
        latitude: this.location.latitude
      })
      if (res.code == Api.CODES.SUCCESS) {
        return res.data
      }
    },

    /**
     * @param {string} shareStoreId 分享门店id
     * @description 设置分享门店id
     */
    setShareStoreId(shareStoreId) {
      this.$store.commit('setShareStoreId', shareStoreId)
    },

    /**
     * @description 是否授权定位
     */
    isAuthorizedLocation() {
      return new Promise((resolve, reject) => {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userLocation'] == true) {
              resolve(true)
            } else {
              resolve(false)
            }
          }
        })
      })
    },

    /**
     * @param {string} storeId 门店Id
     * @description 设置门店id
     */
    setStoreId(storeId) {
      this.$store.commit('setStoreId', storeId)
    },

    /**
     * @description 保存商品详情页面相关请求商品id参数
     */
    saveGoodsDetailOptions() {
      wx.setStorage({
        key: 'gooodsDetailOptions',
        data: this.$mp.page.options
      })
    },

    /**
     * @description 获取详情页面相关请求商品id参数
     */
    getGoodsDetailOptions() {
      return wx.getStorageSync('gooodsDetailOptions')
    },

    setStore() {
      if (this.$mp.page.options.shareStoreId) {
        //如果从分享别人的商品进来设置门店ID为分享者的门店
        this.$store.commit('setStoreId', this.$mp.page.options.shareStoreId)
      }
    }
  }
}
</script>

<style>
page {
  background-color: #f8f8f8;
}
</style>

<style scoped lang="scss">
</style>
