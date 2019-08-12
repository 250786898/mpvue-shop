<template>
  <div>
    <div class="weui-form-preview lj-form-preview">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item deliveryBox" v-for="item in items" :key="item.label">
          <template v-if="deliveryType == 1 && item.label != '优惠券'">
            <div class="weui-form-preview__label">{{ item.label }}</div>
            <div class="weui-form-preview__value" v-html="item.value"></div>
          </template>
          <template v-if="deliveryType == 1 && item.label == '优惠券' && activityType">

            <div class="deliveryBox" @click="tapCoupon">

              <div class="weui-form-preview__label">{{ item.label }}</div>

              <div v-if="!couponPrice">
                <span>{{list.length}}张优惠券可用</span>
                <img class="weui-form-preview__value" src="/static/images/b1_icon_arrow_go.png" @click="tapCoupon" style="width:12rpx;height:22rpx;">
              </div>

              <div class="weui-form-preview__value" v-else>减 ￥{{couponPrice}} <img class="weui-form-preview__value" src="/static/images/b1_icon_arrow_go.png" @click="tapCoupon" style="width:12rpx;height:22rpx;"></div>

            </div>

          </template>

          <template v-if="deliveryType == 2 && item.label == '优惠券' && activityType"  @click="tapCoupon">
           <div class="deliveryBox" @click="tapCoupon">

              <div class="weui-form-preview__label">{{ item.label }}</div>

              <div v-if="!couponPrice">
                <span>{{list.length}}张优惠券</span>
                <img class="weui-form-preview__value" src="/static/images/b1_icon_arrow_go.png" @click="tapCoupon" style="width:12rpx;height:22rpx;">
              </div>

              <div class="weui-form-preview__value" v-else>减 ￥{{couponPrice}} <img class="weui-form-preview__value" src="/static/images/b1_icon_arrow_go.png" @click="tapCoupon" style="width:12rpx;height:22rpx;"></div>

            </div>
          </template>
        </div>
      </div>
    </div>

      <coupon-popup :isShowCoupon="isShowCoupon" @tapMask="tapMask"  :list="list" @tapCouponItem="tapCouponItem"></coupon-popup>

  </div>
</template>

<script>
  import CouponPopup from './CouponPopup.vue'
  export default {
     components: {
      CouponPopup
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      deliveryType: {
        type: Number,
        default: () => 1
      },
      list: {
        type: Array,
        default: () => []
      },
      couponPrice: {
        type: String,
        default:''
      },
      activityType: {
        type: Number,
        default: 1
      }
    },

    data() {
      return {
        isShowCoupon: false,
      }
    },
    methods: {
      tapCoupon () {
        wx.setNavigationBarTitle({
          title: '选择优惠券'
        })
        this.isShowCoupon = true
      },
      tapMask () {
         wx.setNavigationBarTitle({
          title: '确认订单'
        })
        this.isShowCoupon = false
      },
      tapCouponItem (id) {
        wx.setNavigationBarTitle({
          title: '确认订单'
        })
        this.isShowCoupon = false
        this.$emit('tapCouponItem',id)
      }
    },
    onUnload () {
      this.isShowCoupon = false
    }
  }
</script>

<style scoped>
  .deliveryBox{
    display:flex;
    align-items:center;
    justify-content:space-between;
    width: 100%;
  }
  img{
    display: inline-block;
    margin-left: 10px;
  }
</style>
