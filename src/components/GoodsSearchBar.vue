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
.weui-search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  padding: 18rpx 10rpx;
  // background-color: #0FD7C0;
  background: linear-gradient(
    -90deg,
    rgba(18, 205, 207, 1),
    rgba(12, 225, 179, 1)
  );
  border-top: 0 none;
  border-bottom: 0 none;
  margin-top: 128rpx;
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
    border-radius: 32rpx;
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
.location {
  position: relative;
  padding: 0 20rpx 0 16rpx;
  img {
    display: block;
    margin-top: 2rpx;
    width: 42rpx;
    height: 52rpx;
  }
  &__text {
    position: absolute;
    bottom: -72rpx;
    left: 0;
    z-index: 11;
    padding: 10rpx 14rpx;
    border-radius: 10rpx;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 24rpx;
    max-width: 400rpx;
    &__content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:after {
      content: "";
      position: absolute;
      top: -16rpx;
      left: 26rpx;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-bottom: 16rpx solid rgba(0, 0, 0, 0.5);
    }
  }
}
</style>