<template>
  <div class="dialog" v-if="show">
    <div class="mask"></div>
    <!-- <div class="close-icon" @click="hide">
        <icon type="cancel" size="40" color="#fff"></icon>
    </div> -->
    <div class="dialog-main">
      <h3 class="dialog-main-desc">订单需要您到如下门店自提,请仔细确认地址!</h3>
      <div class="store-info">
          <div class="store-info-header" v-if="shopDetail">
            <span class="store-name" >自提门店:{{shopDetail.storeName}}<span v-if="shopDetail && !shopDetail.isBusiness"> 休息中</span></span>
            <div class="distance" v-if="shopDetail && shopDetail.storeDistance">
              <span v-if="storeDistance && shopDetail && shopDetail.isBusiness">{{storeDistance}}</span>
            </div>
          </div>
          <div class="detain-address" v-if="shopDetail">{{shopDetail.storeAddress}}</div>
      </div>

      <div class="change-box" @click="checkoutStore">
        <span>切换其他门店</span>
        <img src="/static/images/order-right-icon.png" class="right-icon">
      </div>
      <button type="primary"  class="comfirm-btn" @click="comfirmStore" v-if="shopDetail && shopDetail.isBusiness">确定</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      storeInfo: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      ...mapState(['shopDetail']),
      storeDistance () {
        return this.shopDetail && this.shopDetail.storeDistance < 1 ? this.shopDetail.storeDistance * 1000 + 'm' : `${this.shopDetail.storeDistance}km`
      }

    },
    methods: {
      /**
       * @description 关闭弹窗
       */
      hide() {
        // this.show = false
      },

      /**
       * @description 确认门店
       */
      comfirmStore () {
        const storeId = this.shopDetail.storeId
        this.$emit('comfirmStore',storeId)
      },

      /**
       * @description 切换其他门店
       */
      checkoutStore () {
        wx.navigateTo({
          url: '/pages/store/select/main',
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-main{
    width: 710rpx;
    min-height: 500rpx;
    background: #ffffff;
    z-index: 99999;
    position: fixed;
    top: 30%;
    left: 0%;
    margin-left: 20rpx;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 45rpx 50rpx 40rpx;
    box-sizing: border-box;
    border-radius: 12rpx;
    &-desc{
      font-size: 32rpx;
      font-weight: 800;
      color: #3F3F3F;
      font-size: 34rpx;
      line-height: 45rpx;
    }
    .store-info{
      border-radius: 12rpx;
      background: rgba(156,156,156,0.17);
      padding: 30rpx 20rpx;
      margin-top: 22rpx;
      font-size: 28rpx;
      &-header{
        display: flex;
        margin-bottom: 8rpx;
        justify-content: space-between;
        align-items: flex-start;
        .store-name{
          color: #090909;
          line-height: 45rpx;
          font-size: 32rpx;
        }
      }
      .distance{
        color: #FF6600;
        display: flex;
        align-items: center;
        line-height: 45rpx;
        margin-left: 12rpx;
        font-size: 26rpx;
        img{
          width: 25rpx;
          height: 25rpx;
        }
      }
      .detain-address{
        width: 569rpx;
        color: #999999;
        font-size: 28rpx;
        line-height: 40rpx;
      }
    }
    .change-box{
      display: flex;
      align-items: center;
      font-size: 34rpx;
      text-align: left;
      width: 100%;
      color: #3F3F3F;
      margin-top: 30rpx;
      font-weight: bold;
      img{
        width: 13rpx;
        height: 22rpx;
        margin-left: 13rpx;
      }
    }
    .comfirm-btn{
      width: 606rpx;
      height: 80rrpx;
      line-height: 80rpx;
      border-radius: 10rpx;
      color: rgba(255, 255, 255, 1);
      font-size: 32rpx;
      font-weight: bold;
      text-align: center;
      margin-top: 30rpx;
    }
  }

  .close-icon{
      position: fixed;
      z-index: 99;
      top: 280rpx;
      right: 100rpx;
    }
</style>
