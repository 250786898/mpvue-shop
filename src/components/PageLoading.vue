<template>
  <div class="loading" v-if="show">
    <!-- <lj-loading /> -->
    <div class="loading-main">
       <fresh-loading />
      <!-- <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/pull_down_refresh_icon.gif" mode="aspectFit"> -->
      <!-- <div class="loading-text">{{loadingText}}</div> -->
    </div>

  </div>
</template>

<script>
import LjLoading from '@/components/LjLoading'
import FreshLoading from '@/components/FreshLoading'
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: '正在加载中...'
    }
  },
  components: {
    LjLoading,
    FreshLoading
  }
}
</script>

<style scoped lang="scss">
  .loading {
    width: 100vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    overflow: hidden;
    img{
      width: 200rpx;
      height: 150rpx;
    }
    &-text{
      color: #666;
      text-align: center;
      position: relative;
      top: -20rpx;
      font-size: 26rpx;

    }
  }
</style>
