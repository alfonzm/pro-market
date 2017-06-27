<template>
	<div id="app">
		<nav class="ui top fixed borderless menu">
			<div class="ui container">
				<a href="#" class="header item">
					<h1>pRO Market</h1>
				</a>

				<pro-user-menu :loggedUser="loggedUser"></pro-user-menu>
			</div>
		</nav>

		<main class="ui container">
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
import firebase from 'firebase'
import Config from './Config'
import UserMenu from './components/UserMenu.vue'

// Setup firebase
let config = {
	apiKey: Config.FIREBASE_API_KEY,
	authDomain: Config.FIREBASE_AUTH_DOMAIN,
	databaseURL: Config.FIREBASE_DATABASE_URL,
	storageBucket: Config.FIREBASE_STORAGE_BUCKET,
}

let app = firebase.initializeApp(config)
let db = app.database()

export default {
	name: 'app',
	data () {
		return {
			loggedUser: {},
		}
	},
	components: {
		'pro-user-menu': UserMenu
	},
	created() {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				this.loggedUser = user
				var usersRef = db.ref('users')
				usersRef.child(user.uid).set({
					name: user.displayName,
					email: user.email
				})
			} else {
				this.loggedUser = null
			}
		}.bind(this))
	},
	methods: {
	},
}
</script>

<style lang="scss">
* {
	font-family: 'Avenir' !important
}

main {
	margin-top: 120px
}
</style>