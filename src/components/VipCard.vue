<template>
  <div class="vip-card">
    <img class="vip-card__bg" :src="vipInfo.background">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <img :src="personCenter.avatar">
      </div>
      <div class="weui-cell__bd">
        <em class="vip-card__name">{{ personCenter.nickname }}</em>
        <span v-if="personCenter.vipState == 1">乐享VIP</span>
        <span v-else-if="personCenter.vipState == 2">VIP体验卡</span>
        <span v-else>未开通</span>
      </div>
      <div class="weui-cell__ft" @click="showIntroductionDialog">
        乐享卡VIP权益说明
        <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/membershipcode_icon_explain@2x.png">
      </div>
    </div>
    <div class="guoqi-timer" v-if="personCenter.vipState ==1 || personCenter.vipState == 2">{{vipInfo.vipEndTime}} 会员到期</div>
    <h4>尊享5大会员特权</h4>

    <vip-introduction-dialog :shown.sync="introductionDialogShowed"></vip-introduction-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import VipIntroductionDialog from '@/components/VipIntroductionDialog'

  export default {
    components: {
      VipIntroductionDialog
    },
    props:{
      personCenter: {
        type: Object,
        default: {}
      },
      vipInfo : {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        introductionDialogShowed: false
      }
    },
    computed: {
      ...mapState(['personCenter'])
    },
    methods: {
      showIntroductionDialog() {
        this.introductionDialogShowed = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .guoqi-timer {
    margin-top:-15px;
    padding-left:15px;
    position:relative;
    font-size:24rpx;
    color:#fff;
    margin-left:80rpx;
  }
</style>
