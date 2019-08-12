<template>
  <div></div>
</template>

<script>
  import config from '@/config'

  export default {
    onLoad(e) {
      let { activityType, activitySubType, id } = e
      
      // activityType = '' + activityType
      // activitySubType = '' + activitySubType
      activitySubType = activitySubType || '0'

      wx.redirectTo({
        url: `${ config.ACTIVITY_TYPE[activityType][activitySubType] }${ id }`
      })
    }
  }
</script>