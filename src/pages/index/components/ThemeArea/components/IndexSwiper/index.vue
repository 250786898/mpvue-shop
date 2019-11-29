<template>
  <div class="swiper-wrap">
    <swiper
      :indicator-dots="showIndicatorDots"
      :autoplay="true"
      :circular="true"
      class="swiper"
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

<style lang="scss" scoped>
.swiper img {
  vertical-align: middle;
  width: 100%;
  height: 280rpx;
  border-radius: 10rpx;
}
</style>
