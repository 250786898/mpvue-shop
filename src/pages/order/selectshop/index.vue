<template>
  <div>
    <!-- TODO: Search -->
    <div class="weui-cells__title">
      <img src="/static/images/common_icon_greenlocation@2x.png">
      附近自提门店
    </div>
    <div class="weui-cells weui-cells_pure" v-if="storeList.length">
      <div class="weui-cell" v-for="item in storeList" :key="item.storeId" @click="select(item)">
        <div class="weui-cell__bd">
          <h4>{{ item.storeName }}</h4>
          <p>{{ item.storeAddress }}</p>
          <p>门店营业时间: 8:00 - 20:00</p>
        </div>
        <div class="weui-cell__ft">
          <img src="/static/images/common_icon_greenlocation@2x.png">
          <div>{{ item.storeDistance }}km</div>
        </div>
      </div>
    </div>
    <div class="empty-tip" v-else>
      <div class="empty-tip__text">随近没有支持自提的门店</div>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        storeList: []
      }
    },

    computed: {
      ...mapState(['location'])
    },

    methods: {
      select(item) {
        this.$store.commit('updateTempOrder', {
          store: item
        })
        this.$bus.$emit('shopChange', item)
        wx.navigateBack()
      }
    },

    onLoad(e) {
     var activityId = e.activityId == 'null' ? '': e.activityId
      wx.showLoading()
      Api.index.storeList({
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        activityId: activityId
      })
      .then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.storeList = res.data.storeList
        }
      })
      .catch(e => console.log(e))
      .then(() => wx.hideLoading())
    }
  }
</script>

<style lang="scss" scoped>
  .weui-cells {
    &:after {
      display: none;
    }
    &__title {
      line-height: 40rpx;
      img {
        vertical-align: top;
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .weui-cell {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    &:before {
      display: none;
    }
    &__bd {
      h4 {
        font-size: 32rpx;
        color: $text-black;
      }
      p {
        font-size: 26rpx;
        color: $text-gray;
      }
    }
    &__ft {
      margin-left: 10rpx;
      font-size: 26rpx;
      text-align: center;
      color: $text-gray;
      > img {
        vertical-align: middle;
        width: 50rpx;
        height: 50rpx;
        margin-bottom: 10rpx;
      }
    }
  }
</style>
