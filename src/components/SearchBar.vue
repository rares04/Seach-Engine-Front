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
            bg-transparent
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
import vuexConstants from '@/assets/vuexConstants';

export default {
  name: "SearchBar",
  computed: {
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.commit(vuexConstants.changeSearchQuery, {
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
      this.$store.commit(vuexConstants.changeSearchQuery, {
        searchQuery: searchQuery,
      });
    },
  },
};
</script>

<style scoped>
</style>