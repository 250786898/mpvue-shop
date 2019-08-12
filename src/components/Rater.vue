<template>
  <div class="rater">
    <img :src="item <= value ? '/static/images/evaluate_icon_stars_s@2x.png' : '/static/images/evaluate_icon_stars_n@2x.png'" v-for="item in [1,2,3,4,5]" :key="item" @click="select(item)">
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    model: {
      prop: 'value',
      event: 'change'
    },

    methods: {
      select(item) {
        if (this.disabled) return false
        this.$emit('change', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rater {
    display: -webkit-flex;
    display: flex;
    img {
      vertical-align: middle;
      width: 35rpx;
      height: 33rpx;
      & + img {
        margin-left: 16rpx;
      }
    }
  }
</style>
