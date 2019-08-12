<template>
  <div>
    <lj-tabs :tabs="tabs" v-model="activeIndex" :flex="true" @change="onActiveIndexChange"></lj-tabs>
    <div>
      <div class="empty-tip" v-if="!loading && !list.length">
        <img src="/static/images/integraldetails_bg@2x.png" alt="">
        <div class="empty-tip__text" v-if="activeIndex === 0">哎呦喂，您没有积分快去挣积分吧！~</div>
        <div class="empty-tip__text" v-else>哎呦喂，您还没兑换积分~</div>
      </div>
      <div v-if="list.length">
        <div class="weui-cells weui-cells_pure">
          <div class="weui-cell" v-for="item in list" :key="index">
            <div class="weui-cell__bd">
              <div class="primary-text">{{ item.description }}</div>
              <div class="desc-text">{{ item.day }}</div>
            </div>
            <div class="weui-cell__ft">
              <div class="primary-text">{{ item.pointType === 1 ? '+' : '-' }}{{ item.points }}积分</div>
              <div class="desc-text">您有{{ item.currentPoints }}积分</div>
            </div>
          </div>
        </div>
      </div>
      <loading v-if="loading"></loading>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import LjTabs from '@/components/LjTabs'
  import Loading from '@/components/Loading'

  const PAGE_SIZE = 20

  export default {
    components: {
      LjTabs,
      Loading
    },

    data () {
      return {
        tabs: [
          { title: '积分明细', listType: 1 },
          { title: '兑换明细', listType: 2 }
        ],
        activeIndex: 0,
        list: [],
        pageNumber: 1,
        loading: false,
        allLoaded: false
      }
    },

    methods: {
      getPointsDetail() {
        this.loading = true
        Api.user.pointsDetail({
          listType: this.tabs[this.activeIndex].listType,
          pageNumber: this.pageNumber,
          pageSize: PAGE_SIZE
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.list = [...this.list, ...res.data.logList]
            this.allLoaded = res.data.logList.length < PAGE_SIZE
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => this.loading = false)
      },

      reload() {
        this.list = []
        this.pageNumber = 1
        this.loading = this.allLoaded = false
        this.getPointsDetail()
      },

      onActiveIndexChange() {
        this.reload()
      }
    },

    onLoad() {
      this.reload()
    },

    onPulldownRefresh() {
      this.reload()
    },

    onReachBottom() {
      if (this.loading || this.allLoaded) return
      this.pageNumber++
      this.getPointsDetail()
    }
  }
</script>

<style lang="scss" scoped>
  .primary-text {
    color: $text-black;
    font-size: 30rpx;
    line-height: 48rpx;
  }
  .desc-text {
    color: $text-gray;
    font-size: 26rpx;
  }
</style>
