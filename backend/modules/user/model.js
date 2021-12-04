const fs = require('fs')
const parser = require('../../lib/dataParser.js')
const path = require('path')

const getUsers = () =>  {
	let users = fs.readFileSync(path.join( process.cwd(), 'database', 'users.json' ), 'UTF-8')
	let orders = fs.readFileSync(path.join( process.cwd(), 'database', 'orders.json' ), 'UTF-8')
	if(users) {
		users = JSON.parse(users)
		orders = orders ? JSON.parse(orders) : []
		return users.map( user => {
			user.orders = orders.filter( order => order.user_id == user.user_id )
			return user
		})
	} else {
		return []
	}
}


const getUser = (userId) =>  {
	let users = fs.readFileSync(path.join( process.cwd(), 'database', 'users.json' ), 'UTF-8')
	let orders = fs.readFileSync(path.join( process.cwd(), 'database', 'orders.json' ), 'UTF-8')
	if(users) {
		users = JSON.parse(users)
		orders = orders ? JSON.parse(orders) : []
		let user = users.find( user => user.user_id == userId )
		if(user) {
			user.orders = orders.filter( order => order.user_id == userId)
			return user
		} else return {}
	} else {
		return {}
	}
}

const insertUser = data => {
	let requestObject = JSON.parse(data)
	let users = fs.readFileSync(path.join( process.cwd(), 'database', 'users.json' ), 'UTF-8')
	let newUser
	if(!users) {
		users = []
		newUser = {
			user_id: 1,
			first_name: requestObject.username,
			telephone: requestObject.phone,
		}
	} else {
		users = JSON.parse(users)
		newUser = {
			user_id: users[users.length - 1].user_id + 1,
			first_name: requestObject.username,
			telephone: requestObject.phone,
		}
	}
	users.push(newUser)
	fs.writeFileSync(path.join( process.cwd(), 'database', 'users.json' ), JSON.stringify(users, null, 4))
	return newUser
}


module.exports = {
	insertUser,
	getUsers,
	getUser
}
