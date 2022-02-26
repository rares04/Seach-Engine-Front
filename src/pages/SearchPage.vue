<template>
  <div class="searchPageContainer">
    <search-bar></search-bar>
    <search-result></search-result>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import SearchResult from '../components/SearchResult.vue'

export default {
    name: 'SearchPage', 
    components: {
        SearchBar, SearchResult
    }
}
</script>

<style scoped>
.searchPageContainer{
  display: block;
  align-items: center;
}
</style>