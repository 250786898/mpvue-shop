<template>
  <div class="countdowner">
    <span class="num">{{ hms.h }}</span>
    <span>:</span>
    <span class="num">{{ hms.m }}</span>
    <span>:</span>
    <span class="num">{{ hms.s }}</span>
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
      font-size: 22rpx;
      &.num {
        width: 34rpx;
        height: 34rpx;
        text-align: center;
        line-height: 34rpx;
        background-color: #333;
        color: #fff;
        border-radius: 4rpx;
      }
      + span {
        margin-left: 4rpx;
      }
    }
  }
</style>
