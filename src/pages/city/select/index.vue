<template>
<div>
  <search-city />
  <current-locate-city />
  <city-list />
</div>
</template>

<script>
import SearchCity from './components/SearchCity'
import CurrentLocateCity from './components/CurrentLocateCity'
// import CityList from './demo'
import CityList from './components/CityList'

export default {
  components: {
    SearchCity,
    CurrentLocateCity,
    CityList
  }
}
</script>

<style>
page{
  background: #F1F1F1;
}
</style>
