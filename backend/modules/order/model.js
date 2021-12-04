const fs = require('fs')
const path = require('path')
const parser = require('../../lib/dataParser.js')

const getOrders = () => {
	let orders = fs.readFileSync(path.join( process.cwd(), 'database', 'orders.json' ), 'UTF-8')
	let users = fs.readFileSync(path.join( process.cwd(), 'database', 'users.json' ), 'UTF-8')
	let foods = fs.readFileSync(path.join( process.cwd(), 'database', 'foods.json' ), 'UTF-8')
	if(orders) {
		orders = JSON.parse(orders)
		foods = foods ? JSON.parse(foods) : null
		users = users ? JSON.parse(users) : null
		return orders.map( order => {
			order.food = foods ? foods.find( food => food.food_id === order.food_id ) : null
			order.user = foods ? users.find( user => user.user_id === order.user_id ) : null
			return order
		})
	} else {
		return []
	}
}

const getOrdersById = (userId) => {
	let orders = fs.readFileSync(path.join( process.cwd(), 'database', 'orders.json' ), 'UTF-8')
	let users = fs.readFileSync(path.join( process.cwd(), 'database', 'users.json' ), 'UTF-8')
	let foods = fs.readFileSync(path.join( process.cwd(), 'database', 'foods.json' ), 'UTF-8')
	if(orders) {
		orders = JSON.parse(orders)
		foods = foods ? JSON.parse(foods) : null
		users = users ? JSON.parse(users) : null
		let filteredOrders = orders.filter(order => order.user_id == userId)
		if(filteredOrders.length) {
			return filteredOrders.map( order => {
				order.food = foods ? foods.find( food => food.food_id == order.food_id ) : null
				order.user = foods ? users.find( user => user.user_id == order.user_id ) : null
				return order
			})
		} else return []
	} else return []
}


const insertOrder = data => {
	let requestObject = JSON.parse(data)
	let orders = fs.readFileSync(path.join( process.cwd(), 'database', 'orders.json' ), 'UTF-8')
	let newOrder
	if(!orders) {
		orders = []
		newOrder = {
			order_id: 1,
			user_id: requestObject.userId,
			food_id: requestObject.foodId,
			count: requestObject.count
		}
		orders.push(newOrder)
	} else {
		orders = JSON.parse(orders)
		let order = orders.find( order => order.user_id == requestObject.userId && order.food_id == requestObject.foodId)
		if(order) {
			let copiedOrder = {...order}
			newOrder = copiedOrder
			copiedOrder.count = +copiedOrder.count + +requestObject.count
			orders.splice(orders.indexOf(order), 1, copiedOrder)
		} else {
			newOrder = {
				order_id: orders[orders.length - 1].order_id + 1,
				user_id: requestObject.userId,
				food_id: requestObject.foodId,
				count: requestObject.count
			}	
			orders.push(newOrder)
		}
	}
	fs.writeFileSync(path.join( process.cwd(), 'database', 'orders.json' ), JSON.stringify(orders, null, 4))
	return newOrder
}


module.exports = {
	getOrdersById,
	insertOrder,
	getOrders,
}
