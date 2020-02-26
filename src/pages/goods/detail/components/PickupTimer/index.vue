<template>
  <div class="flashsale">
    <div class="weui-cells">
      <div class="weui-cell" v-if="isSale">
        <span class="weui-cell__title">提货</span>
        <span class="take-goods-time">现在下单,<span class="take-goods-time-color">&nbsp;&nbsp;{{showPickUpTime}}</span>可提货</span>
      </div>
      <div class="weui-cell" v-else>
        <span class="weui-cell__title">提货</span>
        <span class="take-goods-time">预计提货时间</span><span class="take-goods-time-color">&nbsp;&nbsp;{{showPickUpTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatSaleDate, formatPickUpDate } from "@/utils/index"

export default {
  props: {
    pickupTime: {
      type: String,
      default: ''
    },
    isSale: { //提货状态, 0:预售 1:正在售卖中
      type: Number,
      default: 0
    },
    startSaleTime: {
      type: String,
      default: ''
    }
  },
  computed: {
    // showPickUpTime () { //显示的提货时间
    //   const hours = new Date().getHours()
    //   let showPickUpTime = ''
    //   if(hours > 20) {
    //     //超过20：00设置成显示后天提货
    //     showPickUpTime = this.getDateStr(2)
    //   }else{
    //     showPickUpTime = this.getDateStr(1)
    //   }
    //   return showPickUpTime
    // }
    showPickUpTime () { //显示的提货时间
      return this.pickupTime ? formatPickUpDate(this.pickupTime) : ''
    },
    showStartTime () { //开始售卖的时间
      return this.startSaleTime ? formatPickUpDate(this.startSaleTime) : ''
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
  .weui-cell {
    padding: 20rpx;
  }
  .weui-cells__title {
    font-size:30rpx;
  }
  .weui-cell__title {
      color: #9B9B9B;
      font-size:28rpx;
      margin-right: 22rpx;
    }
  img {
    margin-right: 12rpx;
    vertical-align: middle;
    width: 42rpx;
    height: 42rpx;
  }
}
.take-goods-time {
  font-size: 30rpx;
  display: flex;
  align-items: center;
  &-color{
    color: #FF9900;
    font-size: 30rpx;
  }
}
</style>
