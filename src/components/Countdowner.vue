<template>
  <div class="countdowner">
    <span class="num">{{ hms.h }}</span>
    <span>:</span>
    <span class="num">{{ hms.m }}</span>
    <span>:</span>
    <span class="num">{{ hms.s }}</span>
    <span>:</span>
    <span class="microsecond">{{ msec }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      // 单位秒
      countdown: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        msec: 9 //倒计时毫秒
      }
    },

    computed: {
      hms() {
        let h = Math.floor(this.countdown / 3600)
        let m = Math.floor((this.countdown % 3600) / 60)
        let s = this.countdown % 60


        if (h > 99) {
          h = '99'
          m = '59'
          s = '59'
        } else {
          h = h < 10 ? `0${ h }` : `${ h }`
          m = m < 10 ? `0${ m }` : `${ m }`
          s = s < 10 ? `0${ s }` : `${ s }`
        }
        return { h, m, s }
      }
    },

    created () {
     console.log('倒计时created')
     this.startCountdown()
     this.startMsecDown()
    },

    mounted () {
      console.log('倒计时mounted')
    },

    onShow () { //mpvue框架第一次不会执行，第二次访问开始会一直执行
      console.log('倒计时onShow')
      this.startCountdown()
      this.startMsecDown()
    },

    methods: {
      /**
       * @description开始倒计时
       */
      startCountdown() {
        if(this.countdown <= 0) return false
        clearInterval(this.countdownTimer)
        this.countdownTimer = setInterval(() => {
          this.countdown--
          if (this.countdown === 0) {
            clearInterval(this.countdownTimer)
          }
        }, 1000)
      },

      /**
       * @description 毫秒倒计时
       */
      startMsecDown () {
        if(this.countdown <= 0) return false
        this.msec = 9
        clearInterval(this.mescDownTimer)
        this.mescDownTimer = setInterval(() => {
          this.msec--
          if (this.msec <= 0) {
           this.msec = 9
          }
          if(this.countdown === 0) {
            this.msec = 0
          }
        }, 100)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .countdowner {
    display: inline-block;
    span {
      vertical-align: top;
      display: inline-block;
      font-size: 26rpx;
      color: #0C524D;
      &.num {
        text-align: center;
        color: #fff;
        width:40rpx;
        height:36rpx;
        line-height: 36rpx;
        background:rgba(25,111,105,1);
        border-radius:6rpx;
        font-weight:800;
      }
      + span {
        margin-left: 6rpx;
      }
    }
    .microsecond{
      width:34rpx;
      padding: 0 5rpx;
      box-sizing: border-box;
      height:36rpx;
      line-height: 36rpx;
      background:rgba(255,255,255,1);
      border-radius:6rpx;
      color: #F9AB36;
      font-size: 28rpx;
      font-weight: 800;
      text-align: center;
    }
  }
</style>
