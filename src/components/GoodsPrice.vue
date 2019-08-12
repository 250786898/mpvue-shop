<template>
  <!--
    xianshiqiang("xianshiqiang", "限时抢购", 10),
    manjiansong("manjiansong", "满减送", 20),
    tuangou("tuangou", "拼团活动", 30),
    activitySubject("activitySubject", "活动专题", 40),
    memberSubject("memberSubject", "会员活动专题", 50),
    coupon("coupon", "优惠券", 70),
    pointShop("pointShop", "积分商城", 80),
    payReward("payReward", "支付有礼", 90),
    invitation("invitation", "邀请有礼", 100);
  -->
  <div class="box">

    <div class="goods-row-item__price goods-row-item__price_timelimit" v-if="item.activityType == 10">
      <div class="primary">
        <span>￥{{ item.activityPrice }}</span>
        <span class="activity-tag activity-tag_timelimit">限时抢购</span>
      </div>
      <div class="secondary line-through">￥{{ item.onlinePrice }}</div>
    </div>

    <div class="goods-row-item__price" v-else-if="item.activityType == 80">
      <div class="primary">￥{{ item.activityPrice }}+积分{{item.pointReward}}</div>
    </div>

    <div class="goods-row-item__price goods-row-item__price_member" v-else-if="item.activityType == 50">
      <div class="primary">
        <span>￥{{ item.activityPrice }}</span>
        <span class="activity-tag activity-tag_member">会员价</span>
        <span v-if="item.goodsNum != item.itemTotalNum">×{{item.goodsNum}}</span>
        
      </div>
      <div class="secondary">
        ￥{{ item.onlinePrice }}
        <span class="normal-tag" v-if="showNormalTag">原价</span>
        <span v-if="item.normalNum"> ×{{item.normalNum}}</span>
      </div>
    </div>

    <div class="goods-row-item__price" style=" position: absolute;top: 0rpx;" v-else>
      <div class="primary">￥{{ item.onlinePrice }}</div>
      <div class="secondary" v-if="item.onlineScribingPrice">￥{{ item.onlineScribingPrice }}</div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      showNormalTag: {
        type: Boolean,
        default: () => false
      }
    }
  }
</script>
<style lang="scss" scoped>
.box{

  position: relative;
  .line-through{
  text-decoration: line-through;
}
.goods-row-item__price {
  position: absolute;
  top: 150rpx;
  .primary{
    position:absolute;
    top:7rpx;
  }
.secondary{
  position:absolute;
    top:35rpx;
}

}
}

</style>
