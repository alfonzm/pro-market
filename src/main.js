import Vue from 'vue'
import VueFire from 'vuefire'

// Components
import App from './App.vue'

// Setup
Vue.use(VueFire)

new Vue({
  el: '#app',
  render: h => h(App)
})
