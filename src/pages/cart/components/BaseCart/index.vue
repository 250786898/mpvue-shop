<template>
  <div class="cart-container">
    <div class="group">
      <div class="group-header">
        <div class="group-header-content">
          <div class="group-header-left">
            <label class>
              <switch
                type="checkbox"
                class="weui-check"
                :checked="allChecked"
                @change="onAllCheckedChange"
              ></switch>
              <div class="weui-check__hd_in-checkbox">
                <icon class="weui-icon-checkbox_circle" type="circle" size="16" v-if="!allChecked"></icon>
                <icon
                  class="weui-icon-checkbox_success"
                  type="success"
                  color="#01bd9f"
                  size="16"
                  v-if="allChecked"
                ></icon>
              </div>
            </label>
            <span class="group-desc">门店自提</span>
          </div>
          <div class="group-header-right" @click="clearAllCart">
            <img
              src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/commom_collection depot_png.png"
              class="delete-icon"
              alt
            />
          </div>
        </div>
      </div>

      <div class="cart-list">
        <goods-card
          v-for="(item, index) in cartItemResultList"
          :item="item"
          :key="index"
          :isFailure="false"
          @onGoodsCBChange="onGoodsCBChange"
          @onGoodsNumChange="onGoodsNumChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '../Counter/index'
import GoodsPrice from '../GoodsPrice/index'
import LimmitTag from '../LimitTag/index'
import { Api } from '@/http/api'
import GoodsCard from '../goodsCard/index'
export default {
  props: {
    cartItemResultList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Counter,
    GoodsPrice,
    LimmitTag,
    GoodsCard
  },
  computed: {
    allChecked: {
      get() {
        //如果每一购物车商品都勾选则勾选
        return (
          this.cartItemResultList &&
          this.cartItemResultList.filter(item => item.isSale).every(item => item.isSelect)
        )
      }
    }
  },

  methods: {
    /**
     * @param {boolean} detail.value 修改成的值，true 选中，false反之
     * @param {object} 购物车商品对象
     * @param {Number} 购车索引值
     * @description 选择取消购车商品
     */
    onGoodsCBChange(
      {
        mp: { detail }
      },
      item
    ) {
      this.$emit('updateActivityStatus', item)
    },

    /**
     * @param {object} e 当前时间对象，包含是否已经全选状态boolean
     * @description 全选或则取消
     */
    onAllCheckedChange(e) {
      this.$emit('onAllCheckedChange', this.allChecked)
    },

    /**
     * @param {object} item 该购物车商品对象
     * @description 操作商品数量加减
     */
    onGoodsNumChange(count, item) {
      console.log('onGoodsNumChange', count)
      if (count < 1) {
        //该购物车商品数量为1的时候再减为0删除该购物车商品
        wx.showModal({
          title: '提示',
          content: '您确定删除该商品？',
          success: result => {
            if (result.confirm) {
              //确定删除
              this.$emit('del', item)
            } else {
              //取消删除
              this.$emit('updateCartNum', item, 1)
            }
          },
          fail: () => {},
          complete: () => {}
        })
      } else {
        //多于等于1的时候更新购物车
        this.$emit('updateCartNum', item)
      }
    },

    /**
     * @description 获取购车商品id集合，以逗号隔开(1,2,3...)
     * @returns {string} cartIds id集合
     */
    fetchCartIds() {
      const cartIds = this.cartItemResultList
        .filter(item => item.isSelect)
        .map(item => item.cartId)
        .join(',')
      return cartIds
    },

    /**
     * @description 清除全部正常商品购物车
     */
    clearAllCart() {
      console.log('this.cartItemResultList', this.cartItemResultList)
      const cartIds = this.fetchCartIds()
      if (!cartIds) {
        //没有勾选商品提示
        wx.showToast({
          title: '您尚未选中商品', //提示的内容,
          icon: 'none' //图标,
        })
        return false
      }

      if (this.cartItemResultList) {
        //已经存在有勾选
        wx.showModal({
          title: '提示',
          content: '您是否要删除已勾选的商品？',
          success: result => {
            if (result.confirm) {
              const cartIds = this.getAllCartIds()
              this.del(cartIds)
            }
          }
        })
      }
    },

    /**
     * @description 获取购物车id集合，多个逗号隔开
     * @returns {string} 购物车id集合:1,2,3...
     */
    getAllCartIds() {
      if (!this.cartItemResultList) return ''

      return this.cartItemResultList
        .filter(item => item.isSelect)
        .map(item => item.cartId)
        .join(',')
    },

    /**
     * @param {Object} item 购物车商品对象
     * @description 删除购物车的商品
     */
    del(cartIds) {
      wx.showLoading({
        title: '移除商品中',
        mask: true
      })
      Api.cart
        .remove({
          cartIds
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.cartItemResultList = []
            this.$store.dispatch('updateCartNum')
            this.$emit('updateCartList') //更新购物车列表
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  margin-top: 20rpx;
}
.weui-icon-checkbox_circle,
.weui-icon-checkbox_success {
  display: block;
}
.weui-check__hd_in-checkbox {
  padding-right: 20rpx;
}
.empty-tip {
  padding-top: 220rpx;
  padding-bottom: 220rpx;
  border-bottom: 1rpx solid #f4f4f4;
  button {
    margin-top: 50rpx;
    width: 428rpx;
  }
}

.top-tip {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: #fef7d7;
  &__tag {
    margin-right: 10rpx;
    padding: 0 10rpx;
    border-radius: 10rpx;
    border: 2rpx solid #ef3737;
    line-height: 36rpx;
    height: 36rpx;
    font-size: 24rpx;
    color: #ef3737;
  }
  &__placeholder {
    height: 80rpx;
  }
  .weui-cell {
    &__bd {
      font-size: 26rpx;
      color: $text-black;
    }
    &__ft {
      font-size: 26rpx;
      color: #0fd7c0;
      &:after {
        border-color: #0fd7c0;
      }
    }
  }
}

.group {
  width: 710rpx;
  margin: auto;
  overflow: hidden;
  border-radius: 10rpx;
  background: $white-color;
  &-item {
    border-radius: 14rpx;
    background: $white-color;
  }
  + .group {
    margin-top: 20rpx;
  }
  &-tip {
    background-color: #fff;
    padding-top: 20rpx;
    .weui-cell {
      padding-left: 96rpx;
      padding-top: 12rpx;
      padding-bottom: 12rpx;
      background-color: #efffdb;
      &__bd {
        font-size: 26rpx;
        span {
          color: #da3535;
        }
      }
      &__ft {
        font-size: 26rpx;
        color: #0fd7c0;
        &:after {
          border-color: #0fd7c0;
        }
      }
    }
  }
  &__title {
    background-color: $white-color;
    font-weight: 800;
    text-align: center;
    font-size: 32rpx;
    color: $text-gray;
    height: 90rpx;
    line-height: 90rpx;
    border-bottom: 1rpx solid #f4f4f4;
  }
}

/*正常商品样式*/
.group-header {
  &-content {
    display: flex;
    height: 90rpx;
    justify-content: space-between;
    border-bottom: 1rpx solid #f4f4f4;
    align-items: center;
  }
  padding: 0 20rpx;
  box-sizing: border-box;
  &-left {
    display: flex;
    font-size: 34rpx;
    font-weight: 800;
    align-items: center;
  }
  &-right {
    color: #666666;
    font-size: 28rpx;
    font-weight: 800;
    .delete-icon {
      width: 46rpx;
      height: 46rpx;
    }
  }
}
.group-footer {
  height: 74rpx;
  line-height: 74rpx;
  padding-left: 307rpx;
  color: $text-gray-deep;
  font-size: 24rpx;
}
.goods-item-checkbox {
  margin-left: 48rpx;
}
.goods-list-item {
  border-bottom: 1rpx solid #e4e4e4;
}
/*正常商品样式*/
</style>
