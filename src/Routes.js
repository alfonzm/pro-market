const Home = require('./pages/Home.vue')
const Sell = require('./pages/Sell.vue')

module.exports = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/sell',
		component: Sell
	},
]