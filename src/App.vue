<template>
	<div id="app">
		<nav class="ui top fixed borderless menu">
			<div class="ui container">
				<router-link to="/" class="header item">
					<span id="site-title">RAGNAMARKET.PH</span>
				</router-link>

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
import FirebaseStore from './stores/FirebaseStore'

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
		FirebaseStore.checkLoggedIn((user) => {
			this.loggedUser = user
			var usersRef = db.ref('users')
			usersRef.child(user.uid).set({
				avatarUrl: 'https://placeimg.com/480/480/tech',
				name: user.displayName,
				email: user.email
			})
		}, () => {
			this.loggedUser = null
		})
	},
	methods: {
	},
}
</script>

<style lang="scss">
// * {
// 	font-family: 'Lato' !important
// }

main {
	margin-top: 120px
}

body {
	background-color: #fafafa;
}

#site-title {
	font-weight: 400;
	font-size: 14pt;
}

</style>