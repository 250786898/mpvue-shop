<template>
  <div>
    <div class="banner">
      <img :src="activity.activityBanner" mode="aspectFill">
      <div class="bp-info">
        <div>{{points || 0}}</div>
        <navigator url="/pages/bonuspoint/index/main">我的积分&gt;</navigator>
      </div>
    </div>
    <div class="goods-list">
      <div class="goods-row-item" v-for="(item,index) in goodList" :key="index">
        <navigator :url="'/pages/goods/detail/main?id=' + item.goodsId + '&activityId=' + item.activityId" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <img class="weui-media-box__thumb" :src="item.goodsImage" mode="aspectFill"/>
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">{{item.goodsName}}</div>
            <div class="weui-media-box__desc">{{item.goodsSellDesc}}</div>
            <div class="goods-row-item__tb">
              <span class="primary">￥{{item.activityPrice}}</span>
              <span class="secondary">+{{item.activityPoint}}<img src="/static/images/details_icon_integral@2x.png"></span>
              <button type="primary" class="radius">立刻兑</button>
            </div>
          </div>
        </navigator>
      </div>
    </div>

    <div class="rules">
      <div class="rules__title">积分使用、兑换规则</div>
      <div class="rules__bd">
        <rich-text :nodes="rule" class="weui-cell__bd"></rich-text>
      </div>
    </div>
    <lj-loading @refreshData="handleRefresh" :isNeedRefresh="isNeedRefresh" :isLoadedAll="isLoadedAll">
    </lj-loading>
    <fixed-cart-icon></fixed-cart-icon>
  </div>
</template>

<script>
  import GoodsRowItem from '@/components/GoodsRowItem'
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
          goodList: [],
          points: 0,
          rule: ''
      }
    },
    components: {
      GoodsRowItem,
      FixedCartIcon,
      LjLoading
    },
    computed: {
      ...mapState(['storeId']),
    },
    onLoad(e) {
      this.page.activityId = e.id || '6537967457661882368'
      this.page.storeId = e.storeId || this.storeId || 1
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
              this.points = data.points
              this.rule = data.rule
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
    }
  }
</script>

<style lang="scss">
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
    .bp-info {
      position: absolute;
      left: 40rpx;
      top: 400rpx;
      padding-top: 16rpx;
      padding-bottom: 16rpx;
      width: 192rpx;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 4rpx;
      text-align: center;
      color: $text-black;
      font-size: 32rpx;
      line-height: 50rpx;
      navigator {
        font-size: 30rpx;
      }
    }
  }
  
  .goods-row-item {
    background-color: #fff;
    margin: 40rpx 20rpx;
    border-radius: 8rpx;
    .weui-media-box {
      box-shadow: 0 10rpx 6rpx rgba(0, 0, 0, 0.06);
      &__desc {
        margin-bottom: 20rpx;
        line-height: 40rpx;
        height: 80rpx;
      }
    }
    &__tb {
      .secondary {
        font-size: 32rpx;
        color: $text-black;
        text-decoration: none;
        img {
          width: 30rpx;
          height: 28rpx;
        }        
      }
      button[type=primary] {
        margin-top: 10rpx;
        padding-left: 0;
        padding-right: 0;
        background-color: #FFAC32;
        width: 120rpx;
        font-size: 24rpx;
        float: right;
        line-height: 44rpx;
        border-radius: 22rpx;
      }
    }
  }

  .rules {
    &__title {
      margin: 20rpx;
      font-size: 30rpx;
      color: #fff;
    }
    &__bd {
      margin: 30rpx 20rpx;
      padding: 20rpx;
      border-radius: 8rpx;
      background-color: #fff;
      font-size: 30rpx;
      color: $text-black;
      box-shadow: 0 10rpx 6rpx rgba(0, 0, 0, 0.06);
    }
  }
</style>
