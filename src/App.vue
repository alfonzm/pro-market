<template>
	<div id="app">
		<h1>pRO Market</h1>

		<button @click="loginFacebook">Login with Facebook</button>
		<button @click="logoutFacebook">Logout</button>

		<div>
			<div v-if="books.length === 0">
				Loading...
			</div>
			<div v-else>
				<p v-for="book in books">
					<a v-bind:href="book.name">{{book.name}}</a>
					{{book.author}} / {{ book['.key'] }}
				</p>
			</div>
		</div>

		<div>
			<form id="form" v-on:submit.prevent="addBook">
				<input type="text" id="bookName" v-model="newBook.name">
				<input type="text" id="bookAuthor" v-model="newBook.author">
				<input type="submit" value="Add book">
			</form>
		</div>
	</div>
</template>

<script>
import Firebase from 'firebase'
import Config from './Config'

let config = {
	apiKey: Config.FIREBASE_API_KEY,
	authDomain: Config.FIREBASE_AUTH_DOMAIN,
	databaseURL: Config.FIREBASE_DATABASE_URL,
	storageBucket: Config.FIREBASE_STORAGE_BUCKET,
};

let app = Firebase.initializeApp(config)
let db = app.database()
let booksRef = db.ref('books')

export default {
	name: 'app',
	data () {
		return {
			newBook: {
				name: '',
				author: '',
			}
		}
	},
	methods: {
		addBook() {
			booksRef.push(this.newBook)
			this.newBook.name = ''
			this.newBook.author = ''
		},
		loginFacebook() {
			var provider = new Firebase.auth.FacebookAuthProvider();
			provider.addScope('user_birthday');
			// provider.setCustomParameters({
			// 	'display': 'popup'
			// });

			Firebase.auth().signInWithRedirect(provider).then(function(result) {
				console.log(result);
				var token = result.credential.accessToken;
				var user = result.user;
			}).catch(function(error) {
				console.log(error);

				var errorCode = error.code;
				var errorMessage = error.message;
				var email = error.email;
				var credential = error.credential;
			});
		},
		logoutFacebook() {
			Firebase.auth().signOut().then(function() {
				console.log("logged out");
			}).catch(function(error) {
				console.log(error);
			});
		}
	},
	firebase: {
		books: booksRef
	},
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
}
</style>