<template>
  <div class="card" :class="{ 'bottom-line' : showLine }" @click="select">
    <image :src="item.storeLogoImg" class="store-logo" mode="aspectFit"></image>
    <div class="card-main">
      <div class="card-main-top">
        <h3 class="store-name">{{item.storeName}} </h3>
        <span class="distance" v-if="showDistance && item.storeDistance">距离{{storeDistance}}</span>
      </div>
      <div class="card-main-content">
        <p class="detail-address">{{item.storeAddress}}</p>
        <p class="shop-manager">团长：{{item.franchiseeName || item.shopIsName}}</p>
        <div class="phone-box">
          <span class="phone">电话：{{item.franchiseeTel}}</span>
        </div>

      </div>
      <img src="/static/images/arrows.png" class="arrows" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    showLine: {
      type: Boolean,
      default: true
    },
    showDistance: {
      type: Boolean,
      default: true
    },
    isClick: {
      type: Boolean,
      default: true
    },
    lastRouter:{ //上一个路由名称
      type: String,
      default: '123'
    }

  },
  computed: {
    storeDistance () {
      return this.item.storeDistance < 1 ? this.item.storeDistance * 1000 + 'm' : `${this.item.storeDistance}km`
    }
  },
  methods: {
    /**
     * @description 选择门店
     */
    select() {
      console.log('从哪个页面进来',this.lastRouter)
      if(this.isClick) {
        const storeId =  this.item.storeId || this.item.storeNumErp
        console.log('select门店',this.item)
        this.$store.commit('setCurrentStoreInfo', this.item)
        this.$store.commit('setStoreId',storeId) //当前门店接口返回的是storeNumErp
        this.$store.dispatch('confirmOrSwitchStore', {
          storeId
        }).then(() => {
          console.log('选择门店后跳转首页')
          if(this.lastRouter == 'location') {
            //如果从定位页面过来，则直接回首页
            wx.reLaunch({
              url: '/pages/index/main'
            })
          }else{
             wx.navigateBack({
              delta: 1
             })
          }

        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.bottom-line{
  border-bottom:1px solid rgba(239,239,239,1);
}
.card{
  display: flex;
  padding: 30rpx 0;
  background: #ffffff;
  position: relative;
  z-index: 9;
  .store-logo{
    width:80rpx;
    height:80rpx;
    border-radius:50%;
    margin:0 21rpx 0 0rpx;
  }
  &-main{
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    &-top{
      display: flex;
      justify-content: space-between;
      width: 100%;
      .store-name{
        font-size: 32rpx;
        font-weight:bold;
      }
      .distance{
        font-size: 28rpx;
        color: #FF6600;
        white-space: nowrap;
        position: relative;
        top: 6rpx;
      }
    }
    .card-main-content{
      font-size: 28rpx;
      color: #7F7F7F;
      margin-top: 10rpx;
      line-height: 38rpx;
      .phone-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .arrows{
      width: 30rpx;
      height: 30rpx;
      position: absolute;
      bottom: 58rpx;
      right: 0rpx;
    }
  }
}
</style>
