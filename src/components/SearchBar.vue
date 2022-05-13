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
import { mapState } from 'vuex';
import GoogleQueries from '@/utils/GoogleQueries';

export default {
  name: "SearchBar",
  computed: {
    ...mapState([
      'searchQuery',
      'isAnyCompareActive',
      'isCompareWithVanillaSolrClicked',
      'isCompareWithGoogleClicked',
    ]),
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
  mixins: [SolrQueries, GoogleQueries],
  methods: {
    getResultsForQuery(query) {
      // Get Results
      this.getSearchResults(query);

      if(this.isCompareWithVanillaSolrClicked) {
        this.getVanillaSolrSearchResults(query)
      }
      if(this.isCompareWithGoogleClicked) {
        this.getGoogleSearchResults(query)
      }

      // this.$store.commit(vuexConstants.changeIsCompareWithVanillaSolrClicked, {
      //   isCompareWithVanillaSolrClicked: false,
      // });
      // this.$store.commit(vuexConstants.changeIsCompareWithGoogleClicked, {
      //   isCompareWithGoogleClicked: false,
      // });
      // this.$store.commit(vuexConstants.changeIsAnyCompareActive, {
      //   isAnyCompareActive: false,
      // });      
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