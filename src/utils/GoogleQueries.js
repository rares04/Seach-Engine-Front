import constants from "@/assets/constants"
import vuexConstants from "@/assets/vuexConstants"
import axios from "axios"

export default {
    methods: {
        getGoogleSearchResults(query, page = 1) {
            const apiKey = constants.GOOGLE_API_KEY
            const cx = constants.GOOGLE_CX_ID
            const num = constants.NUM_ROWS_PER_PAGE
            const start = (page - 1) * constants.NUM_ROWS_PER_PAGE

            var parameters = ["cx=" + cx, "q=" + query, "start=" + start, "num=" + num, "key=" + apiKey]
            parameters = parameters.join("&")

            const url = constants.GOOGLE_URL + parameters
            axios.get(url).then(response => {
                const googleNumFound = response.data.searchInformation.totalResults

                var googleDocuments = []
                response.data.items.forEach(item => {
                    googleDocuments.push({
                        title: item.title,
                        url: item.link,
                        description: item.htmlSnippet
                    })
                });

                // Update the documents in the store
                this.$store.commit(vuexConstants.updateGoogleDocuments, {
                    googleDocuments: googleDocuments,
                    googleNumFound: googleNumFound
                });
            })
        }
    }
}