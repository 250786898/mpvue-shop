<template>
  <div class="card">
    <img src="/static/images/good-img.png" mode="aspectFit" class="goods-img">
    <div class="card-main">
      <div class="card-main-top">
        <div class="goods-name">
          原泽味 果园直发纯真鲜果 四川青脆李子 2.5kg
        </div>
        <div class="goods-desc">脆甜爽口 现摘现发</div>
        <div class="limit-tag">限购</div>
      </div>
       <div class="card-main-bottom">
         <div class="card-main-bottom-left">
           <div class="price-area">
              <div class="current-price">
                <span class="current-price__sign">￥</span>
                <span class="current-price-before-point">13</span>
                <span class="current-price__point">.</span>
                <span class="current-price-after-point">80</span>
              </div>
              <div class="line-price">￥38.00</div>
           </div>
           <div class="sell-num">已售4738份</div>
         </div>
         <div class="card-main-bottom-right">
            <NumHandle/>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumHandle from '../NumHandle'
export default {
  components: {
    NumHandle
  }
}
</script>

<style lang="scss" scoped>
.card{
  padding: 40rpx 0;
  height: 350rpx;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  .goods-img{
    width: 268rpx;
    height: 268rpx;
    margin-right: 21rpx;
  }
  .card-main{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 380rpx;
    &-top{
      .goods-name{
        color:#272727;
        font-weight:500;
        font-size:32rpx;
        line-height:45rpx;
        width: 360rpx;
      }
      .goods-desc{
        color:#999999;
        font-size:26rpx;
        line-height: 26rpx;
        margin: 10rpx 0 15rpx;
      }
      .limit-tag{
        width:67rpx;
        height:30rpx;
        line-height: 30rpx;
        text-align: center;
        border:1rpx solid rgba(248,172,8,1);
        border-radius:4rpx;
        color: #F8AC08;
        font-size: 22rpx;
      }
    }
    &-bottom{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .price-area{
        display: flex;
        align-items: flex-end;
        line-height: 1;
        margin-bottom: 10rpx;
      }
      .current-price{
        color: #ff0000;
        font-weight: bold;
        margin-right: 10rpx;
        &__sign{
          font-size: 24rpx;
        }
        &-before-point{
          font-size: 38rpx;
        }
        &__point{
          font-size: 38rpx;
        }
        &-after-point{
          font-size: 28rpx;
        }
      }
      .line-price{
        color: #3D3C3C;
        font-size: 24rpx;
        text-decoration: line-through;
      }
      .sell-num{
        color:#787878;
        font-size: 22rpx;
      }
    }
  }
}
</style>
