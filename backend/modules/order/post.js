const orderModel = require('./model.js')
const post = (req, res) => {
	let str = ''
	req.on('data', (chunk) => str += chunk )
	req.on('end', (data) => {
		let order = orderModel.insertOrder(str)
		if(order) {
			return res.end(JSON.stringify({ status: 200, message: 'Data received!' }))
		} else {
			res.status(400)
			return res.end(JSON.stringify({ status: 400, message: 'An error occured!' }))
		}
	})
}

module.exports = post
