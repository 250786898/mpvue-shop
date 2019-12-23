<template>
  <div class="card">
    <div class="goods" v-for="(item,index) in list" :key="index">
      <div class='goods-checkbox' v-if="checkboxShow">
        <switch
          type="checkbox"
          class="weui-check"
          :checked="item.checked"
          @change="onChange($event,item)"
          color="#01bd9f"
        />
        <div class="weui-cell__hd weui-check__hd_in-checkbox">
          <icon class="weui-icon-checkbox_success" type="success" size="18" v-if="item.checked"></icon>
          <icon class="weui-icon-checkbox_circle" type="circle" size="18" v-else></icon>
        </div>
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
  props: {
    goodList: {
      type: Array,
      default: () => {
        return [];
      }
    }, //商品列表
    numberColor: {
      type: String,
      default: "#333"
    }, //数量颜色值
    checkboxShow: {
      type: Boolean,
      default: true
    } //复选框是否显示
  },
  components: {
    OnlinePrice
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    /**
     * @description 改变复选框状态
     */
    onChange(e,item){
      item.checked = e.mp.detail.value
    },

    /**
     * @description 获取数量颜色
     */
    getNumberColor() {
      return `color:${numberColor}`;
    }
  },
  watch: {
    chooseGoods: function() {
      console.log(this.list);
      this.$emit("getChooseList", this.list.filter(item => item.checked));
    },
    goodList:function(){
      this.list = this.goodList.map(item => ({
      ...item,
      checked: true
    }));
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

  &-checkbox {
    width: 32rpx;
    height: 32rpx;
    position: relative;
    margin-left: 12rpx;
    margin-right: 15rpx;
    .weui-icon-checkbox_circle{
      color: #01bd9f;
    }
    &__switch{
      width: 32rpx;
    height: 32rpx;
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
