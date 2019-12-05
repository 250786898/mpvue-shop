<template>
<div class="search-bar">
  <div class="search-item">
    <div class="search-city" @click="navToSelectCity">{{cityName}}</div>
    <img src="/static/images/common_icon_dropdown.png" alt="" class="dropdown-icon">
    <div class="search-main">
      <label class="search-label" @click="navToSearch">
        <input class="search-placeholder" v-model="inputVal" placeholder="请输入提货地址" auto-focus @input="searchStore"/>
      </label>
      <img src="/static/images/common_icon_close.png" class="cancel-search-icon" alt="" mode="aspectFit">
    </div>

  </div>
   <div class="cancel-btn">
    取消
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      inputVal: '', //搜索输入的值
    }
  },
  computed: {
    ...mapState(['cityName'])
  },
  onLoad () {
    if(this.$options.data) {
      console.log('mixin',this)
      Object.assign(this.$data, this.$options.data()) //解决mpvue初始化未清空状态问题
    }
  },
  methods:{
    /**
     * @description 监听键盘输入搜索事件emit
     */
    searchStore () {
      console.log('searchStore')
      this.$emit('searchStore',this.inputVal)
    },

    /**
     * @description 跳转至选择城市组件
     */
    navToSelectCity () {
       wx.navigateTo({
        url: '/pages/city/select/main',
      })
    }
  }
}
</script>

<style lang="scss">
.search-bar{
  width:710rpx;
  height:64rpx;
  background:rgba(255,255,255,1);
  border-radius:10rpx;
  margin-top: 30rpx;
  z-index: 9;
  font-size:24rpx;
  line-height: 28rpx;
  color: #929292;
  display: flex;
  align-items: center;
}
.search-item {
  display: flex;
  align-items: center;
  background: #F6F6F6;
  width: 630rpx;
  height: 100%;
  padding-right: 10rpx;
  box-sizing: border-box;
  margin-right: 24rpx;
}

.cancel-btn{
  color: #01BD9F;
  font-size: 28rpx;
}

.cancel-search-icon{
  width: 28rpx;
  height: 28rpx;
}
.dropdown-icon{
  width:40rpx;
  height: 30rpx;
}
.search-main{
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}
.search-city{
  color: #929292;
  padding-left: 40rpx;
  height: 100%;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.search-label{
  display: flex;
  align-items: center;
  color: #929292;
  height: 100%;
  width: 100%;
  margin-left: 15rpx;
  &::before{
    content: ' ';
    width:2rpx;
    height:31rpx;
    display: block;
    background: #929292;
  }
  .search-placeholder{
    margin-left: 29rpx;
    font-size:24rpx;
    width: 100%;
  }
  .icon-search{
    margin-right: 14rpx;
    width: 28rpx;
    height: 28rpx;
  }
}
</style>
