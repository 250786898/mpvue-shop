<template>
  <div class="dialog" v-if="show">
    <div class="mask"></div>
    <div class="dialog-main">
        <div class="dialog-main-distance">
          是否去距离您<span class="distance">{{shopDetail.storeDistance}}m</span>的【{{shopDetail.storeName}}】进行自提？
        </div>
        <div class="dialog-main-desc">地址：{{shopDetail.storeAddress}}</div>
        <div class="map">
          <map
            :id="0"
            :longitude="shopDetail.storelng"
            :latitude="shopDetail.storeLat"
            :scale="18"
            :markers="markers"
            style="width: 504rpx; height: 309rpx;"
          >
          </map>
        </div>
        <div class="btn-group">
          <button class="cancel-btn" @click="closeDialog">取消</button>
          <button class="pay-btn" type="primary" @click="comfirmPay">确认支付</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  computed: {
   ...mapState(['shopDetail'])
  },

  data () {
    return {
      markers: []
    }
  },

  mounted () {
    this.setMarkers()
  },

  methods: {
    /**
     * @description 设置地图标点
     */
    setMarkers() {
      console.log('this.shopDetail.storeLat',this.shopDetail.storeLat)
      this.markers = [
        {
          iconPath: "https://bucketlejia.oss-cn-shenzhen.aliyuncs.com/wechatv01/comfire-store-mask-icon.png",
          id: 0,
          latitude: this.shopDetail.storeLat,
          longitude: this.shopDetail.storelng,
          width: 15,
          height: 20
        }
      ]
    },

    /**
     * @description 关闭弹窗
     */
    closeDialog () {
      this.$emit('update:show', false)
      // this.show = false
    },

    /**
     * @description 确定支付
     */
    comfirmPay () {
      this.$emit('comfirmPay')
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-main {
  width: 600rpx;
  background: #ffffff;
  z-index: 99999;
  position: fixed;
  top: 240rpx;
  left: 0%;
  margin-left: 70rpx;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50rpx;
  box-sizing: border-box;
  border-radius: 12rpx;
  &-distance{
    font-size: 34rpx;
    text-align: center;
    line-height:45rpx;
    .distance{
      color: #FF7200;
    }
  }
  &-desc{
    color: #595959;
    font-size: 24rpx;
    line-height:32rpx;
    margin: 10rpx 0 30rpx;
  }
  .btn-group{
    display: flex;
    margin-top: 39rpx;
    button{
      width:228rpx;
      height:74rpx;
      line-height: 74rpx;
      border-radius:10rpx;
    }
    .cancel-btn{
      background: #AAAAAA;
      color: #FFFFFF;
      margin-right: 46rpx;
    }
  }
}
</style>
