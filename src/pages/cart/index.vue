<template>
  <div>
    <div class="cart-container"  v-if="(cartItemResultList && cartItemResultList.length) || (failureGoodsList && failureGoodsList.length)">

        <!-- 优惠券模块 -->
        <coupon-wrap :goods-list="goodsListByCoupon" :coupon-list="myCouponList" />

        <!-- 正常商品列表 -->
        <base-cart
          :cartItemResultList="cartItemResultList"
          @onAllCheckedChange="onAllCheckedChange"
          @updateCartNum="updateCartNum"
          @updateActivityStatus="updateActivityStatus"
          @updateCartList="refreshCartList"
          @del="del"
          v-if="cartItemResultList && cartItemResultList.length"
        />

        <!-- 失效商品列表  -->
        <failure-cart
          :failureGoodsList="failureGoodsList"
          @updateCartList="updateCartList"
           v-if="failureGoodsList && failureGoodsList.length"
        />

        <!-- 占位符 -->
        <div style="height: 120rpx;"></div>

        <!-- 悬浮区域 -->
        <Suspension
          :totalAmount="totalAmount"
          :promisAmount="promisAmount"
          :cartItemResultList="cartItemResultList"
          @onAllCheckedChange="onAllCheckedChange"
          v-if="cartItemResultList && cartItemResultList.length"
        />

    </div>

    <div class="empty-cart-container" v-else >
      <!-- 购物车为空的时候显示 -->
      <empty-cart />
    </div>
  </div>
</template>

<script>
  import { Api } from '@/http/api'
  import { mapState } from 'vuex'
  import CouponWrap from './components/CouponWrap'
  import FailureCart from './components/FailureCart/index'
  import BaseCart from './components/BaseCart/index'
  import EmptyCart from './components/EmptyCart/index'
  import Suspension from './components/Suspension/index'
  import  CartModel from '@/model/cart'
  import CouponModel from '@/model/coupon'
  const couponModel = new CouponModel()
  const cartModel = new CartModel()

  export default {
    components: {
      CouponWrap,
      FailureCart,
      BaseCart,
      EmptyCart,
      Suspension
    },

    data () {
      return {
        result: {}, //购物车相关信息
        cartItemResultList: [], //正常商品购物车列表
        preSaleGoodList: [], //预售商品列表
        failureGoodsList: [], //失效商品购物车列表
        goodsListByCoupon: [], //优惠券推荐商品列表格
        myCouponList: [], //我的优惠券列表
        totalAmount: 0, //合计购物车价格
        promisAmount: 0 //已优惠价格
      }
    },

    computed: {
      ...mapState(['storeId','sessionId'])
    },

    onLoad() {
      console.log('购物车页面onLoad')
      this.$bus.$on('updateCart', this.getCartList)
    },

    mounted () {
      console.log('购物车页面mounted')
    },

    onUnload() {
      this.$bus.$off('updateCart', this.getCartList)
    },

    onShow() {
      console.log('购物车页面onShow',this.sessionId)
      if(!this.sessionId) {
        //如果未登陆，初始化所有数据，避免退出登陆还存在购物车数据
         Object.assign(this.$data, this.$options.data())
      }
      wx.showLoading({  //显示加载组件
        mask: true,
        title: '加载中'
      })
      this.loadCartData()
    },


    onPullDownRefresh() {
      this.getCartList()  //下拉更新购物车列表
    },



    methods: {

      /**
       * @description 加载购物车相关数据
       */
      loadCartData () {
        Promise.all([this.getCartList(),this.loadCouponInfo(),this.getCartCouponGoodsList()])
        .then(res => {
          //所有请求完毕隐藏加载提示
           wx.hideLoading()
           wx.stopPullDownRefresh()
        })
          //获取购物车列表
      },

      getCartCouponGoodsList () {
        console.log('getCartCouponGoodsListgetCartCouponGoodsListgetCartCouponGoodsList222')
        return couponModel.getCartCouponGoodsList({
          storeId: this.storeId,
          restricted: 1
        }).then(res => {
          if(res.code == Api.CODES.SUCCESS) {
            this.goodsListByCoupon = res.data.goods
          }
        })
      },

       /**
       * @description 初始化，加载购物车列表
       */
      getCartList() {
        return Api.cart.cartList({
          storeId: this.storeId,
          carts: 'all'
        }).then(res => {
          if (res.code == Api.CODES.SUCCESS) {
            this.cartItemResultList = res.data.cartItemResultList
            this.failureGoodsList = res.data.failureGoodsList
            this.totalAmount = res.data.totalAmount //合计购物车价格
            this.promisAmount = res.data.promisAmount //已优惠价格
          }
        })
        .catch(e => console.log(e))
        this.$store.dispatch('syncCartTabbarBadge') //设置tab徽章
      },


       /**
       * @description 加载优惠券列表
       */
       loadCouponInfo () {
        return couponModel.getCartCouponInfo({
          storeId: this.storeId
        }).then(res => {
          if(res.code == Api.CODES.SUCCESS) {
             this.myCouponList= res.data.shopCoupons
          }
        })
      },

      /**
       * @description 获取购物车id集合
       */
      getCheckedCartIds() {
        if (!this.cartItemResultList) return ''

        return this.cartItemResultList
          .filter(item => item.isSelect)
          .map(item => item.cartId)
          .join(',')
      },

      /**
       * @description 获取选择或则取消选择后的购物车列表
       */
      getUpdateCartResultList (cartItemResultList,checked,index) {
        let list = cartItemResultList.map( (item,currentIndex) => {
          let checkedValue = currentIndex == index ? checked : ''
          return {
          ...item,
          checked: checkedValue? checkedValue : this.cartItemResultList[currentIndex].checked
          }
        })
        return list
      },

      /**
       * @param {boolean} allSelectStauts 当前全选中状态
       * @description 全选操作，修改全选状态
       */
      async onAllCheckedChange (allSelectStauts) {
        wx.showLoading({})
        console.log('onAllCheckedChange',allSelectStauts)
        const res = await cartModel.updateSelect({
          cartIds: allSelectStauts ? '' : 'all'
        })

        if(res.code == Api.CODES.SUCCESS) {
          wx.hideLoading({})
          if(res.data.info) {
            //库存检测问题
            wx.showToast({
              icon: 'none',
              title: res.data.info
            })
            setTimeout(() => {
              this.refreshCartList()
            },1500)


          }else{
            //库存无问题，更新购物车
            this.refreshCartList()
          }
        }
      },


      /**
       * @param {boolean} 当前购物车商品是否选中
       * @param {index} 购物车商品所在索引
       * @description 选中或则勾选更新购物车
       */
      async updateActivityStatus(item) {
        const res = await cartModel.updateSelect({
          cartIds: item.cartId
        })

        if(res.code == Api.CODES.SUCCESS) {

          if(res.data.info) {
            //库存检测问题
            wx.showToast({
              icon: 'none',
              title: res.data.info
            })
          }else{
            //库存无问题，更新购物车
            this.refreshCartList()
          }

        }


      },

      /**
       * @description 更新购物车列表
       */
      refreshCartList () {
        wx.showLoading({})
        Api.cart.cartList({
          storeId: this.storeId,
          carts: this.getCheckedCartIds()
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {

            //选择或则取消了购物车重新更新订单
            this.cartItemResultList = res.data.cartItemResultList
            this.failureGoodsList = res.data.failureGoodsList
            this.totalAmount  =  res.data.totalAmount
            this.promisAmount = res.data.promisAmount
            this.$store.dispatch('updateCartNum')
            wx.hideLoading({})
          }
        })
      },

      /**
       * @param {object} item 该购物车商品对象
       * @param {number} num 自定义更新购物车数量
       * @description 更新购物车数量
       */
      updateCartNum (item,num) {
         Api.cart.update({
          cartId: item.cartId,
          num: num || item.itemTotalNum,
          storeId: this.storeId
        }).then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            this.refreshCartList()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
            if (res.code === 5000000) {
              // item.goodsNum--
            }
          }
        })
      },



      /**
       * @param {Object} item 购物车商品对象
       * @param {boolean} isFailureGoods 是否是失效商品
       * @description 删除购物车的商品
       */
      del(item, isFailureGoods = false) {
        wx.showLoading({
          title: '移除商品中',
          mask: true
        })
        Api.cart.remove({
          cartIds: item.cartId
        })
        .then(res => {
          if (res.code === Api.CODES.SUCCESS) {
            if (isFailureGoods) {
              let index = this.failureGoodsList.indexOf(item)
              this.failureGoodsList.splice(index, 1)
            } else {
              let index = this.cartItemResultList.indexOf(item)
              this.cartItemResultList.splice(index, 1)
            }
            this.$store.dispatch('updateCartNum')
            this.refreshCartList()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
        .catch(e => console.log(e))
        .then(() => wx.hideLoading())
      },


    }


  }
</script>

<style>
  page { background-color: #F5F5F5; }
</style>

<style lang="scss" scoped>
.cart-container{
  display: flex;
  flex-direction: column;
  padding: 20rpx 0;
  box-sizing: border-box;
  align-items: center;
}
.empty-cart-container{
  width: 100vw;
  height: 100vh;
  padding: 20rpx 20rpx 58rpx;
  box-sizing: border-box;
}
  .empty-tip {
    padding-top: 100rpx;
    padding-bottom: 220rpx;
    border-bottom: 1rpx solid #F4F4F4;
    font-size:24rpx;
    button {
      margin-top: 50rpx;
      width: 428rpx;
    }
    img{
      width: 380rpx;
      height: 264rpx;
      margin-bottom:0rpx;
    }
  }

  .top-tip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
    background-color: #FEF7D7;
    &__tag {
      margin-right: 10rpx;
      padding: 0 10rpx;
      border-radius: 10rpx;
      border: 2rpx solid #EF3737;
      line-height: 36rpx;
      height: 36rpx;
      font-size: 24rpx;
      color: #EF3737;
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
        color: #0FD7C0;
        &:after {
          border-color: #0FD7C0;
        }
      }
    }
  }

  .group {
    width: 708rpx;
    margin: auto;
    overflow: hidden;
    border-radius:14rpx;
    background: $white-color;
    &-item{
      border-radius:14rpx;
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
        background-color: #EFFFDB;
        &__bd {
          font-size: 26rpx;
          span {
            color: #DA3535;
          }
        }
        &__ft {
          font-size: 26rpx;
          color: #0FD7C0;
          &:after {
            border-color: #0FD7C0;
          }
        }
      }
    }
    &__title {
      background-color: $white-color;
      font-weight:800;
      text-align: center;
      font-size: 32rpx;
      color: $text-gray;
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 1rpx solid #F4F4F4;
    }
  }

  /*正常商品样式*/
  .group-header{
    display: flex;
    height: 90rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1rpx solid #F4F4F4;
    align-items: center;
    &-left{
      display: flex;
      font-size: 30rpx;
      font-weight:800;
    }
    &-right{
      color: #666666;
      font-size: 28rpx;
      font-weight: 800;
    }
  }
  .group-footer{
    height: 74rpx;
    line-height: 74rpx;
    padding-left: 307rpx;
    color: $text-gray-deep;
    font-size: 24rpx;
  }
  .goods-item-checkbox {
    margin-left: 48rpx;
  }
  .goods-list-item{
    border-bottom: 1px solid #F4F4F4;
  }
  /*正常商品样式*/

</style>
