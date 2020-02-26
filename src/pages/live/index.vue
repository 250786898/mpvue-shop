<template>
  <div>
    <navigator
      url="plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=123"
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
