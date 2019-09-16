<template>
  <div class="select-store-card">
    <div class="select-store-card__title">当前位置</div>
    <div class="location">
      <span class="address">{{ relocationing ? '定位中...' : location.address}}</span>
      <div class="reposition" @click="relocation">
        <img src="/static/images/common_icon_dangqian@2x.png" class="reposition-icon" alt="">
        <span>重新定位</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AMapWX } from '@/utils/amap-wx'
import config from '@/config'
export default {
  computed : {
    ...mapState(['storeId','location'])
  },
  data () {
    return {
      relocationing: false,  //当前处于定位中
      amap: Object //高德地图对象句柄
    }
  },
  onLoad () {
     this.amap = new AMapWX({ key: config.AMAP_KEY }) //初始化高德地图对象
  },
  methods: {
    /**
     * @description 重新定位 
     */
    relocation() {
      console.log('amap',this.amap)
      this.relocationing = true //定位中
      this.amap.getPoiAround({
        success: res => {
          this.$store.commit('setLocationInfo', res.markers[0])
          this.relocationing = false
        },
        fail: e => this.relocationing = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.location{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  padding: 28rpx 0 40rpx 0;
  .address{
    width: 400rpx;
  }
  .reposition {
    display: flex;
    color: #CCCCCC;
    align-items: center;
    &-icon{
      width: 51rpx;
      height: 51rpx;
      margin-right: 10rpx;
    }
  }
}
</style>