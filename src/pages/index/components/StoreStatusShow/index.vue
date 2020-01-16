<template>
  <div class="empty-container">
      <img src="/static/images/store-status-icon.png" class="empty-icon">
      <div class="empty-tip__text" v-if="status == 'rest'">休息中，请到其他店铺逛逛吧~</div>
      <div class="empty-tip__text" v-else>当前定位不在服务范围内~</div>
      <button type="primary" plain class="select-store-btn" @click="selectStore">随便逛逛</button>
  </div>
</template>

<script>
export default {
  props: {
    status: { //门店状态 rest(休息) noService(无服务)
      type: String,
      default: 'rest'
    }
  },
  methods: {
    /**
     * @description 选择门店
     */
    selectStore () {
      wx.navigateTo({
        url: '/pages/store/select/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.empty-container{
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width:710rpx;
  height:858rpx;
  margin: 0rpx auto;
  background: #ffffff;
  .empty-icon{
    width: 468rpx;
    height: 355rpx;
    margin-top: 133rpx;
  }
  .empty-tip__text{
    color: #8E8D8D;
    font-size: 26rpx;
    line-height: 26rpx;
    margin-top: 18rpx;
  }

  .select-store-btn{
    width:430rpx;
    height:80rpx;
    line-height: 80rpx;
    font-size: 34rpx;
    margin-top: 76rpx;
  }
}
</style>
