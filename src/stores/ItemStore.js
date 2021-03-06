import Config from '../Config'
import Helpers from '../helpers/Helpers'
import FirebaseStore from './FirebaseStore'
import UserStore from './UserStore'
import firebase from 'firebase'
import _ from 'lodash'

export default {
	createItem(item, server, callback) {
		var newSellItemRef = FirebaseStore.db
			.ref('sellItems')
			.child(server)
			.push()

		item.createdAt = firebase.database.ServerValue.TIMESTAMP

		newSellItemRef.set(item, (err) => {
			if(err) {
				console.log(err)
				return
			}

			item.id = newSellItemRef.key

			UserStore.addSellItemToUserByUserId(item.userId, newSellItemRef.key, () => {
				callback(item)
			})
		})
	},
	getLatestItems(server, limit = 10, callback) {
		FirebaseStore.db
			.ref('sellItems')
			.child(server)
			.limitToLast(limit)
			.orderByKey()
			.once('value', (data) => {
				callback(_.reverse(Helpers.convertObjectsToArray(data.val())) || [])
			})
	},
	getItems(server, limit = 20, callback) {
		FirebaseStore.db
			.ref('sellItems')
			.child(server)
			.limitToLast(limit)
			.orderByKey()
			.once('value', (data) => {
				callback(_.reverse(Helpers.convertObjectsToArray(data.val())) || [])
			})
	},
	getAllItems(server, callback) {
		FirebaseStore.db
			.ref('sellItems')
			.child(server)
			.orderByKey()
			.once('value', (data) => {
				callback(data.val() || [])
			})
	},
	getItemsBySearchTerm(searchTerm, server, callback) {
		// TODO: implement search
		// currently same as getItems
		var limit = 20

		FirebaseStore.db
			.ref('sellItems')
			.child(server)
			.limitToLast(limit)
			.orderByKey()
			.once('value', (data) => {
				callback(_.reverse(Helpers.convertObjectsToArray(data.val())) || [])
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