<template>
  <div class="container">
    <top-bg/>
    <search-store :city-name="cityName" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Api } from '@/http/api' 
import TopBg from "../select/components/TopBg/index"
import SearchBar from "./components/SearchBar/index"


export default {
  components: {
    SearchBar,
    TopBg,
  },
  data () {
    return {
    }
  },
  computed : {
  },


  mounted (e) {
 
  },


  
}
</script>

<style lang="scss">
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>