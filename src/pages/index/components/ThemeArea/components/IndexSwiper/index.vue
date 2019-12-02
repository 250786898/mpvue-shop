<template>
  <div class="swiper-wrap">
    <swiper
      :indicator-dots="showIndicatorDots"
      :autoplay="true"
      :circular="true"
      class="swiper-box"
      :style="swiperHeightStyle"
      indicator-color="rgba(255, 255, 255, .6)"
      indicator-active-color="#FFFFFF">
        <swiper-item
          v-for="item in bannerList"
          :key="item.activityId"
        >
          <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/1574759383332.png" class="slide-image" mode="" />

        </swiper-item>

    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array,
      default: () => ([1,2,3,4])
    }
  },
  data () {
    return {
      swiperHeight: 280 //轮播图高度
    }
  },
  computed: {
    swiperHeightStyle() {
      return this.swiperHeight ? `height: ${ this.swiperHeight }rpx;` : ''
    },
    showIndicatorDots () { //是否显示面板指示点
      return this.bannerList && this.bannerList.length > 1 ? true : false
    }
  }
}
</script>

<style lang="scss">
.swiper-box .wx-swiper-dots.wx-swiper-dots-horizontal{
     margin-bottom: 2rpx;
}
.swiper-box .wx-swiper-dot{
    display: inline-flex;
    margin-left: 10rpx;
    justify-content:space-between;
    width:18rpx;
    height:6rpx;
    background:rgba(242,242,242,1);
    opacity: 0.5;
}
.swiper-box .wx-swiper-dot::before{
    content: '';
    flex-grow: 1;
    background: rgba(255,255,255,1);
    border-radius: 2rpx
}
.swiper-box .wx-swiper-dot-active {
    opacity:1;
}
.swiper-box .wx-swiper-dot-active::before{
    background: rgba(255,255,255,1);
    border-radius:2px;
    opacity:1;
}
.swiper-box img {
  vertical-align: middle;
  width: 100%;
  height: 280rpx;
  border-radius: 10rpx;
}
</style>
