<template>
  <div class="countdowner">
    <span class="num">{{ hms.h }}</span>
    <span>:</span>
    <span class="num">{{ hms.m }}</span>
    <span>:</span>
    <span class="num">{{ hms.s }}</span>
    <span>:</span>
    <span class="microsecond">{{ '0' }}</span>
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
      width:24rpx;
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
