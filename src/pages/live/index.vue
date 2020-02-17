<template>
  <div>
    <navigator url="plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=[直播房间id]">
      Go to Live Player Plugin page
    </navigator>
  </div>
</template>

<script>
import LiveModel from '@/model/live'
const liveModel = new LiveModel()
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
      liveModel.getLiveList()
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
