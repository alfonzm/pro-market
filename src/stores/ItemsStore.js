import Config from '../Config'
import FirebaseStore from './FirebaseStore'
import UserStore from './UserStore'
import firebase from 'firebase'
import _ from 'lodash'

function sortByKey(arr){
	return _(arr).toPairs().sortBy(0).fromPairs().value()
}

function reverseAndSortByKey(arr) {
	return _.reverse(
				sortByKey(arr)
			)
}

export default {
	getLatestItems(server, limit = 10, callback) {
		FirebaseStore.db
			.ref('sellItems')
			.child(server)
			.limitToLast(limit)
			.orderByKey()
			.once('value', (data) => {
				callback(reverseAndSortByKey(data.val()) || [])
			})
	},
	getItems(server, limit = 20, callback) {
		FirebaseStore.db
			.ref('sellItems')
			.child(server)
			.limitToLast(limit)
			.orderByKey()
			.once('value', (data) => {
				callback(reverseAndSortByKey(data.val()) || [])
			})
	},
	getItemWithUserById(objectKey, callback) {
		var item = {}

		FirebaseStore.db
			.ref('sellItems')
			.child('thor')
			.child(objectKey)
			.once('value', (data) => {
				item = data.val()

				// if item exists, query and attach the user
				if(item != {}) {
					UserStore.getUserById(data.val().userId, (user) => {
						console.log(user)
						item.user = user
						callback(item || {})
					})
				} else {
					callback(item)
				}
			})
	}
}