<template>
  <div class="weui-search-bar">
    <!-- 位置 -->
    <navigator url="/pages/store/select/main" class="location">
      <img src="/static/images/scancodepurchase_icon_location.png@2x.png" />
      <div class="location__text" v-if="showtip">
        <div class="location__text__content">当前：{{shopDetail.storeName}}</div>
      </div>
    </navigator>
    <div class="weui-search-bar__form" @click="toSearch">
      <div class="weui-search-bar__box">
        <img src="/static/images/common_nav_icon_serve.n@2x.png" />
        <input
          type="text"
          class="weui-search-bar__input"
          placeholder="请搜索附近商家商品"
          placeholder-style="color: #ACACAC"
          readonly
          disabled
        />
      </div>
    </div>
    <!-- 首页会员码 -->
    <!-- <navigator url="/pages/qrcode/index/main" class="weui-search-bar__cancel-btn">
      <img src="/static/images/home_img_qrcode.png@2x.png">
    </navigator>-->

  <!-- //占位符 -->
  <div class="occupation"></div> 
  </div>
  
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    storeName: {
      type: String,
      default: ""
    },
    showtip: {
      type: Boolean,
      default: true
    },
    
  },
  computed: {
    ...mapState(['shopDetail'])
  },
  data() {
    return {
      storeName: ''
    };
  },





  created() {
 
  },
  
  onShow() {
    // this.storeName = this.$store.state.shopDetail.storeName;
    // console.log('kkk',this.storeName)
  },

  methods: {
   
  
    //   cityModalShowshop(){
    // console.log(this.$store.state.tempOrder)
    //  },

    toSearch() {
      wx.navigateTo({
        url: "/pages/index/searchgoods/main"
      });
    }
  }
}
</script>

<style scoped lang="scss">
.occupation{
  height: 100rpx;
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
  width: 300rpx;
  border-radius: 10rpx;
}
.search-bar__box{
  padding-right: 10rpx;
  display: flex;
  align-items: center;
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