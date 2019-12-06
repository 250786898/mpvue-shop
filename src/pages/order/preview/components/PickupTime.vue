<template>
  <div class="weui-panel goods-list-panel">
    <div class="weui-panel__hd">
      <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/details_icon_clock@2x.png">
      <span>提货时间</span>
      <span class="time">{{showPickUpTime}}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showPickUpTime () { //显示的提货时间
      const hours = new Date().getHours()
      let showPickUpTime = ''
      if(hours > 20) {
        //超过20：00设置成显示后天提货
        showPickUpTime = this.getDateStr(2)
      }else{
        showPickUpTime = this.getDateStr(1)
      }
      this.$store.commit('pickuptime',showPickUpTime)
      return showPickUpTime
    }
  },

  methods: {
    /**
     * @description 获取明天后天时间
     */
    getDateStr(dayCount){
      if(null == dayCount){
        dayCount = 0;
      }
      var dd = new Date();
      dd.setDate(dd.getDate()+dayCount);//设置日期
      var m = dd.getMonth()+1;//获取当前月份的日期
      m = m <10 ? `0${m}` : m
      var d = dd.getDate();
      d = d <10 ? `0${d}` : d
      return `${m}月${d}日`
    },
  }
}
</script>

<style lang="scss" scoped>
.goods-list-panel {
  .weui-panel {
    width: 702rpx;
    border-radius: 14rpx;
    &__hd {
      position: relative;
      padding: 28rpx 30rpx 20rpx 60rpx;
      padding-top: 20rpx;
      font-size: 28rpx;
      color: $text-black;
      height: 28rpx;
      width: 100%;
      > img {
        margin-right: 8rpx;
        vertical-align: middle;
        width: 36rpx;
        height: 36rpx;
        position: absolute;
        top:35%;
        left:22rpx;
      }
      &:after { left: 0; }
      .weui-cell__ft_in-access {
        float: right;
        font-size: 28rpx;
        color: $theme-color-light;
        &:after {
          border-color: $theme-color-light;
        }
      }
    }
  }
  .weui-media-box__title {
    margin-bottom: 0;
    height: 100rpx;
  }
  .time{
    font-size:30rpx;
    font-weight:bold;
    margin-left:14rpx;

  }
}
</style>
