<template>
  <div v-if="shown">
    <div class="backdrop"></div>
    <div class="vip-dialog">
      <div class="vip-dialog__container">
        <h4 class="vip-dialog__title">会员权益说明</h4>
        <div class="vip-dialog__bd">
          <div class="vip-dialog__li">
            <div class="vip-dialog__li__title">关于有效期</div>
            <div class="vip-dialog__li__desc">支付成功日起开始计算，1个月有效期为30天，3个月有效期为90天，半年有效期有180天，1年有效期365天。有效期内再次购买乐享VIP会员卡，会在原会员卡累加有效期。
</div>
          </div>
          <div class="vip-dialog__li">
            <div class="vip-dialog__li__title">关于退款</div>
            <div class="vip-dialog__li__desc">乐享VIP卡购买后不可退款。</div>
          </div>
          <div class="vip-dialog__li">
            <div class="vip-dialog__li__title">关于会员城市</div>
            <div class="vip-dialog__li__desc">乐家生鲜连锁全国通用。</div>
          </div>

          <div class="vip-dialog__li">
            <div class="vip-dialog__li__desc">
注：乐享VIP只针对乐家生鲜Fresh微信小程序商城适用，线下连锁店不可使用。</div>
          </div>
        </div>
      </div>
      <div class="vip-dialog__close" @click="$emit('update:shown', false)">
        <icon type="cancel" size="40" color="#FDC360"></icon>
      </div>
    </div> 
  </div>
</template>

<script>
  export default {
    props: {
      shown: {
        type: Boolean,
        default: false
      }
    }
  }
</script>