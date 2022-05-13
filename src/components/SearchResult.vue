<template>
  <div class="my-4">
    <!-- Results -->
    <div v-if="!isAnyCompareActive">
      <solr-results></solr-results>
    </div>
    <!-- Results if compare with Vanilla Solr-->
    <div class="row" v-if="isCompareWithVanillaSolrClicked && !isCompareWithGoogleClicked">
      <div class="col">
        <font-awesome-icon style="width: 50px; height: 50px; position: relative; left: 350px;" :icon="['fas', 's']"/>
        <solr-results></solr-results>
      </div>
      <div class="col">
        <font-awesome-icon style="width: 50px; height: 50px; position: relative; left: 350px;" :icon="['fas', 'v']"/>
        <vanilla-solr-results></vanilla-solr-results>
      </div>
    </div>
    <!-- Results if compare with Google Search -->
    <div class="row" v-if="isCompareWithGoogleClicked && !isCompareWithVanillaSolrClicked">
      <div class="col">
        <font-awesome-icon style="width: 50px; height: 50px; position: relative; left: 350px;" :icon="['fas', 's']"/>
        <solr-results></solr-results>
      </div>
      <div class="col">
        <font-awesome-icon style="width: 50px; height: 50px; position: relative; left: 350px;" :icon="['fab', 'google']"/>
        <google-results></google-results>
      </div>
    </div>
    <!-- Results if both compare are active -->
    <div class="row" v-if="isCompareWithGoogleClicked && isCompareWithVanillaSolrClicked">
      <div class="col">
        <font-awesome-icon style="width: 50px; height: 50px; position: relative; left: 200px;" :icon="['fas', 's']"/>
        <solr-results></solr-results>
      </div>
      <div class="col">
        <font-awesome-icon style="width: 50px; height: 50px; position: relative; left: 200px;" :icon="['fas', 'v']"/>
        <vanilla-solr-results></vanilla-solr-results>
      </div>
      <div class="col">
        <font-awesome-icon style="width: 50px; height: 50px; position: relative; left: 200px;" :icon="['fab', 'google']"/>
        <google-results></google-results>
      </div>
    </div>

    <!-- </div> -->
    <div class="absolute-bottom d-flex justify-content-between" v-if="areResultsPresent">
      <!-- Compare with Vanilla Solr Button -->
      <div class="p-2 vanilla-solr" v-if="!isCompareWithVanillaSolrClicked">
        <button @click="getVanillaSolrResults(this.searchQuery, this.page)" class="btn btn-primary">Compare with Vanilla Solr</button>
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

      <!-- Compare with Google Button -->
      <div class="p-2 google" v-if="!isCompareWithGoogleClicked">
        <button @click="getGoogleResults(this.searchQuery, this.page)" class="btn btn-primary">Compare with Google Search</button>
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
import SolrResults from "./SolrResults.vue";
import VanillaSolrResults from "./VanillaSolrResults.vue";
import GoogleResults from "./GoogleResults.vue";
import vuexConstants from '@/assets/vuexConstants';

export default {
  name: "SearchResult",
  components: {
    SolrResults,
    VanillaSolrResults,
    GoogleResults
  },
  data() {
    return {
      page: 1,
      displayedPages: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    ...mapState([
      'documents',
      'searchQuery',
      'isAnyCompareActive',
      'isCompareWithVanillaSolrClicked',
      'isCompareWithGoogleClicked',
      'numFound',
      'vanillaSolrNumFound',
      'googleNumFound',
    ]),

    areResultsPresent() {
      return this.documents != null && this.documents.length != 0;
    },

    maxPage() {
      return Math.ceil(this.numFound / constants.NUM_ROWS_PER_PAGE);
    },
    googleMaxPage() {
      return Math.ceil(this.googleNumFound / constants.NUM_ROWS_PER_PAGE);
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
  },
  mixins: [SolrQueries, GoogleQueries],
  methods: {
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
        var googlePage = page
        if(page >= this.maxPage) {
          googlePage = this.googleMaxPage
        }
        this.getGoogleSearchResults(query, googlePage)
      }
    },
    getVanillaSolrResults(query, page) {
      this.$store.commit(vuexConstants.changeIsAnyCompareActive, {
        isAnyCompareActive: true,
      });

      this.$store.commit(vuexConstants.changeIsCompareWithVanillaSolrClicked, {
        isCompareWithVanillaSolrClicked: true,
      });
      this.getVanillaSolrSearchResults(query, page)
    },
    getGoogleResults(query, page) {
      this.$store.commit(vuexConstants.changeIsAnyCompareActive, {
        isAnyCompareActive: true,
      });

      this.$store.commit(vuexConstants.changeIsCompareWithGoogleClicked, {
        isCompareWithGoogleClicked: true,
      });
      this.getGoogleSearchResults(query, page)
    },

    hideCompareWithVanillaSolr() {
      this.$store.commit(vuexConstants.changeIsCompareWithVanillaSolrClicked, {
        isCompareWithVanillaSolrClicked: false,
      });
      this.setIsAnyCompareToFalseIfNoCompareIsOpen();
    },
    hideCompareWithGoogle() {
      this.$store.commit(vuexConstants.changeIsCompareWithGoogleClicked, {
        isCompareWithGoogleClicked: false,
      });
      this.setIsAnyCompareToFalseIfNoCompareIsOpen();
    },
    setIsAnyCompareToFalseIfNoCompareIsOpen() {
      if (this.isCompareWithVanillaSolrClicked == false && this.isCompareWithGoogleClicked == false) {
        this.$store.commit(vuexConstants.changeIsAnyCompareActive, {
          isAnyCompareActive: false,
        });
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
