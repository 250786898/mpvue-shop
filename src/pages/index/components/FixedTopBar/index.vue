<template>
  <div class="bar">
      <div class="store-bar">
        <div class="bar-top">
          <div class="store">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/locate_icon.png" class="locate-icon" />
            <div class="store-main" @click="selectStore">
              <span class="store-name">{{shopDetail.storeName}}</span>
              <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/right_arrows_icon.png" class="right-arrows-icon" />
            </div>
          </div>
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/to_pick_up_icon.png" class="pickup-icon" alt="">
        </div>
        <div class="bar-label">
          <div class="bar-label-item">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/pickup_appointment_icon.png" class="bar-label-item__icon" />
            <span class="bar-label-item__text">预约自提</span>
          </div>
          <div class="bar-label-item" v-if="storeDistance">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/distance-icon.png" class="bar-label-item__icon" />
            <span class="bar-label-item__text">距离您{{storeDistance}}</span>
          </div>
        </div>
      </div>


       <div class="bar-search bar-fixed" v-if="fixedSearchBar" @click="navToSearchGoods">
        <div class="search-box">
          <img src="/static/images/common_icon_serch.png" class="search_icon" alt="">
          <span class="search_text">搜索商品</span>
        </div>
      </div>

      <div class="bar-search" id="ex" @click="navToSearchGoods">
        <div class="search-box">
          <img src="/static/images/common_icon_serch.png" class="search_icon" alt="">
          <span class="search_text">搜索商品</span>
        </div>
      </div>

  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  mounted() {
    let _this = this
  　setTimeout(function(){
  　  _this.setIndexBarElementHeight('#ex')
  　}, 100)
  },
  computed: {
    ...mapState(['shopDetail','indexBarHeight']),
    storeDistance () {
       if(this.shopDetail.storeDistance && this.shopDetail.storeDistance != 'undefined') {
        return this.shopDetail.storeDistance < 1 ? this.shopDetail.storeDistance * 1000 + 'm' : `${this.shopDetail.storeDistance}km`
      }else{
        return ''
      }
    }
  },
  data () {
    return {
      fixedSearchBar: false //门店bar是否显示
    }
  },

  /**
   * @description  鉴定滚动事件，从而是否显示回到顶部按钮和当前定位显示
   * */
  onPageScroll(e) {
    this.fixedSearchBar = e.scrollTop >= 60 // 超过悬浮搜索栏
  },
  methods: {

    /**
     * @description 设置bar栏目高度到vuex
     */
    setIndexBarElementHeight(id = "") {
　　　　 let _query = wx.createSelectorQuery();
　　　　_query.select(id).boundingClientRect()
　　　　_query.exec((res) =>{
　　　　　 const tHeight = res[0] && res[0].height != null ? res[0].height : ''
          this.$store.commit('setIndexBarHeight',tHeight)
            console.log('++++++++++++++++++++++++++#affix节点的上setIndexBarHeight+++++++',res); // #affix节点的上边界坐
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
     * @description 跳转搜索商品组件
     */
    navToSearchGoods () {
      wx.navigateTo({
        url: '/pages/goods/search/main'
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
@keyframes fadeInDown
{
  from {
    transform: translateY(-100%);
    opacity: 1;

  }
  to {
    transform: translateY(0);
    opacity: 0.8;
  }
}
.bar{
  background: #ffffff;
  padding: 20rpx 0 0;
  width: 100%;
  box-sizing: border-box;
  &-fixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
  }
  .store-bar {
    padding: 0 20rpx;
    margin-bottom: 20rpx;
    animation: fadeInDown .3s linear;
  }
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
    padding: 0 20rpx 10rpx;
    background: #ffffff;
    box-sizing: border-box;
    .search-box{
      width:100%;
      height: 74rpx;
      background:rgba(246,246,246,1);
      border-radius:15rpx;
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      box-sizing: border-box;
      .search_icon{
        width: 25rpx;
        height:25rpx;
        margin-right: 14rpx;
      }
      .search_text{
        color: #929292;
        font-size: 30rpx;
      }
    }
  }
}
</style>
