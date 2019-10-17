<template>
  <div>
    <loading v-if="loading"></loading>

    <div class="weui-panel consult-panel" v-for="item in list" :key="item.id">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <img class="weui-media-box__thumb" :src="item.userAvatar" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">{{ item.userName }}</div>
            <div class="weui-media-box__desc">{{ item.createTime }}</div>
          </div>
        </div>
      </div>
      <div class="weui-panel__ft">
        <p>[内容] {{ item.content }}</p>
      </div>
    </div>

    <!-- <div class="weui-panel consult-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <img class="weui-media-box__thumb" src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">乐家生活</div>
            <div class="weui-media-box__desc">2018-08-16 20：20:10</div>
          </div>
        </div>
      </div>
      <div class="weui-panel__ft">
        <p>买家2018年-10-11 20:10创建了退款申请</p>
        <p>退款类型：退款/退物</p>
        <p>退款原因：质量问题</p>
        <p>退款说明：</p>
        <div class="weui-flex">
          <div style="width: 120rpx;">凭证：</div>
          <div class="weui-flex__item">
            <div class="photos">
              <img src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg">
              <img src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg">
              <img src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg">
              <img src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg">
              <img src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg">
              <img src="https://wx2.sinaimg.cn/mw690/6a815515ly1fyca2yimy5j20u00u0e81.jpg">
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <navigator :url="'/pages/order/contact/main?id=' + id" class="footer-bar">
      <button type="primary" class="bg-light">联系卖家</button>
    </navigator>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import Loading from '@/components/Loading'

  export default {
    components: {
      Loading
    },

    data () {
      return {
        id: '',
        list: [],
        pageNumber: 1,
        loading: false,
        allLoaded: false
      }
    },

    methods: {
      getList() {
        this.loading = true

        Api.refund.listConsult({
          id: this.id,
          pageNumber: this.pageNumber
        })
        .then(res => {
          this.loading = false
          if (res.code === Api.CODES.SUCCESS) {
            this.list = [...this.list, ...res.data]
            if (!res.data.length) {
              this.allLoaded = true
            }
          }
        })
        .catch(() => this.loading = false)
      },

      reload() {
        this.list = []
        this.pageNumber = 1
        this.loading = this.allLoaded = false 
        this.getList()
      }
    },


    onLoad(e) {
      this.id = e.id
    },

    onShow(e) {
      this.reload()
    },

    onReachBottom() {
      if (this.loading || this.allLoaded) return
      this.pageNumber++
      this.getList()
    }
  }
</script>

<style>
  page {
    background-color: #F5F5F5;
    padding-bottom: 120rpx;
  }
</style>

<style lang="scss" scoped>
  .consult-panel {
    &:before, &:after {
      display: none;
    }
    &:first-child {
      margin-top: 20rpx;
    }
    .weui-media-box {
      &__hd {
        width: 76rpx;
        height: 76rpx;
      }
      &__title {
        margin-bottom: 8rpx;
        font-size: 30rpx;
      }
      &__desc {
        font-size: 24rpx;
      }
    }

    .weui-panel {
      &__ft {
        padding: 0 30rpx 30rpx;
        font-size: 30rpx;
        line-height: 50rpx;
      }
    }
  }

  .photos {
    margin-top: 10rpx;
    img {
      vertical-align: middle;
      width: 162rpx;
      height: 162rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
    }
  }
</style>
