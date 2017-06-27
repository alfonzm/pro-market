import firebase from 'firebase'

const Home = require('./pages/Home.vue')
const Sell = require('./pages/Sell.vue')

export default [
{
	path: '/',
	component: Home
},
{
	path: '/sell',
	component: Sell,
	beforeEnter: (to, from, next) => {
		checkLoggedIn(next)
	}
},
]

function checkLoggedIn(next) {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			next()
		} else {
			alert('no')
		}
	});
}