import Config from '../Config'
import FirebaseStore from './FirebaseStore'
import firebase from 'firebase'

export default {
	getLatestItems(server, quantity = 10, callback) {
		FirebaseStore.db
			.ref('sellItems')
			.child(server)
			.limitToLast(quantity)
			.orderByKey()
			.once('value', (data) => {
			var items = data.val() || []
			callback(items)
		})
	},
}