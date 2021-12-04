const foodModel = require('./model.js')
const get = (req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json '} )
	res.end( JSON.stringify( foodModel.getFoods() ) )
}

module.exports = get
