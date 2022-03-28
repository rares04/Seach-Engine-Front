<template>
  <div class="mx-5 my-3 px-5 py-3">
    <search-bar></search-bar>
    <search-result></search-result>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import SearchResult from "../components/SearchResult.vue";

export default {
  name: "SearchPage",
  components: {
    SearchBar,
    SearchResult,
  },
};
</script>

<style scoped>
</style>