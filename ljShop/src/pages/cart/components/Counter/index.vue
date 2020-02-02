<template>
  <div class="counter">
    <img  src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_icon_reduce_s.png.png" @click.stop="minus">
    <span>{{ count || '1' }}</span>
    <img v-if="plusDisabled" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_icon_addto_disable.png">
    <img v-else src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/common_icon_addto_s.png.png" @click.stop="plus">
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
      padding-left: 21rpx;
      padding-right: 21rpx;
      font-size: 28rpx;
      color: #333333;
    }
    img {
      vertical-align: middle;
      width: 51rpx;
      height: 50rpx;
    }
  }
</style>
