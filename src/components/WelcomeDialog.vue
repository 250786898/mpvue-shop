<template>
  <div v-if="shown">
    <div class="backdrop" @click="hide"></div>
    <div class="welcome-dialog">
      <navigator :url="'/pages/newcomepacks/main?id=' + activityInfo.activityId" @click="hide">
        <img :src="activityInfo.activityLogo" mode="widthFix">
        <!-- <p>新人优惠价格限购一次</p> -->
      </navigator>
      <div class="welcome-dialog__footer">
        <icon type="cancel" size="40" color="#fff" @click="hide"></icon>
      </div> 
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      shown: {
        type: Boolean,
        default: false
      },
      activityInfo: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      hide() {
        this.$emit('update:shown', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 350px) {
    .weui-panel__ft .weui-cell {
      padding: 16rpx 30rpx !important;
    }
  }
  .welcome-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 100;
    margin-left: -297rpx;
    margin-top: -405rpx;
    width: 594rpx;
    height: 809rpx;
    img {
      width: 100%;
      height: 600rpx;
    }
    &__footer {
      position:absolute;
      right:20rpx;
      text-align:center;
      top:-100rpx;
    }

    navigator p {
      text-shadow: 2rpx 4rpx 10rpx rgba(0, 0, 0, .8);
      margin-top: -80rpx;
      font-weight: 700;
      text-align: center;
      font-size: 28rpx;
      color: #FFF;
    }
  }
</style>