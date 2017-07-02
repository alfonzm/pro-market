import Config from '../Config'
import firebase from 'firebase'

// Firebase
let app = firebase.initializeApp(Config.firebaseConfig)
let db = app.database()

let checkLoggedIn = (success, error) => {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			success(user)
		} else {
			error()
		}
	});
}

let getLoggedInUser = () => {
	return firebase.auth().currentUser;
}

export default {
	app,
	db,
	checkLoggedIn,
	getLoggedInUser
}
