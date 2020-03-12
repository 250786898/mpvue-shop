<template>
  <div class="theme">
     <!-- swiper -->
     <IndexSwiper v-if="themeType == 'swiper'" :list="list"/>
     <ImageTheme :list="list" v-else-if="themeType == 'image'"/>
     <ADTheme v-else :ad-type="themeType" :list="list"/>

  </div>
</template>

<script>
import IndexSwiper from './components/IndexSwiper'
import ADTheme from './components/ADTheme'
import ImageTheme from './components/ImageTheme'
export default {
  props: {
    themeType: { //主题类型： image（图片主题） swiper(轮播主题)  ADOne(左边仅一广告图类型) ADTwo(左边两张广告图类型)
      type: String,
      default: 'swiper'
    },
    list: { //主题数据列表
      type: Array,
      dafault: () => ([])
    }
  },

  components: {
    IndexSwiper,
    ADTheme,
    ImageTheme
  }

}
</script>

<style lang="scss" scoped>
.theme{
  margin-bottom: 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
}
</style>
