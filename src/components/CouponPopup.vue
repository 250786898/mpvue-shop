<template>
  <div>
    
    <div class="coupon-list" v-if="isShowCoupon">
      <scroll-view  v-if="list" scroll-y="true" class="scroll-view">
        <template  v-for="item of list">
          <div @click="handleTapCoupon(item.couponId)" :key="item">
            <Coupon-card :status="0" :item="item"></Coupon-card>
          </div>
        </template>
      </scroll-view>
      <empty v-else :text="暂无可用的优惠券"></empty>
      <div class="close"  @click="tapMask">关闭</div>
    </div>

    <div class="mask" v-if="isShowCoupon" @click="tapMask"></div>
  </div>
</template>

<script>
import CouponCard from './CouponCard'
import Empty from './Empty'
export default {
   name: 'CouponPopup',
    props: {
      isShowCoupon: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: () => []
      }
    },
   data () {
    return {
  
    }
   },
   components: {
     CouponCard,
     Empty
   },
   methods: {  
      handleTapCoupon (couponId) {
        console.log('couponId',couponId)
        this.$emit('tapCouponItem',couponId)
      },
      tapMask () {
         this.$emit('tapMask')
      }
   }
}
</script>

<style lang="scss">
  .coupon-list{
    background: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 1000rpx;
    width: 100%;
    z-index: 99;
  }
  .close{
    height: 100rpx;
    text-align: center;
    color: red;
    border-top: 1px solid #eeeeee;
    line-height: 100rpx;
  }
  .mask{
    background: #000;
    opacity: .7;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 50;
  }
  .scroll-view{
    height: 800rpx;
    overflow-y: hidden;
    padding: 50rpx 0;
  }
</style>

