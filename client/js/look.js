let foodsSelect = document.querySelector('#foodsSelect')
let customerList = document.querySelector('.customers-list') 
let clientId = document.querySelector('#clientId')
let userHeader = document.querySelector('#userHeader')
let userAdd = document.querySelector('#userAdd')
let usernameInput = document.querySelector('#usernameInput')
let telephoneInput = document.querySelector('#telephoneInput')
let foodsFormlet = document.querySelector('#foodsFormlet')
let foodsCount = document.querySelector('#foodsCount')
let foodsForm = document.querySelector('#foodsForm')
let ordersList = document.querySelector('.orders-list')

function createElement(...arr) {
	let storage = []
	for (let i of arr) {
		let htmlElement = document.createElement(i)
		storage.push(htmlElement)
	}
	return storage
}

async function request(endpoint, method, data){

	let response = await fetch('http://localhost:8000/' + endpoint,{ 
		method,
		headers:{'Content-type':'application/json'},
		body: data ? JSON.stringify(data) : null
	})

	return await response.json()
}


async function foodsRenderer() {
	
	let foods = await request('foods','GET')
	
	for (let food of foods) {
		let [option] = createElement('option')
		option.textContent = food.food_name
		option.value = food.food_id
		foodsSelect.append(option)
	}
}
foodsRenderer()

async function usersRenderer() {
	
	let users = await request('users','GET')
	customerList.innerHTML = null
	for (let user of users) {
		let [li, span, a] = createElement('li','span','a')
	
		li.classList.add('customer-item')
		span.classList.add('customer-name')
		a.classList.add('customer-phone')

		li.textContent = user.first_name
		a.textContent = '+' + user.telephone
		a.setAttribute('href','tel: + ' + user.telephone )

		li.append(span)
		li.append(a)
		customerList.append(li)
		
		li.onclick = ()=>{
			clientId.textContent = user.user_id
			userHeader.textContent = user.first_name
			userOrderRenderer(user.user_id)
		}
	}
}
usersRenderer()

async function userOrderRenderer(user_id) {
	ordersList.innerHTML = null
	let orders = await request('orders/' + user_id,'GET')
	
	
	for (let order of orders) {
		
		let [li, img, div, foodName, foodCount] = createElement('li','img','div','span','span')

		li.classList.add('order-item')
		foodName.classList.add('order-name')
		foodCount.classList.add('order-count')

		
		img.src = 'http://localhost:8000' + order.food.food_img_link
		foodName.textContent = order.food.food_name
		foodCount.textContent = order.count

		div.append(foodName)
		div.append(foodCount)

		li.append(img)
		li.append(foodCount)
		ordersList.append(li)

	
	}
}
userOrderRenderer()

userAdd.onsubmit = async (event) => {
event.preventDefault()

	let newUser = {
		username:usernameInput.value,
		phone:telephoneInput.value
	}

	let response = await request('users', 'POST', newUser)
	if(response.status == 200) usersRenderer()

	usernameInput.value = ''
	telephoneInput.value = ''
}

foodsForm.onsubmit = async (event) => {
	event.preventDefault()

	if(clientId.textContent){
		let newOrder = {
			userId:clientId.textContent,
			foodId:foodsSelect.value,
			count:foodsCount.value
		}
		
		
		let response = await request('orders', 'POST', newOrder)
		
		if(response.status == 200) userOrderRenderer(clientId.textContent)
	
		foodsCount.value = ''
	}
	
}




