<template>
   <navigator
     url="/pages/index/main"
     open-type="switchTab"
     hover-class="none"
     class="icon-container"
    >
     <img src="/static/images/icon_Home_png.png" class="icon" >
   </navigator>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.icon-container{
  position: fixed;
  bottom: 254rpx;
  left: 20rpx;
}
.icon{
  width: 80rpx;
  height: 80rpx;;
}
</style>
