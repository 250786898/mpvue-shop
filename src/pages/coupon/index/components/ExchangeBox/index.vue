<template>
  <div class="exchange">
      <div class="input-wrap">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/search_icon.png" class="search-icon" alt="">
        <input type="text" placeholder="请输入兑换码" class="exchange-input" v-model="exchangeCouponNO">
      </div>
      <span class="exchange-btn" @click="exchangeCoupon">兑换</span>
  </div>
</template>

<script>
import CouponModel from '@/model/coupon'
import { Api } from '@/http/api'
const couponModel = new CouponModel()
export default {
  data () {
    return {
      exchangeCouponNO: '' //优惠券兑换码
    }
  },
  methods: {
    /**
     * @description 兑换优惠券
     */
    async exchangeCoupon () {
      if(!this.exchangeCouponNO) {
        wx.showToast({
          title: '请输入兑换码~', //提示的内容,
          icon: 'none' //图标,
        })
        return false
      }
      const res = await couponModel.receiveCoupon({
        systemCode: this.exchangeCouponNO
      })
      if(res.code == Api.CODES.SUCCESS) {
        wx.showToast({
          title: '兑换成功~', //提示的内容,
          icon: 'none' //图标,
        })
      }else{
         wx.showToast({
          title: res.message, //提示的内容,
          icon: 'none' //图标,
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.exchange{
  background: #ffffff;
  padding: 20rpx 30rpx 10rpx 20rpx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .input-wrap{
    width:618rpx;
    height:74rpx;
    background:rgba(243,243,243,1);
    border-radius:10rpx;
    display: flex;
    align-items: center;
    padding: 0 10rpx;
    margin-right: 26rpx;
    box-sizing: border-box;
    .search-icon{
      width: 50rpx;
      height: 50rpx;
      margin-right: 10rpx;
    }
    .exchange-input{
      color: #929292;
      font-size: 30rpx;
    }
  }
  &-btn{
    color: #4A4949;
    font-size: 28rpx;
  }
}
</style>
