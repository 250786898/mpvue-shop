<template>
  <div class="dialog" v-if="show">
    <div class="mask"></div>
    <!-- <div class="close-icon" @click="hide">
        <icon type="cancel" size="40" color="#fff"></icon>
    </div> -->
    <div class="dialog-main">
      <h3 class="dialog-main-desc">订单需要您到如下门店自提,请仔细确认地址!</h3>
      <div class="store-info">
          <div class="store-info-header">
            <span class="store-name" >自提门店:{{shopDetail.storeName}}</span>
            <div class="distance" v-if="shopDetail.storeDistance">
              <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/confirm_store_location_icon.png" alt="">
              <span>{{storeDistance}}</span>
            </div>
          </div>
          <div class="detain-address">{{shopDetail.storeAddress}}</div>
      </div>

      <div class="change-box" @click="checkoutStore">
        <span>切换其他门店</span>
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/arrows.png" alt="">
      </div>
      <button type="primary"  class="comfirm-btn" @click="comfirmStore">确定</button>
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
        return this.shopDetail.storeDistance < 1 ? this.shopDetail.storeDistance * 1000 + 'm' : `${this.shopDetail.storeDistance}km`
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
    width: 646rpx;
    min-height: 500rpx;
    background: #ffffff;
    z-index: 99999;
    position: fixed;
    top: 30%;
    left: 0%;
    margin-left: 50rpx;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50rpx;
    box-sizing: border-box;
    border-radius: 12rpx;
    &-desc{
      font-size: 32rpx;
      font-weight: 800;
    }
    .store-info{
      border-radius: 12rpx;
      background: rgba(156,156,156,0.17);
      padding: 24rpx;
      width: 564rpx;
      margin-top: 22rpx;
      font-size: 28rpx;
      &-header{
        display: flex;
        margin-bottom: 8rpx;
      }
      .distance{
        color: #FFA136;
        display: flex;
        align-items: center;
        margin-left: 12rpx;
        img{
          width: 25rpx;
          height: 25rpx;
        }
      }
      .detain-address{
        width: 488rpx;
      }
    }
    .change-box{
      display: flex;
      align-items: center;
      font-size: 28rpx;
      text-align: left;
      width: 100%;
      margin-top: 30rpx;
      img{
        width: 24rpx;
        height: 24rpx;
      }
    }
    .comfirm-btn{
      width: 100%;
      height: 75rrpx;
      line-height: 75rpx;
      border-radius: 66rpx;
      background-color: #0FD7C0;
      color: rgba(255, 255, 255, 1);
      font-size: 32rpx;
      text-align: center;
      margin-top: 32rpx;
    }
  }

  .close-icon{
      position: fixed;
      z-index: 99;
      top: 280rpx;
      right: 100rpx;
    }
</style>
