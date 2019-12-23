<template>
  <div class="container">
    <search-input />
    <history-keyword />
    <!-- <hot-keyword /> -->
    <!-- <search-result /> -->
    <!-- <searchGoodsList /> -->
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import HistoryKeyword from './components/HistoryKeyword'
import HotKeyword from './components/HotKeyword'
import SearchResult from './components/SearchResult'
import searchGoodsList from './components/GoodsList'
export default {
  components: {
    SearchInput,
    HistoryKeyword,
    HotKeyword,
    SearchResult,
    searchGoodsList
  }
}
</script>

<style>

</style>
