<template>
  <scroll-view :scroll-x="true">
    <div class="goods-rows" v-if="goods.length">
      <goods-item v-for="item in goods" :key="item.goodsId" :item="item"></goods-item>
      <div class="more" v-if="goods.length > 4 && showMore" @click="loadMore"
        hover-class="navigator-hover">
        <!-- <img src="/static/images/left_arrow.png"> -->
        <!-- <div class="more__text">点<br>击<br>查<br>看<br>更<br>多</div> -->
      </div>
    </div>
  </scroll-view>
</template>

<script>
  import GoodsItem from '@/components/GoodsItem'
  
  export default {
    components: {
      GoodsItem
    },

    props: {
      goods: {
        type: Array,
        default: () => ([])
      },
      showMore: {
        type: Boolean,
        default: true
      },
    },

    data() {
      return {
        lock: false,
        onRight: false
      }
    },

    methods: {
      loadMore() {
        this.$emit('loadMore')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goods-rows {
    white-space: nowrap;
    .goods-item + .goods-item {
      margin-left: 10rpx;
    }
  }
  .more {
    display: inline-block;
    padding: 80rpx 60rpx;
    img {
      vertical-align: middle;
      width: 32rpx;
      height: 32rpx;
      margin-right: 10rpx;
    }
    &__text {
      display: inline-block;
      vertical-align: middle;
      font-size: 24rpx;
      line-height: 32rpx;
      color: #666;
    }
  }
</style>