import FirebaseStore from './FirebaseStore'
import Cookies from 'cookies-js'

export default {
	addSellItemToUserByUserId(userId, itemId, callback) {
		var newUserSellItem = FirebaseStore.db
			.ref('users')
			.child(userId)
			.child('sellItems')
			.child(itemId)

		newUserSellItem.set(true, (err) => {
			if(err) {
				return
			}

			callback(err)
		})
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