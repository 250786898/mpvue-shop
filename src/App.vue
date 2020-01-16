<script>
 import mta from './utils/mta_analysis'
export default {
  created () {
  },

  onLaunch (option) {
    console.log('onLaunch ',mta)
    mta.App.init({
        "appID":"500684390",
        "eventID":"500709335",
        "autoReport": true,
        "statParam": true,
        "ignoreParams": [],
        "statPullDownFresh":true,
        "statShareApp":true,
        "statReachBottom":true
    });
  }


}
</script>
