const Home = require('./pages/Home.vue')
const Login = require('./pages/Login.vue')
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
		path: '/sell',
		component: SellForm,
	},
	{
		path: '/sell/:sellItemId',
		component: SellItem
	},
]