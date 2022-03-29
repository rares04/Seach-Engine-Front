import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    documents: [],
    vanillaSolrDocuments: [],
    googleDocuments: [],
    
    numFound: 0,
    vanillaSolrNumFound: 0,
    googleNumFound: 0,

    searchQuery: "",
  },
  getters: {
    documents: state => {
      return state.documents;
    },
    vanillaSolrDocuments: state => {
      return state.vanillaSolrDocuments;
    },
    googleDocuments: state => {
      return state.googleDocuments;
    },

    numFound: state => {
      return state.numFound;
    },
    vanillaSolrNumFound: state => {
      return state.vanillaSolrNumFound;
    },
    googleNumFound: state => {
      return state.googleNumFound;
    },

    searchQuery: state => {
      return state.searchQuery;
    },
  },
  mutations: {
    // Update content of Solr Documents with LTR enabled
    changeDocuments(state, payload) {
      state.documents = payload.docs;
    },
    changeNumFound(state, payload) {
      state.numFound = payload.numFound;
    },
    updateDocuments(state, payload) {
      this.commit('changeDocuments', {
        docs: payload.docs
      })
      this.commit('changeNumFound', {
        numFound: payload.numFound
      })
    },

    // Update content of Vanilla Solr Documents
    changeVanillaSolrDocuments(state, payload) {
      state.vanillaSolrDocuments = payload.vanillaSolrDocuments;
    },
    changeVanillaSolrNumFound(state, payload) {
      state.vanillaSolrNumFound = payload.vanillaSolrNumFound;
    },
    updateVanillaSolrDocuments(state, payload) {
      this.commit('changeVanillaSolrDocuments', {
        vanillaSolrDocuments: payload.vanillaSolrDocuments
      })
      this.commit('changeVanillaSolrNumFound', {
        vanillaSolrNumFound: payload.vanillaSolrNumFound
      })
    },

    // Update content of Google Search Documents
    changeGoogleDocuments(state, payload) {
      state.googleDocuments = payload.googleDocuments;
    },
    changeGoogleNumFound(state, payload) {
      state.googleNumFound = payload.googleNumFound;
    },
    updateGoogleDocuments(state, payload) {
      this.commit('changeGoogleDocuments', {
        googleDocuments: payload.googleDocuments
      })
      this.commit('changeGoogleNumFound', {
        googleNumFound: payload.googleNumFound
      })
    },

    // The query performed for search
    changeSearchQuery(state, payload) {
      state.searchQuery = payload.searchQuery;
    },
  },
  actions: { }
});