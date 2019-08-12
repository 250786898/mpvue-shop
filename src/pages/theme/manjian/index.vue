<template>
  <div>
    <div class="banner">
      <img :src="activity.activityBanner" mode="aspectFill">
    </div>
    <div class="goods-list">
      <div class="goods-card" v-for="(item, index) in goodList" :key="index" v-if="!index%2" @click="showOrderCode(item)">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <img class="goods-card__banner" mode="aspectFill" :src="item.goodsImage" >
          </div>
          <div class="weui-flex__item">
            <div class="goods-card__bd">
              <div class="goods-card__title">{{item.goodsName}}</div>
              <div class="goods-card__desc">{{item.goodsSellDesc}}</div>
              <div class="goods-card__preview">
                <img mode="aspectFill" :src="item.goodsImage">
              </div>
              <div class="goods-card__price">
                ￥{{item.activityPrice}}
                <span>￥{{item.onlinePrice}}</span>
              </div>
              <div class="goods-card__ft">
                <button type="primary">立即抢购</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-card" v-for="(item, index) in goodList" :key="index" v-if="index%2" @click="showOrderCode(item)">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="goods-card__bd">
              <div class="goods-card__title">{{item.goodsName}}</div>
              <div class="goods-card__desc">{{item.goodsSellDesc}}</div>
              <div class="goods-card__preview">
                <img mode="aspectFill" :src="item.goodsImage">
              </div>
              <div class="goods-card__price">
                ￥{{item.activityPrice}}
                <span>￥{{item.onlinePrice}}</span>
              </div>
              <div class="goods-card__ft">
                <button type="primary">立即抢购</button>
              </div>
            </div>
          </div>
          <div class="weui-flex__item">
            <img class="goods-card__banner" mode="aspectFill" :src="item.goodsImage">
          </div>
        </div>
      </div>
    </div>
    <fixed-cart-icon></fixed-cart-icon>
    <lj-loading @refreshData="handleRefresh" :isNeedRefresh="isNeedRefresh" :isLoadedAll="isLoadedAll">
    </lj-loading>
  </div>
</template>

<script>
  import FixedCartIcon from '@/components/FixedCartIcon'
  import LjLoading from '@/components/LjLoading'
  import { mapState } from 'vuex'
  import { Api } from '@/http/api'

  export default {
    data() {
      return {
          isNeedRefresh: false,
          isLoadedAll: false,
          page: {
          pageNumber: 1,
          storeId: '',
          activityId: '',
          },
          activity: '',
          goodList: []
      }
    },
    components: {
      FixedCartIcon,
      LjLoading
    },
    computed: {
      ...mapState(['storeId']),
    },
    onLoad(e) {
      // this.page.activityId = e.id || '6531440650666119168'
      this.page.activityId = e.id || '6537985997639000064'
      this.page.storeId = e.storeId || this.storeId || 4
    },
    onShow () {
      this.goodList = []
      this.isNeedRefresh = false
      this.isLoadedAll = false
      this.page.pageNumber = 1
      this.getData()
    },
    methods: {
        //更新数据
      handleRefresh () {
        if(!this.isLoadedAll) {
          this.isNeedRefresh = true
          this.page.pageNumber++
          this.getData()
        }
      },
      getData() {
        const { page } = this
        wx.showLoading({ mask: true, title: '加载中' })
        Api.activity.activityGoodsList(page).then(res => {
          if(res.code === Api.CODES.SUCCESS) {
            const data = res.data
            if (data.goodList.length > 0) {
              this.goodList = this.goodList.concat(data.goodList)
            } else {
              this.isLoadedAll = true
            }

            if (this.page.pageNumber === 1) {
              this.activity = data.activity
              wx.setNavigationBarTitle({
                title: data.activity.activityName
              })
            }
          }
          wx.hideLoading()
        }).catch(() => {
          wx.hideLoading()
        })
      },
      showOrderCode(order) {
        wx.navigateTo({ url: `/pages/goods/detail/main?id=${order.goodsId}&activityId=${order.activityId}` })
      },
    }
  }
</script>

<style>
  page{ background-color: #FCD5B4; }
</style>

<style scoped lang="scss">
  .banner {
    position: relative;
    img {
      vertical-align: middle;
      width: 100%;
      height: 600px;
    }
  }

  .goods-card {
    margin: 18rpx;
    box-shadow: 0 14rpx 20rpx rgba(208, 151, 103, 0.57);
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
    &__banner {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    
    &__bd {
      padding: 24rpx 30rpx 18rpx;
    }
    &__title {
      line-height: 48rpx;
      font-size: 32rpx;
      color: $text-black;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &__desc {
      font-size: 26rpx;
      color: $text-gray;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &__preview {
      text-align: center;
      img {
        width: 186rpx;
        height: 186rpx;
        vertical-align: middle;
      }
    }
    &__price {
      text-align: center;
      font-size: 32rpx;
      font-weight: 700;
      color: #E42324;
      span {
        font-size: 24rpx;
        font-weight: 400;
        color: $text-gray;
        text-decoration: line-through;
      }
    }
    &__ft {
      button {
        margin-top: 6rpx;
        width: 212rpx;
        line-height: 56rpx;
        background-color: #F99238;
        border-radius: 28rpx;
        font-size: 28rpx;
      }
    }

    & + .goods-card {
      margin-top: 40rpx;
    }
  }
</style>
