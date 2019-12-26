<template>
  <div class="store-list">
    <div class="store-list-item" v-for="item in storeList" v-bind:key="item.storeId">
       <div class="store-name">{{item.storeName}}</div>
       <div class="detail-address">{{item.storeAddress}}</div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/http/api'
import CouponModel from '../../../model/coupon'
const couponModel = new CouponModel()

export default {
  data () {
    return {
      storeList: [] //试用门店列表
    }
  },
  mounted () {
    this.getApplyStore()
  },

  methods: {
    /**
    * @description 获取可使用门店
    */
    async getApplyStore() {

      wx.showLoading({
        title: '加载中'
      })
      const res = await couponModel.getApplyStore({
        systemCode: this.$root.$mp.query.couponCode,
        storeId: this.storeId
      })
      wx.hideLoading()
      console.log('this.$root.$mp.query.couponCode',res.data.shopStores)
      if(res.code == Api.CODES.SUCCESS) {
        this.storeList = res.data.shopStores
      }
    }
  }
}
</script>

<style>
page{
  background: #F1F1F1;
}
</style>

<style lang="scss" scoped>
.store-list{
  background: #f5f5f5;
  padding: 20rpx 0 0rpx 0;
  &-item{
    background: #ffffff;
    padding: 40rpx 30rpx 20rpx;
    box-sizing: border-box;
    &:after{
      border-bottom: 1px solid #929292;
      content: ' ';
      display: block;
      height: 1px;
      width: 100%;
      margin-top: 20rpx;
    }
    &:nth-last-of-type(1) {
      &:after{
        border: none;
      }
    }

    .store-name{
      margin-bottom: 14rpx;
      font-size: 32rpx;
      font-weight:bold;
    }
    .detail-address{
      color: #999999;
      margin-top: 17rpx;
      font-size: 28rpx;
      line-height: 1.3;
    }
  }
}
</style>
