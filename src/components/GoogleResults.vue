<template>
  <b-list-group v-for="(doc, index) in googleDocuments" :key="index">
    <b-list-group-item :href="doc.url" target="_blank" class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 text-primary">{{ doc.title }}</h5>
        <!-- <small class="text-muted">3 days ago</small> -->
      </div>

      <small class="text-success">{{ beautifyUrlDisplay(doc.url) }}</small>

      <!-- <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> -->
      <p class="mb-1" v-html="doc.description"></p>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapState } from 'vuex';
import helpers from '@/utils/helpers.js'

export default {
  name: "VanillaSolrResults",
  computed: mapState({
    googleDocuments: (state) => state.googleDocuments,
  }),
  mixins: [
    helpers
  ],
  methods: {
    beautifyUrl(url) {
      return this.beautifyUrlDisplay(url);
    }
  }
};
</script>

<style scoped>
</style>
