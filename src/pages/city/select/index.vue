<!-- 城市选择模态窗 -->
<!-- TODO: SlideInUp Animation -->
<template>
  <div class="city-modal">
    <div class="city-modal__hd">
      <img src="/static/images/common_icon_greenlocation@2x.png">
      <span>已开通服务城市</span>
    </div>
    <div class="city-modal__bd">
      <div class="weui-flex">
        <div class="weui-flex__item" v-for="item in cities" @click="select(item)">
          <div class="tag">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { Api } from '@/http/api'
    import { mapState } from 'vuex'
  export default {
    data() {
      return {
        cities: ['广州市', '深圳市', '东莞市', '佛山市', '中山市', '珠海市']
      }
    },


    methods: {
      /**
       * @description 选择城市，触发修改vuex城市修改，返回门店列表页面
       */
      select(item) {
        this.$store.commit('setcityname',item)
        wx.navigateTo({
          url: '/pages/store/select/main',
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .city-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;
    background-color: #fff;
    &__hd {
      padding: 20rpx;
      img {
        margin-right: 10rpx;
        width: 50rpx;
        height: 50rpx;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        font-size: 28rpx;
        color: #999;
      }
    }
    &__bd {
      padding-left: 20rpx;
      padding-right: 20rpx;
      .weui-flex {
        flex-wrap: wrap;
        &__item {
          flex: 0 0 25%;
        }
      }
    }
  }
  .tag {
    margin: 15rpx auto 30rpx;
    width: 150rpx;
    line-height: 64rpx;
    font-size: 30rpx;
    background-color: #F5F5F5;
    border-radius: 32rpx;
    color: #333;
    text-align: center;
  }
</style>