import Config from '../Config'
import Helpers from '../helpers/Helpers'
import FirebaseStore from './FirebaseStore'
import UserStore from './UserStore'
import firebase from 'firebase'
import _ from 'lodash'

export default {
	getThreadsByUserId(userId, callback) {
		FirebaseStore.db
			.ref('users')
			.child(userId)
			.child('threads')
			.orderByKey()
			.once('value', (data) => {
				console.log(data.val())
				callback(_.reverse(Helpers.convertObjectsToArray(data.val())) || [])
			})
	},
	getThreadMessages(threadId, offsetFromLast = 0, limit = 20, callback) {
		FirebaseStore.db
			.ref('threads')
			.child(threadId)
			.limitToLast(limit)
			.orderByKey()
			.once('value', (data) => {
				console.log(data.val())
				// callback(_.reverse(convertObjectsToArray(data.val())) || [])
			})
	},
}