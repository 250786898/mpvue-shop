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
          <img :src="item.bannerUrl" class="slide-image" mode="scaleToFill" />

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
  }
}
</script>

<style lang="scss" scoped>
.swiper-wrap {
  width: 100%;
  margin-top: 124rpx;
}

.swiper img {
  width: 100%;
  height: 100%;
}
</style>