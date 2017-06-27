<template>
	<div id="app">
		<nav class="ui top fixed borderless menu">
			<div class="ui container">
				<a href="/" class="header item">
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
import UserMenu from './components/UserMenu.vue'
import FirebaseStore from './helpers/FirebaseStore'

const db = FirebaseStore.db

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
	// font-family: 'Avenir' !important
}

main {
	margin-top: 120px
}
</style>