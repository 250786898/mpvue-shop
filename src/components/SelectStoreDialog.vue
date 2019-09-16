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

       <label class="store-item">
        <radio class="store-item-radio" :checked="true" value="current" />
        <div>
          <div class="store-item-header">

            <div class="store-name">
             {{shareStoreInfo.storeName}}
            </div>

            <div class="store-tag">
              当前访问门店
            </div>

            <div class="distance">
              <img src="/static/images/common_icon_greenlocation@2x.png" alt="">
              <span>距离您{{shareStoreInfo.storeDistance}}km</span>
            </div>

          </div>
          <span class="detail-address">
            {{shareStoreInfo.storeAddress}}
          </span>
        </div>
      </label>

        <label class="store-item">
        <radio class="store-item-radio" value="usually" />
        <div>
          <div class="store-item-header">

            <div class="store-name">
              {{usuallyStoreInfo.storeName}}
            </div>

            <div class="store-tag">
              经常访问门店
            </div>

            <div class="distance">
              <img src="/static/images/common_icon_greenlocation@2x.png" alt="">
              <span>距离您{{usuallyStoreInfo.storeDistance}}km</span>
            </div>

          </div>
          <span class="detail-address">
            {{usuallyStoreInfo.storeAddress}}
          </span>
        </div>
      </label>

    </radio-group >
      <div class="change-box"  @click="checkoutStore">
        <span>切换其他门店</span>
        <img src="/static/images/arrows.png" alt="">
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
      ...mapState(['shareStoreInfo','usuallyStoreInfo'])
    },
    data() {
      return {
        selectType: 'current', //选择类型：current：当前访问门店 usually：经常访问门店 。 默认为当前访问门店
      } 
    },
    methods: {
      /**
       * @description 关闭弹窗
       */
      comfirmStore() {
        const storeId = this.selectType == 'current' ? this.shareStoreInfo.storeId : this.usuallyStoreInfo.storeId
        console.log('comfirmStore',storeId)
        this.$emit('comfirmStore',storeId)
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
        wx.redirectTo({
          url: '/pages/store/select/main',
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-main{
    width: 100vw;
    background: #ffffff;
    z-index: 999;;
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
      padding: 28rpx 36rpx;
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
      .store-item{
        display: flex;
        align-items: center;
        padding: 36rpx 0 36rpx 36rpx;
        border-bottom: 1px solid rgba(187, 187, 187, 0.36);
        &-header{
          display: flex;
          align-items: center;
          .store-name{
            font-size: 32rpx;
            font-weight: 800;
            margin-right: 14rpx;
          }
          .store-tag{
            width: 180rpx;
            height: 44rpx;
            line-height: 44rpx;
            border-radius: 8px;
            background-color: $theme-color;
            color: rgba(255, 255, 255, 1);
            font-size: 24rpx;
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
        color: $theme-color;
        display: flex;
        align-items: center;
        margin-left: 12rpx;
        font-size: 24rpx;
        img{
          width: 36rpx;
          height: 36rpx;
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
      background-color: rgba(48, 193, 165, 1);
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