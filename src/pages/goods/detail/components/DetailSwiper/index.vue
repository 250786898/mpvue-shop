<template>
  <div class="swiper-wrap">
    <swiper class="swiper" @change="onSwiperChange" :autoplay="false" :current="currentIndex">
        <swiper-item>
          <VideoSwiper :videoSrc="videoSrc" />
        </swiper-item>

        <swiper-item>
          <ImageSwiper :bannerList="bannerList" />
        </swiper-item>
    </swiper>
    <div class="indicator">
      <div class="indicator-item" :class="{'indicator-item-activity video-item-activity' : currentSwiperType == 'video' }" @click="changeSwiper('video')">视频</div>
      <div class="indicator-item" :class="{'indicator-item-activity image-item-activity' : currentSwiperType == 'image' }" @click="changeSwiper('image')">图片</div>
    </div>
  </div>
</template>

<script>
import VideoSwiper from "./components/VideoSwiper/index"
import ImageSwiper from "./components/ImageSwiper/index"
export default {
  props: {
    bannerList: { //banner数据列表
      type: Array,
      default: () => ([])
    },
    videoSrc: { //video 路径
      type: String,
      default: ''
    }
  },
  components: {
    VideoSwiper,
    ImageSwiper
  },
  computed: {
    /**
     * @description 当前轮播索引
     */
    currentIndex () {
      return this.currentSwiperType == 'video' ? 0 : 1
    }
  },
  data () {
    return {
      currentSwiperType: 'video', //当前轮播类型 ：video(默认) image
    }
  },
  methods: {
    /**
     * @description 切换swiper
     */
    changeSwiper(type) {
      this.currentSwiperType = type
    },

    /**
     * @description 手动出发轮播修改
     */
    onSwiperChange (e) {
      const currentIndex =  e.mp.detail.current
      this.currentSwiperType = currentIndex == 0 ? 'video' : 'image'
    },

    /**
     * @description 放大全屏预览图片
     */
    previewImage(current) {
      wx.previewImage({
        urls: this.bannerList,
        current
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-wrap {
  position: relative;
  background: #FFFFFF;
  .indicator {
    position: absolute;
    bottom: 30rpx;
    left: 280rpx;
    display: flex;
    width:190rpx;
    height:44rpx;
    line-height: 44rpx;
    color: rgb(143, 143, 143);
    font-size: 24rpx;
    border-radius:22rpx;
    background:rgba(205,205,205,0.6);
    &-item{
      width:95rpx;
      height:44rpx;
      line-height: 44rpx;
      text-align: center;
      border-radius:22rpx;
      box-sizing: border-box;
      &:nth-of-type(2){
        position: absolute;
        right: 0;
      }
    }
    &-item-activity{
      width:105rpx;
      height:44rpx;
      line-height: 44rpx;
      background:rgba(255,255,255,1);
      border:1px solid #dbdbdb;
      color: #2D2D2D;
      border-radius:22rpx;
      z-index: 9;
    }
    // .video-item-activity{
    //   // border-right:1px solid rgba(86, 86, 86, 1);
    // }
    // .image-item-activity{
    //   // border-left:1px solid rgba(86, 86, 86, 1);
    // }
  }
}
.swiper {
  height: 750rpx;
  width: 750rpx;
  swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
