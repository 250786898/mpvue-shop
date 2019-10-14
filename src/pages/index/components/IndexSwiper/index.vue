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
          <img :src="item.bannerUrl" class="slide-image" mode="aspectFit" />

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
      swiperHeight: 390 //轮播图高度
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
  width: 750rpx;
}

.swiper img {
  width: 750rpx;
  height: 390rpx;
}
</style>