<template>
  <div class="my-4">
    <!-- Results -->
    <div v-if="!isAnyCompareActive">
      <b-list-group v-for="(doc, index) in documents" :key="index">
          <b-list-group-item href="{{doc.url}}" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1 text-primary">{{ doc.title }}</h5>
              <!-- <small class="text-muted">3 days ago</small> -->
            </div>

            <small class="text-success">{{ doc.url }}</small>

            <!-- <div class="spinner-border text-primary" role="status" v-if="doc.isLoading">
              <span class="visually-hidden">Loading...</span>
            </div> -->
            <p class="mb-1" v-html="displayDescriptionIfPresent(doc)"></p>
          </b-list-group-item>
        </b-list-group>
    </div>
    <!-- Results if compare with Vanilla Solr-->
    <div v-if="isCompareWithVanillaSolrClicked" class="row">
      <div class="col">
        <b-list-group v-for="(doc, index) in documents" :key="index">
          <b-list-group-item href="{{doc.url}}" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1 text-primary">{{ doc.title }}</h5>
              <!-- <small class="text-muted">3 days ago</small> -->
            </div>

            <small class="text-success">{{ doc.url }}</small>

            <!-- <div class="spinner-border text-primary" role="status" v-if="doc.isLoading">
              <span class="visually-hidden">Loading...</span>
            </div> -->
            <p class="mb-1" v-html="displayDescriptionIfPresent(doc)"></p>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="col">
        <b-list-group v-for="(doc, index) in vanillaSolrDocuments" :key="index">
          <b-list-group-item href="{{doc.url}}" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1 text-primary">{{ doc.title }}</h5>
              <!-- <small class="text-muted">3 days ago</small> -->
            </div>

            <small class="text-success">{{ doc.url }}</small>

            <!-- <div class="spinner-border text-primary" role="status" v-if="doc.isLoading">
              <span class="visually-hidden">Loading...</span>
            </div> -->
            <p class="mb-1" v-html="displayDescriptionIfPresent(doc)"></p>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <!-- Results if compare with Google Search -->
    <div v-if="isCompareWithGoogleClicked" class="row">
      <div class="col">
        <b-list-group v-for="(doc, index) in documents" :key="index">
          <b-list-group-item href="{{doc.url}}" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1 text-primary">{{ doc.title }}</h5>
              <!-- <small class="text-muted">3 days ago</small> -->
            </div>

            <small class="text-success">{{ doc.url }}</small>

            <!-- <div class="spinner-border text-primary" role="status" v-if="doc.isLoading">
              <span class="visually-hidden">Loading...</span>
            </div> -->
            <p class="mb-1" v-html="displayDescriptionIfPresent(doc)"></p>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="col">
        <b-list-group v-for="(doc, index) in googleDocuments" :key="index">
          <b-list-group-item href="{{doc.url}}" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1 text-primary">{{ doc.title }}</h5>
              <!-- <small class="text-muted">3 days ago</small> -->
            </div>

            <small class="text-success">{{ doc.url }}</small>

            <!-- <div class="spinner-border text-primary" role="status" v-if="doc.isLoading">
              <span class="visually-hidden">Loading...</span>
            </div> -->
            <p class="mb-1" v-html="displayDescriptionIfPresent(doc)"></p>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <!-- </div> -->
    <div class="absolute-bottom d-flex justify-content-between" v-if="areResultsPresent">
      <!-- Compare with Vanilla Solr -->
      <div class="p-2 vanilla-solr" v-if="!isCompareWithVanillaSolrClicked">
        <button @click="getVanillaSolrResults(this.searchQuery, this.page)" :class="vanillaSolrCompareDisabledClass" class="btn btn-primary">Compare with Vanilla Solr</button>
      </div>
      <div class="p-2 vanilla-solr" v-if="isCompareWithVanillaSolrClicked">
        <button @click="hideCompareWithVanillaSolr()" class="btn btn-primary">Hide Comparation with Vanilla Solr</button>
      </div>

      <!-- Pagination  -->
      <div class="p-2">
        <nav>
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link btn" @click="getResultsForQuery(searchQuery, 1)"  aria-label="First page">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">First Page</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link btn" :class="isPageLowerThanTwoClass" @click="getResultsForQuery(searchQuery, page - 1)"  aria-label="Previous">
                <span aria-hidden="true">&lt;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <ul class="pagination" v-for="(page, index) in displayedPages" :key="index">
              <li v-if="isNotAboveMaxPage(page) && isNotLowerThanOne(page)" @click="getResultsForQuery(searchQuery, page)" class="page-item" :class="{'active': page == this.page}">
                <a class="page-link btn">{{page}}</a>
              </li>
            </ul>
            <li class="page-item">
              <a class="page-link btn" :class="isLastPageClass" @click="getResultsForQuery(searchQuery, page + 1)" aria-label="Next">
                <span aria-hidden="true">&gt;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link btn" @click="getResultsForQuery(searchQuery, this.maxPage)"  aria-label="Last page">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Last Page</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Compare with Google -->
      <div class="p-2 google" v-if="!isCompareWithGoogleClicked">
        <button @click="getGoogleResults(this.searchQuery, this.page)" :class="googleCompareDisabledClass" class="btn btn-primary">Compare with Google Search</button>
      </div>
      <div class="p-2 google" v-if="isCompareWithGoogleClicked">
        <button @click="hideCompareWithGoogle()" class="btn btn-primary">Hide Comparation with Google Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import SolrQueries from "@/utils/SolrQueries.js";
import GoogleQueries from "@/utils/GoogleQueries.js";
import { mapState } from "vuex";
import constants from '@/assets/constants';

export default {
  name: "SearchResult",
  data() {
    return {
      page: 1,
      displayedPages: [1, 2, 3, 4, 5],
      isCompareWithVanillaSolrClicked: false,
      isAnyCompareActive: false,
      isCompareWithGoogleClicked: false, 
    };
  },
  computed: mapState({
    documents: (state) => state.documents,
    vanillaSolrDocuments: (state) => state.vanillaSolrDocuments,
    googleDocuments: (state) => state.googleDocuments,
    searchQuery: (state) => state.searchQuery,
    areResultsPresent() {
      return this.documents != null && this.documents.length != 0;
    },
    numFound: (state) => state.numFound,
    vanillaSolrNumFound: (state) => state.vanillaSolrNumFound,
    maxPage() {
      return Math.ceil(this.numFound / constants.NUM_ROWS_PER_PAGE);
    },
    
    isPageLowerThanTwoClass() {
      return {
        'btn': this.page < 2,
        'disabled': this.page < 2
      }
    },
    isLastPageClass() {
      return {
        'btn': this.page == this.numFound / constants.NUM_ROWS_PER_PAGE,
        'disabled': this.page == this.numFound / constants.NUM_ROWS_PER_PAGE
      }
    },
    vanillaSolrCompareDisabledClass() {
      return {
        'disabled': this.isCompareWithGoogleClicked == true
      }
    },
    googleCompareDisabledClass() {
      return {
        'disabled': this.isCompareWithVanillaSolrClicked == true
      }
    } 
    
  }),
  mixins: [SolrQueries, GoogleQueries],
  methods: {
    displayDescriptionIfPresent(doc) {
      return doc.isLoading ? "Loading..." : doc.description;
    },
    isNotAboveMaxPage(page) {
      return page <= this.maxPage;
    },
    isNotLowerThanOne(page) {
      return page >= 1;
    },

    getResultsForQuery(query, page) {
      this.page = page
      this.displayedPages = [page - 2, page - 1, page, page + 1, page + 2]

      this.getSearchResults(query, page);
      if(this.isCompareWithVanillaSolrClicked) {
        this.getVanillaSolrSearchResults(query, page)
      }
      if(this.isCompareWithGoogleClicked) {
        this.getGoogleSearchResults(query, page)
      }
    },
    getVanillaSolrResults(query, page) {
      this.isAnyCompareActive = true;

      this.isCompareWithVanillaSolrClicked = true;
      this.getVanillaSolrSearchResults(query, page)
    },
    getGoogleResults(query, page) {
      this.isAnyCompareActive = true;

      this.isCompareWithGoogleClicked = true;
      this.getGoogleSearchResults(query, page)
    },

    hideCompareWithVanillaSolr() {
      this.isCompareWithVanillaSolrClicked = false;
      this.setIsAnyCompareToFalseIfNoCompareIsOpen();
    },
    hideCompareWithGoogle() {
      this.isCompareWithGoogleClicked = false;
      this.setIsAnyCompareToFalseIfNoCompareIsOpen();
    },
    setIsAnyCompareToFalseIfNoCompareIsOpen() {
      if (this.isCompareWithVanillaSolrClicked == false && this.isCompareWithGoogleClicked == false) {
        this.isAnyCompareActive = false;
      }
    },
  },
};
</script>

<style scoped>
.vanilla-solr {
  margin-left: 4.7%;
}
.google{
  margin-right: 4.7%;
}
</style>
