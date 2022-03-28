import axios from "axios";
import constants from "../assets/constants.js";

export default {
  methods: {
    // get results based on typed query
    getSearchResults(query, page = 1) {
      // form url for solr call
      var baseUrl = constants.SOLR_BASE_URL;
      var route = "solr/nutch/query";
      console.log(constants)
      var start = (page - 1) * constants.NUM_ROWS_PER_PAGE;
      var params = [];
      params.push(
        "q=" + query,
        "rq={!ltr%20model=my_ranknet_model%20efi.query=" + query + "}",
        "fl=url,title,content,[features]",
        "start=" + start,
        "rows=" + constants.NUM_ROWS_PER_PAGE,
        "hl=true",
        "hl.method=unified",
        "hl.fl=content",
        "indent=off",
        "wt=json"
      );

      var url = baseUrl + route + "?" + params.join("&");

      // make axios call to solr to retrieve search results
      axios.get(url).then((response) => {
        var docs = response.data.response.docs;
        var numFound = response.data.response.numFound;
        docs.forEach((doc) => (doc.isLoading = true));

        // Update the documents in the store
        this.$store.commit("updateDocuments", {
          docs: docs,
          numFound: numFound
        });

        // Async Get the metadata description for each document trough jsonlink.io
        docs.forEach(async (doc) => {
          try {
            var metadata = await axios.get(
              "https://jsonlink.io/api/extract?url=" + doc.url
            );

            // Replace the words from the query with bold
            var description = metadata.data.description;
            var words = query.split(" ");
            words.forEach((word) => {
              description = description.replaceAll(word, `<b>${word}</b>`);
            });

            // update the state of the doc -> add description property
            this.$store.commit("addDescriptionToDocument", {
              doc: doc,
              description: description == "" ? description : description + "...",
            });
          }
          catch (error) {
            // update the state of the doc -> add description property
            this.$store.commit("addDescriptionToDocument", {
              doc: doc,
              description: ""
            });
          }
        });

        // Update the documents in the store
        this.$store.commit("updateDocuments", {
          docs: docs,
          numFound: numFound
        });
      });
    },

    // get vanilla results based on typed query
    getVanillaSolrSearchResults(query, page = 1) {
      // form url for solr call
      var baseUrl = constants.SOLR_BASE_URL;
      var route = "solr/nutch/query";

      var start = (page - 1) * constants.NUM_ROWS_PER_PAGE;
      var params = [];
      params.push(
        "q=" + query,
        "fl=url,title,content,[features%20efi.query=" + query + "%20store=myfeature_store]",
        "start=" + start,
        "rows=" + constants.NUM_ROWS_PER_PAGE,
        "hl=true",
        "hl.method=unified",
        "hl.fl=content",
        "indent=off",
        "wt=json"
      );

      var url = baseUrl + route + "?" + params.join("&");

      // make axios call to solr to retrieve search results
      axios.get(url).then((response) => {
        var docs = response.data.response.docs;
        var numFound = response.data.response.numFound;
        docs.forEach((doc) => (doc.isLoading = true));

        // Update the documents in the store
        this.$store.commit("updateVanillaSolrDocuments", {
          vanillaSolrDocuments: docs,
          vanillaSolrNumFound: numFound
        });

        // Async Get the metadata description for each document trough jsonlink.io
        docs.forEach(async (doc) => {
          try {
            var metadata = await axios.get(
              "https://jsonlink.io/api/extract?url=" + doc.url
            );

            // Replace the words from the query with bold
            var description = metadata.data.description;
            var words = query.split(" ");
            words.forEach((word) => {
              description = description.replaceAll(word, `<b>${word}</b>`);
            });

            // update the state of the doc -> add description property
            this.$store.commit("addDescriptionToVanillaSolrDocument", {
              doc: doc,
              description: description == "" ? description : description + "...",
            });
          }
          catch (error) {
            // update the state of the doc -> add description property
            this.$store.commit("addDescriptionToVanillaSolrDocument", {
              doc: doc,
              description: ""
            });
          }
        });

        // Update the documents in the store
        this.$store.commit("updateVanillaSolrDocuments", {
          vanillaSolrDocuments: docs,
          vanillaSolrNumFound: numFound
        });
      });
    },
  },
};