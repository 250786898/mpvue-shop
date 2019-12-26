<template>
  <div class="bar">
    <div style="height: 200rpx;"></div>
    <div class="footer-bar bp-footer-bar" >

      <div class="cart-box">
         <CartIcon />
      </div>

      <div class="line"></div>

      <button type="primary" class="radius bg-gradient add-cart-btn" @click="confirmAdd" v-if="activityStock">加入购物车</button>
      <button type="primary" class="radius bg-gradient" disabled v-else>已抢光，补货中</button>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import CartIcon from '@/components/CartIcon'
export default {
  components: {
    CartIcon
  },
  props: {
    goodsId: { //商品id
      type: String,
      default: '123'
    },
    activityStock: { //时段活动库存
      type: Number,
      dafault: 0
    },
    activityId:{
      type:String //时段活动id
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
        count: 1,
        activityId:this.activityId
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.footer-bar.bp-footer-bar {
  background-color: #fff;
  width:750rpx;
  height:104rpx;
  box-shadow:0px -3rpx 10rpx 0px rgba(240,241,243,0.45);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding-right: 20rpx;
  align-items: center;
  z-index: 19;
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

  .line{
    width:1px;
    height:68rpx;
    background:rgba(229,229,229,1);
  }
  button {
    display: inline-block;
    vertical-align: middle;
    width: 550rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size:32rpx;
    border-radius: 10rpx;
  }
}
</style>
