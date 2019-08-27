<template>
  <div class="bar">
    <div style="height: 200rpx;"></div>
    <div class="footer-bar bp-footer-bar" >

      <div class="cart-box">
         <navigator open-type="switchTab" url="/pages/cart/main" class="cart-icon">
          <img src="/static/images/common_tab_icon_shopcart_n@2x.png">
          <span class="weui-badge">{{ cartNum }}</span>
        </navigator>
      </div>
     
      <button type="primary" class="radius bg-gradient" @click="confirmAdd">加入购物车</button>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    goodsId: { //商品id
      type: String,
      default: '123'
    }
  },
  data () {
    return {
    } 
  },
  computed: {
    ...mapState(['cartNum'])
  },
  methods: {
     /**
     * @description 确认添加
     */
    confirmAdd() {
      this.$store.dispatch('addToCart', {
        goodsId: this.goodsId,
        count: 1
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.footer-bar.bp-footer-bar {
  background-color: #fff;
  width:750rpx;
  height:105rpx;
  box-shadow: 1rpx 8rpx 8rpx 1px #000;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .cart-box{
    height: 100%;
    width: 137rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-icon {
    width: 64rpx;
    height: 64rpx;
    position: relative;
    img {
      width: 64rpx;
      height: 64rpx;
    }
    .weui-badge {
      position: absolute;
      right: -16rpx;
      top: 0;
    }
  }
  button {
    display: inline-block;
    vertical-align: middle;
    width: 75%;
    height: 90rpx;
    line-height: 90rpx;
    background:linear-gradient(270deg,rgba(18,205,207,1),rgba(12,225,179,1));
    font-size:32rpx;
    border-radius: 6rpx;
  }
}
</style>