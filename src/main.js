import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'

import routes from './Routes'

// Components
import App from './App.vue'
import Home from './pages/Home.vue'

// Setup
Vue.use(VueRouter);
Vue.use(VueFire)

const router = new VueRouter({
	mode: 'history',
	routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
