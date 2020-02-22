<template>
  <div>
    <navigator
      url="/pages/live-packages/index/main"
      open-type="navigate"
      hover-class="none">
      123
    </navigator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liveList: [] // 直播列表
    }
  },

  mounted () {
    this.loadLiveList()
  },

  methods: {
    /**
     * @description 加载直播列表
     */
    loadLiveList() {

    }
  }
}
</script>


<style lang="scss" scoped>

</style>
