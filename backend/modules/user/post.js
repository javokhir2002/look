const userModel = require('./model.js')
const post = (req, res) => {
	let str = ''
	req.on('data', (chunk) =>  str += chunk )
	req.on('end', () => {
		let user = userModel.insertUser(str)
		if(user) {
			return res.end(JSON.stringify({ status: 200, message: 'Data received!'} ))
		} else {
			return res.end('An error occured!')
		}
	})
}

module.exports = post
