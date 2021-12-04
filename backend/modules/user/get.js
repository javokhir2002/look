const userModel = require('./model.js')
const get = (req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json '} )
	if(req.params) {
		return res.end( JSON.stringify( userModel.getUser(req.params.userId) ) )
	} else {
		return res.end( JSON.stringify( userModel.getUsers() ) )
	}
}

module.exports = get
