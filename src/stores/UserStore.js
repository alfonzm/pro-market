import FirebaseStore from './FirebaseStore'
import Cookies from 'cookies-js'

export default {
	getServer() {
		return Cookies.get('server') || 'loki'
	},
	setServer(server) {
		Cookies.set('server', server)
	},
	getUserById(userId, callback) {
		FirebaseStore.db
			.ref('users')
			.child(userId)
			.once('value', (data) => {
				callback(data.val() || {})
			})
	},
}