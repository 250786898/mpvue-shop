<template>
  <div class="swiper-wrap">
    <swiper class="swiper" @change="onSwiperChange" autoplay="true">
      <div v-for="item in bannerList" :key="item" @click="previewImage(item)">
        <swiper-item>
          <img :src="item" class="slide-image" mode="aspectFit"/>
        </swiper-item>
      </div>
    </swiper>
    <div class="indicator">
      <span class="indicator-current">{{ current + 1 }}/</span><span class="indicator-length">{{ bannerList.length }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: { //banner数据列表
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      current: 0, //当前banner索引
    }
  },
  methods: {
    /**
     * @description 切换swiper
     */
    onSwiperChange(e) {
      this.current = e.target.current
      console.log('e',e)
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
  width: 750rpx;
  height: 750rpx;
  .indicator {
    position: absolute;
    bottom: 30rpx;
    right: 39rpx;
    width:84rpx;
    height:44rpx;
    line-height: 44rpx;
    text-align: center;
    background:rgba(67,67,67,0.4);
    border-radius:22rpx;
    font-size: 30rpx;
    color: #ffffff;
    &-length {
      color: #ffffff;
      font-size: 26rpx;
    }
    &-current{
      font-size: 30rpx;
      font-weight:800;
    }
  }
}
.swiper {
  width: 750rpx;
  height: 750rpx;
  swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
