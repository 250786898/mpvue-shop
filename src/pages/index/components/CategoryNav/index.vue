<template>
  <div class="category">
    <template v-for="item in list" >
      <div class="category-item" :style="itemWidth" v-bind:key="item.turId" @click="navToCategory(item.turnPage,item.turnId)" >
        <img :src="item.iconUrl" alt="">
        <span class="category-item__title">{{item.iconTitle}}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list: { //栏目列表
      type: Array,
      default: () => ([1,2,3,4,5,6,7,8,9,10])
    },
    numOfRow: { //定义一排多少个
      type: Number,
      default: 5
    }
  },

  computed: {
    itemWidth () { //每一项栏目的宽度
      const itemWidth = 100 / this.numOfRow
      return `width: ${itemWidth}%`
    },
    totalRow () { //总共多少行
     return Math.floor(this.list.length /this.numOfRow)
    }
  },

  methods: {
    navToCategory(turnPage,turnId){
      wx.navigateTo({
        url: `/${turnPage}?id=${turnId}`
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.category{
  background: #fff;
  border-radius:10rpx;
  padding: 30rpx 0 6rpx;
  display: flex;
  margin-bottom: 20rpx;
  flex-wrap: wrap;
  &-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24rpx;
    img{
      width: 106rpx;
      height: 106rpx;
      margin-bottom: 16rpx;
    }
    &__title{
      color: #221F20;
      font-size:24rpx;
    }
  }
}
</style>
