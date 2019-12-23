<template>
 <div class="container">
   <Top-bg />
   <div class="container-main">
     <coupon-list/>
     <EmptyIcon/>
   </div>

   <to-home />
   <to-coupon />
   <button class="fetch-btn">一键领取</button>
 </div>
</template>

<script>
import TopBg from './components/TopBg'
import CouponList from './components/CouponList/index'
import toCoupon from './components/ToCoupon'
import toHome from './components/toHome'
import EmptyIcon from '../components//EmptyCouponTip'
export default {
  components: {
    TopBg,
    CouponList,
    toHome,
    toCoupon,
    EmptyIcon
  }
}
</script>

<style lang="scss" scoped>
.container{
  min-height: 100vh;
  box-sizing: border-box;
  background: #FE4662;
  position: relative;
  padding: 426rpx 20rpx 120rpx;
  &-main{
    position: relative;
  }
  .fetch-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
    font-weight:bold;
    width:100vw;
    height:106rpx;
    line-height: 106rpx;
    background:linear-gradient(268deg,rgba(251,226,146,1) 0%,rgba(253,234,178,1) 100%);
    color: #FE4662;
    font-size: 34rpx;
  }
}
</style>
