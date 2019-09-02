<template>
  <div class="search-bar">
    <div class="search-city" @click="navToSelectCity" >{{cityName}}</div>
    <div class="search-main">
      <label class="search-label">
        <icon class="icon-search" type="search" size="14"></icon>  
        <input type="text" class="search-bar__text" v-model="inputVal" placeholder="搜索地址" @input="searchStore"/>

      </label>

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
  methods:{
    /**
     * @description 监听键盘输入搜索事件emit
     */
    searchStore () {
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
  width:702rpx;
  height:72rpx;
  background:#F3F3F3;
  border-radius:36rpx;
  z-index: 9;
  display: flex;
  align-items: center;
  font-size:28rpx;
}
.search-city{
  color: #7F7F7F;
  padding-left: 28rpx;
   &:after {
    content: '';
    display: inline-block;
    margin-left: 14rpx;
    vertical-align: middle;
    width: 0;
    height: 0;
    border-top: 10rpx solid #666;
    border-left: 8rpx solid transparent;
    border-right: 8rpx solid transparent;
  }
}
.search-label{
  display: flex;
  align-items: center;
  color: #7F7F7F;
  padding-left: 26rpx;
  .icon-search{
    margin-right: 14rpx;
  }
}
</style>