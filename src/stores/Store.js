import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		selectedItem: {},
		loggedIn: false
	},
	mutations: {
		setLoggedIn(state, loggedInStatus) {
			state.loggedIn = loggedInStatus
		},
		setSelectedItem(state, newSelectedItem) {
			state.selectedItem = newSelectedItem
		}
	}
})

export default store