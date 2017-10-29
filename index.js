const fetch = require('node-fetch')
const { send } = require('micro')
const url = require('url')

module.exports = async (req, res) => {
  if ('/favicon.ico' === req.url) {
    return
  }
  let timeout = 0
  const elapsedTime = 10000

  const location = process.env.LOCATION
  if (location === undefined) {
    return send(res, 400, { message: 'Requires the LOCATION environment variable', status: 400 })
  }

  const requestTime = new Date()
  const domain = url.parse(req.url, true).query.url

  const response = await fetch(domain, { timeout: elapsedTime }).catch((err) => {
    if (err.name === 'FetchError') {
      return timeout = 1
    }
    send(res, 400, { message: 'This domain does not exist', url: domain, status: 400 })
  })

  if (response === undefined) {
    return
  }

  const data = await {
    date: requestTime,
    url: response.url,
    elapsedTime: (timeout === 0) ? (new Date() - requestTime) : elapsedTime,
    status: response.status,
    location,
    timeout,
  }

  return send(res, 200, data)
}
