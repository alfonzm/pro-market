const Home = require('./pages/Home.vue')
const Login = require('./pages/Login.vue')
const Profile = require('./pages/Profile.vue')
const Preferences = require('./pages/Preferences.vue')
const SellForm = require('./pages/SellForm.vue')
const SellItem = require('./pages/SellItem.vue')

export default [
	{
		path: '/',
		component: Home
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/profile',
		component: Profile
	},
	{
		path: '/preferences',
		component: Preferences
	},
	{
		path: '/sell',
		component: SellForm,
	},
	{
		path: '/sell/:sellItemId',
		component: SellItem
	},
]