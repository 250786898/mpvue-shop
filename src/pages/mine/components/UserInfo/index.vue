<template>
  <div class="info">
    <div class="login" v-if="!sessionId" @click="resgiterOrLogin">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/default-head-portraits.png" class="userinfo-img" />
      <span class="login-text">登录/注册</span>
    </div>
    <div class="userinfo" v-else>
      <img :src="personCenter.avatar" class="userinfo-img border-img" />
      <div class="userinfo-content">
        <p class="nickname">hello,{{personCenter.nickname}}</p>
        <p class="userinfo-desc">满世界给你找好吃的</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState(['sessionId', 'personCenter'])
  },

  methods: {
    /**
     * @description 登录注册
     */
    resgiterOrLogin () {
      this.$emit('resgiterOrLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  height: 275rpx;
  display: flex;
  align-items: center;
  padding-left: 30rpx;
  z-index: 2;
  position: relative;
  .userinfo-img {
    width:118rpx;
    height:118rpx;
    border-radius:50%;
    margin-right: 35rpx;
  }
  .border-img{
    border:2rpx solid #ffffff;
  }
  .login,.userinfo {
    display: flex;
    align-items: center;
    color: #FFFFFF;
    font-size: 40rpx;
    font-weight:bold;
  }
  .userinfo{
    &-desc{
      font-size: 28rpx;
      font-weight:500;
      margin-top: 10rpx;
    }
  }
}
</style>
