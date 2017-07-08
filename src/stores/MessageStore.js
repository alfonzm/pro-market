import Config from '../Config'
import Helpers from '../helpers/Helpers'
import FirebaseStore from './FirebaseStore'
import UserStore from './UserStore'
import firebase from 'firebase'
import _ from 'lodash'
import async from 'async'

export default {
	getThreadsByUserId(userId, callback) {
		FirebaseStore.db
			.ref('users')
			.child(userId)
			.child('threads')
			.orderByKey()
			.once('value', (data) => {
				let threads = data.val()

				// Get users of all threads
				async.map(threads, (thread, callback) => {
					UserStore.getUserById(thread.recipientUserId, (user) => {
						thread.recipientUser = user
						callback()
					})
				}, (err, result) => {
					if(!err) {
						// console.log(threads)
						callback(threads)
						// callback(_.reverse(Helpers.convertSetToArray(data.val())) || [])
					}
				})

			})
	},
	getMessagesByThreadId(threadId, offsetFromLast = 0, limit = 20, callback) {
		FirebaseStore.db
			.ref('threads')
			.child(threadId)
			.child('messages')
			.limitToLast(limit)
			.orderByKey()
			.once('value', (data) => {
				callback(Helpers.convertObjectsToArray(data.val()) || [])
				// callback(_.reverse(convertObjectsToArray(data.val())) || [])
			})
	},
}