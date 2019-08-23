<template>
  <div>
    <!-- Swiper -->
    <div class="swiper-wrap">
      <swiper class="swiper" @change="onSwiperChange" autoplay="true">
        <div v-for="item in goodsDetailInfo.goodsBanner" :key="item" @click="previewImage(item)">
          <swiper-item>
           <img :src="item" class="slide-image" mode="aspectFit"/>
         </swiper-item>
        </div>
      </swiper>
      <div class="indicator">
        <span>{{ current + 1 }}/</span>{{ goodsDetailInfo.bannerNum || 0 }}
      </div>
    </div>

    <!-- 商品信息bar -->
    <goods-info :current-price="goodsDetailInfo.onlinePrice" :original-price="goodsDetailInfo.onlineScribingPrice" />

  
    <!-- 商品相关描述（名称） -->
    <goods-desc :goods-name="goodsDetailInfo.goodsName" :goods-desc="goodsDetailInfo.shareDescription" />



    <!-- Type start: 提货时间 -->
    <pickup-timer />

    <!-- Type end; -->
    

    <!-- 商品推荐 -->
    <div class="goods-recommend" v-if="commendGoodsList.length">
      <div class="goods-recommend__title" v-if="activityInfo.groupNum">大家都在拼</div>
      <div class="goods-recommend__title" v-else>商品推荐</div>
      <div>
        <template v-if="activityInfo.activityType == 30">
          <assemble-goods-rows :goods="assembleCommendGoodsList" :goodsId="activityInfo.activityGoodsId"></assemble-goods-rows>
        </template>
        <template v-else>
           <goods-rows :goods="commendGoodsList"></goods-rows>
        </template>
        
       
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="goods-detail">
      <div class="goods-detail__title">商品详情</div>
      <rich-text :nodes="goodsDetailInfo.mobileBody"></rich-text>
    </div>





    <!-- 返回顶部 -->
    <img src="/static/images/details_btn_top@2x.png" v-if="backToTopButtonShowed" class="returntop" @click="returnTop">

  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import { mapState } from 'vuex'
  import { serialize } from '@/utils/'
  import AssembleGoodsRows from '@/components/AssembleGoodsRows'
  import GoodsRows from '@/components/GoodsRows'
  import GoodsInfo from './components/GoodsInfo/index'
  import GoodsDesc from './components/GoodsDesc/index'
  import PickupTimer from './components/PickupTimer/index'

  export default {
    components: {
      AssembleGoodsRows,
      GoodsRows,
      GoodsInfo,
      GoodsDesc,
      PickupTimer
    },

    data() {
      return {
        current: 0,
        groupDialogShowed: false,
        countModifyDialogShowed: false,
        backToTopButtonShowed: false,
        activityInfo: {}, // 活动信息
        goodsDetailInfo: {},
        commendGoodsList: [],
        assembleCommendGoodsList: [], //拼团推荐商品，
        currentGoodsCartNum: 1,
        countdown: 0,
        groupList: [],
        timer: null,
        timer1: null,
        groupList1: [],
        groupOrderId: '',
        // storeId: ''
      }
    },

    onLoad(e) {
      // console.log('111',this.$store.state.shopDetail)
      this.storeId=this.$store.state.shopDetail.storeId
      console.log('获取门店id',this.storeId)
      //获取拼团id
      this.groupOrderId = this.$mp.page.options.groupOrderId
       this.storeId = this.$mp.page.options.storeId
      // this.page.activityId = e.id
      // this.page.storeId = e.storeId || this.storeId
      // this.page.groupOrderId = e.groupOrderId   
    },

    computed: {
      ...mapState(['storeId', 'cartNum']),
       isNoHasMaxValue () {
        return this.groupOrderId == 'two'? true : false
      }
    },

    methods: {
      /**
       * @description 切换swiper
       */
      onSwiperChange(e) {
        this.current = e.target.current
      },

      /**
       * @description 回到顶部
       */
      returnTop() {
        if (wx.pageScrollTo) {
          wx.pageScrollTo({ scrollTop: 0 })
        }
      },

      /**
       * @description 放大全屏预览图片
       */
      previewImage(current) {
        wx.previewImage({
          urls: this.goodsDetailInfo.goodsBanner,
          current
        })
      },

      /**
       * @description 添加到购物车
       */
      addToCart() {
        if (this.goodsDetailInfo.goodsId) {
          this.countModifyDialogShowed = true
        } else {
          //
        }
      },

      /**
       * @description 确认添加
       */
      confirmAdd() {
        // if(this.groupOrderId == 'two') {
          // 单独购买
          // this.confirmAddTeam1()
          // return false
        // }
        if(this.groupOrderId){
          // 拼团活动
          this.confirmAddTeam()
          return false
        }
        this.$store.dispatch('addToCart', {
          goodsId: this.goodsDetailInfo.goodsId,
          count: this.currentGoodsCartNum
        })
        .then(res => {
          this.currentGoodsCartNum = 1
          this.countModifyDialogShowed = false
        })
      },
      
      /**
       * @description 确定添加到拼团
       */
      confirmAddTeam1() {
        this.$store.dispatch('addOneToCart', {
          goodsId: this.goodsDetailInfo.goodsId,
          count: this.currentGoodsCartNum
        })
        .then(res => {
          this.cancelAdd()
        })
      },

      /**
       * @description 获取营销活动相关商品数据
       */
       getAssemblecommendGoodsListData() {
        wx.showLoading({ mask: true, title: '加载中' })
        Api.activity.activityGoodsList({
          activityId:this.$mp.page.options.activityId,
          pageNumber:1,
          storeId:this.storeId,
        }).then(res => {
          if(res.code === Api.CODES.SUCCESS) {
            this.assembleCommendGoodsList = res.data.goodList
          }
          wx.hideLoading()
        }).catch(() => {
          wx.hideLoading()
        })
      },

    /**
     * @description 确定添加到拼团 one:单独购买 two：多人拼团
     */
     confirmAddTeam() {

       var checkGroupOrderId = (this.groupOrderId == 'one' || this.groupOrderId == 'two' )
        let data = {
          goodsId: this.goodsDetailInfo.goodsId,
          count: this.currentGoodsCartNum,
          activityId: this.groupOrderId == 'two' ? '' : this.activityInfo.activityId,
          activityType: this.groupOrderId == 'two' ? '' : this.activityInfo.activityType,
          groupOrderId: checkGroupOrderId ? '' : this.groupOrderId,
          activityGoodsId: this.groupOrderId == 'two' ? '' : this.activityInfo.activityGoodsId,
          activityGoodsIdOftimes: this.activityInfo.activityGoodsId,
          groupPartner: this.activityInfo.groupNum,
          deliveryType: this.goodsDetailInfo.deliveryStatus == 2 ? 1 : 2,
          deliveryStatus: this.activityInfo.deliveryStatus
        }

        wx.setStorageSync('teamOrder', data) //保存拼团订单信息到缓存
        wx.navigateTo({
          url: `/pages/order/preview/main?cartIds=0`
        })
        this.cancelAdd() //取消添加，关闭添加弹窗
        // this.$store.dispatch('addToActivity', {
        //   goodsId: this.goodsDetailInfo.goodsId,
        //   count: this.currentGoodsCartNum,
        //   activityId: this.activityInfo.activityId,
        //   activityType: this.activityInfo.activityType,
        //   groupOrderId: this.groupOrderId == 'one' ? '' : this.groupOrderId,
        //   activityGoodsId: this.activityInfo.activityGoodsId,
        //   groupPartner: this.activityInfo.groupNum,
        //   deliveryType: 1
        // })
        // .then(res => {
        //   this.cancelAdd()
        // })
      },

      /**
       * @description 检查库存是否为0 0则不能继续操作
       */
      inventoryInspection (groupOrderId) {
        console.log('groupOrderId)',groupOrderId)
        if(this.activityInfo.maxNum == 0 && groupOrderId != 'two'){
          wx.showModal({
            title: '温馨提示',
            content: '购买数量超出每日限购',
            showCancel: false,
            success: (res) => {
              if(res.confirm) { }
            }
          })
          return false
        }
        return true
      },

      /**
       * @description 去拼团
       */
      goTeam(groupOrderId) {
        if(this.inventoryInspection(groupOrderId)){
          //检查库存是否为0 0则不能继续操作
          this.countModifyDialogShowed = true  //数量修改弹窗显示
          this.groupOrderId = groupOrderId    //团购Id保存
        } 
        
      },
      
      //取消添加，关闭添加弹窗
      cancelAdd() {
        this.currentGoodsCartNum = 1
        this.groupOrderId = ''
        this.countModifyDialogShowed = false
      },

      /**
       * @description 获取详情页面具体的数据
       */
      getDetail() {
        let options = this.$mp.page.options //获取商品相关参数
        console.log('options',options)
        if (!options.id) {
          return wx.showToast({
            title: '参数错误',
            icon: 'none'
          })
        }
        console.log('options.shareStoreId',options.shareStoreId)
        console.log('this.storeId',this.storeId)
        wx.showLoading()
        let params = {
          goodsId: options.id,
          storeId: options.shareStoreId || this.storeId
        }

        if (options.activityId) {
          params.activityId = options.activityId
          params.activityGoodsId = options.activityGoodsId
        }

        Api.goods.goodsDetail(params)
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.goodsDetailInfo = res.data.goodsDetailInfo
            this.commendGoodsList = res.data.commendGoodsList
            if(Array.isArray(res.data.groupList) && res.data.groupList.length) {
              let arr = []
              let length = res.data.groupList.length

              res.data.groupList.forEach((item,index) => {
                arr.push(item)
                if(index % 2) {
                  this.groupList.push(arr)
                  arr = []
                }

                if(length % 2 && index == length-1) {
                  this.groupList.push(arr)
                }
                index < 10 && this.groupList1.push(item)
              })
            }
            this.groupList[0] && this.groupList[0].length && this.startListCountdown()
            // this.groupList1.length && this.startListCountdown1()

            if (res.data.activityInfo) {
              console.log('res.data.activityInfo',res.data.activityInfo)
              this.activityInfo = res.data.activityInfo
              console.log('res.data.activityInfo',this.activityInfo)
              // 有倒计时时
              if (this.activityInfo.times) {
                this.startCountdown(this.activityInfo.times)
              }
            }
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

        /**
       * @description 拼团活动列表开始倒计时
       */
      startListCountdown() {
        clearInterval(this.timer)
        this.handleListTime()
        this.timer = setInterval(() => {
          this.handleListTime()
        }, 1000)
      },

      /**
       * @description 过滤拼团列表时间不满足的数据
       */
      handleListTime() {
        this.groupList = this.groupList.map(item => {
          let newItem = item.map(item1 => {
            item1.times && item1.times--
            return item1
          })
          return newItem
        })
      },

      /**
       * @description 拼团活动列表开始倒计时
       */
      startListCountdown1() {
        clearInterval(this.timer1)
        this.handleListTime1()
        this.timer1 = setInterval(() => {
          this.handleListTime1()
        }, 1000)
      },

      /**
       * @description 过滤拼团列表时间不满足的数据
       */
      handleListTime1() {
        this.groupList1 = this.groupList1.map(item => {
          item.times && item.times--
          return item
        })
      },

    setStore () {
      if(this.$mp.page.options.shareStoreId){
        //如果从分享别人的商品进来设置门店ID为分享者的门店
        this.$store.commit('setStoreId', this.$mp.page.options.shareStoreId)
      }
      
    },

      /**
       * @description 拼团活动列表开始倒计时
       */
      startCountdown(countdown) {
        clearInterval(this.countdownTimer)
        this.countdown = countdown
        this.countdownTimer = setInterval(() => {
          this.countdown--
          if (this.countdown === 0) {
            clearInterval(this.countdownTimer)
            this.getDetail()
          }
        }, 1000)
      }
    },
    /*
     * @description 页面分享
    */
    onShareAppMessage() {
      console.log('shareInfo',this.$mp.page)
      let options = `id=${this.$mp.page.options.id}&shareStoreId=${this.storeId}`
      console.log('options',options)
      return {
        title: this.goodsDetailInfo.goodsName,
        path: `/pages/goods/detail/main?${options}`,
        imageUrl: this.goodsDetailInfo.goodsImage
      }    
      

    },

    
    onShow () {
      this.setStore()
      this.activityInfo = {}
      this.goodsDetailInfo = {}
      this.commendGoodsList = []
      this.groupList1 = []
      this.groupList = []
      this.getDetail()
      // this.getAssemblecommendGoodsListData()
    },

    onHide() {
      clearInterval(this.countdownTimer)
      clearInterval(this.timer1)
      clearInterval(this.timer)
    },

    onPageScroll(e) {
      this.backToTopButtonShowed = e.scrollTop >= 200
    }
  }
</script>

<style>
  page {
    background-color: #F8F8F8;
  }
</style>

<style scoped lang="scss">
  .swiper-wrap {
    position: relative;
    background-color: #fff;
    .indicator {
      position: absolute;
      bottom: 20rpx;
      right: 30rpx;
      line-height: 32rpx;
      width: 70rpx;
      text-align: center;
      border: 1rpx solid #7A7A7A;
      border-radius: 17rpx;
      font-size: 24rpx;
      color: $text-gray;
      span {
        color: $text-black;
      }
    }
  }
  .swiper {
    height: 527rpx;
    swiper-item {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .goods-detail {
    background-color: #fff;
    margin-top: 20rpx;
    padding: 0 30rpx;
    &__title {
      padding-top: 24rpx;
      padding-bottom: 24rpx;
      text-align: center;
      font-size: 28rpx;
      color: $text-black;
      &:before,
      &:after {
        content: '';
        display: inline-block;
        margin: 0 20rpx;
        width: 10rpx;
        height: 10rpx;
        border-radius: 6rpx;
        background-color: $text-black;
        vertical-align: 4rpx;
      }
    }
    .weui-form-preview {
      &:before,
      &:after {
        display: none;
      }
      &__bd {
        padding-top: 0;
        padding-bottom: 30rpx;
      }
      &__item {
        padding-top: 14rpx;
        padding-bottom: 14rpx;
        border-bottom: 1rpx dashed rgba(153, 153, 153, .6);
        &:last-child {
          border-bottom: 0;
        }
      }
      &__label {
        font-size: 24rpx;
        text-align: left;
        text-align-last: left;
        color: $text-gray;
        margin-right: 2em;
      }
      &__value {
        text-align: left;
        font-size: 24rpx;
        color: $text-black;
      }
    }
    > img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .goods-recommend {
    margin-top: 20rpx;
    background-color: #fff;
    padding: 20rpx 0;
    &__title {
      padding: 0 30rpx;
      margin-bottom: 10rpx;
      font-size: 30rpx;
      color: $text-black;
    }
    /deep/ .goods-item {
      &:first-child { padding-left: 30rpx; }
      &:last-child { padding-right: 30rpx; }
    }
  }

  .footer-bar.bp-footer-bar {
    padding: 10rpx 30rpx;
    background-color: #fff;
    text-align: right;
    .cart-icon {
      position: absolute;
      left: 62rpx;
      top: 50%;
      margin-top: -32rpx;
      img {
        width: 64rpx;
        height: 64rpx;
      }
      .weui-badge {
        position: absolute;
        right: -16rpx;
        top: 0;
      }
    }
    button {
      display: inline-block;
      vertical-align: middle;
      width: 420rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
    }
  }

  .returntop {
    position: fixed;
    right: 30rpx;
    bottom: 160rpx;
    width: 84rpx;
    height: 84rpx;
  }

  .group-buy-bar {
    padding-left: 30rpx;
    background-color: #FF1414;
    &__ib {
      display: inline-block;
      // vertical-align: middle;
      color: #FFF;
    }
    &__price {
      font-size: 72rpx;
      line-height: 92rpx;
      span {
        vertical-align: middle;
        font-size: 40rpx;
      }
      &_old {
        margin-left: 10rpx;
        color: #FFF;
        font-size: 22rpx;
        text-decoration: line-through;
      }
    }
    &__tag {
      margin-left: 10rpx;
      padding: 0 10rpx;
      border-radius: 4rpx;
      background-color: #fff;
      min-width: 60rpx;
      text-align: center;
      font-size: 22rpx;
      line-height: 30rpx;
      color: #FF1414;
    }
    &__ft {
      position: relative;
      padding: 0 50rpx 0 40rpx;
      background-color: #FFEB4B;
      &:before {
        content: '';
        position: absolute;
        left: -30rpx;
        top: 0;
        bottom: 0;
        width: 0;
        border-top: 50rpx solid transparent;
        border-bottom: 50rpx solid transparent;
        border-right: 30rpx solid #FFEB4B;
      }
      &-tip {
        text-align: center;
        font-size: 22rpx;
        color: #FF1414;
        line-height: 40rpx;
      }
      /deep/ .countdowner {
        span {
          line-height: 50rpx;
          height: 50rpx;
          &.num {
            width: 38rpx;
          }
        }
      }
    }
  }

  .group-buy-bar-team{
    background: none;
    position: relative;
    .group-buy-bar__tag {
      background: #CFFFFB;
      color: #FF1414;
    }
    .group-buy-bar__ft {
      background: none;
      &:after{
          display: none;
      }
      &:before{
          display: none;
      }
      .group-buy-bar__ft-tip {
        color: #00D1AF;
      }
      /deep/ .countdowner {
        span {
          &.num {
            background: #00D1AF;
          }
        }
      }
    }
    .xiangqing_bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      height: 50px;
      width: 100%;
    }
  }

  .group-member-list {
    .weui-cells {
      &:before {
        border-color: #DEDEDE;
      }
      &:after {
        display: none;
      }
      .weui-cell {
        &:before {
          display: none;
        }
      }
      &__title {
        margin-bottom: 0;
        background-color: #fff;
        font-size: 28rpx;
        color: #000;
        line-height: 80rpx;
        .weui-cell__ft_in-access {
          float: right;
          font-size: 24rpx;
          color: $text-gray;
          &:after {
            border-color: $text-gray;
          }
        }
      }
    }
    .weui-cell {
      &:before {
        border-color: #DEDEDE;
        left: 0;
      }
      &__hd {
        img {
          margin-right: 20rpx;
          width: 90rpx;
          height: 90rpx;
          border-radius: 45rpx;
          vertical-align: middle;
        }
      }
      &__bd {
        font-size: 28rpx;
      }
    }
  }

  .group-member-item {
    padding-top: 16rpx;
    padding-bottom: 16rpx;
    border-bottom: 1px solid #DEDEDE;
    &:nth-child(2n){
      border-bottom: none;
    }
    &__wait {
      color: #000;
      font-size: 26rpx;
      span {
        color: $text-red;
      }
    }
    &__cd {
      font-size: 22rpx;
      color: #666;
    }
    button {
      margin-left: 20rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      line-height: 60rpx;
      border-radius: 30rpx;
    }
  }

  .group-footer-bar {
    .weui-cell {
      padding-top: 14rpx;
      padding-bottom: 14rpx;
      background-color: #FFCB88;
      &__hd {
        img {
          margin-right: 26rpx;
          width: 60rpx;
          height: 60rpx;
          border-radius: 30rpx;
          vertical-align: middle;
        }
      }
      &__bd {
        font-size: 30rpx;
        span {
          color: $text-red;
        }
      }
      button {
        line-height: 60rpx;
        border-radius: 30rpx;
      }
    }
    .bg-gradient_orange {
      background-image: -webkit-linear-gradient(left, #FF9E03, #FFC003);
      background-image: linear-gradient(left, #FF9E03, #FFC003);
    }
  }

  .group-dialog {
    position: fixed;
    z-index: 11;
    bottom: 0;
    left: 0rpx;
    right: 0rpx;
    background-color: #fff;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
    &__hd {
      position: relative;
      line-height: 80rpx;
      text-align: center;
      font-size: 32rpx;
      border-bottom: 1rpx solid #DEDEDE;
      icon {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
      }
    }
    &__bd {
      height: 660rpx;
      padding-top: 20rpx;
      padding-bottom: 20rpx;
      overflow-y: auto;
    }
    &__ft {
      padding: 20rpx 30rpx;
      text-align: center;
      font-size: 32rpx;
    }
    .weui-cells {
      margin-top: 0;
      &:before,
      &:after { display: none; }
    }
    .weui-cell {
      padding: 18rpx 18rpx;
      &:before { display: none; }
      &__hd {
        img {
          border-radius: 40rpx;
          margin-right: 20rpx;
          width: 80rpx;
          height: 80rpx;
          vertical-align: middle;
        }
      }
      &__bd {
        font-size: 26rpx;
        line-height: 40rpx;
      }
      button {
        line-height: 50rpx;
        border-radius: 25rpx;
        font-size: 26rpx;
      }
    }
  }

  .count-modify-dialog {
    position: fixed;
    z-index: 11;
    left: 0;
    right: 0;
    bottom: 0;
    .weui-media-box {
      background-color: #fff;
      &:before {
        display: none;
      }

      &__hd {
        width: 160rpx;
        height: 160rpx;
      }
      &__title {
        margin-bottom: 20rpx;
        font-size: 28rpx;
        color: $text-black;
        white-space: normal;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
      &__desc {
        position: relative;
        line-height: 50rpx;
      }

      .goods-price {
        line-height: 50rpx;
        font-size: 28rpx;
        font-weight: 700;
        color: $text-red;
      }

      .goods-count {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 50rpx;
        &__form {
          span {
            vertical-align: middle;
            padding-left: 20rpx;
            padding-right: 20rpx;
            font-size: 28rpx;
            color: $text-black;
          }
          img {
            vertical-align: middle;
            width: 50rpx;
            height: 50rpx;
          }
        }
      }
    }
    button {
      border-radius: 0;
    }
  }

  .present {
    .weui-cells {
      &:before,
      &:after {
        display: none;
      }
      margin-top: 20rpx;
      font-size: 28rpx;
      color: $text-black;
    }
    &__tag {
      margin-right: 16rpx;
      color: $text-red;
      border: 1rpx solid $text-red;
      font-size: 24rpx;
      border-radius: 4rpx;
      padding-left: 12rpx;
      padding-right: 12rpx;
    }
  }


  .member-only {
    font-size: 46rpx;
    color: #FFA442;
    margin-bottom: -12rpx;
    font-weight: 700;
    display:flex;
    align-items:center;

    .activity-tag {
      vertical-align: middle;
    }
  }

  .goods-hd-info__bd_member-only {
    .goods-hd-info__price {
      font-weight:bold;
      font-size: 34rpx;
      padding-left: 6rpx;
    }
  }
  .group-member-team{
     span{
       &.num{
         background: none;
       }
     }
  }
  .list-time {
    display:flex;
    align-items:center; 
    /deep/ .countdowner {
      span {
        background: none;
        color: #666666;
        font-size: 11px;
        &.num {

        }
      }
    }
  }
  .list-time1 {
    .shengyu{
      vertical-align: middle;
      font-size:15px;
    }
    /deep/ .countdowner {
      span {
        background: none;
        color: #000;
        font-size: 15px;
        &.num {
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }

  .assemble-text{
    color: #00d7cc;
  }
</style>
