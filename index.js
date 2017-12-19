const fetch = require('node-fetch')
const { send } = require('micro')
const url = require('url')
const ping = require('./https-measurer.js')

module.exports = async (req, res) => {
  if ('/favicon.ico' === req.url) {
    return
  }

  const location = process.env.LOCATION
  if (location === undefined) {
    return send(res, 400, { message: 'Requires the LOCATION environment variable', status: 400 })
  }

  const requestTime = new Date()
  const domain = url.parse(req.url, true).query.url

  const data = { location, timeout: 0, url: domain, date: requestTime }

  try {
    const response = await ping(domain)
    Object.assign(data, response)
  } catch (e) {
    data.status = 500
    data.timeout = 1
    data.elapsedTime = 10000
  }
  
  send(res, 200, data)
}
