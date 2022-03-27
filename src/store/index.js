import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    documents: [],
    searchQuery: "",
    numFound: 0
  },
  getters: {
    documents: state => {
      return state.documents;
    },
    searchQuery: state => {
      return state.searchQuery;
    },
    numFound: state => {
      return state.numFound;
    }
  },
  mutations: {
    changeDocuments(state, payload) {
      state.documents = payload.docs;
    },
    addDescriptionToDocument(state, payload) {
      var index = state.documents.findIndex(d => d.url == payload.doc.url)
      state.documents[index].description = payload.description
      state.documents[index].isLoading = false
    },
    changeSearchQuery(state, payload) {
      state.searchQuery = payload.searchQuery;
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
    }
  },
  actions: { }
});