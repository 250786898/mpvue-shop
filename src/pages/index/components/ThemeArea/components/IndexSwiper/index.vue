<template>
  <div class="swiper-wrap">
    <swiper
      :indicator-dots="showIndicatorDots"
      :autoplay="true"
      :circular="true"
      class="swiper-box"
      :style="swiperHeightStyle"
      indicator-color="rgba(255, 255, 255, .6)"
      indicator-active-color="#FFFFFF"
    >
      <block v-for="item in list" :key="item.turnId">
        <swiper-item v-if="item.state">
          <img
            :src="item.bannerUrl"
            class="slide-image"
            mode
            @click="navToDetail(item.turnType,item.turnPage,item.turnId)"
          />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { resgiterOrLogin } from '@/utils/index'
export default {
  props: {
    list: {
      //主题数据列表
      type: Array,
      dafault: () => []
    }
  },
  data() {
    return {
      swiperHeight: 280 //轮播图高度
    }
  },
  computed: {
    swiperHeightStyle() {
      return this.swiperHeight ? `height: ${this.swiperHeight}rpx;` : ''
    },
    showIndicatorDots() {
      //是否显示面板指示点
      if (this.list) {
        return this.list && this.list.length > 1 ? true : false
      }
    },
    ...mapState(['sessionId'])
  },
  methods: {
    /**
     * @param {string} turnType 跳转的类型
     * @param {string} turnUrl 跳转的链接
     * @param {string} turnId 跳转的参数id
     * @description 跳转详情
     */
    navToDetail(turnType, turnUrl, turnId) {
      if (turnType == 1) {
        //跳转商品详情类型
        wx.navigateTo({
          url: `/${turnUrl}?id=${turnId}&type=2`
        })
      } else if (turnType == 2) {
        //跳转活动界面
        if (!this.sessionId) {
          //未登录
          resgiterOrLogin()
          return
        }
        wx.navigateTo({
          url: `/${turnUrl}?id=${turnId}`
        })
      } else if (turnType == 3){
        //跳转其他小程序
        wx.navigateToMiniProgram({
          appId: turnId
        })
      }else {
        //其他类型
        wx.navigateTo({
          url: `/${turnUrl}?id=${turnId}`
        })
      }
    }
  }
}
</script>

<style lang="scss">
.swiper-box .wx-swiper-dots.wx-swiper-dots-horizontal {
  margin-bottom: 2rpx;
}
.swiper-box .wx-swiper-dot {
  display: inline-flex;
  margin-left: 5rpx !important;
  margin-right: 5rpx !important;
  justify-content: space-between;
  width: 18rpx;
  min-width: auto;
  padding: 0;
  height: 6rpx;
  background: rgba(242, 242, 242, 1);
  opacity: 0.5;
}
.swiper-box .wx-swiper-dot::before {
  content: '';
  flex-grow: 1;
  background: rgba(255, 255, 255, 1);
  border-radius: 2rpx;
}
.swiper-box .wx-swiper-dot-active {
  opacity: 1;
}
.swiper-box .wx-swiper-dot-active::before {
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  opacity: 1;
}
.swiper-box img {
  vertical-align: middle;
  width: 100%;
  height: 280rpx;
  border-radius: 20rpx;
}
</style>
