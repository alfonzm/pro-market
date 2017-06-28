import Cookies from 'cookies-js'

export default {
	getServer() {
		return Cookies.get('server')
	},
	setServer(server) {
		Cookies.set('server', server)
	},
}