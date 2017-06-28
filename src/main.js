import Vue from 'vue'
import VueRouter from 'vue-router'
import Config from './Config'
import firebase from 'firebase'
import VueFire from 'vuefire'
import Vue2Filters from 'vue2-filters'

import routes from './Routes'

// Components
import App from './App.vue'
import Home from './pages/Home.vue'

// Setup
Vue.use(VueRouter)
Vue.use(VueFire)
Vue.use(Vue2Filters)

const router = new VueRouter({
	mode: 'history',
	routes
})

// Bus event emitter
window.bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})