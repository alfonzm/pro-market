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
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</main>

	<vue-progress-bar></vue-progress-bar>
</div>
</template>

<script>
import firebase from 'firebase'
import UserMenu from './components/UserMenu.vue'
import FirebaseStore from './stores/FirebaseStore'
import Cookies from 'cookies-js'

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
		var serverFromCookie = Cookies.get('server') || 'loki'
		this.$store.commit('setServerSetting', serverFromCookie)

		FirebaseStore.checkLoggedIn((user) => {
			this.loggedUser = user
			var usersRef = db.ref('users')
			// usersRef.child(user.uid).set({
			// 	avatarUrl: 'https://placeimg.com/480/480/tech',
			// 	name: user.displayName,
			// 	email: user.email
			// })
		}, () => {
			this.loggedUser = null
		})

		this.$Progress.start()

		this.$router.beforeEach((to, from, next) => {
			if (to.meta.progress !== undefined) {
				let meta = to.meta.progress
				this.$Progress.parseMeta(meta)
			}

			this.$Progress.start()
			next()
		})
		this.$router.afterEach((to, from) => {
			this.$Progress.finish()
		})
	},
	methods: {
	},
}
</script>

<style lang="scss">
// * {
// 	font-family: 'Open Sans' !important
// }


body {
	background-color: #fafafa;
	height: 100%;

	#app {
		height: 100%;
	}

	main {
		padding-top: 120px;
		height: 100%;
	}

	#site-title {
		font-weight: 400;
		font-size: 14pt;
	}

	// Router view transitions
	.fade-enter-active, .fade-leave-active {
		transition-property: opacity;
		transition-duration: .2s;
	}

	.fade-enter-active {
		transition-delay: 0.2s;
	}

	.fade-enter, .fade-leave-active {
		opacity: 0
	}
}


</style>