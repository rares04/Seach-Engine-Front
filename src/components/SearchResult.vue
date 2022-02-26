<template>
  <div>
    <ul v-if="hasClickedForSearch">
      <div v-for="doc in documents" :key="doc.url">
        <h2><a href="{{doc.url}}">{{doc.title}}</a></h2>
        <p>{{doc.url}}</p>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchResult',
  computed: mapState({
    hasClickedForSearch: state => state.hasClickedForSearch,
    documents: state => state.documents
  }),
}
</script>

<style scoped>
a {
  text-decoration: none;
  color:black;
}
ul {
  margin: 0;
  padding: 0;
}
</style>
