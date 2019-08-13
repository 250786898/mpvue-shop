<template>
  <div class="goods-tabs">
    <!-- <lj-tabs :tabs="this.tabs" v-model="activeIndex"></lj-tabs> -->

    <div class="goods-list" v-if="goodsList.length" >
      <goods-row-item v-for="item in goodsList"
        :is-hot="true"
        :key="item.goodsId"
        :item="item">
      </goods-row-item>
     
    </div>
    <!-- 加载更多 -->
    <div class="goods-tabs__loading" v-if="!isAllLoaded && loading">
      <img src="/static/images/Spin-1s-60px.gif">
    </div>

    <div class="goods-tabs__tip" v-if="isAllLoaded && goodsList.length">亲,已经看到最后啦！</div>

    <div v-if="isAllLoaded && !goodsList.length" class="empty-tip">
      <div class="empty-tip__text">目前没有相关商品</div>
    </div>

  </div>
</template>

<script>
  import GoodsRowItem from './GoodsRowItem'
  import LjTabs from './LjTabs'

  export default {
    components: {
      GoodsRowItem,
      LjTabs
    },
    props: {
      isAllLoaded: {
        type: Boolean,
        default: false
      },
       //是否向上触发更新
      loading: {
        type: Boolean,
        default: false
      },
      classList: {
        type: Array,
        default: () => ([])
      },
      goodsList: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {
        items: [
          // { isHot: false, isSpecialOffer: true, isMemberOnly: false },
          // { isHot: false, isSpecialOffer: false, isMemberOnly: false },
          // { isHot: false, isSpecialOffer: false, isMemberOnly: false }
        ],
        activeIndex: 0
      }
    },
    computed: {
      tabs() {
        if (this.classList) {
          return this.classList.map(item => ({
            title: item.pcName
          }))
        } else {
          return []
        }
      },
      // activeIndex() {
      //   return this.classList.findIndex(item => item.selected)
      // }
    },
    watch: {
      activeIndex(val) {
        this.$emit('tabChange', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goods-list {
    padding: 0 24rpx;
    // background-color:rgb(190, 29, 29);
    // margin-bottom: 16rpx;
  }
  .goods-tabs {

    min-height: 784rpx;
    &__loading {
      padding: 100rpx 20rpx;
      text-align: center;
      img {
        width: 80rpx;
        height: 80rpx;
        vertical-align: middle;
      }
    }
    &__tip {
      height: 116rpx;
      padding: 20rpx;
      font-size: 26rpx;
      line-height: 124rpx;
      color: $text-gray;
      text-align: center;
    }
    /deep/ .lj-tabs {
      padding-left: 10rpx;
    }
  }
</style>