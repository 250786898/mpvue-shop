<template>
  <div class="info">
    <div class="login" v-if="!sessionId" @click="resgiterOrLogin">
      <div class="userinfo-box">
         <img
            src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/default-head-portraits.png"
            class="userinfo-img"
          />
      </div>
      <span class="login-text">登录/注册</span>
    </div>
    <div class="userinfo" v-else>
      <div hover-class="img-hover" class="userinfo-box">
         <img :src="personCenter.avatar" class="userinfo-img border-img"  />
      </div>
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
    resgiterOrLogin() {
      this.$emit('resgiterOrLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  height: 275rpx;
  display: flex;
  align-items: center;
  padding-left: 30rpx;
  z-index: 2;
  position: relative;
  .userinfo-box{
    width: 118rpx;
    height: 118rpx;
    border-radius: 50%;
    margin-right: 35rpx;
    overflow: hidden;
    border: 1rpx solid #ffffff;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .img-hover{
    transform: rotate(666turn);
    transition-delay: .3s;
    transition-property: all;
    transition-duration: 59s;
    transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
  }
  .login,
  .userinfo {
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 40rpx;
    font-weight: bold;
  }
  .userinfo {
    &-desc {
      font-size: 28rpx;
      font-weight: 500;
      margin-top: 10rpx;
    }
  }
}
</style>
