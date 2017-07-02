const Home = require('./pages/Home.vue')
const Login = require('./pages/Login.vue')
const Profile = require('./pages/Profile.vue')
const Preferences = require('./pages/Preferences.vue')
const SellForm = require('./pages/SellForm.vue')
const SellItem = require('./pages/SellItem.vue')
const SellItemList = require('./pages/SellItemList.vue')
const Search = require('./pages/Search.vue')

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
		path: '/sell/:server',
		component: SellItemList,
	},
	{
		path: '/sell/item/:sellItemId',
		component: SellItem
	},
	{
		path: '/search/:searchTerm',
		component: Search
	},
]