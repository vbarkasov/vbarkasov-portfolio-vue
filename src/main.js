// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import vueHeadful from 'vue-headful'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGooglePlay } from '@fortawesome/free-brands-svg-icons'

import 'swiper/css/swiper.min.css'

library.add(faGithub, faGooglePlay, faExternalLinkAlt)
Vue.component('fa-icon', FontAwesomeIcon)
Vue.component('vue-headful', vueHeadful)

Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  'el': '#app',
  store,
  router,
  vuetify,
  'components': { App },
  'template': '<App/>'
})
