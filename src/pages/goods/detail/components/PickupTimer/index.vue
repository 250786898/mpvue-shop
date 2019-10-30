<template>
  <div class="flashsale">
    <div class="weui-cells">
      <div class="weui-cell" v-if="isSale">
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/details_icon_clock@2x.png" class="clock-icon">
        <span class="take-goods-time">现在下单,</span><span class="take-goods-time-color">&nbsp;&nbsp;{{showPickUpTime}}&nbsp;&nbsp;</span> 可提货
      </div>
      <div class="weui-cell" v-else>
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/details_icon_clock@2x.png" class="clock-icon">
        <span class="take-goods-time">预计提货时间:</span><span class="take-goods-time-color">&nbsp;&nbsp;{{showPickUpTime}}&nbsp;&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatSaleDate } from "@/utils/index"

export default {
  props: {
    pickupTime: {
      type: String,
      default: ''
    },
    isSale: { //提货状态, 0:预售 1:正在售卖中
      type: Number,
      default: 0
    }
  },
  mounted() {
    formatSaleDate()
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
      return formatSaleDate(this.pickupTime)
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
    width: 42rpx;
    height: 42rpx;
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
