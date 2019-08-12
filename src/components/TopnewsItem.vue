<template>
  <navigator class="topnews-item" :url="'/pages/topnews/detail/main?id=' + item.articleId">
    <div class="topnews-item__thumb">
      <img :src="item.image" alt="" mode="widthFix" @load="onImageLoaded" @error="onImageLoaded">
      <!-- <img v-if="item.type == 'video'" src="/static/images/list_btn_viedio@2x.png" class="icon-video"> -->
    </div>
    <div class="topnews-item__bd">
      <div class="topnews-item__bd__title">{{ item.title }}</div>
      <div class="topnews-item__bd__desc">{{ item.summary }}</div>
    </div>
    <div class="topnews-item__ft">
      <div class="topnews-item__ft__like">
        <img src="/static/images/list_icon_like@2x.png">
        <span>{{ item.spotCount }}</span>
      </div>
      <div class="topnews-item__ft__user">
        <img :src="item.authorImage">
        <span>{{ item.authorName }}</span>
      </div>
    </div>
  </navigator>
</template>

<script>
  export default {
    props: {
      item: Object
    },

    methods: {
      onImageLoaded() {
        this.$emit('imageLoaded')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .topnews-item {
    background-color: #fff;
    border-radius: 10rpx;
    overflow: hidden;
    &__thumb {
      position: relative;
      img {
        width: 100%;
        height: 160rpx;
        vertical-align: top;
      }
      .icon-video {
        width: 80rpx;
        height: 80rpx;
        vertical-align: middle;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -40rpx;
        margin-top: -40rpx;
      }
    }
    &__bd {
      padding: 20rpx;
      &__title {
        margin-bottom: 10rpx;
        font-size: 28rpx;
        color: $text-black;
      }
      &__desc {
        font-size: 26rpx;
        color: $text-gray;
      }
      &__title,
      &__desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    &__ft {
      position: relative;
      padding: 0 20rpx 20rpx;
      font-size: 24rpx;
      color: $text-black;
      &__user {
        img {
          width: 32rpx;
          height: 32rpx;
          vertical-align: middle;
          margin-right: 4rpx;
          border-radius: 16rpx;
        }
        span {
          vertical-align: middle;
        }
      }
      &__like {
        position: absolute;
        right: 20rpx;
        top: 0;
        img {
          width: 26rpx;
          height: 26rpx;
          margin-right: 10rpx;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
    }

    + .topnews-item {
      margin-top: 20rpx;
    }
  }
</style>