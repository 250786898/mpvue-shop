<template>
  <div class="dialog" v-if="show">
    <div class="mask"></div>
    <!-- <div class="close-icon" @click="hide">
        <icon type="cancel" size="40" color="#fff"></icon>
    </div> -->
    <div class="dialog-main">
      <div class="dialog-main-header">
        <span class="dialog-main-header__title">请选择合适的自提门店</span>
        <span class="dialog-main-header__desc">您当前访问的门店与常用不同，请重新选择门店</span>
      </div>
    <radio-group  class="store-list" @change="checkoutStoreType">

       <label class="select-store-item">
        <radio class="select-store-item-radio" :disabled="shareStoreInfo.isBusiness == 0" value="current" color="#0FD7C0" />
        <div>
          <div class="select-store-item-header">

            <div class="store-name" v-if="shareStoreInfo">
             {{shareStoreInfo.storeName}}<span v-if="!shareStoreInfo.isBusiness">休息中</span>
            </div>

            <div class="store-tag">
              当前访问门店
            </div>

            <div class="distance" v-if="shareStoreInfo && shareStoreInfo.isBusiness">
              <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/confirm_store_location_icon.png" alt="">
              <span>距离您{{shareStoreDistance}}</span>
            </div>

          </div>
          <span class="detail-address" v-if="shareStoreInfo">
            {{shareStoreInfo.storeAddress}}
          </span>
        </div>
      </label>

        <label class="select-store-item">
        <radio class="select-store-item-radio" value="usually" color="#0FD7C0" :disabled="usuallyStoreInfo.isBusiness == 0" />
        <div >
          <div class="select-store-item-header">

            <div class="store-name" v-if="usuallyStoreInfo">
              {{usuallyStoreInfo.storeName}}<span v-if="!usuallyStoreInfo.isBusiness">休息中</span>
            </div>

            <div class="store-tag">
              经常访问门店
            </div>

            <div class="distance" v-if="usuallyStoreInfo && usuallyStoreInfo.isBusiness">
              <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/confirm_store_location_icon.png" alt="">
              <span>距离您{{usuallyStoreDistance}}</span>
            </div>

          </div>
          <span class="detail-address" v-if="usuallyStoreInfo">
            {{usuallyStoreInfo.storeAddress}}
          </span>
        </div>

      </label>

    </radio-group >
      <div class="change-box"  @click="checkoutStore" v-if="shareStoreInfo.isBusiness || usuallyStoreInfo.isBusiness">
        <span>切换其他门店</span>
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/arrows.png" alt="">
      </div>
      <button type="primary"  class="comfirm-btn" @click="checkoutStore"  v-if="!shareStoreInfo.isBusiness && !usuallyStoreInfo.isBusiness">切换其他门店</button>
      <button type="primary"  class="comfirm-btn" @click="comfirmStore" v-else>确定</button>
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
      ...mapState(['shareStoreInfo','usuallyStoreInfo']),
      shareStoreDistance () {
        if(this.shareStoreInfo) {
           return this.shareStoreInfo.storeDistance < 1 ? this.shareStoreInfo.storeDistance * 1000 + 'm' : `${this.shareStoreInfo.storeDistance}km`
        }else{
          return ''
        }

      },
      usuallyStoreDistance () {
        if(this.usuallyStoreInfo) {
          return this.usuallyStoreInfo.storeDistance < 1 ? this.usuallyStoreInfo.storeDistance * 1000 + 'm' : `${this.usuallyStoreInfo.storeDistance}km`
        }else{
          return ''
        }
      }
    },
    data() {
      return {
        selectType: '', //选择类型：current：当前访问门店 usually：经常访问门店 。 默认为当前访问门店
      }
    },
    methods: {
      /**
       * @description 关闭弹窗
       */
      comfirmStore() {
        console.log('currentType',this.selectType)
        if(this.selectType) {
          const storeId = this.selectType == 'current' ? this.shareStoreInfo.storeId : this.usuallyStoreInfo.storeId
          console.log('选择门店组件选择的Id',storeId)
          this.$emit('comfirmStore',storeId)
        }else{
          wx.showToast({
            title: '请选择门店',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false
          })
        }

      },

      /**
       * @param{string} 门店类型
       * @@description 切换门店类型
       */
      checkoutStoreType ({ mp : {detail :{ value} } }) {
        this.selectType = value
      },

      /**
       * @description 切换其他门店
       */
      checkoutStore () {
        wx.navigateTo({ url: '/pages/store/select/main' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-main{
    width: 100vw;
    background: #ffffff;
    z-index: 99999;
    position: fixed;
    bottom: 0;
    left: 0%;
    z-index: 100;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 66rpx;
    &-header{
      display: flex;
      flex-direction: column;
      padding: 28rpx 16rpx;
      border-bottom: 1px solid rgba(187, 187, 187, 0.36);
      &__title{
        font-size: 32rpx;
        font-weight: bold;
      }
      &__desc{
        font-size: 24rpx;
      }
    }
    .store-list{
      .select-store-item{
        display: flex;
        align-items: center;
        padding: 36rpx 0 36rpx 16rpx;
        border-bottom: 1px solid rgba(187, 187, 187, 0.36);
        &-header{
          display: flex;
          align-items: center;
          .store-name{
            font-size: 27rpx;
            font-weight: 800;
            margin-right: 14rpx;
          }
          .store-tag{
            background-color: $orange-color;
            width: 130rpx;
            height: 36rpx;
            line-height: 36rpx;
            border-radius: 0;
            color: white;
            font-size: 18rpx;
            text-align: center;

          }
        }
        .detail-address{
          font-size: 26rpx;
          color: $text-gray;
        }
        &-radio{
          margin-right: 16rpx;
          transform: scale(0.8)
        }
      }
      .distance{
        color: #FFA136;
        display: flex;
        align-items: center;
        margin-left: 12rpx;
        font-size: 24rpx;
        img{
          width: 24rpx;
          height: 24rpx;
        }
      }
    }
    .change-box{
      display: flex;
      align-items: center;
      font-size: 28rpx;
      text-align: left;
      padding-left: 66rpx;
      color: #101010;
      width: 100%;
      margin-top: 30rpx;
      img{
        width: 24rpx;
        height: 24rpx;
      }
    }
    .comfirm-btn{
      width: 568rpx;
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
