<template>
  <div class="container">
    <!-- <img src="http://bucketlejia.oss-cn-shenzhen.aliyuncs.com/equity_bg@2x.png" mode="widthFix"> -->
    <rich-text :nodes="gradePrivilegeExplain"></rich-text>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['gradePrivilegeExplain'])
    }
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 40rpx;
    table {
      width: 100%;
    }
  }
  img {
    width: 100%;
  }
</style>
