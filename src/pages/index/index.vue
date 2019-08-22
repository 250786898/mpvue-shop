<template>
  <div class="container" v-if="located">
    <div class="headline">乐家生鲜</div>
<!-- 测试倒计时 -->
    <!-- <div class='timeLeft'>还有：<text style='color:red'>{{timeLeft}}</text></div> -->
    <!-- 搜索栏 -->
    <goods-search-bar :location="location" :showtip="tipShown" > </goods-search-bar>
    <!-- if 配送范围内 -->
    <template v-if="storeId">
      <!-- Swiper -->
      <div class="swiper-wrap">
        <swiper
          :indicator-dots="true"
          :autoplay="true"
          :circular="true"
          class="swiper"
          :style="swiperHeightStyle"
          indicator-color="#B3B3B3"
          indicator-active-color="#FFFFFF"
        >
        <!-- 轮播图跳转 :url="item.activitySubType ?  navigateToUrl[item.activityType][item.activitySubType] + item.activityId : navigateToUrl[item.activityType] + item.activityId " -->
          <navigator
            v-for="item in storeData.bannerList"
            :key="item.activityId"
  
          >
            <swiper-item>
              <img :src="item.bannerUrl" class="slide-image" mode="aspectFit" />
            </swiper-item>
          </navigator>
        </swiper>
      </div>
    

      <!-- GoodsRecommend -->
      <goods-recommend></goods-recommend>
      <!-- Fixed -->
      <!-- <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/home_img_Redenvelopes@2x.png" class="fixed-redpack" @click="navigateToRedpack"> -->
      <img
        src="/static/images/home_btn_top@2x.png"
        class="fixed-backtop"
        @click="backToTop"
        v-show="backToTopButtonShowed"
      />
    </template>

    <!-- else -->
    <template v-else>
      <navigator url="/pages/index/selectaddress/main" class="quick-tip quick-tip_follow">
        <div class="weui-cell" style="padding: 0;">
          <div class="weui-cell__hd">
            <img src="/static/images/warning_icon@2x.png" />
          </div>
          <div class="weui-cell__bd" style="color: #333; line-height: 36rpx;">当前位置不在配送范围之内，请搜索其他收货地址</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </navigator>
      <div class="out-swiper-wrap">
        <swiper
          :indicator-dots="true"
          :autoplay="true"
          class="swiper"
          indicator-color="#B3B3B3"
          indicator-active-color="#FFFFFF"
        >
          <navigator
            v-for="item in outScopeData.articleList"
            :key="item.acId"
            url="/pages/topnews/list/main"
          >
            <swiper-item>
              <img :src="item.image" class="slide-image" mode="aspectFill" />
            </swiper-item>
          </navigator>
        </swiper>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Api } from "@/http/api";
import { AMapWX } from "@/utils/amap-wx";
import config from "@/config.js";
import GoodsSearchBar from "@/components/GoodsSearchBar";
import GoodsRows from "@/components/GoodsRows";
import GoodsRecommend from "@/components/GoodsRecommend";
import WelcomeDialog from "@/components/WelcomeDialog";
import GoodsThemeDialog from "@/components/GoodsThemeDialog";
import { serialize } from '@/utils/';

var mta = require("../../utils/mta_analysis.js");

const DEFAULT_CLASS_NUM = 9;
export default {
  components: {
    GoodsSearchBar,
    GoodsRows,
    GoodsRecommend,
    WelcomeDialog,
    GoodsThemeDialog
  },

  data() {
    return {
      located: false,
      swiperHeight: 330,
      welcomeDialogShowed: false,
      goodsThemeDialogShowed: false,
      backToTopButtonShowed: false,
      storeData: {},
      outScopeData: {},
      _cacheLocation: {},
      tipShown: true,
      allNavShown: false, //显示全部导航
      activityInfo: {}, //弹窗活动相关信息,
      newcomeActivityInfo: {},
      formId: "",
      navigateToUrl: config.ACTIVITY_TYPE,
      long:'',
      lat:'',
      sto:'',
      shareStoreId: 0 , //分享的门店id
     
    };
  },
  created() {
    this.getStoreData()
  },

  onReady() {
  
  },

  computed: {


    ...mapState(["location", "storeId"]),
    swiperHeightStyle() {
      return this.swiperHeight ? `height: ${this.swiperHeight}rpx;` : "";
    },
    classList() {
      //导航列表
      if (!this.storeData.classList) return [];
      const classLenth =
        this.storeData.classList.length >= 4 &&
        this.storeData.classList.length < 9
          ? 4
          : 9;
      return this.allNavShown
        ? this.storeData.classList
        : this.storeData.classList.slice(0, classLenth);
    },
    allNavButtonShown() {
      //是否显示全部导航按钮
      let classNum = this.storeData.classList
        ? this.storeData.classList.length
        : 0;
      return !this.allNavShown; //&& classNum > DEFAULT_CLASS_NUM
    }
  },

  //向上刷新数据
  onPullDownRefresh() {
    this.getStoreData(this.storeId);
  },
  onUnload() {
    // console.log('onUnload')
  },
  methods: { 

     getData(){
       Api.index.storeList({ longitude:this.long, latitude:this.lat,storeId:this.sto }).then(res => {
         this.setInitStoreInfo(res.data.storeList)
         
       })
    },

    /**
     * @description 设置初始化门店相关信息，如果是分享小程序进来的，设置分享门店的信息，否则显示定位门店信息
     */
    setInitStoreInfo (storeList) {
      if(this.shareStoreId) {
        //有分享情况
        console.log('有分享情况')
        const storeItem = this.findStoreByStoreId(storeList,this.shareStoreId)
        this.$store.commit('setItem', this.shareStoreId )
        this.$store.commit('setItem', storeItem)
        this.getStoreData(this.shareStoreId)
      }else{
        console.log('NO情况',storeList[0].storeId)
        this.$store.commit("setStoreId", storeList[0].storeId); 
        this.$store.commit('setItem',{storeName:storeList[0].storeName,storeId:storeList[0].storeId})
        this.getStoreData(storeList[0].storeId)
      }
    },

    findStoreByStoreId (storeList,storeId) {
        console.log('findStoreByStoreId',storeList)
        for (let i=0; i<storeList.length; i++) {
           if(storeList[i].storeId == storeId) {
            return storeList[i]
          }
        }
       
    },

    // 获取formId
    uploadFormId(e) {
      this.formId = e.target.formId;
      console.log('tt',this.formId)
    },

    // 获取店铺数据
    getStoreData(storeId) {
      Api.index.getIndexData({ storeId }).then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.storeData = res.data;
          console.log("storeData", this.storeData);
          if (this.storeData.prizeCouponActivityId != 0) {
            this.getCouponsFresh();
          }
        }
        wx.stopPullDownRefresh();
      });
   
    },
    //优惠券加载
    getCouponsFresh() {
      Api.activity
        .fresh({
          activityId: this.storeData.prizeCouponActivityId,
          storeId: this.storeId
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.newcomeActivityInfo = res.data.activity;
            this.welcomeDialogShowed = true;
          }
        });
    },

    // 获取配送外时的首页数据
    getDataOutScope() {
      Api.index
        .getDataOutScope({
          longitude: this.location.longitude,
          latitude: this.location.latitude
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.outScopeData = res.data;
          }
        });
    },

    /**
     * @description 获取首页数据
     */
    getIndexData({ longitude, latitude, city = "" }) {
      console.log("坐标", longitude, latitude);
    
      wx.showLoading({ mask: true });
      // 判断是否在配送范围内
      Api.index
        .isDeliveryScope({
          longitude,
          latitude,
          city
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.located = true;
            // @DEBUG:
            // res.data.isInScope = 0
            // 在配送范围内时，自动选择门店，并获取该门店数据
            if (res.data.isInScope === 1) {
              console.log("在配送范围内");
              console.log("setStoreId", res.data.storeId);
              // this.$store.commit("setStoreId", this.shareStoreId || res.data.storeId);
              this.$store.commit("setStoreInfo", res.data);
              this.getStoreData(this.shareStoreId || res.data.storeId);
            } else {
              console.log("不在配送范围内");
              this.getDataOutScope();
            }
            this._cacheLocation = this.location;
          } else {
            console.error(res.message);
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading());
    },

    /**
     * @description 选择门店
     */
    selectStore(store) {
      this.$store.commit("setStoreId", store.storeId);
      this.$store.commit("setStoreInfo", store);
      // console.log('storeData',this.storeData)
      this.getStoreData(store.storeId);
      wx.pageScrollTo({
        scrollTop: 0
      });
    },


    /**
     * @description 计算Swiper图片高度
     */
    onSwiperImageLoad(e) {
      if (e.target.height > this.swiperHeight) {
        this.swiperHeight = e.target.height;
      }
    },

    /**
     * @description 回到顶部
     */
    backToTop() {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        });
      }
    },

    /**
     * @description 跳转rockpack页面
     */
    navigateToRedpack() {
      wx.navigateTo({
        // url: "/pages/rockpack/index/main"
      });
    },

    /**
     * @description 判断当前位置是否改变
     */
    isLocationChange() {
      if (
        this._cacheLocation &&
        (this._cacheLocation.longitude !== this.location.longitude ||
          this._cacheLocation.latitude !== this.location.latitude)

      )
        return true;

      return false;
    },

    /**
     * @params {String} pcId 当前分类编码
     * @description 保存当前分类编码到全局
     */
    saveGoodsTabParams(pcId) {
      getApp().globalData.pcId = pcId;
    },

    /**
     * @item {Object} item 当前分类对象
     * @description 保存当前分类到全局并跳转到分类页面
     */
    onLoadMore(item) {
      this.saveGoodsTabParams(item.pcId);
      wx.switchTab({
        url: "/pages/goods/index/main"
      });
    },
  },

  onShow() {

      // this.data.timer = setInterval(() =>{ //注意箭头函数！！
      // this.setData({
      //   timeLeft: this.getTimeLeft(this.data.datetimeTo)//使用了util.getTimeLeft
      // });
      // if (this.data.timeLeft == "0天0时0分0秒") {
      //   clearInterval(this.data.timer);
      //   }
      // }, 1000);




    // console.log(this.location);
    if (!this.location.longitude) {
      //获取当前定位
      console.log('获取当前定位')
      wx.showLoading({ title: "定位中", mask: true });
      let amap = new AMapWX({ key: config.AMAP_KEY });
      //检索周边的POI
      amap.getPoiAround({
        success: res => {
          // console.log('e.success',res)
          this.$store.commit("setLocationInfo", res.markers[0]);

          console.log('8888',res.markers[0])
          this.long=res.markers[0].longitude;
          this.lat=res.markers[0].latitude
          this.getData();
      
          // console.log(res.markers[0])
          this.getIndexData({
            longitude: res.markers[0].longitude,
            latitude: res.markers[0].latitude
          });
          // console.log(this.r, 'hhh')
          if (this.r) {
            let r = decodeURIComponent(this.r);
            delete this.r;
            wx.navigateTo({ url: r });
          }
        },
        // 引导用户设置定位权限
        fail: e => {
          // console.log('e.errMsg',e.errMsg)
          if (
            e.errMsg === "getLocation:fail auth deny" ||
            "getLocation:fail:auth denied"
          ) {
            wx.hideLoading();
            wx.redirectTo({ url: "/pages/location/main" });
          }
        }
      });
      // 如果重新选了地址，要判断是否在配送范围内
    } else if (this.isLocationChange()) {
      //切换配送
      this.getIndexData({
        longitude: this.location.longitude,
        latitude: this.location.latitude
      });
    } else {
      if (this.r) {
        let r = decodeURIComponent(this.r);
        delete this.r;
        wx.navigateTo({ url: r });
      }
    }
  },


  onLoad(e) {

    console.log('this.$mp.page.options',this.$mp.page.options.storeId)
    const shareStoreId = this.$mp.page.options.storeId
    if(shareStoreId) {
      this.shareStoreId = shareStoreId
      this.$store.commit('setStoreId', shareStoreId)
    }
    
    this.r = e.r;
<<<<<<< HEAD
    mta.Page.init(); //第三方统计数据
=======
  

>>>>>>> db9e2f19a3879e3bf906e39b10aec6ceb3177115
  },

  /**
   * @description  鉴定滚动事件，从而是否显示回到顶部按钮和当前定位显示
   * */
  onPageScroll(e) {
    this.backToTopButtonShowed = e.scrollTop >= 200;
    this.tipShown = e.scrollTop < 100;
  },

  /*
    * @description 页面分享
    */
  onShareAppMessage() {
    return {
      title: '满世界给你找好吃的',
      path: `/pages/index/main?storeId=${this.storeId}`,
      imageUrl: ''
    }
  }
};
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>

<style scoped lang="scss">
.headline {
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  width: 750rpx;
  height: 137rpx;
  background: linear-gradient(
    -90deg,
    rgba(18, 205, 207, 1),
    rgba(12, 225, 179, 1)
  );
  text-align: center;
  line-height: 200rpx;
  color: #fff;
  z-index: 10;
}

.container {
  padding-top: 100rpx;
}
.swiper-wrap {
  padding: 28rpx 20rpx 14rpx 20rpx;
  background-color: #fff;
  margin-top: 129rpx;
}

.swiper img {
  vertical-align: middle;
  width: 100%;
  height: 328rpx;
}

.out-swiper-wrap {
  margin-top: 20rpx;
  background-color: #fff;
  swiper {
    &,
    img {
      height: 592rpx;
    }
  }
}
.quick-tip_follow {
  position: fixed;
  top: 100rpx;
  left: 0;
  right: 0;
}

.banner img {
  vertical-align: middle;
  width: 100%;
  height: 234rpx;
}

.goods-category {
  background-color: #fff;
  padding-bottom: 20rpx;

  .weui-grids {
    border-top: 0 none;
    border-left: 0 none;
  }

  .weui-grid {
    width: 20%;
    border-right: 0 none;
    border-bottom: 0 none;
    padding: 20rpx 10rpx;
    &__icon {
      width: 100rpx;
      height: 100rpx;
    }
    &__label {
      // color: #666;
      font-size: 22rpx;
    }
    &:nth-child(5n + 1) {
      padding-left: 0;
    }
    &:nth-child(5n + 5) {
      padding-right: 0;
    }
  }
}

.topnews {
  margin: 20rpx;
  background-color: #fff;
  -webkit-box-shadow: 0 4rpx 8rpx rgba(110, 110, 110, 0.24);
  box-shadow: 0 4rpx 8rpx rgba(110, 110, 110, 0.24);
  border-radius: 10rpx;
  .weui-flex__item {
    display: flex;
    align-items: center;
  }
  .weui-cell {
    padding: 0 16rpx 0 0;
    &__hd img {
      width: 110rpx;
      height: 110rpx;
      vertical-align: middle;
    }
    &__bd {
      font-size: 26rpx;
      line-height: 32rpx;
      color: #333;
    }

    swiper {
      height: 110rpx;
    }

    .weui-flex {
      padding-top: 23rpx;
      padding-bottom: 23rpx;
      img {
        margin-left: 80rpx;
        width: 94rpx;
        height: 64rpx;
        vertical-align: middle;
      }
    }
  }
}

.flash-area {
  background-color: #fff;
  .weui-flex {
    padding: 10rpx;
    &__item {
      padding: 10rpx;
    }
  }
  &__l img {
    vertical-align: middle;
    width: 342rpx;
    height: 370rpx;
  }
  &__r {
    img {
      vertical-align: middle;
      width: 350rpx;
      height: 176rpx;
    }
  }
  &__r + &__r {
    margin-top: 18rpx;
  }
}

.goods-theme {
  background-color: #fff;
  padding: 18rpx 0;
  &__banner {
    padding-left: 20rpx;
    padding-right: 20rpx;
    img {
      width: 100%;
    }
  }
  &__rows {
    padding: 0 0 10rpx;
    /deep/ .goods-item {
      &:first-child {
        padding-left: 20rpx;
      }
      &:last-child {
        padding-right: 20rpx;
      }
    }
  }
  + .goods-theme {
    margin-top: 20rpx;
  }
}

.fixed-redpack {
  position: fixed;
  right: 6rpx;
  bottom: 350rpx;
  width: 150rpx;
  height: 150rpx;
}
.fixed-backtop {
  position: fixed;
  right: 8rpx;
  bottom: 0;
  width: 120rpx;
  height: 120rpx;
}

.divider-title {
  padding-top: 40rpx;
  padding-bottom: 30rpx;
}
</style>
