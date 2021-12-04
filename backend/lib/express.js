const path = require('path')
const fs = require('fs')

class Express {
	constructor (req, res) {
		this.req = req
		this.res = res
	}

	get (path, callback) {
		if((this.req.url === path || this.req.url.split('/')[1] == path.split('/')[1]) && this.req.method.toUpperCase() === 'GET') {
			let params = path.split(':')
			let reqParams = this.req.url.split('/')
			if(params.length == 2 && reqParams.length == 3) this.req.params = { [params[1]]: reqParams[reqParams.length - 1] }
			callback(this.req, this.res)
		}
	}

	post (path, callback) {
		if(this.req.url === path && this.req.method.toUpperCase() === 'POST') {
			callback(this.req, this.res)
		}
	}

	static (folderName) {
		if(this.req.url !== '/' && this.req.method.toUpperCase() === 'GET') {
			let filePath = '.' + this.req.url
		    let extname = String(path.extname(filePath)).toLowerCase()
		    let mimeTypes = {
		        '.html': 'text/html',
		        '.js': 'text/javascript',
		        '.css': 'text/css',
		        '.json': 'application/json',
		        '.png': 'image/png',
		        '.jpg': 'image/jpg',
		        '.jpeg': 'image/jpg',
		        '.gif': 'image/gif',
		        '.svg': 'image/svg+xml',
		        '.wav': 'audio/wav',
		        '.mp4': 'video/mp4',
		        '.woff': 'application/font-woff',
		        '.ttf': 'application/font-ttf',
		        '.eot': 'application/vnd.ms-fontobject',
		        '.otf': 'application/font-otf',
		        '.wasm': 'application/wasm'
		    }

		    let contentType = mimeTypes[extname] || 'application/octet-stream';

		    fs.readFile(path.join(process.cwd(), folderName, filePath), (error, data) => {
		    	if (error) {}
		        else {
		        	this.res.writeHead(200, { 'Content-Type': contentType })
		        	this.res.end(data, 'utf-8')
		        }
		    })
		}
	}
}

module.exports = Express
