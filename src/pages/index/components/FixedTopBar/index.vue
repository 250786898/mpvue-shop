<template>
  <div id="ex">
    <div class="bar">
      <div class="bar-top">
        <div class="store">
          <img src="/static/images/locate_icon.png" class="locate-icon" />
          <div class="store-main" @click="selectStore">
            <span class="store-name">{{shopDetail.storeName}}</span>
            <img src="/static/images/right_arrows_icon.png" class="right-arrows-icon" />
          </div>
        </div>
        <img src="/static/images/to_pick_up_icon.png" class="pickup-icon" alt="">
      </div>
      <div class="bar-label">
        <div class="bar-label-item">
          <img src="/static/images/pickup_appointment_icon.png" class="bar-label-item__icon" />
          <span class="bar-label-item__text">预约自提</span>
        </div>
        <div class="bar-label-item">
          <img src="/static/images/distance-icon.png" class="bar-label-item__icon" />
          <span class="bar-label-item__text">距离您100m</span>
        </div>
      </div>
      <div class="bar-search">
        <div class="search-box">
          <img src="/static/images/search_icon.png" class="search_icon" alt="">
          <span class="search_text">搜索商品</span>
        </div>
      </div>
    </div>
    <div class="occupy-box">

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    let _this = this
  　setTimeout(function(){
  　  _this.setIndexBarElementHeight('#ex')
  　}, 100)
  },
  computed: {
    ...mapState(['shopDetail'])
  },
  methods: {

    /**
     * @description 设置bar栏目高度到vuex
     */
    setIndexBarElementHeight(id = "") {
　　　　 let _query = wx.createSelectorQuery();
　　　　_query.select(id).boundingClientRect()
　　　　_query.exec((res) =>{
          console.log('#affix节点的上边界坐3332',res); // #affix节点的上边界坐
　　　　　 const tHeight = res[0] && res[0].height != null ? res[0].height : ''
          this.$store.commit('setIndexBarHeight',tHeight)
　　　　 })
　　 },

    /**
     * @description 选择门店，先刷新用户定位信息再进入选择门店组件
     */
    selectStore () {
      wx.navigateTo({
        url: '/pages/store/select/main'
      })
    },

    /**
     * @description 跳转搜索商品页面组件
     */
    toSearch() {
      wx.navigateTo({
        url: "/pages/index/searchgoods/main"
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.bar{
  background: #ffffff;
  padding: 20rpx;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 230rpx;
  box-sizing: border-box;
  z-index: 999;
  &-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18rpx;
    .locate-icon,.pickup-icon{
      width: 44rpx;
      height: 44rpx;
    }
    .store{
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-main{
        display: flex;
        align-items: center;
      }
      &-name{
        color: #363F52;
        font-size: 36rpx;
        font-weight: bold;
        margin-left: 6rpx;
      }
      .right-arrows-icon{
        width: 40rpx;
        height: 40rpx;
        position: relative;
        top: 2rpx;
      }
    }
  }
  &-label{
    display: flex;
    &-item{
      display: flex;
      align-items: center;
      &__icon{
        width: 40rpx;
        height: 40rpx;
      }
      &__text{
        color: #8E8E93;
        font-size: 22rpx;
      }
    }
  }
  &-search{
    margin-top: 20rpx;
    .search-box{
      width:100%;
      height:64rpx;
      background:rgba(246,246,246,1);
      border-radius:15rpx;
      display: flex;
      align-items: center;
      padding: 0 10rpx;
      box-sizing: border-box;
      .search_icon{
        width: 45rpx;
        height:45rpx;
      }
      .search_text{
        color: #929292;
        font-size: 24rpx;
      }
    }
  }
}
.occupy-box{
  height: 230rpx;
  margin-bottom: 20rpx;
}
</style>
