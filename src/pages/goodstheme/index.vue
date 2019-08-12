<template>
  <div :style="{'background':activity.bgColor}" style="min-height:100%;">
    <div class="banner">
      <img :src="activity.activityBanner" mode="widthFix">
    </div>
    <div class="goods-list">
      <goods-row-item v-for="item in goodList" :item="item" :key="item.goodsId"></goods-row-item>
    </div>
    <fixed-cart-icon></fixed-cart-icon>
  </div>
</template>

<script>
  import GoodsRowItem from '@/components/GoodsRowItem'
  import LjLoading from '@/components/LjLoading'
  import FixedCartIcon from '@/components/FixedCartIcon'
  import { Api } from '@/http/api'
  import { mapState } from 'vuex'

  export default {
    components: {
      GoodsRowItem,
      FixedCartIcon
    },

    data () {
      return {
        pageNumber: 1, //当前页码
        activity: {} , //活动相关信息
        goodList: [],//商品列表
        activityId: -1, //活动id
        isNeedRefresh: false,
        isLoadedAll: false,
      }
    },
    computed: {
      ...mapState(['storeId']),
    },
    onUnload () {
      this.goodList = []
    },
    methods: {
      //获取抢购商品数据
      getGoodsList () {
        wx.showLoading({
          title: '加载中',
        })
        Api.activity.activityGoodsList({ 
          pageNumber: this.pageNumber , 
          storeId: this.storeId, 
          activityId: this.activityId,   
        })
        .then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            const data = res.data

            if (data.goodList.length > 0) {
              this.goodList = this.goodList.concat(data.goodList)
            } else {
              this.isLoadedAll = true
            }

            if (this.pageNumber === 1) {
              this.activity = data.activity
              wx.setNavigationBarTitle({
                title: data.activity.activityName
              })
            }
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },

    },
    onLoad(options) {
      console.log('onLoad')
      this.activityId = options.id
      this.getGoodsList() 
    }
  }
</script>

<style>
</style>

<style scoped lang="scss">
  .banner {
    img {
      width: 100%;
      vertical-align: middle;
    }
  }

  .goods-list {
    overflow: hidden;
  }

  .goods-list /deep/ .goods-row-item {
    background-color: #fff;
    margin: 38rpx 20rpx;
    border-radius: 8rpx;
    &:first-child {
      margin-top: 30rpx;
    }
    .weui-media-box {
      padding: 28rpx 22rpx;
    }
  }
</style>
