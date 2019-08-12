<template>
  <div>
    <div class="comment">
      <div class="comment-item" v-if="list[0]">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <img :src="list[0].memberAvatar" mode="aspectFill">
          </div>
          <div class="weui-cell__bd">
            <div>{{ list[0].memberName }}</div>
            <div>{{ list[0].createTime }}</div>
            <div>
              乐家服务
              <rater v-model="list[0].storeScores" :disabled="true"></rater>
            </div>
            <div>
              物流服务
              <rater v-model="list[0].logisticsScores" :disabled="true"></rater>
            </div>
            <div>
              商品质量
              <rater v-model="list[0].goodsScores" :disabled="true"></rater>
            </div>
            <div>评论：{{ list[0].content }}</div>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="photos">
              <img :src="src" v-for="src in list[0].gevalImages" mode="aspectFill" @click="previewImage(src, list[0].gevalImages)">
            </div>
          </div>
        </div>
      </div>

      <div class="comment-item" v-for="item in replyList" :key="item.id"
        :class="{ 'comment-item_right': item.gevalType == 3 }"
        >
        <div class="weui-cell">
          <div class="weui-cell__hd" v-if="item.gevalType == 2">
            <img :src="item.memberAvatar" mode="aspectFill">
          </div>
          <div class="weui-cell__bd">
            <div>{{ item.memberName }}</div>
            <div>{{ item.createTime }}</div>
            <div>反馈：{{ item.content }}</div>
          </div>
          <div class="weui-cell__hd" v-if="item.gevalType == 3">
            <img :src="item.memberAvatar" mode="aspectFill">
          </div>
        </div>
      </div>

      <loading v-if="loading"></loading>

      <div class="comment-item">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="textarea">
              <textarea placeholder="请反馈您的疑问" v-model.trim="content"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <button type="primary" class="bg-light" :disabled="!content" @click="submit">提交评论</button>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import Rater from '@/components/Rater'
  import Loading from '@/components/Loading'

  export default {
    components: {
      Rater,
      Loading
    },

    data () {
      return {
        orderId: '',
        // 商品评价列表默认第一条为用户评价，其他为回复
        list: [],
        content: '',
        pageNumber: 1,

        loading: false,
        allLoaded: false
      }
    },

    computed: {
      replyList() {
        return this.list.slice(1)
      }
    },

    methods: {
      getEvaluateList() {
        this.loading = true
        Api.goods.evaluate({
          orderId: this.orderId,
          pageNumber: this.pageNumber
        })
        .then(res => {
          this.loading = false
          if (res.code === Api.CODES.SUCCESS) {
            if (res.data.length) {
              this.list = [
                ...this.list,
                ...res.data.map(item => ({
                  ...item,
                  gevalImages: item.gevalImage ? item.gevalImage.split(',') : []
                }))
              ]
            } else {
              this.allLoaded = true
            }
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(() => this.loading = false)
      },

      reload() {
        this.list = []
        this.pageNumber = 1
        this.loading = this.allLoaded = false
        this.getEvaluateList()
      },

      submit() {
        wx.showLoading({ title: '提交中', mask: true })
        Api.evaluate.reply({
          orderId: this.orderId,
          comment: this.content
        })
        .then(res => {
          wx.hideLoading()
          if (res.code === Api.CODES.SUCCESS) {
            wx.showToast({ title: '提交成功' })
            this.reload()
            this.content = ''
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(() => wx.hideLoading())
      },

      previewImage(current, urls) {
        wx.previewImage({
          current,
          urls
        })
      }
    },

    onLoad(e) {
      this.orderId = e.id
      this.list = []
      this.getEvaluateList()
    },

    onReachBottom() {
      if (this.allLoaded || this.loading) return
      this.pageNumber++
      this.getEvaluateList()
    }
  }
</script>

<style>
  page { background-color: #EDEDED; padding-bottom: 120rpx; }
</style>

<style lang="scss" scoped>
  .comment {
    background-color: #fff;
    &-item {
      & + & {
        border-top: 1rpx solid #EDEDED;
      }

      .weui-cell {
        padding: 30rpx;
        align-items: flex-start;

        &__hd {
          img {
            vertical-align: middle;
            width: 96rpx;
            height: 96rpx;
            border-radius: 48rpx;
            margin-right: 30rpx;
          }
        }
        &__bd {
          line-height: 52rpx;
          font-size: 30rpx;
          /deep/ .rater {
            margin-left: 20rpx;
            display: inline-block;
          }
        }

        + .weui-cell {
          padding-top: 0;
          &:before { display: none; }
        }
      }

      .photos {
        img {
          vertical-align: middle;
          border-radius: 10rpx;
          width: 216rpx;
          height: 216rpx;
          margin-right: 20rpx;
          // margin-bottom: 20rpx;
        }
      }

      &_right {
        .weui-cell {
          text-align: right;
          &__hd {
            img {
              margin-left: 20rpx;
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
