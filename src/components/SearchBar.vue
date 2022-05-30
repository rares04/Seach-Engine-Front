<template>
  <div>
    <!-- UBB Search -->
    <div class="d-flex justify-content-center">
      <h1>UBB Search</h1>
    </div>
    <div class="flex">
      <select
        id="model"
        v-model="selectedModel"
        @change="getResultsForQuery(searchQuery, this.selectedModel)"
        class="form-select w-auto btn border-primary rounded-pill"
        aria-label="re-reranking model select"
      >
        <option value="1" selected disabled>Choose re-reranking model</option>
        <option value="1">Thorstens SVMrank</option>
        <option value="2">sklearn LinearSVC</option>
        <option value="3">RankNet using Keras Functional Api</option>
        <option value="4">
          RankNet using TensorFlow 2 custom training loop
        </option>
        <option value="5">airalcorn Ranknet</option>
        <option value="6">Factorised RankNet with Generated Data</option>
      </select>
      <!-- Input -->
      <div class="input-group">
        <input
          @keyup.enter="getResultsForQuery(searchQuery, this.selectedModel)"
          v-model="searchQuery"
          class="form-control border-primary rounded-pill ms-2"
          type="text"
          placeholder="Type here to search"
          id="example-search-input"
        />
        <span class="input-group-append">
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
      </div>
    </div>
  </div>
</template>

<script>
import SolrQueries from "@/utils/SolrQueries.js";
import vuexConstants from "@/assets/vuexConstants";
import { mapState } from "vuex";
import GoogleQueries from "@/utils/GoogleQueries";

export default {
  name: "SearchBar",
  computed: {
    ...mapState([
      "searchQuery",
      "isAnyCompareActive",
      "isCompareWithVanillaSolrClicked",
      "isCompareWithGoogleClicked",
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
    selectedModel: {
      get() {
        return this.$store.state.selectedModel;
      },
      set(value) {
        this.$store.commit(vuexConstants.changeSelectedModel, {
          selectedModel: value,
        });
      },
    },
  },
  mixins: [SolrQueries, GoogleQueries],
  methods: {
    getResultsForQuery(query, modelNumber) {
      if (query) {
        // Get Results
        this.getSearchResults(query, modelNumber);

        if (this.isCompareWithVanillaSolrClicked) {
          this.getVanillaSolrSearchResults(query);
        }
        if (this.isCompareWithGoogleClicked) {
          this.getGoogleSearchResults(query);
        }
      }
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
.flex {
  display: flex;
  flex-direction: row;
}
</style>