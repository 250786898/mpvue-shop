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
      <span>{{ current + 1 }}/</span>{{ bannerList.length }}
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
    },

    /**
     * @description 放大全屏预览图片
     */
    previewImage(current) {
      wx.previewImage({
        urls: this.goodsDetailInfo.goodsBanner,
        current
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-wrap {
  position: relative;
  background-color: #fff;
  .indicator {
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    line-height: 32rpx;
    width: 70rpx;
    text-align: center;
    border: 1rpx solid #7A7A7A;
    border-radius: 17rpx;
    font-size: 24rpx;
    color: $text-gray;
    span {
      color: $text-black;
    }
  }
}
.swiper {
  height: 527rpx;
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