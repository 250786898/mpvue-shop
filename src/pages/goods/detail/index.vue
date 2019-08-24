<template>
  <div>
    <!-- Swiper -->
    <DetailSwiper :bannerList="goodsDetailInfo.goodsBanner" />

    <!-- 商品信息bar -->
    <goods-info :current-price="goodsDetailInfo.onlinePrice" :original-price="goodsDetailInfo.onlineScribingPrice" />

  
    <!-- 商品相关描述（名称） -->
    <goods-desc :goods-name="goodsDetailInfo.goodsName" :goods-desc="goodsDetailInfo.shareDescription" />



    <!-- Type start: 提货时间 -->
    <pickup-timer />

    <!-- Type end; -->

     <!-- 商品推荐 -->
    <GoodsRecommend :commendGoodsList="commendGoodsList" />
    

    <!-- 商品详情 -->
    <goods-detail :detail-info="goodsDetailInfo.mobileBody" /> 

    <!-- 返回顶部 -->
    <to-top />

    <!-- 底部栏 -->
    <bottom-bar :goods-id="goodsDetailInfo.goodsId" /> 

  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import { mapState } from 'vuex'
  import { serialize } from '@/utils/'
  import AssembleGoodsRows from '@/components/AssembleGoodsRows'
  import GoodsInfo from './components/GoodsInfo/index'
  import GoodsDesc from './components/GoodsDesc/index'
  import PickupTimer from './components/PickupTimer/index'
  import GoodsRecommend from './components/GoodsRecommend/index'
  import GoodsDetail from './components/GoodsDetail/index'
  import DetailSwiper from './components/DetailSwiper/index'
  import ToTop from './components/ToTop/index'
  import BottomBar from './components/BottomBar/index'

  export default {
    components: {
      AssembleGoodsRows,
      GoodsInfo,
      GoodsDesc,
      PickupTimer,
      GoodsRecommend,
      GoodsDetail,
      DetailSwiper,
      ToTop,
      BottomBar
    },

    data() {
      return {       
        goodsDetailInfo: {},
        commendGoodsList: [],
      }
    },

    onLoad(e) {
      this.storeId=this.$store.state.shopDetail.storeId
      this.storeId = this.$mp.page.options.storeId

    },

    computed: {
      ...mapState(['storeId', 'cartNum'])
    },

    methods: {
          

      /**
       * @description 获取详情页面具体的数据
       */
      getDetail() {
        let options = this.$mp.page.options //获取商品相关参数

        if (!options.id) {
          return wx.showToast({
            title: '参数错误',
            icon: 'none'
          })
        }

        wx.showLoading()
        let params = {
          goodsId: options.id,
          storeId: options.shareStoreId || this.storeId
        }

        Api.goods.goodsDetail(params)
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.goodsDetailInfo = res.data.goodsDetailInfo
            this.commendGoodsList = res.data.commendGoodsList     
          } else {
            wx.showModal({
              title: '温馨提示',
              content: res.message,
              showCancel: false,
              success: () => {
                wx.navigateBack()
              }
            })
          }
        })
        .catch(e => console.log(e))
        .then(e => wx.hideLoading())
      },


      setStore () {
        if(this.$mp.page.options.shareStoreId){
          //如果从分享别人的商品进来设置门店ID为分享者的门店
          this.$store.commit('setStoreId', this.$mp.page.options.shareStoreId)
        }
      }

    },


    /*
     * @description 页面分享
    */
    onShareAppMessage() {
      let options = `id=${this.$mp.page.options.id}&shareStoreId=${this.storeId}`
      return {
        title: this.goodsDetailInfo.goodsName,
        path: `/pages/goods/detail/main?${options}`,
        imageUrl: this.goodsDetailInfo.goodsImage
      }    
      

    },

    
    onShow () {
      this.setStore()
      this.goodsDetailInfo = {}
      this.commendGoodsList = []
      this.getDetail()
    }

  }
</script>

<style>
  page {
    background-color: #F8F8F8;
  }
</style>

<style scoped lang="scss">
  
</style>
