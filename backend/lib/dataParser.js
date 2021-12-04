const parser = (str) => {
	let obj = {}
	for( let d of str.split('&') ) {
		let arr = d.split('=')
		for(let key in arr) {
			obj[arr[0]] = arr[1]
		}
	}
	return obj
}

module.exports = parser
