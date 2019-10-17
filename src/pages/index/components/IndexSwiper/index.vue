<template>
  <div class="swiper-wrap">
    <swiper
      :indicator-dots="true"
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
          <img :src="item.bannerUrl" class="slide-image" mode="" />

        </swiper-item>

    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array,
      default: () => ([])
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
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-wrap {
    padding: 20rpx 20rpx 20rpx 20rpx;
  }
.swiper img {
  vertical-align: middle;
  width: 100%;
  height: 280rpx;
}
</style>
