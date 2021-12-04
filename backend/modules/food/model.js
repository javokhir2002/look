const fs = require('fs')
const path = require('path')
let foods = fs.readFileSync(path.join( process.cwd(), 'database', 'foods.json' ), 'UTF-8')
foods = JSON.parse(foods)

const getFoods = () => foods

module.exports = {
	getFoods
}
