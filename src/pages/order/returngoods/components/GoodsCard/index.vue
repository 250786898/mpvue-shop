<template>
  <div class="card">
    <div class="goods" @click="changeCheck(index)" v-for="(item,index) in goodList" :key="index">
      <div :class="[ item.check ? 'goods-checkbox' : 'goods-unchecked' ]" v-if="checkboxShow">
        <div class="goods-checkbox__icon" v-if="item.check"></div>
      </div>
      <img :src="item.goodsImage" alt :style="checkboxShow? '':'padding-left:22rpx'" />
      <div class="goods-info">
        <p class="goods-info__title">{{item.goodsName}}</p>
        <div class="goods-info-number">
          <OnlinePrice :price="item.onlinePrice" :signSize="24" :beforeSize="38" :afterSize="28" />
          <span :style="getNumberColor">{{item.goodsNum}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OnlinePrice from "@/components/OnlinePrice";
export default {
  props:{
    goodList:{
      type:Array,
      default:()=>{
        return []
      }
    }, //商品列表
    numberColor:{
      type:String,
      default:"#333"
    },//数量颜色值
    checkboxShow:{
      type:Boolean,
      default:true
    }//复选框是否显示
  },
  components: {
    OnlinePrice
  },
  data() {
    return {
      chooseGoods:[] //已经选择的商品
    };
  },
  methods:{
    /**
     * @description 改变复选框状态
     */
    changeCheck(index){
      this.goodList[index].check = !this.goodList[index].check;
    },

    /**
     * @description 获取数量颜色
     */
    getNumberColor(){
      return `color:${numberColor}`;
    }
  },
  watch:{
    chooseGoods:function(){
      this.$emit('getChooseList',this.chooseGoods);
    }
  }
};
</script>

<style lang="scss" scoped >
.card {
  width: 710rpx;
  margin: auto;
  background: #fff;
  border-radius: 10rpx;
}
.goods {
  display: flex;
  align-items: center;
  padding: 40rpx 15rpx;
  border-bottom: 2rpx solid #ccc;
  &:nth-last-of-type(1) {
    border-bottom: none;
  }
  &-unchecked {
    width: 32rpx;
    height: 32rpx;
    border: 3rpx solid rgba(204, 204, 204, 1);
    border-radius: 50%;
    margin-left: 12rpx;
    margin-right: 15rpx;
  }
  &-checkbox {
    width: 32rpx;
    height: 32rpx;
    background: #01bd9f;
    border: 3rpx solid #01bd9f;
    border-radius: 50%;
    position: relative;
    margin-left: 12rpx;
    margin-right: 15rpx;
    &__icon {
      position: absolute;
      left: 6rpx;
      top: 16rpx;
      display: inline-block;
      width: 10rpx;
      height: 4rpx;
      background: #fff;
      line-height: 0;
      font-size: 0;
      vertical-align: middle;
      transform: rotate(45deg);
      &:after {
        content: "";
        display: block;
        width: 18rpx;
        height: 4rpx;
        position: absolute;
        top: 0rpx;
        left: 3rpx;
        background: #fff;
        transform: rotate(-90deg) translateY(-50%) translateX(50%);
      }
    }
  }
  img {
    width: 174rpx;
    height: 174rpx;
    margin-right: 20rpx;
  }
  &-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 174rpx;
    &__title {
      width: 424rpx;
      font-size: 32rpx;
      line-height: 40rpx;
      @include ellipsis(2);
    }
    &-number {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 28rpx;
        line-height: 40rpx;
        margin-right: 78rpx;
      }
    }
  }
}
</style>
