import Vue from 'vue'
import Vuex from 'vuex'
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

// Router
const router = new VueRouter({
	mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	window.scrollTo(0,0)
	next()
})

// Bus event emitter
window.bus = new Vue();

// Store
import store from './stores/Store'

// Vue app
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})