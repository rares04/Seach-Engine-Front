import vuexConstants from "@/assets/vuexConstants.js";
import axios from "axios";
import constants from "../assets/constants.js";
import helpers from "./helpers.js"

export default {
  data() {
    return {
      solrWithLtr: "solrWithLtr",
      vanillaSolr: "vanillaSolr"
    }
  },
  mixins: [helpers],
  methods: {
    // get results based on typed query
    getSearchResults(query, page = 1) {
      // form url for solr call
      const commonParams = this.getCommonParams(page);
      const baseUrl = commonParams.baseUrl;
      const route = commonParams.route;
      const start = commonParams.start;

      var params = [];
      params.push(
        "q=" + query,
        "rq={!ltr%20model=my_ranknet_model%20efi.query=" + query + "}",
        "fl=url,title,content,[features]",
        "start=" + start,
        "rows=" + constants.NUM_ROWS_PER_PAGE,
        "hl=true",
        "hl.method=original",
        "hl.fl=content",
        "indent=off",
        "wt=json"
      );

      var url = baseUrl + route + "?" + params.join("&");

      this.getResults(url, this.solrWithLtr)
    },

    // get vanilla results based on typed query
    getVanillaSolrSearchResults(query, page = 1) {
      // form url for solr call
      const commonParams = this.getCommonParams(page);
      const baseUrl = commonParams.baseUrl;
      const route = commonParams.route;
      const start = commonParams.start;

      var params = [];
      params.push(
        "q=" + query,
        "fl=url,title,content,[features%20efi.query=" + query + "%20store=myfeature_store]",
        "start=" + start,
        "rows=" + constants.NUM_ROWS_PER_PAGE,
        "hl=true",
        "hl.method=original",
        "hl.fl=content",
        "indent=off",
        "wt=json"
      );

      var url = baseUrl + route + "?" + params.join("&");

      this.getResults(url, this.vanillaSolr)
    },
    
    getCommonParams(page) {
      var baseUrl = constants.SOLR_BASE_URL;
      var route = constants.SOLR_ROUTE;

      var start = (page - 1) * constants.NUM_ROWS_PER_PAGE;

      return { baseUrl, route, start }
    },

    getResults(url, searchType = this.solrWithLtr) {
      // make axios call to solr to retrieve search results
      axios.get(url).then((response) => {
        var docs = response.data.response.docs;
        var numFound = response.data.response.numFound;
        docs = this.getHighlightForEachDoc(docs, response)

        // Update the documents in the store
        if (searchType == this.solrWithLtr) {
          this.$store.commit(vuexConstants.updateDocuments, {
            docs: docs,
            numFound: numFound
          });
        }
        else {
          this.$store.commit(vuexConstants.updateVanillaSolrDocuments, {
            vanillaSolrDocuments: docs,
            vanillaSolrNumFound: numFound
          });
        }
      });
    },

    getHighlightForEachDoc(docs, response) {
      // Get highlight (description)
      docs.forEach((doc) => {
        if(this.isEmpty(response.data.highlighting[doc.url])) {
          doc.description = ""
        }
        else {
          doc.description = response.data.highlighting[doc.url]["content"][0]
        }
      });
      docs.forEach((doc) => {
        doc.description = doc.description.replaceAll('<em>', '<b>')
        doc.description = doc.description.replaceAll('</em>', '</b>')
      })

      return docs
    },
  },
};