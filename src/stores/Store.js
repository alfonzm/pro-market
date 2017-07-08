import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'cookies-js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		selectedItem: {},
		loggedIn: false,
		serverSetting: null,

		// messaging
		threads: [],
		selectedThread: {},
		selectedThreadMembers: {},
	},
	mutations: {
		setServerSetting(state, newServerSetting) {
			state.serverSetting = newServerSetting
			Cookies.set('server', newServerSetting, { expires: Infinity })
		},
		setLoggedIn(state, loggedInStatus) {
			state.loggedIn = loggedInStatus
		},
		setSelectedItem(state, newSelectedItem) {
			state.selectedItem = newSelectedItem
		},
		setSelectedThread(state, newSelectedThread) {
			state.selectedThread = newSelectedThread
			console.log("SET", newSelectedThread.recipientUserId)
			state.selectedThreadMembers[newSelectedThread.recipientUserId] = newSelectedThread.recipientUser
		},
		setThreads(state, threads) {
			state.threads = threads
		}
	}
})

export default store