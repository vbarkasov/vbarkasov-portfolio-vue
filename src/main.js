// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueHeadful from 'vue-headful'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGooglePlay } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub, faGooglePlay, faExternalLinkAlt);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
