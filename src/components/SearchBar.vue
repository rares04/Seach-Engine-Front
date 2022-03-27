<template>
  <div>
    <!-- UBB Search -->
    <div class="d-flex justify-content-center">
      <h1>UBB Search</h1>
    </div>
    <!-- Input -->
    <div class="input-group">
      <span class="input-group-prepend">
        <button
          class="
            btn btn-outline-primary
            bg-white
            border-start-0 border
            rounded-pill
            ms-n3
          "
          type="button"
        >
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </span>
      <input
        @keyup.enter="getResultsForQuery(searchQuery)"
        v-model="searchQuery"
        class="form-control border-primary rounded-pill"
        type="text"
        placeholder="Type here to search"
        id="example-search-input"
      />
    </div>
  </div>
</template>

<script>
import SolrQueries from "@/utils/SolrQueries.js";

export default {
  name: "SearchBar",
  computed: {
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.commit("changeSearchQuery", {
          searchQuery: value,
        });
      },
    },
  },
  mixins: [SolrQueries],
  methods: {
    getResultsForQuery(query) {
      this.getSearchResults(query);
    },
    updateSearchQuery(searchQuery) {
      this.$store.commit("changeSearchQuery", {
        searchQuery: searchQuery,
      });
    },
  },
};
</script>

<style scoped>
</style>