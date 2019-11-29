<template>
  <div class="theme">

     <!-- swiper -->
     <IndexSwiper v-if="themeType == 'swiper'" />
     <ADTheme v-else :ad-type="themeType" />
  </div>
</template>

<script>
import IndexSwiper from './components/IndexSwiper'
import ADTheme from './components/ADTheme'
export default {
  props: {
    themeType: { //主题类型： swiper(轮播主题)  ADOne(左边仅一广告图类型) ADTwo(左边两张广告图类型)
      type: String,
      default: 'ADOne'
    }
  },

  components: {
    IndexSwiper,
    ADTheme
  }

}
</script>

<style lang="scss" scoped>
.theme{
  margin-bottom: 20rpx;
}
</style>
