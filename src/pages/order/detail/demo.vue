<template>
   <!-- 配送中 -->
    <div v-if="order.state === 30 && order.deliveryType === 1 && order.shippingCompany" class="order-map">
      <!-- @TODO: 经纬度信息 order.riderLng -->
      <map :longitude="order.riderLng" :latitude="order.riderLat" :markers="[{iconPath: 'https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/markers.png',id: 0,latitude: order.riderLat,longitude: order.riderLng,width: 30, height: 30}]">
      </map>
      <cover-view class="order-countdown">
        <cover-view class="order-countdown__bg-left">
          <cover-view class="fill" :animation="la"></cover-view>
        </cover-view>
        <cover-view class="order-countdown__bg-right">
          <cover-view class="fill" :animation="ra"></cover-view>
        </cover-view>
        <cover-view class="order-countdown__bd">
          <cover-view class="order-countdown__title">{{hms.h}}:{{hms.m}}:{{hms.s}}</cover-view>
          <cover-view class="order-countdown__desc">送达倒计时</cover-view>
        </cover-view>
      </cover-view>
      <cover-view class="order-countdown-point"></cover-view>
    </div>

    <!-- 待支付、待配送、订单已关闭-->
    <div style="position: relative;" v-else>
      <img class="BackImg" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/background_icon.png" alt="">
      <div class="order-status ">

        <!-- 待支付 -->
        <template v-if="order.state === 10">
          <div class="unpa">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/unpaid_icon.png" alt="">
            <p class="unpaid">待支付</p><br>
            <span v-if="true">{{timers}}秒后自动取消订单</span>
          </div>
        </template>
        <!-- 待配送 -->
        <template v-else-if="order.state === 20 || order.state === 21">
          <template v-if="order.deliveryType === 1">
            <div>
              待配送
              <div class="desc">预计{{ deliveryRange }}送达</div>
            </div>
          </template>
          <template v-else>
             <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/orderdetail.png" alt="">
            <div style="margin-left:31rpx;">
              待提货
              <!-- <div class="desc">提货时间 ：{{  order.pickTime }}</div> -->

            </div>
          </template>
        </template>
        <template v-else-if="order.state === 30">
          <template v-if="order.deliveryType === 1">
            配送中
          </template>
          <template v-else>
            <div>
              待核销
              <!-- <div class="desc">提货时间:{{ deliveryRange }}<template v-if="order.orderType !=1 && order.orderType !=6">(期间未提货自动退款)</template></div> -->
            </div>
          </template>
        </template>
        <!-- 订单已关闭 -->
        <template v-else-if="order.state === 50">
           <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/close_icon.png" alt="">
            <p style="margin-left:32rpx;">订单已关闭</p>

        </template>
        <template v-else-if="order.state === 0 && !isAssemble">
           <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/close_icon.png" alt="">
         <p style="margin-left:32rpx;">订单已取消</p>
        </template>
        <!-- 订单已签收 改 交易成功 -->
        <template v-else-if="order.state === 40 || order.state === 49">
           <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/success_icon.png" alt="">
           <p style="margin-left:32rpx;">交易成功</p>

        </template>
        <template v-else-if="order.state === 59">
          售后中
        </template>
        <template v-else-if="order.state === 60">
          已售后
        </template>
        <!-- 交易成功 -->
        <template v-else-if="false">
          交易成功(已签收）
        </template>
      </div>

      <!-- if 配送 -->
      <div class="order-address" v-if="order.deliveryType === 1">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div>{{ order.receiverName }}&nbsp;&nbsp;{{ order.receiverMobile }}</div>
            <div class="desc">{{ order.receiverAddress }}</div>
          </div>
        </div>
      </div>



      <!-- else 自提 -->
      <div class="order-shop" @click="openLocation" v-else>
        <div class="weui-cell weui-cell_access" style="padding: 16rpx 25rpx;margin-top:24rpx;">
          <div class="weui-cell__bd">
            <div class="order-shop__title">
              <div class="weui-flex">
                <div class="weui-flex__item" v-show="false"></div>
                <div class="store">提货店铺 </div>
                <div class="xian"></div>
                <div class="store_name">{{ order.receiverName }}</div>
                <div class="order-shop__desc">{{ order.receiverAddress }}</div>
              </div>
            </div>

          </div>
          <!-- <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
        </div>
         <img class="addborder" src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/order_dividingline@2x.png">
      </div>
    </div>



    <!-- 商品列表 -->
    <div class="weui-panel goods-list-panel">
      <div class="weui-panel__bd">
        <navigator v-for="item in order.orderGoodsList"
          :key="item.goodsId"
          :url="'/pages/goods/detail/main?id=' + item.goodsId"
          class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="item.goodsImage" mode="aspectFit"  />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <!-- if 赠品 -->
            <div v-if="item.isPresentation && item.isPresentation != 2" class="weui-media-box__title">
              <span class="goods-tag">赠品</span>
              {{ item.goodsName }}
            </div>
            <div v-else class="weui-media-box__title weui-media-box__title_total">
              {{ item.goodsName }}
              <div class="goods-total">
                ￥{{ item.onlinePrice * item.goodsNum }}<span v-if="item.points">+积分{{item.points}}</span>
                <navigator v-if="item.refundState == 1 || item.refundState == 3" :url="'/pages/order/returndetail/main?id=' + item.refundId" @click.stop>
                  <buttom class="weui-btn" :plain="true" size="mini">售后</buttom>
                </navigator>
              </div>
            </div>


            <!-- else 赠品 -->
            <div class="weui-media-box__desc" v-if="!item.isPresentation || item.isPresentation == 2">
              <span >单价:￥{{ item.onlinePrice }}</span>
              <div class="goods-count goods-count_ih">数量: x{{ item.goodsNum }}</div>
            </div>
          </div>
        </navigator>
      </div>
    </div>





    <!-- 订单信息 -->
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label" style="font-weight:bold;font-size:30rpx;">订单信息</div>
        </div>
      </div>
       <div class="xian"></div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">下单时间：</div>
          <div class="weui-form-preview__value">{{ order.orderTime }}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">订单编号：</div>
          <div class="weui-form-preview__value">
            {{ order.orderSn }}
            <button :plain="true" type="default" @click="copyOrderNO">复制</button>
          </div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">支付方式：</div>
          <div class="weui-form-preview__value">{{ paymentCodeText }}</div>
        </div>
        <div class="weui-form-preview__item" v-if="order.redPacketAmount">
          <div class="weui-form-preview__label">
            <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/orderdetails_icon_redenvelopes@2x.png" class="redpack">
            {{ order.redPacketAmount }}元红包
          </div>
          <div class="weui-form-preview__value">-￥{{ order.redPacketAmount }}</div>
        </div>
        <div class="weui-form-preview__item" v-if="order.couponPrice">
          <div class="weui-form-preview__label">优惠券</div>
          <div class="weui-form-preview__value">-￥{{ order.couponPrice }}</div>
        </div>
        <!-- <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">配送费</div>
          <div class="weui-form-preview__value">￥{{ order.shippingFee }}</div>
        </div> -->
        <div class="weui-form-preview__item" v-if="order.pointNum">
          <div class="weui-form-preview__label">积分({{ order.pointNum }})</div>
          <div class="weui-form-preview__value">￥{{ order.pointPayAmount }}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">商品总价</div>
          <div class="weui-form-preview__value">￥{{ order.goodsAmount }}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label text-black">实际支付</div>
          <div class="weui-form-preview__value" style="color:red;">￥{{ order.orderAmount }}</div>
        </div>
      </div>
    </div>



    <!-- 待配送、配送中 -->
    <template v-if="order.deliveryType === 1">
      <div v-if="order.state == 20 || order.state == 21 || order.state == 30 || order.state == 40 || order.state == 49"
        class="weui-cells weui-cells_no-border order-cells">
        <navigator
          :url="'/pages/order/progress/main?id=' + order.orderId"
          class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">订单进度</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
      </div>
      <!-- 配送中 -->
      <div v-if="order.state == 30 || order.state == 40 || order.state == 49" class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">配送信息</div>
            <div class="weui-form-preview__value">
              <!-- XXX: 骑手详情不用做 -->
              <div class="text-green" @click="callRider">
                联系骑手
                <img src="https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechat/orderdetails_icon_phone@2x.png" class="tel-icon">
              </div>
            </div>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">配送服务：</div>
            <div class="weui-form-preview__value">{{ order.shippingCompany || '乐家配送' }}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">配送骑手：</div>
            <!-- XXX: 投诉不用做 -->
            <div class="weui-form-preview__value">
              <div class="weui-cell__ft weui-cell__ft_in-access gray">
                {{ order.rider }}
              </div>
            </div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">支付方式：</div>
            <div class="weui-form-preview__value">{{ paymentCodeText }}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">配送地址：</div>
            <div class="weui-form-preview__value">
              <div class="text-black">
                {{ order.receiverName }}&nbsp;{{ order.receiverMobile }}
              </div>
              <div style="font-size: 28rpx; margin-top: -10rpx">
                {{ order.receiverAddress }}
              </div>
            </div>
          </div>
          <div class="weui-form-preview__item" v-if="order.orderMessage">
            <div class="weui-form-preview__label">买家留言：{{ order.orderMessage }}</div>
          </div>
        </div>
      </div>
    </template>


    <!-- 积分 -->
    <div v-if="(order.state == 40 || order.state == 49) && order.pointNum" class="weui-cells weui-cells_no-border">
      <div class="weui-cell">
        <div class="bonus-point">
          <span>积分</span>
          +{{ order.pointNum }}
        </div>
      </div>
    </div>
    <!-- Footer Start -->
    <!-- 待支付 -->
    <div class="footer-bar" v-if="order.state === 10">
      <button :plain="true" type="default" @click="cancel" v-if="order.orderType !=1">取消订单</button>
      <button :plain="true" type="primary" @click="pay">去支付</button>

    </div>

    <!-- 已关闭 -->
    <div class="footer-bar" v-else-if="order.state === 0 && !isAssemble">
      <button :plain="true" type="default" @click="del">删除订单</button>
    </div>

    <!-- 交易成功 -->
    <div class="footer-bar" v-else-if="order.state === 40">
      <!-- <button :plain="true" type="default" @click="del">删除订单</button> -->
      <button :plain="true" type="default" @click="applyReturns">申请售后</button>
      <!-- <button :plain="true" type="primary" v-if="order.evaluateState == 1" @click="commentHistory">历史评价</button> -->
      <!-- <button :plain="true" type="primary" v-else  @click="comment">评价</button> -->
    </div>
    <div class="footer-bar" v-else-if="order.state === 49">
      <!-- <button :plain="true" type="default" @click="del">删除订单</button> -->
      <button :plain="true" type="default" @click="applyReturns">申请售后</button>
      <!-- <button :plain="true" type="primary" @click="commentHistory">历史评价</button> -->
    </div>

    <template v-if="order.deliveryType === 1">
      <!-- 待配送 -->
      <div class="footer-bar" v-if="order.state === 20 || order.state === 21">
        <button :plain="true" type="default" @click="cancel" v-if="order.orderType !=1">取消订单</button>
      </div>
      <!-- 配送中 -->
      <div class="footer-bar" v-else-if="order.state === 30">
        <!-- @TODO: -->
        <button :plain="true" type="default" @click="remind">催单</button>
        <button :plain="true" type="primary" @click="finish">确认收货</button>
      </div>
    </template>
    <template v-else-if="order.deliveryType === 2">
      <!-- 待核销 -->
      <div class="footer-bar" v-if="order.state === 20 || order.state === 21 || order.state === 30">
        <template v-if="isAssemble">
          <button :plain="true" type="default" @click="applyReturns">申请售后</button>
        </template>
        <template v-else>
          <button :plain="true" type="default" @click="cancel" v-if="order.orderType !=1">取消订单</button>
        </template>

        <button type="primary" class="bg-gradient" @click="showOrderCode">提货码</button>
      </div>
    </template>

</template>
