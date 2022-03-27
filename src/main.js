import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import BootstrapVue3 from 'bootstrap-vue-3'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Optional, since every component import their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'


library.add(faSearch)

const app = createApp(App)
app.use(store)
app.use(BootstrapVue3)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
