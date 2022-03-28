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
    updateDocuments(state, payload) {
      this.commit('changeDocuments', {
        docs: payload.docs
      })
      this.commit('changeNumFound', {
        numFound: payload.numFound
      })
    },
    addDescriptionToDocument(state, payload) {
      var index = state.documents.findIndex(d => d.url == payload.doc.url)
      state.documents[index].description = payload.description
      state.documents[index].isLoading = false
    },

    // Update content of Vanilla Solr Documents
    changeVanillaSolrDocuments(state, payload) {
      state.vanillaSolrDocuments = payload.vanillaSolrDocuments;
    },
    updateVanillaSolrDocuments(state, payload) {
      this.commit('changeVanillaSolrDocuments', {
        vanillaSolrDocuments: payload.vanillaSolrDocuments
      })
      this.commit('changeVanillaSolrNumFound', {
        vanillaSolrNumFound: payload.vanillaSolrNumFound
      })
    },
    addDescriptionToVanillaSolrDocument(state, payload) {
      var index = state.vanillaSolrDocuments.findIndex(d => d.url == payload.doc.url)
      state.vanillaSolrDocuments[index].description = payload.description
      state.vanillaSolrDocuments[index].isLoading = false
    },

    // Update content of Google Search Documents
    changeGoogleDocuments(state, payload) {
      state.googleDocuments = payload.googleDocuments;
    },
    updateGoogleDocuments(state, payload) {
      this.commit('changeGoogleDocuments', {
        googleDocuments: payload.googleDocuments
      })
      this.commit('changeGoogleNumFound', {
        googleNumFound: payload.googleNumFound
      })
    },

    // Number of documents found for each type of search (Solr with LTR, Vanilla Solr, Google Search)
    changeNumFound(state, payload) {
      state.numFound = payload.numFound;
    },
    changeVanillaSolrNumFound(state, payload) {
      state.vanillaSolrNumFound = payload.vanillaSolrNumFound;
    },
    changeGoogleNumFound(state, payload) {
      state.googleNumFound = payload.googleNumFound;
    },

    // The query performed for search
    changeSearchQuery(state, payload) {
      state.searchQuery = payload.searchQuery;
    },
  },
  actions: { }
});