import Config from '../Config'
import firebase from 'firebase'

// Firebase
let app = firebase.initializeApp(Config.firebaseConfig)
let db = app.database()

export default {
	app,
	db,
	checkLoggedIn(success, error) {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				success(user)
			} else {
				error()
			}
		});
	}
}