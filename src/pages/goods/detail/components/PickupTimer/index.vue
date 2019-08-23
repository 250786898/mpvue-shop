<template>
  <div class="flashsale">
    <div class="weui-cells">
      <div class="weui-cell" >
        <img src="/static/images/details_icon_clock@2x.png">
        <span class="take-goods-time">现在下单,</span><span class="take-goods-time-color">&nbsp;&nbsp;{{showPickUpTime}}&nbsp;&nbsp;</span> 可提货
      </div>
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
    }
  }
}
</script>

<style lang="scss" scoped>
 .flashsale {
  .weui-cells {
    &:before,
    &:after {
      display: none;
    }
    margin-top: 20rpx;
    font-size: 24rpx;
    color: $text-black;
  }
  img {
    margin-right: 12rpx;
    vertical-align: middle;
    width: 24rpx;
    height: 24rpx;
  }
}
.take-goods-time {
  font-size: 14px;
  &-color{
    color: #F7B032;
    font-size: 14px;
  }
}
</style>