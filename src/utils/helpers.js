export default {
    methods: {
        beautifyUrlDisplay(url) {
            var beautifiedUrl = url
            var indexOfSlash = url.indexOf('/', url.indexOf('/') + 2)

            while (indexOfSlash != -1) {
                beautifiedUrl = beautifiedUrl.substring(0, indexOfSlash) + ' > ' + beautifiedUrl.substring(indexOfSlash + 1)
                indexOfSlash = beautifiedUrl.indexOf('/', beautifiedUrl.indexOf('/') + 2)
            }
            const index = beautifiedUrl.lastIndexOf('>')
            beautifiedUrl = beautifiedUrl.substring(0, index - 1) + '' + beautifiedUrl.substring(index + 2)

            return beautifiedUrl
        },

        isEmpty(obj) {
            return JSON.stringify(obj) === JSON.stringify({});
        }
    }
}