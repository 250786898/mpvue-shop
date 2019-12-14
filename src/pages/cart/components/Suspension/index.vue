<template>
  <div class="footer-bar">
    <div class="weui-flex">
      <label class="weui-cell weui-check__label">
        <switch type="checkbox" class="weui-check" :checked="allChecked" @change="onAllCheckedChange"></switch>
        <div class="weui-check__hd_in-checkbox">
          <icon class="weui-icon-checkbox_circle" type="circle" size="16" v-if="!allChecked"></icon>
          <icon class="weui-icon-checkbox_success" type="success" color="#01bd9f" size="16" v-if="allChecked"></icon>
        </div>
        <div class="all-chooice-text">全选</div>
      </label>
      <div class="weui-flex__item all-count-box">
        <div class="all-count">
          <div class="all-count__price">
            <div class="all-count__desc">合计:</div><OnlinePrice :price="totalAmount" />
          </div>
          <p>已优惠:-￥{{ promisAmount || 0 }}</p>
        </div>
      </div>
      <div class="btn-box">
        <button class="footer-bar-btn radius bg-gradient settlement-btn"  @click="checkout" v-if="totalAmount">结算</button>
        <button class="footer-bar-btn radius bg-gradient disable-btn"  disabled v-else>结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePrice from '@/components/OnlinePrice'
export default {
  components: {
    OnlinePrice
  },
  props: {
    cartItemResultList: { //正常购物车列表
      type: Array,
      default: () => []
    },
    totalAmount: {  //合计
      type: Number,
      value: 0
    },
    promisAmount: { // 优惠价
      type: String,
      value: 0
    },
  },
  computed: {
    allChecked: {
      get () {
        //如果每一购物车商品都勾选则勾选
        return this.cartItemResultList && this.cartItemResultList.every(item => item.isSelect)
      }
    }
  },
  methods: {
    /**
     * @description 全选或则取消
     */
    onAllCheckedChange(e) {
      console.log('onAllCheckedChange',this.allChecked)
      this.$emit('onAllCheckedChange',this.allChecked)
    },


    /**
     * @description 获取购车商品id集合，以逗号隔开(1,2,3...)
     * @returns {string} cartIds id集合
     */
    fetchCartIds(){
      const cartIds = this.cartItemResultList
          .filter(item => item.isSelect && item.isSale)
          .map(item => item.cartId)
          .join(',')
      return  cartIds
    },

    /**
     * @description 核对结算订单
     */
    checkout() {
      if (this.cartItemResultList) {
        let cartIds = this.fetchCartIds()
        if (cartIds) {
          //存在购物车订单,跳转预订单界面
          wx.navigateTo({
            url: `/pages/order/preview/main?cartIds=${ cartIds }`
          })
        }else{
          //没有订单列表
          wx.showToast({
            title: '未选择任何商品', //提示的内容,
            icon: 'none', //图标,
          })
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
/*悬浮操作区样式*/
.all-chooice-text{
  font-size: 26rpx;
  color: #CCCCCC;
}
.btn-box {
  height: 105rpx;
  display:flex;
  align-items: center;
}
.settlement-btn{
  width:220rpx;
  height:80rpx;
  background:#01BD9F;
  line-height: 80rpx;
  font-size: 32rpx;
  text-align: center;
  color: #fff;
  &::after{
    border: none;
  }
}

.disable-btn{
  width:220rpx;
  height:80rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  background: #666;
  &::after{
    border: none;
  }
}

.footer-bar {
  z-index: 101;
  padding: 0px 20rpx 0rpx 37rpx;
  background-color: #fff;
  height: 105rpx;
  box-sizing: border-box;
  &-btn{
    width:220rpx;
    height:80rpx;
    border-radius:10rpx;
  }
  .weui-check__label {
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 26rpx;
    color: $text-gray;
  }
  .all-count-box{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .all-count {
    margin-bottom: 4rpx;
    padding-right: 20rpx;
    text-align: right;
    line-height: 32rpx;
    font-size: 22rpx;
    color: $text-gray;
    .all-count__desc {
      margin-right: 10rpx;
    }
    .all-count__price {
      font-size: 36rpx;
      font-weight:bold;
      color: #333;
      display: flex;
    }
  }

  button[type=primary] {
    margin-top: 4rpx;
    width: 188rpx;
    line-height: 70rpx;
    border-radius: 35rpx;
  }
}
</style>
