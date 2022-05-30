<template>
  <b-list-group v-for="(doc, index) in googleDocuments" :key="index">
    <b-list-group-item
      :href="doc.url"
      target="_blank"
      @click="registerClickForDocument(doc)"
      class="flex-column align-items-start"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 text-color">{{ doc.title }}</h5>
        <!-- <small class="text-muted">3 days ago</small> -->
      </div>

      <small class="text-success">{{ beautifyUrl(doc.url) }}</small>

      <!-- <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> -->
      <p class="mb-1" v-html="doc.description"></p>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapState } from "vuex";
import helpers from "@/utils/helpers.js";
import clickService from "@/utils/clickService.js";

export default {
  name: "VanillaSolrResults",
  computed: mapState({
    googleDocuments: (state) => state.googleDocuments,
  }),
  mixins: [helpers, clickService],
  methods: {
    beautifyUrl(url) {
      return this.beautifyUrlDisplay(url);
    },
    async registerClickForDocument(document) {
      await this.addClickCountForGoogleDocument(document);
    },
  },
};
</script>

<style scoped>
.text-color {
  color: #f26419;
}
</style>
