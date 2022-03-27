<template>
  <!-- Results -->
  <b-list-group v-for="doc in documents" :key="doc.url">
    <b-list-group-item href="{{doc.url}}" class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 text-primary">{{ doc.title }}</h5>
        <small class="text-muted">3 days ago</small>
      </div>

      <small>{{ doc.url }}</small>

      <!-- <div class="spinner-border text-primary" role="status" v-if="doc.isLoading">
        <span class="visually-hidden">Loading...</span>
      </div> -->
      <p class="mb-1" v-html="displayDescriptionIfPresent(doc)"></p>
    </b-list-group-item>
  </b-list-group>

  <!-- Pagination  -->
  <nav
    class="fixed-bottom d-flex justify-content-center"
    v-if="areResultsPresent"
  >
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" :class="isPageLowerThanTwoClass" @click="getResultsForQuery(searchQuery, page - 1)"  aria-label="Previous">
          <span aria-hidden="true">&lt;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <ul class="pagination" v-for="page in displayedPages" :key="page">
        <li @click="getResultsForQuery(searchQuery, page)" class="page-item" :class="{'active': page == this.page}"><a class="page-link">{{page}}</a></li>
      </ul>
      <li class="page-item">
        <a class="page-link" :class="isLastPageClass" @click="getResultsForQuery(searchQuery, page + 1)" aria-label="Next">
          <span aria-hidden="true">&gt;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import SolrQueries from "@/utils/SolrQueries.js";
import { mapState } from "vuex";
import constants from '@/assets/constants';

export default {
  name: "SearchResult",
  data() {
    return {
      page: 1,
      displayedPages: [1, 2, 3],
    };
  },
  computed: mapState({
    documents: (state) => state.documents,
    searchQuery: (state) => state.searchQuery,
    areResultsPresent() {
      return this.documents != null && this.documents.length != 0;
    },
    numFound: (state) => state.numFound,
    maxPage() {
      return this.numFound / constants.SOLR_DEFAULT_ROWS;
    },
    isPageLowerThanTwoClass() {
      return {
        'btn': this.page < 2,
        'disabled': this.page < 2
      }
    },
    isLastPageClass() {
      return {
        'btn': this.page == this.numFound / constants.SOLR_DEFAULT_ROWS,
        'disabled': this.page == this.numFound / constants.SOLR_DEFAULT_ROWS
      }
    }  
  }),
  mixins: [SolrQueries],
  methods: {
    displayDescriptionIfPresent(doc) {
      return doc.isLoading ? "Loading..." : doc.description;
    },
    getResultsForQuery(query, page) {
      this.page = page
      if(page == 1) {
        this.displayedPages = [1, 2, 3]
      }
      else if (page == this.maxPage) {
        if(page == 2) {
          this.displayedPages = [1, 2]
        }
        else {
          this.displayedPages = [page - 2, page - 1, page]
        }
      }
      else {
        this.displayedPages = [page - 1, page, page + 1]
      }
      this.getSearchResults(query, this.page);
    },
  },
};
</script>

<style scoped>
</style>
