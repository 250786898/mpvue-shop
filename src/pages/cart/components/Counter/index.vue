<template>
  <div class="counter">
    <img  src="/static/images/common_icon_reduce_s.png@2x.png" @click.stop="minus">
    <span>{{ count || '1' }}</span>
    <img v-if="plusDisabled" src="/static/images/common_icon_addto_n.png@2x.png">
    <img v-else src="/static/images/common_icon_addto.png@2x.png" @click.stop="plus">
  </div>
</template>

<script>
  export default {
    props: {
      count: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 999
      },
      min: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      noSetMax: {
         type: Boolean,
         default: false
      }
    },

    model: {
      prop: 'count',
      event: 'change'
    },
    

    computed: {
      plusDisabled() { //最大值禁用
        return this.disabled || !this.noSetMax && this.count >= this.max
      },

      minusDisabled() { //最小值禁用
        return this.disabled || this.count <= this.min
      }
    },

    methods: {

      /**
       * @description 数量增加emit
       */
      plus() {
        this.$emit('change', this.count + 1)
      },

      /**
       * @description  数量减少emit
       */
      minus() {
        if(this.count == 0) {
            return false
        }else{
            this.$emit('change', this.count - 1)
        }   
      }
    }
  }
</script>

<style lang="scss" scoped>
  .counter {
    span {
      vertical-align: middle;
      padding-left: 20rpx;
      padding-right: 20rpx;
      font-size: 32rpx;
      color: $text-black;
    }
    img {
      vertical-align: middle;
      width: 46rpx;
      height: 46rpx;
    }
  }
</style>