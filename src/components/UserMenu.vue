<template>
	<div class="right menu">
		<div class="ui dropdown item" v-if="server">
			Server:&nbsp;<strong>{{ server | capitalize }}</strong>
			<i class="icon dropdown"></i>
			<div class="menu">
				<div @click="setServer('thor')" class="item">Thor</div>
				<div @click="setServer('loki')" class="item">Loki</div>
			</div>
		</div>
		<div v-if="loggedUser && loggedUser.uid" class="ui inline top pointing right dropdown link item">
			<div>
				<img :src="loggedUser.photoURL" class="ui avatar image">
			</div>
			<div class="menu">
				<span class="item">Hi, <strong>{{ loggedUser.displayName }}</strong></span>
				<div class="ui divider"></div>
				
				<router-link to="/profile" class="item">Profile</router-link>
				<router-link to="/messages" class="item">Messages (1)</router-link>
				<div class="ui divider"></div>
				
				<router-link to="/sell" class="item">Sell an item</router-link>
				<div class="ui divider"></div>

				<router-link to="/preferences" class="item">Preferences</router-link>
				<div class="item" @click="logoutFacebook">Logout</div>
			</div>
		</div>
		<div v-else-if="loggedUser === null" class="item">
			<button class="ui primary button" @click="loginFacebook">
				Login
			</button>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase'
import UserStore from '../stores/UserStore'

export default {
	props: [
		'loggedUser'
	],
	data() {
		return {
			server: null
		}
	},
	watch: {
		server: function(newServer, oldServer) {
			if(newServer != oldServer) {
				this.$store.commit('setServerSetting', newServer)
			}
		}
	},
	created() {
		$('.dropdown').dropdown()

		setTimeout(() => {
			$('.dropdown').dropdown()
		}, 500)
	},
	mounted() {
		this.server = this.$store.state.serverSetting

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				setTimeout(function(){
					$('.dropdown').dropdown()
				}, 10)
			}
		}.bind(this))
	},
	methods: {
		setServer(server){
			this.server = server
		},
		loginFacebook() {
			var provider = new firebase.auth.FacebookAuthProvider()
			provider.addScope('user_birthday')

			firebase.auth().signInWithRedirect(provider).then(function(result) {
				console.log(result)
				var token = result.credential.accessToken
				var user = result.user
			}).catch(function(error) {
				console.log(error)

				var errorCode = error.code
				var errorMessage = error.message
				var email = error.email
				var credential = error.credential
			})
		},
		logoutFacebook() {
			if(confirm("Are you sure you want to logoout?")) {
				this.loggedUser = null

				firebase.auth().signOut().then(function() {
					location.reload()
				}).catch(function(error) {
					console.log(error)
				})
			}
		}
	}
}
</script>