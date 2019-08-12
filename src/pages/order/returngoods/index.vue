<template>
  <div>
    <div class="weui-panel goods-list-panel">
      <div class="weui-panel__bd">
        <template v-for="item in orderGoodsList">
          <div class="weui-media-box weui-media-box_appmsg">
            <label class="checkbox">
              <template v-if="!item.isPresentation && !(item.refundState == 1 || item.refundState == 3)">
                <switch type="checkbox" class="weui-check" :checked="item.checked" @change="onChange($event, item)"/>
                <div class="weui-cell__hd weui-check__hd_in-checkbox">
                  <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked">
                  </icon>
                  <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-else>
                  </icon>
                </div>
              </template>
            </label>
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="item.goodsImage" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <!-- if 赠品 -->
              <div v-if="item.isPresentation" class="weui-media-box__title">
                <span class="goods-tag">赠品</span>
                {{ item.goodsName }}
              </div>
              <div v-else class="weui-media-box__title weui-media-box__title_total">
                {{ item.goodsName }}
                <div class="goods-total">￥{{ item.onlinePrice * item.goodsNum }}</div>
              </div>
              <!-- else 赠品 -->
              <div class="weui-media-box__desc" v-if="!item.isPresentation">
                <span>单价:￥{{ item.onlinePrice }}</span>
                <div class="goods-count goods-count_ih">数量: x{{ item.goodsNum }}</div>
              </div>
            </div>
          </div>

          <div class="weui-media-box" v-if="!item.isPresentation && item.goodsNum > 1">
            <div style="overflow: hidden;">
              <div style="float: right;">
                <counter v-model="item.returnGoodsNum" :max="item.goodsNum" :min="1"></counter>
              </div>
            </div>
          </div>  
        </template>
        
        <button type="primary" class="radius main-button" :disabled="!submittable" @click="submit">
          确定退货商品
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import Counter from '@/components/Counter'

  export default {
    components: {
      Counter
    },

    data () {
      return {
        orderId: '',
        orderGoodsList: []
      }
    },

    computed: {
      submittable() {
        return this.orderGoodsList.some(item => item.checked)
      }
    },

    methods: {
      onChange({ mp: { detail } }, item) {
        item.checked = detail.value
      },

      submit() {
        getApp().globalData.returnOrderGoodsList = this.orderGoodsList.filter(item => item.checked)

        wx.redirectTo({
          url: `/pages/order/returnapply/main?id=${ this.orderId }`
        })
      }
    },

    onLoad(e) {
      this.orderId = e.id
      
      wx.showLoading({ title: '加载中' })
      Api.order.detail({ orderId: e.id }).then(res => {
        if (res.code === Api.CODES.SUCCESS) {
          this.orderGoodsList = res.data.orderGoodsList.map(item => ({
            ...item,
            checked: false,
            returnGoodsNum: item.goodsNum
          }))
        }
      })
      .catch(e => console.log(e))
      .then(() => wx.hideLoading())
    }
  }
</script>

<style scoped lang="scss">
  .main-button {
    margin: 80rpx;
  }
</style>
