<template>
  <div>
    <p>Type into the search bar for searching: </p>
    <input @keyup.enter="getSearchResults(searchQuery)" v-model="searchQuery"/>
  </div>
</template>

<script>
import constants from '../assets/constants.js'
import axios from 'axios'

export default {
  name: 'SearchBar',
  data() {
    return {
        searchQuery: ''
    }
  },
  methods: {
    // get results based on typed query
    getSearchResults(query) {
      // form url for solr call
      var baseUrl = constants.SOLR_BASE_URL;
      var route = 'solr/nutch/query';

      var params = []
      params.push('q=' + query, 'rq={!ltr%20model=mymodel%20efi.query=' + query + '}', 'fl=url,title,content,[features]', 'indent=off', 'wt=json')

      var url = baseUrl + route + '?' + params.join('&')
      
      // make axios call to solr to retrieve search results
      axios.get(url)
        .then(response => this.$store.commit("changeDocuments", { docs: response.data.response.docs }) );

      // update the state of the variable indicating if a search has been initatied
      this.$store.commit("changeHasClickedForSearchTrue", { hasClickedForSearch: true });
    }
  }
}
</script>

<style scoped>
</style>