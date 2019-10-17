<template>
  <scroll-view :scroll-x="true">
    <div class="goods-rows" v-if="goods.length">
      <template v-for="item in goods">
        <assemble-goods-item   v-if="item.activityStatus == 20 && item.id != goodsId"  :key="item.goodsId" :item="item" ></assemble-goods-item>
      </template>
      <div class="more" v-if="goods.length > 4 && showMore" @click="loadMore"
        hover-class="navigator-hover">
        <!-- <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/left_arrow.png"> -->
      </div>
    </div>
  </scroll-view>
</template>

<script>
  import AssembleGoodsItem from '@/components/AssembleGoodsItem'

  export default {
    components: {
      AssembleGoodsItem
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
      goodsId: {
        type: String,
        default: ''
      }
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
