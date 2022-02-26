import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    hasClickedForSearch: false,
    documents: []
  },
  getters: {
    hasClickedForSearch: state => {
      return state.hasClickedForSearch;
    },
    documents: state => {
      return state.documents;
    }
  },
  mutations: {
    changeHasClickedForSearchTrue (state, payload) {
      state.hasClickedForSearch = payload.hasClickedForSearch;
    },
    changeDocuments (state, payload) {
      state.documents = payload.docs;
    }
  },
  actions: {}
});