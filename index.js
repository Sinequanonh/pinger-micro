const fetch = require('node-fetch')
const { send } = require('micro')
const url = require('url')
const ping = require('./https-measurer.js')

const green = '\033[32m'
const cyan = '\033[36m'
const blue = '\033[34m'
const yellow = '\033[33m'
const white = '\033[0m'

module.exports = async (req, res) => {
  if ('/favicon.ico' === req.url) {
    return
  }

  const method = url.parse(req.url, true).query.method || 'HEAD'

  const location = process.env.LOCATION
  if (location === undefined) {
    return send(res, 400, { message: 'Requires the LOCATION environment variable', status: 400 })
  }

  const requestTime = new Date()
  const domain = url.parse(req.url, true).query.url

  const data = { location, timeout: 0, url: domain, date: requestTime }

  try {
    const response = await ping(domain, method)
    console.log(`Request for ${cyan + domain + white} with ${yellow + method + white} method`, new Date())
    Object.assign(data, response)
  } catch (e) {
    data.status = 500
    data.timeout = 1
    data.elapsedTime = 10000
  }
  
  send(res, 200, data)
}
