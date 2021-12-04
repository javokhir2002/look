const getIp = require('./lib/getIp.js')
const host = getIp()
const PORT = process.env.PORT || 8000

module.exports = { host, PORT }
