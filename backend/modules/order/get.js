const orderModel = require('./model.js')
const get = (req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json' } )
	if(req.params) {
		return res.end( JSON.stringify( orderModel.getOrdersById(req.params.userId) ) )
	} else {
		return res.end( JSON.stringify( orderModel.getOrders() ) )
	}
}

module.exports = get
