<template>
  <div :style="{'background':activity.bgColor}" style="height:100%;">
    <div class="banner">
      <img class="banner__bg" :src="activity.activityBanner" mode="widthFix"/>
      <!-- 券 -->
      <scroll-view :scroll-x="true">
        <div>
          <div class="coupon-card" v-for="(item,index) of newConpousList" :key="index" @click="fetctAllCoupons">
            <div class="coupon-card__top">
              <div class="card-left">
                {{item.couponValue}}
              </div>
              <div class="card-right">
                <div>{{item.activityTitle}}</div>
                <div>{{item.limitWhere}}</div>
              </div>
            </div>
            <div class="coupon-card__buttom">
              {{item.startDate}}-{{item.endDate}}
            </div>
          </div>
        </div>
      </scroll-view>
      <!-- <form report-submit="true" @submit="uploadFormId">
        <button type="primary" form-type="submit" class="radius" hover-class="hover" @click="fetctAllCoupons">立即领取</button>
      </form> -->
    </div>
    <!-- <div class="quick-tip">
      <img src="/static/images/special_icon_bulb.png@2x.png">
      新人优惠价格限购一次，优惠券不能叠加使用
    </div> -->
    <div class="goods-list">
      <goods-row-item v-for="item in goodList" :key="item.goodsId" :item="item"></goods-row-item>
    </div>

    <fixed-cart-icon></fixed-cart-icon>
  </div>
</template>

<script>
  import GoodsRowItem from '@/components/GoodsRowItem'
  import FixedCartIcon from '@/components/FixedCartIcon'
  import { Api } from '@/http/api'
  import {mapState} from 'vuex'

  export default {
    components: {
      GoodsRowItem,
      FixedCartIcon
    },
    data () {
      return {
        activityId: -1, //活动iD
        conpousList: [],
        activity: {},
        goodList: [],
        formId: ''
      }
    },  
    computed: {
      ...mapState(['storeId']),
      newConpousList () {
        var newArr = []
        this.conpousList.forEach(item => {
          const newStart = item.startDate.split(' ')[0]
          const newEnd = item.endDate.split(' ')[0]
          newArr.push({
            ...item,
            'startDate': newStart,
            'endDate' : newEnd
          })
        })
        return newArr
      }
    },
    methods: {
      uploadFormId (e) {
       this.formId = e.target.formId
      },

      fetctAllCoupons () {
        //领取优惠券 @activityId 优惠券ID
        wx.showLoading()
        Api.address.getCoupon( {
          activityId: this.activityId,
          formId: this.formId
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            wx.showModal({
              title: '优惠券提醒',
              content: '领取成功，可在优惠券列表查看',
              showCancel: false
            })
          } else if (res.code == '40013') {
            wx.showModal({
              title: '优惠券提醒',
              content: res.message,
              showCancel: false,
              success () {
                this.$emit('closeWelcomeDialog',false)
              }
            })
          }  
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },

      getCoupusList (activityId) {
        //优惠券加载
        wx.showLoading() 
        Api.activity.fresh({
          activityId: this.activityId,
          storeId: this.storeId
        }).then(res => {      
          if (res.code == Api.CODES.SUCCESS) {
            this.activity = res.data.activity
            this.conpousList = res.data.objectList 
            wx.setNavigationBarTitle({
              title: res.data.activity.activityName
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading()) 
      },

      //获取相关商品
      getGoodList () {
        Api.activity.couponGoods({ 
            activityId: this.activityId ,
            storeId: 1 ,
            pageNumber: this.pageNumber
        }).then(res => {
          if(res.code == Api.CODES.SUCCESS) {
              this.goodList = res.data
          }
        })
        
      }
    },
    onLoad (options) {
      this.activityId = options.id
      this.getCoupusList()
      this.getGoodList()
    }
  }
</script>

<style scoped lang="scss">
  .banner {
    position: relative;
    img {
      width: 100%; 
      vertical-align: middle;
    }
    scroll-view {
      position: absolute;
      white-space: nowrap;
      left: 30rpx;
      bottom: 150rpx;
      width: 720rpx;
    }

    button {
      position: absolute;
      left: 200rpx;
      right: 200rpx;
      bottom: 30rpx;
      background-image: -webkit-linear-gradient(left, #ff6038, #ff3f2a);
      background-image: linear-gradient(left, #ff6038, #ff3f2a);
      &.hover {
        background-image: none;
        background-color: #ff3f2a;
      }
    }
  }

  .coupon-card {
    display: inline-block;
    vertical-align: middle;
    width: 324rpx;
    height: 164rpx;
    color: #fff;
    &__top {
      display: flex;
      align-items: center;
      height: 110rpx;
      font-size: 28rpx;
      border-bottom-left-radius:15rpx;
      border-bottom-right-radius:15rpx;
      background:#FF5734;
      .card-left {
        width:40%;
        text-align:center;
        font-size:38rpx;
        border-right:1px solid #fff;
        margin-right:20rpx;
        padding-right:10rpx;
        &:after {
          height: 100rpx;
          width: 4rpx;
          background: #fff
        }
      }     
      .card-right {
        padding-right: 10rpx;
        font-size: 24rpx;
      }
    }
    &__buttom {
      height: 15;
      font-size: 24rpx;
      text-align: center;
      border-top:1px dashed #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius:15rpx;
      border-top-right-radius:15rpx;
      background:#FF5734;
    }
    + .coupon-card {
      margin-left: 20rpx;
    }
  }

  .quick-tip {
    background-color: #fff;
    color: $text-black;
    line-height: 42rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    img {
      width: 40rpx;
      height: 42rpx;
    }
  }

  .goods-list {
    background: #fff;
    padding-left: 12rpx;
    padding-right: 12rpx;
  }
</style>
