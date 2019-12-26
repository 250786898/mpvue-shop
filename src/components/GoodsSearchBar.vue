<template>
  <div>
     <div class="weui-search-bar" id="ex">
      <!-- 位置 -->
      <div class="location" @click="selectStore">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/scancodepurchase_icon_location.png@2x.png" />
        <div class="location__text">
          <div class="location__text__content" v-if="shopDetail.storeName">{{shopDetail.storeName}}</div>
        </div>
      </div>
      <div class="search-bar__form" @click="toSearch">
        <div class="search-bar__box">
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_nav_icon_serve.n@2x.png" />
          <text>搜索商品</text>
          <!-- <input
            type="text"
            class="weui-search-bar__input"
            placeholder="搜索商品"
            placeholder-style="color: #ACACAC"
            readonly
            disabled
          /> -->
        </div>
      </div>
      <!-- 首页会员码 -->
      <!-- <navigator url="/pages/qrcode/index/main" class="weui-search-bar__cancel-btn">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/home_img_qrcode.png@2x.png">
      </navigator>-->

    <!-- //占位符 -->

    </div>
    <div class="occupation">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/pull_down_refresh_icon.gif" mode="aspectFit">
    </div>
  </div>


</template>
<script>
import { mapState } from "vuex";
import config from "@/config"
export default {
  props: {
    showtip: {
      type: Boolean,
      default: true
    },

  },
  computed: {
    ...mapState(['shopDetail'])
  },
  data() {

  },





  created() {

  },

  onShow() {
    // this.storeName = this.$store.state.shopDetail.storeName;
    // console.log('kkk',this.storeName)
  },

    mounted() {
      let _this = this
  　　setTimeout(function(){
  　    　_this.setIndexBarElementHeight('#ex')
  　　}, 100)
  },

  methods: {

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

    //   cityModalShowshop(){
    // console.log(this.$store.state.tempOrder)
    //  },

    toSearch() {
      wx.navigateTo({
        url: "/pages/goods/search/main"
      });
    }
  }
}
</script>

<style scoped lang="scss">
.occupation{
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  img{
    width: 100rpx;
    height: 100rpx;
  }
}
.weui-search-bar {
  height: 100rpx;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  padding: 18rpx 20rpx;
  // background-color: #0FD7C0;
  background: #fff;
  border-top: 0 none;
  border-bottom: 0 none;
  justify-content: space-between;
  &__box {
    padding-left: 70rpx;
    > img {
      position: absolute;
      width: 56rpx;
      height: 56rpx;
      top: 4rpx;
      left: 14rpx;
    }
  }
  &__form {
    border-radius: 8rpx;
    border: 0 none;
    margin-right: 16rpx;
  }
  &__input {
    height: 64rpx;
    line-height: 64rpx;
    font-size: 24rpx;
    color: #acacac;
  }
  &__cancel-btn img {
    width: 64rpx;
    height: 64rpx;
    vertical-align: top;
  }
}
.search-bar__form{
  background: #f7f7f7;
  width: 200rpx;
  border-radius: 15rpx;
}
.search-bar__box{
  padding-right: 10rpx;
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #acacac;
  height: 100%;
  img{
    width: 56rpx;
    height: 56rpx;
    color: #acacac;
  }
}
.location {
  display: flex;
  align-items: center;
  img {
    display: block;
    margin-top: 2rpx;
    width: 40rpx;
    height: 40rpx;
  }
  &__text {
    // padding: 4rpx 14rpx 10rpx;
    margin-left: 8rpx;
    border-radius: 10rpx;
    font-size: 32rpx;
    line-height: 32rpx;
    max-width: 400rpx;
    font-weight: 800;
    display: flex;
    align-items: center;
    position: relative;
    top: 2rpx;
    &__content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:after {
      content: "";
      display: inline-block;
      border-left: 16rpx solid transparent;
      border-right: 16rpx solid transparent;
      border-top: 16rpx solid rgba(0, 0, 0, 1);
      border-radius: 10rpx;
      position: relative;
      top: 5rpx;
      margin-left: 2rpx;
    }
  }
}
</style>
