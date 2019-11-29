<template>
  <div class="category">
    <div class="category-item" v-for="(item,index) in list" v-bind:key="index" :style="itemWidth" >
      <img src="/static/images/20191128092643.png" alt="">
      <span class="category-item__title">时令水果</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: { //栏目列表
      type: Array,
      default: () => ([1,2,3,4,5,6,7,8])
    },
    numOfRow: { //定义一排多少个
      type: Number,
      default: 4
    }
  },

  computed: {
    itemWidth () { //每一项栏目的宽度
      const itemWidth = 100 / this.numOfRow
      return `width: ${itemWidth}%`
    }
  }
}
</script>

<style lang="scss" scoped>
.category{
  background: #fff;
  border-radius:10rpx;
  padding: 30rpx 0;
  display: flex;
  margin-bottom: 20rpx;
  flex-wrap: wrap;
  &-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 100rpx;
      height: 100rpx;
    }
    &__title{
      color: #221F20;
      font-size:24rpx;
    }
  }
}
</style>
