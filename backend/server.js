const http = require('http')
const Express = require('./lib/express.js.js.js')
const { PORT, host } = require('./config.js')

const userController = require('./modules/user')
const orderController = require('./modules/order')
const foodController = require('./modules/food')

const server = http.createServer( (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', '*')
	res.setHeader('Access-Control-Allow-Methods', '*')
	if(req.method == 'OPTIONS') return res.end('200')

	const app = new Express(req, res)
	app.static('assets')
	app.get('/', (req, res) => res.end('not found') )

	// users
	app.get('/users/:userId', userController.get)
	app.post('/users', userController.post)

	// orders
	app.get('/orders/:userId', orderController.get)
	app.post('/orders', orderController.post)

	app.get('/foods', foodController.get)
})

server.listen(PORT, () => console.log('Server is running on ' + host + ':' + PORT))
