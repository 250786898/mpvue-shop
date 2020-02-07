<template>
  <div class="search">
    <SearchInput />
    <SearchResult />
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import SearchResult from './components/SearchResult'
export default {
  components: {
    SearchInput,
    SearchResult
  }
}
</script>

<style lang="scss" scoped>

</style>
