<template>
  <div>
    直播间
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
